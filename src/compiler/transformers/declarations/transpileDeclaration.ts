import {
    __String,
    changeAnyExtension,
    CompilerOptions,
    createEmitDeclarationResolver,
    createGetCanonicalFileName,
    createPrinter,
    createSourceMapGenerator,
    createSymlinkCache,
    createTextWriter,
    Diagnostic,
    EmitHost,
    ensureTrailingDirectorySeparator,
    factory,
    fileExtensionIs,
    flatten,
    forEach,
    getAreDeclarationMapsEnabled,
    getBaseFileName,
    getDeclarationEmitOutputFilePathWorker,
    getNewLineCharacter,
    getSourceMapDirectory,
    getSourceMappingURL,
    getSupportedExtensions,
    getSupportedExtensionsWithJsonIfResolveJsonModule,
    hasExtension,
    NodeFlags,
    normalizeSlashes,
    notImplemented,
    nullTransformationContext,
    objectAllocator,
    removeFileExtension,
    resolveTripleslashReference,
    returnFalse,
    returnUndefined,
    SourceFile,
    SymbolFlags,
    SyntaxKind,
    TransformationContext,
    transformDeclarations,
    TranspileDeclarationsOptions,
    TranspileDeclarationsOutput,
} from "../../_namespaces/ts";

export function transpileDeclaration(sourceFile: SourceFile, transpileOptions: TranspileDeclarationsOptions): TranspileDeclarationsOutput {
    const compilerOptions: CompilerOptions = {
        ...transpileOptions.compilerOptions,
        isolatedDeclarations: true,
    };
    const supportedExtensions = getSupportedExtensions(compilerOptions);
    const supportedExtensionsWithJsonIfResolveJsonModule = flatten(getSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions));

    // eslint-disable-next-line no-var
    var Symbol = objectAllocator.getSymbolConstructor();
    const files = new Map<string, SourceFile>([[sourceFile.fileName, sourceFile]]);
    const getCanonicalFileName = createGetCanonicalFileName(!!compilerOptions.useCaseSensitiveFileNames);
    const currentDirectory = normalizeSlashes(transpileOptions.currentDirectory ?? ".");
    const commonSourceDirectory = normalizeSlashes(ensureTrailingDirectorySeparator(transpileOptions.commonSourceDirectory ?? "."));
    const emitHost = createEmitHost();

    const emitResolver = createEmitDeclarationResolver(sourceFile, compilerOptions);
    const diagnostics: Diagnostic[] = [];
    const transformationContext: TransformationContext = {
        ...nullTransformationContext,
        getCompilerOptions: () => compilerOptions,
        addDiagnostic: diag => diagnostics.push(diag),
        getEmitResolver: () => emitResolver,
        getEmitHost() {
            return emitHost;
        },
    };
    const transformer = transformDeclarations(transformationContext);
    const result = transformer(sourceFile);

    const printer = createPrinter({
        removeComments: compilerOptions.removeComments,
        newLine: compilerOptions.newLine,
        noEmitHelpers: true,
        module: compilerOptions.module,
        target: compilerOptions.target,
        sourceMap: compilerOptions.declarationMap,
        inlineSourceMap: compilerOptions.inlineSourceMap,
        extendedDiagnostics: compilerOptions.extendedDiagnostics,
        onlyPrintJsDocStyle: true,
        omitBraceSourceMapPositions: true,
    });

    const writer = createTextWriter(getNewLineCharacter(compilerOptions));
    const declarationPath = getDeclarationEmitOutputFilePathWorker(
        sourceFile.fileName,
        compilerOptions,
        emitHost.getCurrentDirectory(),
        emitHost.getCommonSourceDirectory(),
        emitHost.getCanonicalFileName,
    );
    const declarationMapPath = declarationPath + ".map";
    const sourceMap = getSourceMapGenerator(declarationPath, declarationMapPath);
    printer.writeFile(result, writer, sourceMap?.sourceMapGenerator);
    if (sourceMap) {
        if (!writer.isAtStartOfLine()) writer.writeLine();
        writer.writeComment(sourceMap.sourceMappingURL);
    }

    return {
        declaration: writer.getText(),
        declarationPath,
        declarationMap: sourceMap?.sourceMapGenerator.toString(),
        declarationMapPath: sourceMap && declarationMapPath,
        diagnostics,
    };

    function createSourceFile(fileName: string) {
        const newSourceFile = factory.createSourceFile([], factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None);
        newSourceFile.fileName = fileName;
        newSourceFile.symbol = new Symbol(SymbolFlags.ValueModule, `"${removeFileExtension(fileName)}"` as __String);
        return newSourceFile;
    }

    function getSourceFile(fileName: string) {
        const fileNameKey = changeAnyExtension(fileName, ".ts");
        let sourceFile = files.get(fileNameKey);
        if (!sourceFile) {
            sourceFile = createSourceFile(fileName);
            files.set(fileNameKey, sourceFile);
        }
        return sourceFile;
    }

    function getSourceMapGenerator(declarationFilePath: string, declarationMapPath: string) {
        if (!getAreDeclarationMapsEnabled(compilerOptions)) return;

        const mapOptions = {
            sourceRoot: compilerOptions.sourceRoot,
            mapRoot: compilerOptions.mapRoot,
            extendedDiagnostics: compilerOptions.extendedDiagnostics,
            // Explicitly do not passthru either `inline` option
        };

        const sourceRoot = normalizeSlashes(compilerOptions.sourceRoot || "");
        const sourceMapGenerator = createSourceMapGenerator(
            emitHost,
            getBaseFileName(normalizeSlashes(declarationFilePath)),
            sourceRoot ? ensureTrailingDirectorySeparator(sourceRoot) : sourceRoot,
            getSourceMapDirectory(emitHost, compilerOptions, declarationFilePath, sourceFile),
            mapOptions,
        );

        const sourceMappingURL = getSourceMappingURL(
            emitHost,
            mapOptions,
            sourceMapGenerator,
            declarationFilePath,
            declarationMapPath,
            sourceFile,
        );
        return { sourceMapGenerator, sourceMappingURL: `//# ${"sourceMappingURL"}=${sourceMappingURL}` };
    }
    function createEmitHost(): EmitHost {
        const symlinkCache = createSymlinkCache(currentDirectory, getCanonicalFileName);
        return {
            getCurrentDirectory: () => currentDirectory,
            getCanonicalFileName,
            useCaseSensitiveFileNames: () => !!compilerOptions.useCaseSensitiveFileNames,
            getCompilerOptions: () => compilerOptions,
            getCommonSourceDirectory: () => commonSourceDirectory,
            getSourceFile,
            getSourceFileByPath: notImplemented,
            getSourceFiles: notImplemented,
            isSourceFileFromExternalLibrary: notImplemented,
            getResolvedProjectReferenceToRedirect: notImplemented,
            getProjectReferenceRedirect: notImplemented,
            isSourceOfProjectReferenceRedirect: returnFalse,
            getSymlinkCache: () => symlinkCache,
            writeFile: notImplemented,
            isEmitBlocked: notImplemented,
            readFile: returnUndefined,
            fileExists: returnFalse,
            getBuildInfo: notImplemented,
            getSourceFileFromReference(file, ref) {
                const referencedFile = resolveTripleslashReference(ref.fileName, file.fileName);
                if (hasExtension(referencedFile)) {
                    const canonicalFileName = getCanonicalFileName(referencedFile);
                    if (!compilerOptions.allowNonTsExtensions && !forEach(flatten(supportedExtensionsWithJsonIfResolveJsonModule), extension => fileExtensionIs(canonicalFileName, extension))) {
                        return undefined;
                    }
                }
                return getSourceFile(referencedFile);
            },
            redirectTargetsMap: new Map(),
            getFileIncludeReasons: notImplemented,
            createHash: notImplemented,
            shouldTransformImportCall: notImplemented,
            getEmitModuleFormatOfFile: notImplemented,
            getDefaultResolutionModeForFile: notImplemented,
            getModeForResolutionAtIndex: notImplemented,
        };
    }
}
