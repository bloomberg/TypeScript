import {
    CompilerOptions,
    createEmitDeclarationResolver,
    createGetCanonicalFileName,
    createPrinter,
    createPrinterOptions,
    createSourceMapGenerator,
    createTextWriter,
    Diagnostic,
    ensureTrailingDirectorySeparator,
    getAreDeclarationMapsEnabled,
    getBaseFileName,
    getDeclarationEmitOutputFilePathWorker,
    getNewLineCharacter,
    getSourceMapDirectory,
    getSourceMappingURL,
    IsolatedTransformationContext,
    normalizeSlashes,
    nullTransformationContext,
    SourceFile,
    TransformationContextKind,
    transformDeclarations,
    TranspileDeclarationsOptions,
    TranspileDeclarationsOutput,
} from "../../_namespaces/ts";

export function transpileDeclaration(sourceFile: SourceFile, transpileOptions: TranspileDeclarationsOptions): TranspileDeclarationsOutput {
    const compilerOptions: CompilerOptions = {
        ...transpileOptions.compilerOptions,
        isolatedDeclarations: true,
    };
    const getCanonicalFileName = createGetCanonicalFileName(!!compilerOptions.useCaseSensitiveFileNames);
    const currentDirectory = normalizeSlashes(transpileOptions.currentDirectory ?? ".");
    const commonSourceDirectory = normalizeSlashes(ensureTrailingDirectorySeparator(transpileOptions.commonSourceDirectory ?? "."));
    const emitHost = {
        getCurrentDirectory: () => currentDirectory,
        getCanonicalFileName,
        useCaseSensitiveFileNames: () => !!compilerOptions.useCaseSensitiveFileNames,
        getCompilerOptions: () => compilerOptions.compilerOptions,
        getCommonSourceDirectory: () => commonSourceDirectory,
    };
    const emitResolver = createEmitDeclarationResolver(sourceFile);
    const diagnostics: Diagnostic[] = [];
    const transformationContext: IsolatedTransformationContext = {
        ...nullTransformationContext,
        kind: TransformationContextKind.IsolatedContext,
        getCompilerOptions: () => compilerOptions,
        addDiagnostic: diag => diagnostics.push(diag),
        getEmitResolver: () => emitResolver,
    };
    const transformer = transformDeclarations(transformationContext);
    const result = transformer(sourceFile);

    const printer = createPrinter(createPrinterOptions("declaration", compilerOptions));

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
}
