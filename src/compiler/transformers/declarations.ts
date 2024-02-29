import {
    __String,
    AccessorDeclaration,
    addRelatedInfo,
    AllAccessorDeclarations,
    AnyImportSyntax,
    append,
    ArrayBindingElement,
    arrayFrom,
    ArrayLiteralExpression,
    ArrowFunction,
    AsExpression,
    BigIntLiteral,
    BindingElement,
    BindingName,
    BindingPattern,
    Bundle,
    CallSignatureDeclaration,
    canHaveModifiers,
    canProduceDiagnostics,
    ClassDeclaration,
    clonePrimitiveLiteralValue,
    compact,
    ComputedPropertyName,
    concatenate,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    contains,
    createDiagnosticForNode,
    createEmptyExports,
    createGetSymbolAccessibilityDiagnosticForNode,
    createGetSymbolAccessibilityDiagnosticForNodeName,
    createSymbolTable,
    createUnparsedSourceFile,
    Debug,
    Declaration,
    DeclarationDiagnosticProducing,
    DeclarationName,
    declarationNameToString,
    DiagnosticMessage,
    Diagnostics,
    DiagnosticWithLocation,
    EmitFlags,
    EmitHost,
    EmitResolver,
    emptyArray,
    EntityNameOrEntityNameExpression,
    EnumDeclaration,
    ExportAssignment,
    ExportDeclaration,
    Expression,
    ExpressionWithTypeArguments,
    factory,
    FalseLiteral,
    FileReference,
    filter,
    findAncestor,
    flatMap,
    flatten,
    forEach,
    FunctionDeclaration,
    FunctionExpression,
    FunctionTypeNode,
    GeneratedIdentifierFlags,
    GetAccessorDeclaration,
    getCommentRange,
    getDirectoryPath,
    getEffectiveBaseTypeNode,
    getEffectiveModifierFlags,
    getExternalModuleImportEqualsDeclarationExpression,
    getExternalModuleNameFromDeclaration,
    getFirstConstructorWithBody,
    getLineAndCharacterOfPosition,
    getNameOfDeclaration,
    getNormalizedAbsolutePath,
    getOriginalNodeId,
    getOutputPathsFor,
    getParseTreeNode,
    getRelativePathToDirectoryOrUrl,
    getResolutionModeOverride,
    getResolvedExternalModuleName,
    getSetAccessorValueParameter,
    getSourceFileOfNode,
    getStrictOptionValue,
    GetSymbolAccessibilityDiagnostic,
    getTextOfNode,
    getThisParameter,
    hasDynamicName,
    hasEffectiveModifier,
    hasEffectiveReadonlyModifier,
    hasExtension,
    hasJSDocNodes,
    HasModifiers,
    hasSyntacticModifier,
    HeritageClause,
    Identifier,
    ImportAttributes,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportTypeNode,
    IndexSignatureDeclaration,
    InterfaceDeclaration,
    isAmbientModule,
    isAnyImportSyntax,
    isArray,
    isArrayBindingElement,
    isAsExpression,
    isBinaryExpression,
    isBindingElement,
    isBindingPattern,
    isClassDeclaration,
    isClassElement,
    isClassExpression,
    isComputedPropertyName,
    isConstTypeReference,
    isDeclaration,
    isEntityName,
    isEntityNameExpression,
    isExpandoPropertyDeclaration,
    isExportAssignment,
    isExportDeclaration,
    isExpressionWithTypeArguments,
    isExternalModule,
    isExternalModuleAugmentation,
    isExternalModuleIndicator,
    isExternalModuleReference,
    isExternalOrCommonJsModule,
    isFunctionDeclaration,
    isFunctionLike,
    isGetAccessor,
    isGlobalScopeAugmentation,
    isIdentifier,
    isIdentifierText,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isIndexSignatureDeclaration,
    isInterfaceDeclaration,
    isInternalDeclaration,
    isJsonSourceFile,
    isLateVisibilityPaintedStatement,
    isLiteralExpression,
    isLiteralImportTypeNode,
    isLiteralTypeNode,
    isMappedTypeNode,
    isMethodDeclaration,
    isMethodSignature,
    isModifier,
    isModuleDeclaration,
    isNamedDeclaration,
    isOmittedExpression,
    isOptionalDeclaration,
    isParameter,
    isParenthesizedExpression,
    isPrimitiveLiteralValue,
    isPrivateIdentifier,
    isPropertyDeclaration,
    isSemicolonClassElement,
    isSetAccessor,
    isSetAccessorDeclaration,
    isShorthandPropertyAssignment,
    isSourceFile,
    isSourceFileJS,
    isSourceFileNotJson,
    isSpreadAssignment,
    isStatement,
    isStringANonContextualKeyword,
    isStringLiteral,
    isStringLiteralLike,
    isTupleTypeNode,
    isTypeAliasDeclaration,
    isTypeAssertionExpression,
    isTypeElement,
    isTypeLiteralNode,
    isTypeNode,
    isTypeParameterDeclaration,
    isTypeQueryNode,
    isTypeReferenceNode,
    isUnionTypeNode,
    isUnparsedSource,
    isVarAwaitUsing,
    isVariableDeclaration,
    isVarUsing,
    KeywordTypeSyntaxKind,
    LateBoundDeclaration,
    LateVisibilityPaintedStatement,
    length,
    map,
    mapDefined,
    MethodDeclaration,
    MethodSignature,
    Modifier,
    ModifierFlags,
    ModifierLike,
    ModuleBody,
    ModuleDeclaration,
    ModuleName,
    NamedDeclaration,
    NamespaceDeclaration,
    needsScopeMarker,
    Node,
    NodeArray,
    NodeBuilderFlags,
    NodeFactory,
    NodeFlags,
    NodeId,
    normalizeSlashes,
    NoSubstitutionTemplateLiteral,
    NumericLiteral,
    ObjectLiteralExpression,
    OmittedExpression,
    orderedRemoveItem,
    ParameterDeclaration,
    ParenthesizedExpression,
    parseNodeFactory,
    pathContainsNodeModules,
    pathIsRelative,
    PrefixUnaryExpression,
    PrimitiveLiteral,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    pushIfUnique,
    removeAllComments,
    ResolutionMode,
    ScriptTarget,
    SetAccessorDeclaration,
    setCommentRange,
    setEmitFlags,
    setOriginalNode,
    setParent,
    setTextRange,
    ShorthandPropertyAssignment,
    SignatureDeclaration,
    some,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    startsWith,
    Statement,
    StringLiteral,
    Symbol,
    SymbolAccessibility,
    SymbolAccessibilityResult,
    SymbolFlags,
    SymbolTracker,
    SyntaxKind,
    toFileNameLowerCase,
    TransformationContext,
    transformNodes,
    TrueLiteral,
    tryCast,
    tryGetModuleSpecifierFromDeclaration,
    TypeAliasDeclaration,
    TypeAssertion,
    TypeElement,
    TypeNode,
    TypeParameterDeclaration,
    TypeReferenceNode,
    unescapeLeadingUnderscores,
    UnparsedSource,
    VariableDeclaration,
    VariableDeclarationList,
    VariableLikeDeclaration,
    VariableStatement,
    visitArray,
    visitEachChild,
    visitNode,
    visitNodes,
    VisitResult,
} from "../_namespaces/ts";
import * as moduleSpecifiers from "../_namespaces/ts.moduleSpecifiers";

/** @internal */
export function getDeclarationDiagnostics(host: EmitHost, resolver: EmitResolver, file: SourceFile | undefined): DiagnosticWithLocation[] | undefined {
    const compilerOptions = host.getCompilerOptions();
    const result = transformNodes(resolver, host, factory, compilerOptions, file ? [file] : filter(host.getSourceFiles(), isSourceFileNotJson), [transformDeclarations], /*allowDtsFiles*/ false);
    return result.diagnostics;
}

const declarationEmitNodeBuilderFlags = NodeBuilderFlags.MultilineObjectLiterals |
    NodeBuilderFlags.WriteClassExpressionAsTypeLiteral |
    NodeBuilderFlags.UseTypeOfFunction |
    NodeBuilderFlags.UseStructuralFallback |
    NodeBuilderFlags.AllowEmptyTuple |
    NodeBuilderFlags.GenerateNamesForShadowedTypeParams |
    NodeBuilderFlags.NoTruncation;

/**
 * Transforms a ts file into a .d.ts file
 * This process requires type information, which is retrieved through the emit resolver. Because of this,
 * in many places this transformer assumes it will be operating on parse tree nodes directly.
 * This means that _no transforms should be allowed to occur before this one_.
 *
 * @internal
 */
export function transformDeclarations(context: TransformationContext) {
    const throwDiagnostic = () => Debug.fail("Diagnostic emitted without context");
    let getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic = throwDiagnostic;
    let needsDeclare = true;
    let isBundledEmit = false;
    let resultHasExternalModuleIndicator = false;
    let needsScopeFixMarker = false;
    let resultHasScopeMarker = false;
    let enclosingDeclaration: Node;
    let necessaryTypeReferences: Map<string, TypeReferenceInformation> | undefined;
    let lateMarkedStatements: LateVisibilityPaintedStatement[] | undefined;
    let lateStatementReplacementMap: Map<NodeId, VisitResult<LateVisibilityPaintedStatement | ExportAssignment | undefined>>;
    let suppressNewDiagnosticContexts: boolean;
    let exportedModulesFromDeclarationEmit: Map<Symbol, ImportReferenceInformation> | undefined;

    const { factory } = context;
    const host = context.getEmitHost();
    const symbolTracker: SymbolTracker = {
        trackSymbol,
        reportInaccessibleThisError,
        reportInaccessibleUniqueSymbolError,
        reportCyclicStructureError,
        reportPrivateInBaseOfClassExpression,
        reportLikelyUnsafeImportRequiredError,
        reportTruncationError,
        moduleResolverHost: host,
        trackReferencedAmbientModule,
        trackExternalModuleSymbolOfImportTypeNode,
        reportNonlocalAugmentation,
        reportNonSerializableProperty,
    };
    let errorNameNode: DeclarationName | undefined;
    let errorFallbackNode: Declaration | undefined;
    let referenceRequestingNode: Node | undefined;

    let currentSourceFile: SourceFile;
    let refs: Map<NodeId, ModuleReferenceInformation>;
    let libs: Set<string>;
    let emittedImports: readonly AnyImportSyntax[] | undefined; // must be declared in container so it can be `undefined` while transformer's first pass
    const resolver = context.getEmitResolver();
    const options = context.getCompilerOptions();
    const { noResolve, stripInternal, isolatedDeclarations, isolatedDeclarationsNoFallback } = options;
    const strictNullChecks = getStrictOptionValue(options, "strictNullChecks");
    return transformRoot;

    function recordTypeReferenceDirectivesIfNecessary(typeReferenceDirectives: readonly [specifier: string, mode: ResolutionMode][] | undefined, isPresentInSource: boolean, requestingNode = referenceRequestingNode): void {
        if (!typeReferenceDirectives) {
            return;
        }
        necessaryTypeReferences ??= new Map();
        for (const [specifier, mode] of typeReferenceDirectives) {
            const referenceKey = specifier + mode;
            if (!necessaryTypeReferences.has(referenceKey)) {
                Debug.assert(isPresentInSource || (requestingNode !== undefined), "If reference is added, we should know why it was added");
                const existingReference = isPresentInSource ?
                    { specifier, requestingNode: undefined, mode, isPresentInSource } :
                    { specifier, requestingNode: requestingNode!, mode, isPresentInSource };
                necessaryTypeReferences.set(referenceKey, existingReference);
            }
        }
    }

    function recordExportedModuleFromDeclarationEmit(symbol: Symbol, isPresentInSource: boolean, requestingNode = referenceRequestingNode) {
        Debug.assert(isPresentInSource || (requestingNode !== undefined), "If reference comes from source, the requesting node must be missing, otherwise it must exist");
        exportedModulesFromDeclarationEmit ??= new Map();
        if (!exportedModulesFromDeclarationEmit.has(symbol)) {
            exportedModulesFromDeclarationEmit.set(symbol, isPresentInSource ? { isPresentInSource, symbol, requestingNode: undefined } : { isPresentInSource, symbol, requestingNode: requestingNode! });
        }
    }
    function trackReferencedAmbientModule(node: ModuleDeclaration, symbol: Symbol) {
        // If it is visible via `// <reference types="..."/>`, then we should just use that
        const directives = resolver.getTypeReferenceDirectivesForSymbol(symbol, SymbolFlags.All);
        if (length(directives)) {
            return recordTypeReferenceDirectivesIfNecessary(directives, /*isPresentInSource*/ false);
        }
        // Otherwise we should emit a path-based reference
        const container = getSourceFileOfNode(node);
        Debug.assert(referenceRequestingNode, "We should kow the requesting node for a module reference");
        const containerId = getOriginalNodeId(container);
        if (!refs.has(containerId)) {
            refs.set(getOriginalNodeId(container), { sourceFile: container, requestingNode: referenceRequestingNode, isPresentInSource: false });
        }
    }

    function trackReferencedAmbientModuleFromImport(node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration | ImportTypeNode) {
        const moduleSpecifier = tryGetModuleSpecifierFromDeclaration(node);
        const savedReferenceRequestingNode = referenceRequestingNode;
        referenceRequestingNode = node;
        const symbol = moduleSpecifier && resolver.tryFindAmbientModule(moduleSpecifier);
        if (symbol?.declarations) {
            for (const decl of symbol.declarations) {
                if (isAmbientModule(decl) && getSourceFileOfNode(decl) !== currentSourceFile) {
                    trackReferencedAmbientModule(decl, symbol);
                }
            }
        }
        referenceRequestingNode = savedReferenceRequestingNode;
    }

    function handleSymbolAccessibilityError(symbolAccessibilityResult: SymbolAccessibilityResult) {
        if (symbolAccessibilityResult.accessibility === SymbolAccessibility.Accessible) {
            // Add aliases back onto the possible imports list if they're not there so we can try them again with updated visibility info
            if (symbolAccessibilityResult.aliasesToMakeVisible) {
                if (!lateMarkedStatements) {
                    lateMarkedStatements = symbolAccessibilityResult.aliasesToMakeVisible;
                }
                else {
                    for (const ref of symbolAccessibilityResult.aliasesToMakeVisible) {
                        pushIfUnique(lateMarkedStatements, ref);
                    }
                }
            }
            // TODO: Do all these accessibility checks inside/after the first pass in the checker when declarations are enabled, if possible
        }
        else {
            // Report error
            const errorInfo = getSymbolAccessibilityDiagnostic(symbolAccessibilityResult);
            if (errorInfo) {
                if (errorInfo.typeName) {
                    context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode, errorInfo.diagnosticMessage, getTextOfNode(errorInfo.typeName), symbolAccessibilityResult.errorSymbolName!, symbolAccessibilityResult.errorModuleName!));
                }
                else {
                    context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode, errorInfo.diagnosticMessage, symbolAccessibilityResult.errorSymbolName!, symbolAccessibilityResult.errorModuleName!));
                }
                return true;
            }
        }
        return false;
    }

    function trackExternalModuleSymbolOfImportTypeNode(symbol: Symbol) {
        if (!isBundledEmit) {
            recordExportedModuleFromDeclarationEmit(symbol, /*isPresentInSource*/ false);
        }
    }

    function trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags) {
        if (symbol.flags & SymbolFlags.TypeParameter) return false;
        const issuedDiagnostic = handleSymbolAccessibilityError(resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning, /*shouldComputeAliasToMarkVisible*/ true));
        recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForSymbol(symbol, meaning), /*isPresentInSource*/ false);
        return issuedDiagnostic;
    }

    function reportPrivateInBaseOfClassExpression(propertyName: string) {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(
                createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.Property_0_of_exported_class_expression_may_not_be_private_or_protected, propertyName),
            );
        }
    }

    function errorDeclarationNameWithFallback() {
        return errorNameNode ? declarationNameToString(errorNameNode) :
            errorFallbackNode && getNameOfDeclaration(errorFallbackNode) ? declarationNameToString(getNameOfDeclaration(errorFallbackNode)) :
            errorFallbackNode && isExportAssignment(errorFallbackNode) ? errorFallbackNode.isExportEquals ? "export=" : "default" :
            "(Missing)"; // same fallback declarationNameToString uses when node is zero-width (ie, nameless)
    }

    function reportInaccessibleUniqueSymbolError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, errorDeclarationNameWithFallback(), "unique symbol"));
        }
    }

    function reportCyclicStructureError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary, errorDeclarationNameWithFallback()));
        }
    }

    function reportInaccessibleThisError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary, errorDeclarationNameWithFallback(), "this"));
        }
    }

    function reportLikelyUnsafeImportRequiredError(specifier: string) {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary, errorDeclarationNameWithFallback(), specifier));
        }
    }

    function reportTruncationError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed));
        }
    }

    function reportNonlocalAugmentation(containingFile: SourceFile, parentSymbol: Symbol, symbol: Symbol) {
        const primaryDeclaration = parentSymbol.declarations?.find(d => getSourceFileOfNode(d) === containingFile);
        const augmentingDeclarations = filter(symbol.declarations, d => getSourceFileOfNode(d) !== containingFile);
        if (primaryDeclaration && augmentingDeclarations) {
            for (const augmentations of augmentingDeclarations) {
                context.addDiagnostic(addRelatedInfo(
                    createDiagnosticForNode(augmentations, Diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized),
                    createDiagnosticForNode(primaryDeclaration, Diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file),
                ));
            }
        }
    }

    function reportNonSerializableProperty(propertyName: string) {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized, propertyName));
        }
    }

    function transformDeclarationsForJS(sourceFile: SourceFile, bundled?: boolean) {
        const oldDiag = getSymbolAccessibilityDiagnostic;
        getSymbolAccessibilityDiagnostic = s => (s.errorNode && canProduceDiagnostics(s.errorNode) ? createGetSymbolAccessibilityDiagnosticForNode(s.errorNode)(s) : ({
            diagnosticMessage: s.errorModuleName
                ? Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_from_module_1_An_explicit_type_annotation_may_unblock_declaration_emit
                : Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_An_explicit_type_annotation_may_unblock_declaration_emit,
            errorNode: s.errorNode || sourceFile,
        }));
        const oldReferenceRequestingNode = referenceRequestingNode;
        referenceRequestingNode = sourceFile;
        const result = resolver.getDeclarationStatementsForSourceFile(sourceFile, declarationEmitNodeBuilderFlags, symbolTracker, bundled);
        getSymbolAccessibilityDiagnostic = oldDiag;
        referenceRequestingNode = oldReferenceRequestingNode;
        return result;
    }

    function transformRoot(node: Bundle): Bundle;
    function transformRoot(node: SourceFile): SourceFile;
    function transformRoot(node: SourceFile | Bundle): SourceFile | Bundle;
    function transformRoot(node: SourceFile | Bundle) {
        if (node.kind === SyntaxKind.SourceFile && node.isDeclarationFile) {
            return node;
        }

        if (node.kind === SyntaxKind.Bundle) {
            isBundledEmit = true;
            refs = new Map();
            libs = new Set();
            let hasNoDefaultLib = false;
            const bundle = factory.createBundle(
                map(node.sourceFiles, sourceFile => {
                    if (sourceFile.isDeclarationFile) return undefined!; // Omit declaration files from bundle results, too // TODO: GH#18217
                    hasNoDefaultLib = hasNoDefaultLib || sourceFile.hasNoDefaultLib;
                    currentSourceFile = sourceFile;
                    enclosingDeclaration = sourceFile;
                    lateMarkedStatements = undefined;
                    suppressNewDiagnosticContexts = false;
                    lateStatementReplacementMap = new Map();
                    getSymbolAccessibilityDiagnostic = throwDiagnostic;
                    needsScopeFixMarker = false;
                    resultHasScopeMarker = false;
                    collectReferences(sourceFile, refs);
                    collectLibs(sourceFile, libs);
                    if (isExternalOrCommonJsModule(sourceFile) || isJsonSourceFile(sourceFile)) {
                        resultHasExternalModuleIndicator = false; // unused in external module bundle emit (all external modules are within module blocks, therefore are known to be modules)
                        needsDeclare = false;
                        const statements = isSourceFileJS(sourceFile) ? factory.createNodeArray(transformDeclarationsForJS(sourceFile, /*bundled*/ true)) : visitNodes(sourceFile.statements, visitDeclarationStatements, isStatement);
                        const newFile = factory.updateSourceFile(
                            sourceFile,
                            [factory.createModuleDeclaration(
                                [factory.createModifier(SyntaxKind.DeclareKeyword)],
                                factory.createStringLiteral(getResolvedExternalModuleName(host, sourceFile)),
                                factory.createModuleBlock(setTextRange(factory.createNodeArray(transformAndReplaceLatePaintedStatements(statements)), sourceFile.statements)),
                            )],
                            /*isDeclarationFile*/ true,
                            /*referencedFiles*/ [],
                            /*typeReferences*/ [],
                            /*hasNoDefaultLib*/ false,
                            /*libReferences*/ [],
                        );
                        return newFile;
                    }
                    needsDeclare = true;
                    const updated = isSourceFileJS(sourceFile) ? factory.createNodeArray(transformDeclarationsForJS(sourceFile)) : visitNodes(sourceFile.statements, visitDeclarationStatements, isStatement);
                    return factory.updateSourceFile(sourceFile, transformAndReplaceLatePaintedStatements(updated), /*isDeclarationFile*/ true, /*referencedFiles*/ [], /*typeReferences*/ [], /*hasNoDefaultLib*/ false, /*libReferences*/ []);
                }),
                mapDefined(node.prepends, prepend => {
                    if (prepend.kind === SyntaxKind.InputFiles) {
                        const sourceFile = createUnparsedSourceFile(prepend, "dts", stripInternal);
                        hasNoDefaultLib = hasNoDefaultLib || !!sourceFile.hasNoDefaultLib;
                        collectReferences(sourceFile, refs);
                        recordTypeReferenceDirectivesIfNecessary(map(sourceFile.typeReferenceDirectives, ref => [ref.fileName, ref.resolutionMode]), /*isPresentInSource*/ true);
                        collectLibs(sourceFile, libs);
                        return sourceFile;
                    }
                    return prepend;
                }),
            );
            bundle.syntheticFileReferences = [];
            bundle.syntheticTypeReferences = getFileReferencesForUsedTypeReferences();
            bundle.syntheticLibReferences = getLibReferences();
            bundle.hasNoDefaultLib = hasNoDefaultLib;
            const outputFilePath = getDirectoryPath(normalizeSlashes(getOutputPathsFor(node, host, /*forceDtsPaths*/ true).declarationFilePath!));
            const referenceVisitor = mapReferencesIntoArray(bundle.syntheticFileReferences as FileReference[], outputFilePath);
            refs.forEach(referenceVisitor);
            return bundle;
        }

        // Single source file
        needsDeclare = true;
        needsScopeFixMarker = false;
        resultHasScopeMarker = false;
        enclosingDeclaration = node;
        currentSourceFile = node;
        getSymbolAccessibilityDiagnostic = throwDiagnostic;
        isBundledEmit = false;
        resultHasExternalModuleIndicator = false;
        suppressNewDiagnosticContexts = false;
        lateMarkedStatements = undefined;
        lateStatementReplacementMap = new Map();
        necessaryTypeReferences = undefined;
        recordTypeReferenceDirectivesIfNecessary(
            node.typeReferenceDirectives.map(f => [f.fileName, f.resolutionMode ?? currentSourceFile.impliedNodeFormat]),
            /*isPresentInSource*/ true,
        );
        refs = collectReferences(currentSourceFile, new Map());
        libs = collectLibs(currentSourceFile, new Set());
        const references: FileReference[] = [];
        const outputFilePath = getDirectoryPath(normalizeSlashes(getOutputPathsFor(node, host, /*forceDtsPaths*/ true).declarationFilePath!));
        const referenceVisitor = mapReferencesIntoArray(references, outputFilePath);
        let combinedStatements: NodeArray<Statement>;
        if (isSourceFileJS(currentSourceFile)) {
            combinedStatements = factory.createNodeArray(transformDeclarationsForJS(node));
            refs.forEach(referenceVisitor);
            emittedImports = filter(combinedStatements, isAnyImportSyntax);
        }
        else {
            const statements = visitNodes(node.statements, visitDeclarationStatements, isStatement);
            combinedStatements = setTextRange(factory.createNodeArray(transformAndReplaceLatePaintedStatements(statements)), node.statements);
            refs.forEach(referenceVisitor);
            emittedImports = filter(combinedStatements, isAnyImportSyntax);
            if (isExternalModule(node) && (!resultHasExternalModuleIndicator || (needsScopeFixMarker && !resultHasScopeMarker))) {
                combinedStatements = setTextRange(factory.createNodeArray([...combinedStatements, createEmptyExports(factory)]), combinedStatements);
            }
        }
        const updated = factory.updateSourceFile(node, combinedStatements, /*isDeclarationFile*/ true, references, getFileReferencesForUsedTypeReferences(), node.hasNoDefaultLib, getLibReferences());
        updated.exportedModulesFromDeclarationEmit = exportedModulesFromDeclarationEmit && [...exportedModulesFromDeclarationEmit.keys()];
        return updated;

        function getLibReferences() {
            return arrayFrom(libs.keys(), lib => ({ fileName: lib, pos: -1, end: -1 }));
        }

        function getFileReferencesForUsedTypeReferences() {
            return necessaryTypeReferences ? mapDefined(arrayFrom(necessaryTypeReferences.values()), getFileReferenceForSpecifierModeTuple) : [];
        }

        function getFileReferenceForSpecifierModeTuple({ specifier, mode, requestingNode, isPresentInSource }: TypeReferenceInformation): FileReference | undefined {
            // Elide type references for which we have imports
            if (emittedImports) {
                for (const importStatement of emittedImports) {
                    if (isImportEqualsDeclaration(importStatement) && isExternalModuleReference(importStatement.moduleReference)) {
                        const expr = importStatement.moduleReference.expression;
                        if (isStringLiteralLike(expr) && expr.text === specifier) {
                            return undefined;
                        }
                    }
                    else if (isImportDeclaration(importStatement) && isStringLiteral(importStatement.moduleSpecifier) && importStatement.moduleSpecifier.text === specifier) {
                        return undefined;
                    }
                }
            }
            if (!isPresentInSource && isolatedDeclarations) {
                context.addDiagnostic(createDiagnosticForNode(
                    requestingNode,
                    Diagnostics.Declaration_emit_for_this_expression_requires_adding_a_type_reference_directive_to_0_with_isolatedDeclarations,
                    specifier,
                ));
            }
            return { fileName: specifier, pos: -1, end: -1, ...(mode ? { resolutionMode: mode } : undefined) };
        }

        function mapReferencesIntoArray(references: FileReference[], outputFilePath: string): (moduleReference: ModuleReferenceInformation) => void {
            return ({ sourceFile: file, isPresentInSource, requestingNode }) => {
                if (exportedModulesFromDeclarationEmit) {
                    const importReference = exportedModulesFromDeclarationEmit?.get(file.symbol);
                    // Already have an import declaration resolving to this file
                    if (importReference) {
                        return;
                    }
                }

                let declFileName: string;
                if (file.isDeclarationFile) { // Neither decl files or js should have their refs changed
                    declFileName = file.fileName;
                }
                else {
                    if (isBundledEmit && contains((node as Bundle).sourceFiles, file)) return; // Omit references to files which are being merged
                    const paths = getOutputPathsFor(file, host, /*forceDtsPaths*/ true);
                    declFileName = paths.declarationFilePath || paths.jsFilePath || file.fileName;
                }

                if (declFileName) {
                    const specifier = moduleSpecifiers.getModuleSpecifier(
                        options,
                        currentSourceFile,
                        getNormalizedAbsolutePath(outputFilePath, host.getCurrentDirectory()),
                        getNormalizedAbsolutePath(declFileName, host.getCurrentDirectory()),
                        host,
                    );
                    if (!pathIsRelative(specifier)) {
                        // If some compiler option/symlink/whatever allows access to the file containing the ambient module declaration
                        // via a non-relative name, emit a type reference directive to that non-relative name, rather than
                        // a relative path to the declaration file
                        recordTypeReferenceDirectivesIfNecessary([[specifier, /*mode*/ undefined]], isPresentInSource, requestingNode);
                        return;
                    }

                    let fileName = getRelativePathToDirectoryOrUrl(
                        outputFilePath,
                        declFileName,
                        host.getCurrentDirectory(),
                        host.getCanonicalFileName,
                        /*isAbsolutePathAnUrl*/ false,
                    );
                    if (startsWith(fileName, "./") && hasExtension(fileName)) {
                        fileName = fileName.substring(2);
                    }

                    // omit references to files from node_modules (npm may disambiguate module
                    // references when installing this package, making the path is unreliable).
                    if (startsWith(fileName, "node_modules/") || pathContainsNodeModules(fileName)) {
                        return;
                    }

                    if (!isPresentInSource && isolatedDeclarations) {
                        context.addDiagnostic(createDiagnosticForNode(
                            requestingNode,
                            Diagnostics.Declaration_emit_for_this_expression_requires_adding_a_path_reference_directive_to_0_with_isolatedDeclarations,
                            fileName,
                        ));
                    }
                    references.push({ pos: -1, end: -1, fileName });
                }
            };
        }
    }

    function collectReferences(sourceFile: SourceFile | UnparsedSource, ret: Map<NodeId, ModuleReferenceInformation>) {
        if (noResolve || (!isUnparsedSource(sourceFile) && isSourceFileJS(sourceFile))) return ret;
        forEach(sourceFile.referencedFiles, f => {
            const elem = host.getSourceFileFromReference(sourceFile, f);
            if (elem) {
                ret.set(getOriginalNodeId(elem), { sourceFile: elem, isPresentInSource: true, requestingNode: undefined });
            }
        });
        return ret;
    }

    function collectLibs(sourceFile: SourceFile | UnparsedSource, ret: Set<string>) {
        forEach(sourceFile.libReferenceDirectives, ref => {
            ret.add(toFileNameLowerCase(ref.fileName));
        });
        return ret;
    }

    function filterBindingPatternInitializers(name: BindingName) {
        if (name.kind === SyntaxKind.Identifier) {
            return name;
        }
        else {
            if (name.kind === SyntaxKind.ArrayBindingPattern) {
                return factory.updateArrayBindingPattern(name, visitNodes(name.elements, visitBindingElement, isArrayBindingElement));
            }
            else {
                return factory.updateObjectBindingPattern(name, visitNodes(name.elements, visitBindingElement, isBindingElement));
            }
        }

        function visitBindingElement<T extends Node>(elem: T): T;
        function visitBindingElement(elem: ArrayBindingElement): ArrayBindingElement {
            if (elem.kind === SyntaxKind.OmittedExpression) {
                return elem;
            }
            if (elem.propertyName && isComputedPropertyName(elem.propertyName) && isEntityNameExpression(elem.propertyName.expression)) {
                checkEntityNameVisibility(elem.propertyName.expression, enclosingDeclaration);
            }

            return factory.updateBindingElement(
                elem,
                elem.dotDotDotToken,
                elem.propertyName,
                filterBindingPatternInitializers(elem.name),
                shouldPrintWithInitializer(elem) ? elem.initializer : undefined,
            );
        }
    }

    function ensureParameter(p: ParameterDeclaration, modifierMask?: ModifierFlags, type?: TypeNode): ParameterDeclaration {
        let oldDiag: typeof getSymbolAccessibilityDiagnostic | undefined;
        if (!suppressNewDiagnosticContexts) {
            oldDiag = getSymbolAccessibilityDiagnostic;
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(p);
        }
        const newParam = factory.updateParameterDeclaration(
            p,
            maskModifiers(factory, p, modifierMask),
            p.dotDotDotToken,
            filterBindingPatternInitializers(p.name),
            resolver.isOptionalParameter(p) ? (p.questionToken || factory.createToken(SyntaxKind.QuestionToken)) : undefined,
            ensureType(p, type || p.type, /*ignorePrivate*/ true), // Ignore private param props, since this type is going straight back into a param
            ensureNoInitializer(p),
        );
        if (!suppressNewDiagnosticContexts) {
            getSymbolAccessibilityDiagnostic = oldDiag!;
        }
        return newParam;
    }

    function shouldPrintWithInitializer(node: Node) {
        return canHaveLiteralInitializer(node) && !node.type && resolver.isLiteralConstDeclaration(getParseTreeNode(node) as CanHaveLiteralInitializer); // TODO: Make safe
    }

    function ensureNoInitializer(node: CanHaveLiteralInitializer) {
        if (shouldPrintWithInitializer(node)) {
            return resolver.createLiteralConstValue(getParseTreeNode(node) as CanHaveLiteralInitializer, symbolTracker); // TODO: Make safe
        }
        return undefined;
    }

    function makeInvalidType() {
        return factory.createTypeReferenceNode("invalid");
    }

    type HasInferredType =
        | FunctionDeclaration
        | MethodDeclaration
        | GetAccessorDeclaration
        | BindingElement
        | ConstructSignatureDeclaration
        | VariableDeclaration
        | MethodSignature
        | CallSignatureDeclaration
        | ParameterDeclaration
        | PropertyDeclaration
        | PropertySignature
        | ExportAssignment;

    function ensureType(node: HasInferredType, type: TypeNode | undefined, ignorePrivate?: boolean): TypeNode | undefined {
        if (!ignorePrivate && hasEffectiveModifier(node, ModifierFlags.Private)) {
            // Private nodes emit no types (except private parameter properties, whose parameter types are actually visible)
            return;
        }
        if (shouldPrintWithInitializer(node)) {
            // Literal const declarations will have an initializer ensured rather than a type
            return;
        }
        return typeFromDeclaration(node, type);

        function reportIsolatedDeclarationError(node: Node, message: DiagnosticWithLocation) {
            // Do not report errors on nodes with other errors.
            if (node.flags & NodeFlags.ThisNodeHasError) return;
            if (isolatedDeclarations) {
                context.addDiagnostic(message);
            }
        }

        function findNearestDeclaration(node: Node) {
            const result = findAncestor(node, n => isExportAssignment(n) || (isStatement(n) ? "quit" : isVariableDeclaration(n) || isPropertyDeclaration(n) || isParameter(n)));
            return result as VariableDeclaration | PropertyDeclaration | ParameterDeclaration | ExportAssignment | undefined;
        }

        function createAccessorTypeError(node: GetAccessorDeclaration | SetAccessorDeclaration) {
            const { getAccessor, setAccessor } = resolver.getAllAccessorDeclarations(node);

            const targetNode = (isSetAccessor(node) ? node.parameters[0] : node) ?? node;
            const diag = createDiagnosticForNode(targetNode, errorByDeclarationKind[node.kind]);

            if (setAccessor) {
                addRelatedInfo(diag, createDiagnosticForNode(setAccessor, relatedSuggestionByDeclarationKind[setAccessor.kind]));
            }
            if (getAccessor) {
                addRelatedInfo(diag, createDiagnosticForNode(getAccessor, relatedSuggestionByDeclarationKind[getAccessor.kind]));
            }
            return diag;
        }
        function createObjectLiteralError(node: ShorthandPropertyAssignment | SpreadAssignment | ComputedPropertyName) {
            const diag = createDiagnosticForNode(node, errorByDeclarationKind[node.kind]);
            const parentDeclaration = findNearestDeclaration(node);
            if (parentDeclaration) {
                const targetStr = isExportAssignment(parentDeclaration) ? "" : getTextOfNode(parentDeclaration.name, /*includeTrivia*/ false);
                addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
            }
            return diag;
        }
        function createArrayLiteralError(node: ArrayLiteralExpression | SpreadElement) {
            const diag = createDiagnosticForNode(node, errorByDeclarationKind[node.kind]);
            const parentDeclaration = findNearestDeclaration(node);
            if (parentDeclaration) {
                const targetStr = isExportAssignment(parentDeclaration) ? "" : getTextOfNode(parentDeclaration.name, /*includeTrivia*/ false);
                addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
            }
            return diag;
        }
        function createReturnTypeError(node: FunctionDeclaration | FunctionExpression | ArrowFunction | MethodDeclaration | ConstructSignatureDeclaration) {
            const diag = createDiagnosticForNode(node, errorByDeclarationKind[node.kind]);
            const parentDeclaration = findNearestDeclaration(node);
            if (parentDeclaration) {
                const targetStr = isExportAssignment(parentDeclaration) ? "" : getTextOfNode(parentDeclaration.name, /*includeTrivia*/ false);
                addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
            }
            addRelatedInfo(diag, createDiagnosticForNode(node, relatedSuggestionByDeclarationKind[node.kind]));
            return diag;
        }
        function createBindingElementError(node: BindingElement) {
            return createDiagnosticForNode(node, Diagnostics.Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations);
        }
        function createVariableOrPropertyError(node: VariableDeclaration | PropertyDeclaration | PropertySignature) {
            const diag = createDiagnosticForNode(node, errorByDeclarationKind[node.kind]);
            const targetStr = getTextOfNode(node.name, /*includeTrivia*/ false);
            addRelatedInfo(diag, createDiagnosticForNode(node, relatedSuggestionByDeclarationKind[node.kind], targetStr));
            return diag;
        }
        function createParameterError(node: ParameterDeclaration) {
            if (isSetAccessor(node.parent)) {
                return createAccessorTypeError(node.parent);
            }
            const message = resolver.requiresAddingImplicitUndefined(node) ?
                Diagnostics.Declaration_emit_for_this_parameter_requires_implicitly_adding_undefined_to_it_s_type_This_is_not_supported_with_isolatedDeclarations :
                errorByDeclarationKind[node.kind];
            const diag = createDiagnosticForNode(node, message);
            const targetStr = getTextOfNode(node.name, /*includeTrivia*/ false);
            addRelatedInfo(diag, createDiagnosticForNode(node, relatedSuggestionByDeclarationKind[node.kind], targetStr));
            return diag;
        }
        function createExpressionError(node: Expression) {
            const parentDeclaration = findNearestDeclaration(node);
            let diag: DiagnosticWithLocation;
            if (parentDeclaration) {
                const targetStr = isExportAssignment(parentDeclaration) ? "" : getTextOfNode(parentDeclaration.name, /*includeTrivia*/ false);
                const parent = findAncestor(node.parent, n => isExportAssignment(n) || (isStatement(n) ? "quit" : !isParenthesizedExpression(n) && !isTypeAssertionExpression(n) && !isAsExpression(n)));
                if (parentDeclaration === parent) {
                    diag = createDiagnosticForNode(node, errorByDeclarationKind[parentDeclaration.kind]);
                    addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
                }
                else {
                    diag = createDiagnosticForNode(node, Diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations);
                    addRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, relatedSuggestionByDeclarationKind[parentDeclaration.kind], targetStr));
                    addRelatedInfo(diag, createDiagnosticForNode(node, Diagnostics.Add_a_type_assertion_to_this_expression_to_make_type_type_explicit));
                }
            }
            else {
                diag = createDiagnosticForNode(node, Diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations);
            }
            return diag;
        }
        function typeFromExpression(node: Expression, inferenceFlags: InitializeTransformNarrowBehavior = InitializeTransformNarrowBehavior.None): TypeNode | undefined {
            switch (node.kind) {
                case SyntaxKind.ParenthesizedExpression:
                    return typeFromExpression((node as ParenthesizedExpression).expression, inferenceFlags & InitializeTransformNarrowBehavior.NotKeepLiterals);
                case SyntaxKind.Identifier:
                    if (resolver.isUndefinedIdentifier(node as Identifier)) {
                        return createUndefinedTypeNode();
                    }
                    break;
                case SyntaxKind.NullKeyword:
                    if (strictNullChecks) {
                        return factory.createLiteralTypeNode(factory.createNull());
                    }
                    else {
                        return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                    }
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionExpression:
                    return typeFromFunctionExpressionLike(node as ArrowFunction | FunctionExpression);
                case SyntaxKind.TypeAssertionExpression:
                case SyntaxKind.AsExpression:
                    const asExpression = node as AsExpression | TypeAssertion;
                    if (isTypeReferenceNode(asExpression.type) && isConstTypeReference(asExpression.type)) {
                        return typeFromExpression(asExpression.expression, InitializeTransformNarrowBehavior.AsConst);
                    }
                    else {
                        const type = asExpression.type;
                        if (type.kind === SyntaxKind.TypeReference && inferenceFlags & InitializeTransformNarrowBehavior.NoTypeReferences) {
                            return typeInferenceForExpression(node, createExpressionError);
                        }
                        return visitTypeNode(type);
                    }
                case SyntaxKind.PrefixUnaryExpression:
                    const unaryExpression = node as PrefixUnaryExpression;
                    if (isPrimitiveLiteralValue(unaryExpression)) {
                        if (unaryExpression.operand.kind === SyntaxKind.BigIntLiteral) {
                            return typeFromPrimitiveLiteral(unaryExpression, SyntaxKind.BigIntKeyword, inferenceFlags);
                        }
                        if (unaryExpression.operand.kind === SyntaxKind.NumericLiteral) {
                            return typeFromPrimitiveLiteral(unaryExpression, SyntaxKind.NumberKeyword, inferenceFlags);
                        }
                    }
                    break;
                case SyntaxKind.NumericLiteral:
                    return typeFromPrimitiveLiteral(node as NumericLiteral, SyntaxKind.NumberKeyword, inferenceFlags);
                case SyntaxKind.TemplateExpression:
                    if (!(inferenceFlags & InitializeTransformNarrowBehavior.AsConstOrKeepLiterals)) {
                        return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
                    }
                    break;
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.StringLiteral:
                    return typeFromPrimitiveLiteral(node as StringLiteral | NoSubstitutionTemplateLiteral, SyntaxKind.StringKeyword, inferenceFlags);
                case SyntaxKind.BigIntLiteral:
                    return typeFromPrimitiveLiteral(node as BigIntLiteral, SyntaxKind.BigIntKeyword, inferenceFlags);
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                    return typeFromPrimitiveLiteral(node as TrueLiteral | FalseLiteral, SyntaxKind.BooleanKeyword, inferenceFlags);
                case SyntaxKind.ArrayLiteralExpression:
                    return typeFromArrayLiteral(node as ArrayLiteralExpression, inferenceFlags);
                case SyntaxKind.ObjectLiteralExpression:
                    return typeFromObjectLiteral(node as ObjectLiteralExpression, inferenceFlags);
            }
            return undefined;
        }
        function reportErrorAndFallback<T extends SignatureDeclaration | Expression | VariableLikeDeclaration>(node: T, diagMessage?: (node: T) => DiagnosticWithLocation): TypeNode | undefined {
            if (isolatedDeclarations && diagMessage) {
                reportIsolatedDeclarationError(node, diagMessage(node));
            }
            if (isolatedDeclarationsNoFallback) {
                return makeInvalidType();
            }
            return undefined;
        }
        function typeInferenceForVariableLike<T extends VariableLikeDeclaration>(node: T, diagMessage: undefined | ((node: T) => DiagnosticWithLocation), addUndefined?: boolean) {
            const flags = node.kind === SyntaxKind.PropertyAssignment ? NodeBuilderFlags.InObjectTypeLiteral : NodeBuilderFlags.None;
            return reportErrorAndFallback(node, diagMessage) ?? resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags | flags, symbolTracker, addUndefined) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }

        function typeInferenceForExpression<T extends Expression>(node: T, diagMessage: undefined | ((node: T) => DiagnosticWithLocation)) {
            return reportErrorAndFallback(node, diagMessage) ?? resolver.createTypeOfExpression(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }

        function returnTypeInferenceForSignature<T extends SignatureDeclaration>(node: T, diagMessage: (node: T) => DiagnosticWithLocation) {
            return reportErrorAndFallback(node, diagMessage) ?? resolver.createReturnTypeOfSignatureDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
        function accessorTypeInference(node: GetAccessorDeclaration | SetAccessorDeclaration, diagMessage: (node: GetAccessorDeclaration | SetAccessorDeclaration) => DiagnosticWithLocation) {
            if (node.kind === SyntaxKind.GetAccessor) {
                return returnTypeInferenceForSignature(node, diagMessage);
            }
            else {
                return reportErrorAndFallback(node, diagMessage) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }
        }
        function typeFromDeclaration(node: HasInferredType | ExportAssignment, type: TypeNode | undefined, addUndefined?: boolean) {
            const savedErrorNameNode = errorNameNode;
            const savedErrorFallbackNode = errorFallbackNode;
            const savedReferenceRequestingNode = referenceRequestingNode;
            let typeNode: TypeNode | undefined;
            errorNameNode = isNamedDeclaration(node) ? node.name : undefined;
            errorFallbackNode = node;
            referenceRequestingNode = node;
            let oldDiag: typeof getSymbolAccessibilityDiagnostic | undefined;
            if (!suppressNewDiagnosticContexts) {
                oldDiag = getSymbolAccessibilityDiagnostic;
                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(node);
            }
            switch (node.kind) {
                case SyntaxKind.Parameter:
                    typeNode = typeFromParameter(node, type);
                    break;
                case SyntaxKind.VariableDeclaration:
                    typeNode = typeFromVariable(node, type);
                    break;
                case SyntaxKind.PropertyDeclaration:
                    typeNode = typeFromProperty(node, type);
                    break;
                case SyntaxKind.GetAccessor:
                    const allAccessors = resolver.getAllAccessorDeclarations(node);
                    const accessorType = getTypeAnnotationFromAllAccessorDeclarations(node, allAccessors);
                    typeNode = accessorType ?? accessorTypeInference(node, createAccessorTypeError);
                    break;
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.CallSignature:
                    typeNode = type ? visitTypeNode(type) : factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                    break;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.FunctionDeclaration:
                    if (type) {
                        typeNode = visitTypeNode(type);
                    }
                    else {
                        typeNode = returnTypeInferenceForSignature(node, createReturnTypeError);
                    }
                    break;
                case SyntaxKind.BindingElement:
                    if (type) {
                        typeNode = visitTypeNode(type);
                        break;
                    }
                    const parentDeclaration = findNearestDeclaration(node);
                    if (parentDeclaration && (isVariableDeclaration(parentDeclaration) || isParameter(parentDeclaration))) {
                        typeNode = typeInferenceForVariableLike(node, createBindingElementError, addUndefined);
                    }
                    else {
                        typeNode = makeInvalidType();
                    }
                    break;
                case SyntaxKind.ExportAssignment:
                    typeNode = typeFromExpression(node.expression, InitializeTransformNarrowBehavior.KeepLiterals) ?? typeInferenceForExpression(node.expression, createExpressionError);
                    break;
                default:
                    Debug.assertNever(node, `Node needs to be an inferrable type found ${Debug.formatSyntaxKind((node as Node).kind)}`);
            }
            errorNameNode = savedErrorNameNode;
            errorFallbackNode = savedErrorFallbackNode;
            referenceRequestingNode = savedReferenceRequestingNode;
            if (oldDiag) {
                getSymbolAccessibilityDiagnostic = oldDiag;
            }
            return typeNode;
        }
        function typeFromFunctionExpressionLike(fnNode: FunctionExpression | ArrowFunction) {
            const oldEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = fnNode;

            const returnType = fnNode.type ? visitTypeNode(fnNode.type) : returnTypeInferenceForSignature(fnNode, createReturnTypeError);
            const fnTypeNode = factory.createFunctionTypeNode(
                visitNodes(fnNode.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration),
                fnNode.parameters.map(p => ensureParameter(p)),
                returnType,
            );
            enclosingDeclaration = oldEnclosingDeclaration;
            return fnTypeNode;
        }
        function canGetTypeFromArrayLiteral(arrayLiteral: ArrayLiteralExpression) {
            for (const element of arrayLiteral.elements) {
                if (element.kind === SyntaxKind.SpreadElement) {
                    reportIsolatedDeclarationError(element, createArrayLiteralError(element as SpreadElement));
                    return false;
                }
            }
            return true;
        }
        function typeFromArrayLiteral(arrayLiteral: ArrayLiteralExpression, inferenceFlags: InitializeTransformNarrowBehavior) {
            if (!(inferenceFlags & InitializeTransformNarrowBehavior.AsConst)) {
                return typeInferenceForExpression(arrayLiteral, createArrayLiteralError);
            }
            if (!canGetTypeFromArrayLiteral(arrayLiteral)) {
                return typeInferenceForExpression(arrayLiteral, /*diagMessage*/ undefined);
            }
            const elementTypesInfo: TypeNode[] = [];
            for (const element of arrayLiteral.elements) {
                Debug.assert(element.kind !== SyntaxKind.SpreadElement);
                if (element.kind === SyntaxKind.OmittedExpression) {
                    elementTypesInfo.push(
                        createUndefinedTypeNode(),
                    );
                }
                else {
                    const elementType = typeFromExpression(element, inferenceFlags & InitializeTransformNarrowBehavior.NotKeepLiterals) ?? typeInferenceForExpression(element, createExpressionError);
                    elementTypesInfo.push(elementType);
                }
            }
            const tupleType = factory.createTupleTypeNode(elementTypesInfo);
            tupleType.emitNode = { flags: 1, autoGenerate: undefined, internalFlags: 0 };
            return factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleType);
        }
        function canGetTypeFromObjectLiteral(objectLiteral: ObjectLiteralExpression) {
            let result = true;
            for (const prop of objectLiteral.properties) {
                if (prop.flags & NodeFlags.ThisNodeHasError) {
                    result = false;
                    break; // Bail if parse errors
                }
                if (prop.kind === SyntaxKind.ShorthandPropertyAssignment || prop.kind === SyntaxKind.SpreadAssignment) {
                    reportIsolatedDeclarationError(prop, createObjectLiteralError(prop));
                    result = false;
                }
                else if (prop.name.flags & NodeFlags.ThisNodeHasError) {
                    result = false;
                    break; // Bail if parse errors
                }
                else if (prop.name.kind === SyntaxKind.PrivateIdentifier) {
                    // Not valid in object literals but the compiler will complain about this, we just ignore it here.
                    result = false;
                }
                else if (prop.name.kind === SyntaxKind.ComputedPropertyName) {
                    const expression = prop.name.expression;
                    if (!isPrimitiveLiteralValue(expression, /*includeBigInt*/ false) && !isEntityNameExpression(expression)) {
                        reportIsolatedDeclarationError(prop, createObjectLiteralError(prop.name));
                        result = false;
                    }
                }
            }
            return result;
        }
        function typeFromObjectLiteral(objectLiteral: ObjectLiteralExpression, inferenceFlags: InitializeTransformNarrowBehavior) {
            if (!canGetTypeFromObjectLiteral(objectLiteral)) return typeInferenceForExpression(objectLiteral, /*diagMessage*/ undefined);

            const properties: TypeElement[] = [];
            for (const prop of objectLiteral.properties) {
                Debug.assert(!isShorthandPropertyAssignment(prop) && !isSpreadAssignment(prop));

                let name = prop.name;
                if (prop.name.kind === SyntaxKind.ComputedPropertyName) {
                    let computedNameExpressionType;
                    if (isEntityNameExpression(prop.name.expression)) {
                        // Check if the symbol is accessible. If not, don't report any errors on it, we'll fall back to the inferred type
                        // If the symbol is accessible checkEntityNameVisibility will add the appropriate aliases to make visible
                        const oldDiag = getSymbolAccessibilityDiagnostic;
                        getSymbolAccessibilityDiagnostic = () => undefined;
                        const isEntityNameAccessible = checkEntityNameVisibility(prop.name.expression, prop);
                        getSymbolAccessibilityDiagnostic = oldDiag;

                        if (!resolver.isLiteralComputedName(prop.name)) {
                            reportIsolatedDeclarationError(prop.name, createObjectLiteralError(prop.name));
                        }
                        if (!isEntityNameAccessible) {
                            computedNameExpressionType = typeInferenceForExpression(prop.name.expression, n => createObjectLiteralError(n.parent as ComputedPropertyName));
                            if (computedNameExpressionType) {
                                if (
                                    isTypeQueryNode(computedNameExpressionType) &&
                                    (isIdentifier(computedNameExpressionType.exprName) || isEntityNameExpression(computedNameExpressionType.exprName))
                                ) {
                                    name = factory.createComputedPropertyName(computedNameExpressionType.exprName);
                                }
                                else if (isLiteralTypeNode(computedNameExpressionType)) {
                                    name = factory.createComputedPropertyName(computedNameExpressionType.literal);
                                }
                            }
                        }
                    }
                }
                let newProp;
                switch (prop.kind) {
                    case SyntaxKind.MethodDeclaration:
                        newProp = typeFromMethodDeclaration(prop, name, inferenceFlags);
                        break;
                    case SyntaxKind.PropertyAssignment:
                        newProp = typeFromPropertyAssignment(prop, name, inferenceFlags);
                        break;
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.GetAccessor:
                        newProp = typeFromAccessor(prop, name);
                        break;
                }
                if (newProp) {
                    setCommentRange(newProp, prop);
                    properties.push(newProp);
                }
            }

            return factory.createTypeLiteralNode(properties);
        }

        function typeFromPropertyAssignment(prop: PropertyAssignment, name: PropertyName, inferenceFlags: InitializeTransformNarrowBehavior) {
            const modifiers = inferenceFlags & InitializeTransformNarrowBehavior.AsConst ?
                [factory.createModifier(SyntaxKind.ReadonlyKeyword)] :
                [];
            const typeNode = typeFromExpression(prop.initializer, inferenceFlags & InitializeTransformNarrowBehavior.NotKeepLiterals) ?? typeInferenceForVariableLike(prop, p => createExpressionError(p.initializer));
            return factory.createPropertySignature(
                modifiers,
                name,
                /*questionToken*/ undefined,
                typeNode,
            );
        }
        function typeFromMethodDeclaration(method: MethodDeclaration, name: PropertyName, inferenceFlags: InitializeTransformNarrowBehavior) {
            const oldEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = method;
            try {
                const returnType = method.type !== undefined ? visitTypeNode(method.type) : returnTypeInferenceForSignature(method, createReturnTypeError);
                const typeParameters = visitNodes(method.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration);
                const parameters = method.parameters.map(p => ensureParameter(p));
                if (inferenceFlags & InitializeTransformNarrowBehavior.AsConst) {
                    return factory.createPropertySignature(
                        [factory.createModifier(SyntaxKind.ReadonlyKeyword)],
                        name,
                        method.questionToken,
                        factory.createFunctionTypeNode(
                            typeParameters,
                            parameters,
                            returnType,
                        ),
                    );
                }
                else {
                    if (isIdentifier(name) && name.escapedText === "new") {
                        name = factory.createStringLiteral("new");
                    }
                    return factory.createMethodSignature(
                        [],
                        name,
                        method.questionToken,
                        typeParameters,
                        parameters,
                        returnType,
                    );
                }
            }
            finally {
                enclosingDeclaration = oldEnclosingDeclaration;
            }
        }

        function typeFromAccessor(accessor: GetAccessorDeclaration | SetAccessorDeclaration, name: PropertyName) {
            const allAccessors = resolver.getAllAccessorDeclarations(accessor);
            const getAccessorType = allAccessors.getAccessor && getTypeAnnotationFromAccessor(allAccessors.getAccessor);
            const setAccessorType = allAccessors.setAccessor && getTypeAnnotationFromAccessor(allAccessors.setAccessor);
            // We have types for both accessors, we can't know if they are the same type so we keep both accessors
            if (getAccessorType !== undefined && setAccessorType !== undefined) {
                const parameters = accessor.parameters.map(p => ensureParameter(p));

                if (isGetAccessor(accessor)) {
                    return factory.updateGetAccessorDeclaration(
                        accessor,
                        [],
                        name,
                        parameters,
                        visitTypeNode(getAccessorType),
                        /*body*/ undefined,
                    );
                }
                else {
                    return factory.updateSetAccessorDeclaration(
                        accessor,
                        [],
                        name,
                        parameters,
                        /*body*/ undefined,
                    );
                }
            }
            else if (allAccessors.firstAccessor === accessor) {
                const foundType = getAccessorType ?? setAccessorType;
                const propertyType = foundType ? visitTypeNode(foundType) : accessorTypeInference(allAccessors.getAccessor ?? allAccessors.setAccessor!, createAccessorTypeError);

                const propertySignature = factory.createPropertySignature(
                    allAccessors.setAccessor === undefined ? [factory.createModifier(SyntaxKind.ReadonlyKeyword)] : [],
                    name,
                    /*questionToken*/ undefined,
                    propertyType,
                );
                return propertySignature;
            }
        }
        function createUndefinedTypeNode() {
            if (strictNullChecks) {
                return factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
            }
            else {
                return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }
        }
        function typeFromPrimitiveLiteral(node: PrimitiveLiteral, baseType: string | KeywordTypeSyntaxKind, narrowBehavior: InitializeTransformNarrowBehavior) {
            if (narrowBehavior & InitializeTransformNarrowBehavior.AsConstOrKeepLiterals) {
                return factory.createLiteralTypeNode(clonePrimitiveLiteralValue(node));
            }
            else {
                return typeof baseType === "number" ? factory.createKeywordTypeNode(baseType) : factory.createTypeReferenceNode(baseType);
            }
        }

        function visitTypeNode(type: TypeNode) {
            return visitNode(type, visitDeclarationSubtree, isTypeNode)!;
        }

        function addUndefinedInUnion(type: TypeNode) {
            if (isUnionTypeNode(type)) {
                const hasUndefined = type.types.some(p => p.kind === SyntaxKind.UndefinedKeyword);
                if (hasUndefined) return type;

                return factory.createUnionTypeNode([
                    ...type.types,
                    factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
                ]);
            }
            return factory.createUnionTypeNode([
                type,
                factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
            ]);
        }
        function typeFromVariable(node: VariableDeclaration, type: TypeNode | undefined) {
            const firstDeclaration = node.symbol.valueDeclaration;
            // Use first declaration of variable for the type
            if (node !== firstDeclaration && firstDeclaration && isVariableDeclaration(firstDeclaration)) {
                node = firstDeclaration;
                type = type ?? firstDeclaration.type;
            }

            if (type) {
                return visitNode(type, visitDeclarationSubtree, isTypeNode)!;
            }

            if (node.initializer) {
                if (isClassExpression(node.initializer)) {
                    return typeInferenceForVariableLike(node, node => createDiagnosticForNode(node.initializer!, Diagnostics.Inference_from_class_expressions_is_not_supported_with_isolatedDeclarations));
                }
                else if (resolver.isExpandoFunction(node)) {
                    if (isolatedDeclarations) {
                        resolver.getPropertiesOfContainerFunction(node)
                            .forEach(p => {
                                if (isExpandoPropertyDeclaration(p.valueDeclaration)) {
                                    const errorTarget = isBinaryExpression(p.valueDeclaration) ?
                                        p.valueDeclaration.left :
                                        p.valueDeclaration;

                                    reportIsolatedDeclarationError(
                                        errorTarget,
                                        createDiagnosticForNode(
                                            errorTarget,
                                            Diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function,
                                        ),
                                    );
                                }
                            });
                    }
                    return typeInferenceForVariableLike(node, /*diagMessage*/ undefined);
                }
                else {
                    return typeFromExpression(node.initializer, node.parent.flags & NodeFlags.Const ? InitializeTransformNarrowBehavior.KeepLiterals : InitializeTransformNarrowBehavior.None)
                        ?? typeInferenceForVariableLike(node, createVariableOrPropertyError);
                }
            }
            return typeInferenceForVariableLike(node, createVariableOrPropertyError);
        }
        function typeFromParameter(node: ParameterDeclaration, type: TypeNode | undefined) {
            const addUndefined = resolver.requiresAddingImplicitUndefined(node);
            if (addUndefined || (!type && !(node.initializer && isIdentifier(node.name)))) {
                if (isolatedDeclarations) {
                    return typeInferenceForVariableLike(node, createParameterError, addUndefined);
                }
            }
            else if (type) {
                return visitTypeNode(type);
            }
            else if (node.initializer) {
                return typeFromExpression(node.initializer) ?? typeInferenceForVariableLike(node, n => createExpressionError(n.initializer!));
            }
            return typeInferenceForVariableLike(node, createParameterError, addUndefined);
        }
        function typeFromProperty(node: PropertyDeclaration, type: TypeNode | undefined) {
            if (type) {
                return visitTypeNode(type);
            }
            else if (node.initializer) {
                let resultNode;
                const optionalFlags = isOptionalDeclaration(node) ? InitializeTransformNarrowBehavior.NoTypeReferences : InitializeTransformNarrowBehavior.None;
                const readonlyFlags = hasEffectiveReadonlyModifier(node) ? InitializeTransformNarrowBehavior.KeepLiterals : InitializeTransformNarrowBehavior.None;
                resultNode = typeFromExpression(node.initializer, optionalFlags | readonlyFlags) ?? typeInferenceForVariableLike(node, createVariableOrPropertyError);
                if (optionalFlags && resultNode) {
                    resultNode = addUndefinedInUnion(resultNode);
                }
                return resultNode;
            }
            else if (isInterfaceDeclaration(node.parent) || isTypeLiteralNode(node.parent)) {
                return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }
            return typeInferenceForVariableLike(node, createVariableOrPropertyError);
        }
    }

    function isDeclarationAndNotVisible(node: NamedDeclaration) {
        node = getParseTreeNode(node) as NamedDeclaration;
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.EnumDeclaration:
                return !resolver.isDeclarationVisible(node);
            // The following should be doing their own visibility checks based on filtering their members
            case SyntaxKind.VariableDeclaration:
                return !getBindingNameVisible(node as VariableDeclaration);
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.ExportAssignment:
                return false;
            case SyntaxKind.ClassStaticBlockDeclaration:
                return true;
        }
        return false;
    }

    // If the ExpandoFunctionDeclaration have multiple overloads, then we only need to emit properties for the last one.
    function shouldEmitFunctionProperties(input: FunctionDeclaration) {
        if (input.body) {
            return true;
        }

        const overloadSignatures = input.symbol.declarations?.filter(decl => isFunctionDeclaration(decl) && !decl.body);
        return !overloadSignatures || overloadSignatures.indexOf(input) === overloadSignatures.length - 1;
    }

    function getBindingNameVisible(elem: BindingElement | VariableDeclaration | OmittedExpression): boolean {
        if (isOmittedExpression(elem)) {
            return false;
        }
        if (isBindingPattern(elem.name)) {
            // If any child binding pattern element has been marked visible (usually by collect linked aliases), then this is visible
            return some(elem.name.elements, getBindingNameVisible);
        }
        else {
            return resolver.isDeclarationVisible(elem);
        }
    }

    function updateParamsList(node: Node, params: NodeArray<ParameterDeclaration>, modifierMask?: ModifierFlags): NodeArray<ParameterDeclaration> {
        if (hasEffectiveModifier(node, ModifierFlags.Private)) {
            return factory.createNodeArray();
        }
        const newParams = map(params, p => ensureParameter(p, modifierMask));
        if (!newParams) {
            return factory.createNodeArray();
        }
        return factory.createNodeArray(newParams, params.hasTrailingComma);
    }

    function updateAccessorParamsList(input: AccessorDeclaration, isPrivate: boolean) {
        let newParams: ParameterDeclaration[] | undefined;
        if (!isPrivate) {
            const thisParameter = getThisParameter(input);
            if (thisParameter) {
                newParams = [ensureParameter(thisParameter)];
            }
        }
        if (isSetAccessorDeclaration(input)) {
            let newValueParameter: ParameterDeclaration | undefined;
            if (!isPrivate) {
                const valueParameter = getSetAccessorValueParameter(input);
                if (valueParameter) {
                    const accessorType = getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
                    newValueParameter = ensureParameter(valueParameter, /*modifierMask*/ undefined, accessorType);
                }
            }
            if (!newValueParameter) {
                newValueParameter = factory.createParameterDeclaration(
                    /*modifiers*/ undefined,
                    /*dotDotDotToken*/ undefined,
                    "value",
                );
            }
            newParams = append(newParams, newValueParameter);
        }
        return factory.createNodeArray(newParams || emptyArray);
    }

    function ensureTypeParams(node: Node, params: NodeArray<TypeParameterDeclaration> | undefined) {
        return hasEffectiveModifier(node, ModifierFlags.Private) ? undefined : visitNodes(params, visitDeclarationSubtree, isTypeParameterDeclaration);
    }

    function isEnclosingDeclaration(node: Node) {
        return isSourceFile(node)
            || isTypeAliasDeclaration(node)
            || isModuleDeclaration(node)
            || isClassDeclaration(node)
            || isInterfaceDeclaration(node)
            || isFunctionLike(node)
            || isIndexSignatureDeclaration(node)
            || isMappedTypeNode(node);
    }

    function checkEntityNameVisibility(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node) {
        const visibilityResult = resolver.isEntityNameVisible(entityName, enclosingDeclaration);
        handleSymbolAccessibilityError(visibilityResult);
        recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForEntityName(entityName), /*isPresentInSource*/ false, entityName);
        return visibilityResult.accessibility === SymbolAccessibility.Accessible;
    }

    function preserveJsDoc<T extends Node>(updated: T, original: Node): T {
        if (hasJSDocNodes(updated) && hasJSDocNodes(original)) {
            updated.jsDoc = original.jsDoc;
        }
        return setCommentRange(updated, getCommentRange(original));
    }

    function rewriteModuleSpecifier<T extends Node>(parent: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode, input: T | undefined): T | StringLiteral {
        if (!input) return undefined!; // TODO: GH#18217
        resultHasExternalModuleIndicator = resultHasExternalModuleIndicator || (parent.kind !== SyntaxKind.ModuleDeclaration && parent.kind !== SyntaxKind.ImportType);
        if (isStringLiteralLike(input)) {
            if (isBundledEmit) {
                const newName = getExternalModuleNameFromDeclaration(host, resolver, parent);
                if (newName) {
                    return factory.createStringLiteral(newName);
                }
            }
            else {
                const symbol = resolver.getSymbolOfExternalModuleSpecifier(input);
                if (symbol) {
                    recordExportedModuleFromDeclarationEmit(symbol, /*isPresentInSource*/ true);
                }
            }
        }
        return input;
    }

    function transformImportEqualsDeclaration(decl: ImportEqualsDeclaration) {
        if (!resolver.isDeclarationVisible(decl)) return;
        if (decl.moduleReference.kind === SyntaxKind.ExternalModuleReference) {
            // Rewrite external module names if necessary
            const specifier = getExternalModuleImportEqualsDeclarationExpression(decl);
            return factory.updateImportEqualsDeclaration(
                decl,
                decl.modifiers,
                decl.isTypeOnly,
                decl.name,
                factory.updateExternalModuleReference(decl.moduleReference, rewriteModuleSpecifier(decl, specifier)),
            );
        }
        else {
            const oldDiag = getSymbolAccessibilityDiagnostic;
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(decl);
            checkEntityNameVisibility(decl.moduleReference, enclosingDeclaration);
            getSymbolAccessibilityDiagnostic = oldDiag;
            return decl;
        }
    }

    function transformImportDeclaration(decl: ImportDeclaration) {
        if (!decl.importClause) {
            // import "mod" - possibly needed for side effects? (global interface patches, module augmentations, etc)
            return factory.updateImportDeclaration(
                decl,
                decl.modifiers,
                decl.importClause,
                rewriteModuleSpecifier(decl, decl.moduleSpecifier),
                tryGetResolutionModeOverride(decl.attributes),
            );
        }
        // The `importClause` visibility corresponds to the default's visibility.
        const visibleDefaultBinding = decl.importClause && decl.importClause.name && resolver.isDeclarationVisible(decl.importClause) ? decl.importClause.name : undefined;
        if (!decl.importClause.namedBindings) {
            // No named bindings (either namespace or list), meaning the import is just default or should be elided
            return visibleDefaultBinding && factory.updateImportDeclaration(
                decl,
                decl.modifiers,
                factory.updateImportClause(
                    decl.importClause,
                    decl.importClause.isTypeOnly,
                    visibleDefaultBinding,
                    /*namedBindings*/ undefined,
                ),
                rewriteModuleSpecifier(decl, decl.moduleSpecifier),
                tryGetResolutionModeOverride(decl.attributes),
            );
        }
        if (decl.importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
            // Namespace import (optionally with visible default)
            const namedBindings = resolver.isDeclarationVisible(decl.importClause.namedBindings) ? decl.importClause.namedBindings : /*namedBindings*/ undefined;
            return visibleDefaultBinding || namedBindings ? factory.updateImportDeclaration(
                decl,
                decl.modifiers,
                factory.updateImportClause(
                    decl.importClause,
                    decl.importClause.isTypeOnly,
                    visibleDefaultBinding,
                    namedBindings,
                ),
                rewriteModuleSpecifier(decl, decl.moduleSpecifier),
                tryGetResolutionModeOverride(decl.attributes),
            ) : undefined;
        }
        // Named imports (optionally with visible default)
        const bindingList = mapDefined(decl.importClause.namedBindings.elements, b => resolver.isDeclarationVisible(b) ? b : undefined);
        if ((bindingList && bindingList.length) || visibleDefaultBinding) {
            return factory.updateImportDeclaration(
                decl,
                decl.modifiers,
                factory.updateImportClause(
                    decl.importClause,
                    decl.importClause.isTypeOnly,
                    visibleDefaultBinding,
                    bindingList && bindingList.length ? factory.updateNamedImports(decl.importClause.namedBindings, bindingList) : undefined,
                ),
                rewriteModuleSpecifier(decl, decl.moduleSpecifier),
                tryGetResolutionModeOverride(decl.attributes),
            );
        }
        // Augmentation of export depends on import
        if (resolver.isImportRequiredByAugmentation(decl)) {
            if (isolatedDeclarations) {
                context.addDiagnostic(createDiagnosticForNode(decl, Diagnostics.Declaration_emit_for_this_file_requires_preserving_this_import_for_augmentations_This_is_not_supported_with_isolatedDeclarations));
            }
            return factory.updateImportDeclaration(
                decl,
                decl.modifiers,
                /*importClause*/ undefined,
                rewriteModuleSpecifier(decl, decl.moduleSpecifier),
                tryGetResolutionModeOverride(decl.attributes),
            );
        }
        // Nothing visible
    }

    function tryGetResolutionModeOverride(node: ImportAttributes | undefined) {
        const mode = getResolutionModeOverride(node);
        return node && mode !== undefined ? node : undefined;
    }

    function transformAndReplaceLatePaintedStatements(statements: NodeArray<Statement>): NodeArray<Statement> {
        // This is a `while` loop because `handleSymbolAccessibilityError` can see additional import aliases marked as visible during
        // error handling which must now be included in the output and themselves checked for errors.
        // For example:
        // ```
        // module A {
        //   export module Q {}
        //   import B = Q;
        //   import C = B;
        //   export import D = C;
        // }
        // ```
        // In such a scenario, only Q and D are initially visible, but we don't consider imports as private names - instead we say they if they are referenced they must
        // be recorded. So while checking D's visibility we mark C as visible, then we must check C which in turn marks B, completing the chain of
        // dependent imports and allowing a valid declaration file output. Today, this dependent alias marking only happens for internal import aliases.
        while (length(lateMarkedStatements)) {
            const i = lateMarkedStatements!.shift()!;
            if (!isLateVisibilityPaintedStatement(i)) {
                return Debug.fail(`Late replaced statement was found which is not handled by the declaration transformer!: ${Debug.formatSyntaxKind((i as Node).kind)}`);
            }
            const priorNeedsDeclare = needsDeclare;
            needsDeclare = i.parent && isSourceFile(i.parent) && !(isExternalModule(i.parent) && isBundledEmit);
            const result = transformTopLevelDeclaration(i);
            needsDeclare = priorNeedsDeclare;
            lateStatementReplacementMap.set(getOriginalNodeId(i), result);
        }

        // And lastly, we need to get the final form of all those indetermine import declarations from before and add them to the output list
        // (and remove them from the set to examine for outter declarations)
        return visitNodes(statements, visitLateVisibilityMarkedStatements, isStatement);

        function visitLateVisibilityMarkedStatements(statement: Statement) {
            if (isLateVisibilityPaintedStatement(statement)) {
                const key = getOriginalNodeId(statement);
                if (lateStatementReplacementMap.has(key)) {
                    const result = lateStatementReplacementMap.get(key) as Statement | readonly Statement[] | undefined;
                    lateStatementReplacementMap.delete(key);
                    if (result) {
                        if (isArray(result) ? some(result, needsScopeMarker) : needsScopeMarker(result)) {
                            // Top-level declarations in .d.ts files are always considered exported even without a modifier unless there's an export assignment or specifier
                            needsScopeFixMarker = true;
                        }
                        if (isSourceFile(statement.parent) && (isArray(result) ? some(result, isExternalModuleIndicator) : isExternalModuleIndicator(result))) {
                            resultHasExternalModuleIndicator = true;
                        }
                    }
                    return result;
                }
            }
            return statement;
        }
    }

    function visitDeclarationSubtree(input: Node): VisitResult<Node | undefined> {
        if (shouldStripInternal(input)) return;
        if (isDeclaration(input)) {
            if (isDeclarationAndNotVisible(input)) return;
            if (hasDynamicName(input) && !resolver.isLateBound(getParseTreeNode(input) as Declaration)) {
                if (
                    isolatedDeclarations
                    // Classes usually elide properties with computed names that are not of a literal type
                    // In isolated declarations TSC needs to error on these as we don't know the type in a DTE.
                    // The
                    && isClassDeclaration(input.parent)
                    && isEntityNameExpression(input.name.expression)
                    // If the symbol is not accessible we get another TS error no need to add to that
                    && resolver.isEntityNameVisible(input.name.expression, input.parent).accessibility === SymbolAccessibility.Accessible
                    && !resolver.isLiteralComputedName(input.name)
                ) {
                    context.addDiagnostic(createDiagnosticForNode(input, Diagnostics.Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedDeclarations));
                }
                return;
            }
        }

        // Elide implementation signatures from overload sets
        if (isFunctionLike(input) && resolver.isImplementationOfOverload(input)) return;

        // Elide semicolon class statements
        if (isSemicolonClassElement(input)) return;

        let previousEnclosingDeclaration: typeof enclosingDeclaration;
        if (isEnclosingDeclaration(input)) {
            previousEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = input as Declaration;
        }
        const oldDiag = getSymbolAccessibilityDiagnostic;

        // Setup diagnostic-related flags before first potential `cleanup` call, otherwise
        // We'd see a TDZ violation at runtime
        const canProduceDiagnostic = canProduceDiagnostics(input);
        const oldWithinObjectLiteralType = suppressNewDiagnosticContexts;
        let shouldEnterSuppressNewDiagnosticsContextContext = (input.kind === SyntaxKind.TypeLiteral || input.kind === SyntaxKind.MappedType) && input.parent.kind !== SyntaxKind.TypeAliasDeclaration;

        // Emit methods which are private as properties with no type information
        if (isMethodDeclaration(input) || isMethodSignature(input)) {
            if (hasEffectiveModifier(input, ModifierFlags.Private)) {
                if (input.symbol && input.symbol.declarations && input.symbol.declarations[0] !== input) return; // Elide all but the first overload
                return cleanup(factory.createPropertyDeclaration(ensureModifiers(input), input.name, /*questionOrExclamationToken*/ undefined, /*type*/ undefined, /*initializer*/ undefined));
            }
        }

        if (canProduceDiagnostic && !suppressNewDiagnosticContexts) {
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input);
        }

        if (isTypeQueryNode(input)) {
            checkEntityNameVisibility(input.exprName, enclosingDeclaration);
        }

        if (shouldEnterSuppressNewDiagnosticsContextContext) {
            // We stop making new diagnostic contexts within object literal types. Unless it's an object type on the RHS of a type alias declaration. Then we do.
            suppressNewDiagnosticContexts = true;
        }

        if (isProcessedComponent(input)) {
            switch (input.kind) {
                case SyntaxKind.ExpressionWithTypeArguments: {
                    if ((isEntityName(input.expression) || isEntityNameExpression(input.expression))) {
                        checkEntityNameVisibility(input.expression, enclosingDeclaration);
                    }
                    const node = visitEachChild(input, visitDeclarationSubtree, context);
                    return cleanup(factory.updateExpressionWithTypeArguments(node, node.expression, node.typeArguments));
                }
                case SyntaxKind.TypeReference: {
                    checkEntityNameVisibility(input.typeName, enclosingDeclaration);
                    const node = visitEachChild(input, visitDeclarationSubtree, context);
                    return cleanup(factory.updateTypeReferenceNode(node, node.typeName, node.typeArguments));
                }
                case SyntaxKind.ConstructSignature:
                    return cleanup(factory.updateConstructSignature(
                        input,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type),
                    ));
                case SyntaxKind.Constructor: {
                    // A constructor declaration may not have a type annotation
                    const ctor = factory.createConstructorDeclaration(
                        /*modifiers*/ ensureModifiers(input),
                        updateParamsList(input, input.parameters, ModifierFlags.None),
                        /*body*/ undefined,
                    );
                    return cleanup(ctor);
                }
                case SyntaxKind.MethodDeclaration: {
                    if (isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    const sig = factory.createMethodDeclaration(
                        ensureModifiers(input),
                        /*asteriskToken*/ undefined,
                        input.name,
                        input.questionToken,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type),
                        /*body*/ undefined,
                    );
                    return cleanup(sig);
                }
                case SyntaxKind.GetAccessor: {
                    if (isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    const accessorType = getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
                    return cleanup(factory.updateGetAccessorDeclaration(
                        input,
                        ensureModifiers(input),
                        input.name,
                        updateAccessorParamsList(input, hasEffectiveModifier(input, ModifierFlags.Private)),
                        ensureType(input, accessorType),
                        /*body*/ undefined,
                    ));
                }
                case SyntaxKind.SetAccessor: {
                    if (isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updateSetAccessorDeclaration(
                        input,
                        ensureModifiers(input),
                        input.name,
                        updateAccessorParamsList(input, hasEffectiveModifier(input, ModifierFlags.Private)),
                        /*body*/ undefined,
                    ));
                }
                case SyntaxKind.PropertyDeclaration:
                    if (isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updatePropertyDeclaration(
                        input,
                        ensureModifiers(input),
                        input.name,
                        input.questionToken,
                        ensureType(input, input.type),
                        ensureNoInitializer(input),
                    ));
                case SyntaxKind.PropertySignature:
                    if (isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updatePropertySignature(
                        input,
                        ensureModifiers(input),
                        input.name,
                        input.questionToken,
                        ensureType(input, input.type),
                    ));
                case SyntaxKind.MethodSignature: {
                    if (isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updateMethodSignature(
                        input,
                        ensureModifiers(input),
                        input.name,
                        input.questionToken,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type),
                    ));
                }
                case SyntaxKind.CallSignature: {
                    return cleanup(
                        factory.updateCallSignature(
                            input,
                            ensureTypeParams(input, input.typeParameters),
                            updateParamsList(input, input.parameters),
                            ensureType(input, input.type),
                        ),
                    );
                }
                case SyntaxKind.IndexSignature: {
                    return cleanup(factory.updateIndexSignature(
                        input,
                        ensureModifiers(input),
                        updateParamsList(input, input.parameters),
                        visitNode(input.type, visitDeclarationSubtree, isTypeNode) || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
                    ));
                }
                case SyntaxKind.VariableDeclaration: {
                    if (isBindingPattern(input.name)) {
                        return recreateBindingPattern(input.name);
                    }
                    shouldEnterSuppressNewDiagnosticsContextContext = true;
                    suppressNewDiagnosticContexts = true; // Variable declaration types also suppress new diagnostic contexts, provided the contexts wouldn't be made for binding pattern types
                    return cleanup(factory.updateVariableDeclaration(input, input.name, /*exclamationToken*/ undefined, ensureType(input, input.type), ensureNoInitializer(input)));
                }
                case SyntaxKind.TypeParameter: {
                    if (isPrivateMethodTypeParameter(input) && (input.default || input.constraint)) {
                        return cleanup(factory.updateTypeParameterDeclaration(input, input.modifiers, input.name, /*constraint*/ undefined, /*defaultType*/ undefined));
                    }
                    return cleanup(visitEachChild(input, visitDeclarationSubtree, context));
                }
                case SyntaxKind.ConditionalType: {
                    // We have to process conditional types in a special way because for visibility purposes we need to push a new enclosingDeclaration
                    // just for the `infer` types in the true branch. It's an implicit declaration scope that only applies to _part_ of the type.
                    const checkType = visitNode(input.checkType, visitDeclarationSubtree, isTypeNode);
                    const extendsType = visitNode(input.extendsType, visitDeclarationSubtree, isTypeNode);
                    const oldEnclosingDecl = enclosingDeclaration;
                    enclosingDeclaration = input.trueType;
                    const trueType = visitNode(input.trueType, visitDeclarationSubtree, isTypeNode);
                    enclosingDeclaration = oldEnclosingDecl;
                    const falseType = visitNode(input.falseType, visitDeclarationSubtree, isTypeNode);
                    Debug.assert(checkType);
                    Debug.assert(extendsType);
                    Debug.assert(trueType);
                    Debug.assert(falseType);
                    return cleanup(factory.updateConditionalTypeNode(input, checkType, extendsType, trueType, falseType));
                }
                case SyntaxKind.FunctionType: {
                    return cleanup(factory.updateFunctionTypeNode(
                        input,
                        visitNodes(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration),
                        updateParamsList(input, input.parameters),
                        Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode)),
                    ));
                }
                case SyntaxKind.ConstructorType: {
                    return cleanup(factory.updateConstructorTypeNode(
                        input,
                        ensureModifiers(input),
                        visitNodes(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration),
                        updateParamsList(input, input.parameters),
                        Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode)),
                    ));
                }
                case SyntaxKind.ImportType: {
                    if (!isLiteralImportTypeNode(input)) return cleanup(input);
                    trackReferencedAmbientModuleFromImport(input);
                    return cleanup(factory.updateImportTypeNode(
                        input,
                        factory.updateLiteralTypeNode(input.argument, rewriteModuleSpecifier(input, input.argument.literal)),
                        input.attributes,
                        input.qualifier,
                        visitNodes(input.typeArguments, visitDeclarationSubtree, isTypeNode),
                        input.isTypeOf,
                    ));
                }
                default:
                    Debug.assertNever(input, `Attempted to process unhandled node kind: ${Debug.formatSyntaxKind((input as Node).kind)}`);
            }
        }

        if (isTupleTypeNode(input) && (getLineAndCharacterOfPosition(currentSourceFile, input.pos).line === getLineAndCharacterOfPosition(currentSourceFile, input.end).line)) {
            setEmitFlags(input, EmitFlags.SingleLine);
        }

        return cleanup(visitEachChild(input, visitDeclarationSubtree, context));

        function cleanup<T extends Node>(returnValue: T | undefined): T | undefined {
            if (returnValue && canProduceDiagnostic && hasDynamicName(input as Declaration)) {
                checkName(input);
            }
            if (isEnclosingDeclaration(input)) {
                enclosingDeclaration = previousEnclosingDeclaration;
            }
            if (canProduceDiagnostic && !suppressNewDiagnosticContexts) {
                getSymbolAccessibilityDiagnostic = oldDiag;
            }
            if (shouldEnterSuppressNewDiagnosticsContextContext) {
                suppressNewDiagnosticContexts = oldWithinObjectLiteralType;
            }
            if (returnValue === input) {
                return returnValue;
            }
            return returnValue && setOriginalNode(preserveJsDoc(returnValue, input), input);
        }
    }

    function isPrivateMethodTypeParameter(node: TypeParameterDeclaration) {
        return node.parent.kind === SyntaxKind.MethodDeclaration && hasEffectiveModifier(node.parent, ModifierFlags.Private);
    }

    function visitDeclarationStatements(input: Node): VisitResult<Node | undefined> {
        if (!isPreservedDeclarationStatement(input)) {
            // return undefined for unmatched kinds to omit them from the tree
            return;
        }
        if (shouldStripInternal(input)) return;

        switch (input.kind) {
            case SyntaxKind.ExportDeclaration: {
                if (isSourceFile(input.parent)) {
                    resultHasExternalModuleIndicator = true;
                }
                resultHasScopeMarker = true;
                // Always visible if the parent node isn't dropped for being not visible
                trackReferencedAmbientModuleFromImport(input);
                // Rewrite external module names if necessary
                return factory.updateExportDeclaration(
                    input,
                    input.modifiers,
                    input.isTypeOnly,
                    input.exportClause,
                    rewriteModuleSpecifier(input, input.moduleSpecifier),
                    tryGetResolutionModeOverride(input.attributes),
                );
            }
            case SyntaxKind.ExportAssignment: {
                // Always visible if the parent node isn't dropped for being not visible
                if (isSourceFile(input.parent)) {
                    resultHasExternalModuleIndicator = true;
                }
                resultHasScopeMarker = true;
                if (input.expression.kind === SyntaxKind.Identifier) {
                    return input;
                }
                else {
                    const newId = factory.createUniqueName("_default", GeneratedIdentifierFlags.Optimistic);
                    getSymbolAccessibilityDiagnostic = () => ({
                        diagnosticMessage: Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                        errorNode: input,
                    });
                    errorFallbackNode = input;
                    const type = ensureType(input, /*type*/ undefined);
                    const varDecl = factory.createVariableDeclaration(newId, /*exclamationToken*/ undefined, type, /*initializer*/ undefined);
                    errorFallbackNode = undefined;
                    const statement = factory.createVariableStatement(needsDeclare ? [factory.createModifier(SyntaxKind.DeclareKeyword)] : [], factory.createVariableDeclarationList([varDecl], NodeFlags.Const));

                    preserveJsDoc(statement, input);
                    removeAllComments(input);
                    return [statement, factory.updateExportAssignment(input, input.modifiers, newId)];
                }
            }
        }

        const result = transformTopLevelDeclaration(input);
        // Don't actually transform yet; just leave as original node - will be elided/swapped by late pass
        lateStatementReplacementMap.set(getOriginalNodeId(input), result);
        return input;
    }

    function stripExportModifiers(statement: Statement): Statement {
        if (isImportEqualsDeclaration(statement) || hasEffectiveModifier(statement, ModifierFlags.Default) || !canHaveModifiers(statement)) {
            // `export import` statements should remain as-is, as imports are _not_ implicitly exported in an ambient namespace
            // Likewise, `export default` classes and the like and just be `default`, so we preserve their `export` modifiers, too
            return statement;
        }

        const modifiers = factory.createModifiersFromModifierFlags(getEffectiveModifierFlags(statement) & (ModifierFlags.All ^ ModifierFlags.Export));
        return factory.replaceModifiers(statement, modifiers);
    }

    function updateModuleDeclarationAndKeyword(
        node: ModuleDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: ModuleName,
        body: ModuleBody | undefined,
    ) {
        const updated = factory.updateModuleDeclaration(node, modifiers, name, body);

        if (isAmbientModule(updated) || updated.flags & NodeFlags.Namespace) {
            return updated;
        }

        const fixed = factory.createModuleDeclaration(
            updated.modifiers,
            updated.name,
            updated.body,
            updated.flags | NodeFlags.Namespace,
        );

        setOriginalNode(fixed, updated);
        setTextRange(fixed, updated);

        return fixed;
    }

    function transformTopLevelDeclaration(input: LateVisibilityPaintedStatement) {
        if (lateMarkedStatements) {
            while (orderedRemoveItem(lateMarkedStatements, input));
        }
        if (shouldStripInternal(input)) return;
        switch (input.kind) {
            case SyntaxKind.ImportEqualsDeclaration: {
                const transformed = transformImportEqualsDeclaration(input);
                if (transformed) {
                    trackReferencedAmbientModuleFromImport(input);
                }
                return transformed;
            }
            case SyntaxKind.ImportDeclaration: {
                const transformed = transformImportDeclaration(input);
                if (transformed) {
                    trackReferencedAmbientModuleFromImport(input);
                }
                return transformed;
            }
        }
        if (isDeclaration(input) && isDeclarationAndNotVisible(input)) return;

        // Elide implementation signatures from overload sets
        if (isFunctionLike(input) && resolver.isImplementationOfOverload(input)) return;

        let previousEnclosingDeclaration: typeof enclosingDeclaration;
        if (isEnclosingDeclaration(input)) {
            previousEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = input as Declaration;
        }

        const canProdiceDiagnostic = canProduceDiagnostics(input);
        const oldDiag = getSymbolAccessibilityDiagnostic;
        if (canProdiceDiagnostic) {
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input as DeclarationDiagnosticProducing);
        }

        const previousNeedsDeclare = needsDeclare;
        switch (input.kind) {
            case SyntaxKind.TypeAliasDeclaration: {
                needsDeclare = false;
                const clean = cleanup(factory.updateTypeAliasDeclaration(
                    input,
                    ensureModifiers(input),
                    input.name,
                    visitNodes(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration),
                    Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode)),
                ));
                needsDeclare = previousNeedsDeclare;
                return clean;
            }
            case SyntaxKind.InterfaceDeclaration: {
                return cleanup(factory.updateInterfaceDeclaration(
                    input,
                    ensureModifiers(input),
                    input.name,
                    ensureTypeParams(input, input.typeParameters),
                    transformHeritageClauses(input.heritageClauses),
                    visitNodes(input.members, visitDeclarationSubtree, isTypeElement),
                ));
            }
            case SyntaxKind.FunctionDeclaration: {
                // Generators lose their generator-ness, excepting their return type
                const clean = cleanup(factory.updateFunctionDeclaration(
                    input,
                    ensureModifiers(input),
                    /*asteriskToken*/ undefined,
                    input.name,
                    ensureTypeParams(input, input.typeParameters),
                    updateParamsList(input, input.parameters),
                    ensureType(input, input.type),
                    /*body*/ undefined,
                ));
                if (clean && resolver.isExpandoFunction(input) && shouldEmitFunctionProperties(input)) {
                    const props = resolver.getPropertiesOfContainerFunction(input);

                    if (isolatedDeclarations) {
                        props.forEach(p => {
                            if (isExpandoPropertyDeclaration(p.valueDeclaration)) {
                                const errorTarget = isBinaryExpression(p.valueDeclaration) ?
                                    p.valueDeclaration.left :
                                    p.valueDeclaration;

                                context.addDiagnostic(createDiagnosticForNode(
                                    errorTarget,
                                    Diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function,
                                ));
                            }
                        });
                        if (isolatedDeclarationsNoFallback) {
                            return clean;
                        }
                    }
                    // Use parseNodeFactory so it is usable as an enclosing declaration
                    const fakespace = parseNodeFactory.createModuleDeclaration(/*modifiers*/ undefined, clean.name || factory.createIdentifier("_default"), factory.createModuleBlock([]), NodeFlags.Namespace);
                    setParent(fakespace, enclosingDeclaration as SourceFile | NamespaceDeclaration);
                    fakespace.locals = createSymbolTable(props);
                    fakespace.symbol = props[0].parent!;
                    const exportMappings: [Identifier, string][] = [];
                    let declarations: (VariableStatement | ExportDeclaration)[] = mapDefined(props, p => {
                        if (!isExpandoPropertyDeclaration(p.valueDeclaration)) {
                            return undefined;
                        }
                        const nameStr = unescapeLeadingUnderscores(p.escapedName);
                        if (!isIdentifierText(nameStr, ScriptTarget.ESNext)) {
                            return undefined; // unique symbol or non-identifier name - omit, since there's no syntax that can preserve it
                        }
                        getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(p.valueDeclaration);
                        const oldReferenceRequestingNode = referenceRequestingNode;
                        referenceRequestingNode = p.valueDeclaration;
                        const type = isolatedDeclarationsNoFallback ? makeInvalidType() : resolver.createTypeOfDeclaration(p.valueDeclaration, fakespace, declarationEmitNodeBuilderFlags, symbolTracker);
                        getSymbolAccessibilityDiagnostic = oldDiag;
                        referenceRequestingNode = oldReferenceRequestingNode;
                        const isNonContextualKeywordName = isStringANonContextualKeyword(nameStr);
                        const name = isNonContextualKeywordName ? factory.getGeneratedNameForNode(p.valueDeclaration) : factory.createIdentifier(nameStr);
                        if (isNonContextualKeywordName) {
                            exportMappings.push([name, nameStr]);
                        }
                        const varDecl = factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, type, /*initializer*/ undefined);
                        return factory.createVariableStatement(isNonContextualKeywordName ? undefined : [factory.createToken(SyntaxKind.ExportKeyword)], factory.createVariableDeclarationList([varDecl]));
                    });
                    if (!exportMappings.length) {
                        declarations = mapDefined(declarations, declaration => factory.replaceModifiers(declaration, ModifierFlags.None));
                    }
                    else {
                        declarations.push(factory.createExportDeclaration(
                            /*modifiers*/ undefined,
                            /*isTypeOnly*/ false,
                            factory.createNamedExports(map(exportMappings, ([gen, exp]) => {
                                return factory.createExportSpecifier(/*isTypeOnly*/ false, gen, exp);
                            })),
                        ));
                    }
                    const namespaceDecl = factory.createModuleDeclaration(ensureModifiers(input), input.name!, factory.createModuleBlock(declarations), NodeFlags.Namespace);
                    if (!hasEffectiveModifier(clean, ModifierFlags.Default)) {
                        return [clean, namespaceDecl];
                    }

                    const modifiers = factory.createModifiersFromModifierFlags((getEffectiveModifierFlags(clean) & ~ModifierFlags.ExportDefault) | ModifierFlags.Ambient);
                    const cleanDeclaration = factory.updateFunctionDeclaration(
                        clean,
                        modifiers,
                        /*asteriskToken*/ undefined,
                        clean.name,
                        clean.typeParameters,
                        clean.parameters,
                        clean.type,
                        /*body*/ undefined,
                    );

                    const namespaceDeclaration = factory.updateModuleDeclaration(
                        namespaceDecl,
                        modifiers,
                        namespaceDecl.name,
                        namespaceDecl.body,
                    );

                    const exportDefaultDeclaration = factory.createExportAssignment(
                        /*modifiers*/ undefined,
                        /*isExportEquals*/ false,
                        namespaceDecl.name,
                    );

                    if (isSourceFile(input.parent)) {
                        resultHasExternalModuleIndicator = true;
                    }
                    resultHasScopeMarker = true;

                    return [cleanDeclaration, namespaceDeclaration, exportDefaultDeclaration];
                }
                else {
                    return clean;
                }
            }
            case SyntaxKind.ModuleDeclaration: {
                needsDeclare = false;
                const inner = input.body;
                if (inner && inner.kind === SyntaxKind.ModuleBlock) {
                    const oldNeedsScopeFix = needsScopeFixMarker;
                    const oldHasScopeFix = resultHasScopeMarker;
                    resultHasScopeMarker = false;
                    needsScopeFixMarker = false;
                    const statements = visitNodes(inner.statements, visitDeclarationStatements, isStatement);
                    let lateStatements = transformAndReplaceLatePaintedStatements(statements);
                    if (input.flags & NodeFlags.Ambient) {
                        needsScopeFixMarker = false; // If it was `declare`'d everything is implicitly exported already, ignore late printed "privates"
                    }
                    // With the final list of statements, there are 3 possibilities:
                    // 1. There's an export assignment or export declaration in the namespace - do nothing
                    // 2. Everything is exported and there are no export assignments or export declarations - strip all export modifiers
                    // 3. Some things are exported, some are not, and there's no marker - add an empty marker
                    if (!isGlobalScopeAugmentation(input) && !hasScopeMarker(lateStatements) && !resultHasScopeMarker) {
                        if (needsScopeFixMarker) {
                            lateStatements = factory.createNodeArray([...lateStatements, createEmptyExports(factory)]);
                        }
                        else {
                            lateStatements = visitNodes(lateStatements, stripExportModifiers, isStatement);
                        }
                    }
                    const body = factory.updateModuleBlock(inner, lateStatements);
                    needsDeclare = previousNeedsDeclare;
                    needsScopeFixMarker = oldNeedsScopeFix;
                    resultHasScopeMarker = oldHasScopeFix;
                    const mods = ensureModifiers(input);

                    return cleanup(updateModuleDeclarationAndKeyword(
                        input,
                        mods,
                        isExternalModuleAugmentation(input) ? rewriteModuleSpecifier(input, input.name) : input.name,
                        body,
                    ));
                }
                else {
                    needsDeclare = previousNeedsDeclare;
                    const mods = ensureModifiers(input);
                    needsDeclare = false;
                    visitNode(inner, visitDeclarationStatements);
                    // eagerly transform nested namespaces (the nesting doesn't need any elision or painting done)
                    const id = getOriginalNodeId(inner!); // TODO: GH#18217
                    const body = lateStatementReplacementMap.get(id);
                    lateStatementReplacementMap.delete(id);
                    return cleanup(updateModuleDeclarationAndKeyword(
                        input,
                        mods,
                        input.name,
                        body as ModuleBody,
                    ));
                }
            }
            case SyntaxKind.ClassDeclaration: {
                errorNameNode = input.name;
                errorFallbackNode = input;
                const modifiers = factory.createNodeArray(ensureModifiers(input));
                const typeParameters = ensureTypeParams(input, input.typeParameters);
                const ctor = getFirstConstructorWithBody(input);
                let parameterProperties: readonly PropertyDeclaration[] | undefined;
                if (ctor) {
                    const oldDiag = getSymbolAccessibilityDiagnostic;
                    parameterProperties = compact(flatMap(ctor.parameters, param => {
                        if (!hasSyntacticModifier(param, ModifierFlags.ParameterPropertyModifier) || shouldStripInternal(param)) return;
                        getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(param);
                        if (param.name.kind === SyntaxKind.Identifier) {
                            return preserveJsDoc(
                                factory.createPropertyDeclaration(
                                    ensureModifiers(param),
                                    param.name,
                                    param.questionToken,
                                    ensureType(param, param.type),
                                    ensureNoInitializer(param),
                                ),
                                param,
                            );
                        }
                        else {
                            // Pattern - this is currently an error, but we emit declarations for it somewhat correctly
                            return walkBindingPattern(param.name);
                        }

                        function walkBindingPattern(pattern: BindingPattern) {
                            let elems: PropertyDeclaration[] | undefined;
                            for (const elem of pattern.elements) {
                                if (isOmittedExpression(elem)) continue;
                                if (isBindingPattern(elem.name)) {
                                    elems = concatenate(elems, walkBindingPattern(elem.name));
                                }
                                elems = elems || [];
                                elems.push(factory.createPropertyDeclaration(
                                    ensureModifiers(param),
                                    elem.name as Identifier,
                                    /*questionOrExclamationToken*/ undefined,
                                    ensureType(elem, /*type*/ undefined),
                                    /*initializer*/ undefined,
                                ));
                            }
                            return elems;
                        }
                    }));
                    getSymbolAccessibilityDiagnostic = oldDiag;
                }

                const hasPrivateIdentifier = some(input.members, member => !!member.name && isPrivateIdentifier(member.name));
                // When the class has at least one private identifier, create a unique constant identifier to retain the nominal typing behavior
                // Prevents other classes with the same public members from being used in place of the current class
                const privateIdentifier = hasPrivateIdentifier ? [
                    factory.createPropertyDeclaration(
                        /*modifiers*/ undefined,
                        factory.createPrivateIdentifier("#private"),
                        /*questionOrExclamationToken*/ undefined,
                        /*type*/ undefined,
                        /*initializer*/ undefined,
                    ),
                ] : undefined;
                const memberNodes = concatenate(concatenate(privateIdentifier, parameterProperties), visitNodes(input.members, visitDeclarationSubtree, isClassElement));
                const members = factory.createNodeArray(memberNodes);

                const extendsClause = getEffectiveBaseTypeNode(input);
                if (extendsClause && !isEntityNameExpression(extendsClause.expression) && extendsClause.expression.kind !== SyntaxKind.NullKeyword) {
                    // We must add a temporary declaration for the extends clause expression

                    // Isolated declarations does not allow inferred type in the extends clause
                    if (isolatedDeclarations) {
                        if (
                            // Checking if it's a separate compiler error so we don't make it an isolatedDeclarations error.
                            // This is only an approximation as we need type information to figure out if something
                            // is a constructor type or not.
                            !isLiteralExpression(extendsClause.expression) &&
                            extendsClause.expression.kind !== SyntaxKind.FalseKeyword &&
                            extendsClause.expression.kind !== SyntaxKind.TrueKeyword
                        ) {
                            context.addDiagnostic(createDiagnosticForNode(extendsClause, Diagnostics.Extends_clause_can_t_contain_an_expression_with_isolatedDeclarations));
                        }
                        return cleanup(factory.updateClassDeclaration(
                            input,
                            modifiers,
                            input.name,
                            typeParameters,
                            factory.createNodeArray([factory.createHeritageClause(SyntaxKind.ExtendsKeyword, [
                                factory.createExpressionWithTypeArguments(
                                    factory.createIdentifier("invalid"),
                                    /*typeArguments*/ undefined,
                                ),
                            ])]),
                            members,
                        ));
                    }
                    const oldId = input.name ? unescapeLeadingUnderscores(input.name.escapedText) : "default";
                    const newId = factory.createUniqueName(`${oldId}_base`, GeneratedIdentifierFlags.Optimistic);
                    getSymbolAccessibilityDiagnostic = () => ({
                        diagnosticMessage: Diagnostics.extends_clause_of_exported_class_0_has_or_is_using_private_name_1,
                        errorNode: extendsClause,
                        typeName: input.name,
                    });
                    const oldReferenceRequestingNode = referenceRequestingNode;
                    referenceRequestingNode = extendsClause;
                    const varDecl = factory.createVariableDeclaration(newId, /*exclamationToken*/ undefined, resolver.createTypeOfExpression(extendsClause.expression, input, declarationEmitNodeBuilderFlags, symbolTracker), /*initializer*/ undefined);
                    referenceRequestingNode = oldReferenceRequestingNode;
                    const statement = factory.createVariableStatement(needsDeclare ? [factory.createModifier(SyntaxKind.DeclareKeyword)] : [], factory.createVariableDeclarationList([varDecl], NodeFlags.Const));
                    const heritageClauses = factory.createNodeArray(map(input.heritageClauses, clause => {
                        if (clause.token === SyntaxKind.ExtendsKeyword) {
                            const oldDiag = getSymbolAccessibilityDiagnostic;
                            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(clause.types[0]);
                            const newClause = factory.updateHeritageClause(clause, map(clause.types, t => factory.updateExpressionWithTypeArguments(t, newId, visitNodes(t.typeArguments, visitDeclarationSubtree, isTypeNode))));
                            getSymbolAccessibilityDiagnostic = oldDiag;
                            return newClause;
                        }
                        return factory.updateHeritageClause(clause, visitNodes(factory.createNodeArray(filter(clause.types, t => isEntityNameExpression(t.expression) || t.expression.kind === SyntaxKind.NullKeyword)), visitDeclarationSubtree, isExpressionWithTypeArguments));
                    }));
                    return [
                        statement,
                        cleanup(factory.updateClassDeclaration(
                            input,
                            modifiers,
                            input.name,
                            typeParameters,
                            heritageClauses,
                            members,
                        ))!,
                    ]; // TODO: GH#18217
                }
                else {
                    const heritageClauses = transformHeritageClauses(input.heritageClauses);
                    return cleanup(factory.updateClassDeclaration(
                        input,
                        modifiers,
                        input.name,
                        typeParameters,
                        heritageClauses,
                        members,
                    ));
                }
            }
            case SyntaxKind.VariableStatement: {
                return cleanup(transformVariableStatement(input));
            }
            case SyntaxKind.EnumDeclaration: {
                return cleanup(factory.updateEnumDeclaration(
                    input,
                    factory.createNodeArray(ensureModifiers(input)),
                    input.name,
                    factory.createNodeArray(mapDefined(input.members, m => {
                        if (shouldStripInternal(m)) return;
                        // Rewrite enum values to their constants, if available
                        const constValue = resolver.getConstantValue(m);
                        if (
                            isolatedDeclarations && m.initializer && constValue === undefined &&
                            // This will be its own compiler error instead, so don't report.
                            !isComputedPropertyName(m.name)
                        ) {
                            context.addDiagnostic(createDiagnosticForNode(m, Diagnostics.Enum_member_initializers_must_be_computable_without_references_to_external_symbols_with_isolatedDeclarations));
                        }
                        const newInitializer = constValue === undefined ? undefined
                            : typeof constValue === "string" ? factory.createStringLiteral(constValue)
                            : constValue < 0 ? factory.createPrefixUnaryExpression(SyntaxKind.MinusToken, factory.createNumericLiteral(-constValue))
                            : factory.createNumericLiteral(constValue);
                        return preserveJsDoc(factory.updateEnumMember(m, m.name, newInitializer), m);
                    })),
                ));
            }
        }
        // Anything left unhandled is an error, so this should be unreachable
        return Debug.assertNever(input, `Unhandled top-level node in declaration emit: ${Debug.formatSyntaxKind((input as Node).kind)}`);

        function cleanup<T extends Node>(node: T | undefined): T | undefined {
            if (isEnclosingDeclaration(input)) {
                enclosingDeclaration = previousEnclosingDeclaration;
            }
            if (canProdiceDiagnostic) {
                getSymbolAccessibilityDiagnostic = oldDiag;
            }
            if (input.kind === SyntaxKind.ModuleDeclaration) {
                needsDeclare = previousNeedsDeclare;
            }
            if (node as Node === input) {
                return node;
            }
            errorFallbackNode = undefined;
            errorNameNode = undefined;
            return node && setOriginalNode(preserveJsDoc(node, input), input);
        }
    }

    function transformVariableStatement(input: VariableStatement) {
        if (!forEach(input.declarationList.declarations, getBindingNameVisible)) return;
        const nodes = visitNodes(input.declarationList.declarations, visitDeclarationSubtree, isVariableDeclaration);
        if (!length(nodes)) return;

        const modifiers = factory.createNodeArray(ensureModifiers(input));
        let declList: VariableDeclarationList;
        if (isVarUsing(input.declarationList) || isVarAwaitUsing(input.declarationList)) {
            declList = factory.createVariableDeclarationList(nodes, NodeFlags.Const);
            setOriginalNode(declList, input.declarationList);
            setTextRange(declList, input.declarationList);
            setCommentRange(declList, input.declarationList);
        }
        else {
            declList = factory.updateVariableDeclarationList(input.declarationList, nodes);
        }
        return factory.updateVariableStatement(input, modifiers, declList);
    }

    function recreateBindingPattern(d: BindingPattern): VariableDeclaration[] {
        return flatten<VariableDeclaration>(mapDefined(d.elements, e => recreateBindingElement(e)));
    }

    function recreateBindingElement(e: ArrayBindingElement) {
        if (e.kind === SyntaxKind.OmittedExpression) {
            return;
        }
        if (e.name) {
            if (!getBindingNameVisible(e)) return;
            if (isBindingPattern(e.name)) {
                return recreateBindingPattern(e.name);
            }
            else {
                return factory.createVariableDeclaration(e.name, /*exclamationToken*/ undefined, ensureType(e, /*type*/ undefined), /*initializer*/ undefined);
            }
        }
    }

    function checkName(node: DeclarationDiagnosticProducing) {
        let oldDiag: typeof getSymbolAccessibilityDiagnostic | undefined;
        if (!suppressNewDiagnosticContexts) {
            oldDiag = getSymbolAccessibilityDiagnostic;
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNodeName(node);
        }
        errorNameNode = (node as NamedDeclaration).name;
        Debug.assert(resolver.isLateBound(getParseTreeNode(node) as Declaration)); // Should only be called with dynamic names
        const decl = node as NamedDeclaration as LateBoundDeclaration;
        const entityName = decl.name.expression;
        checkEntityNameVisibility(entityName, enclosingDeclaration);
        if (!suppressNewDiagnosticContexts) {
            getSymbolAccessibilityDiagnostic = oldDiag!;
        }
        errorNameNode = undefined;
    }

    function shouldStripInternal(node: Node) {
        return !!stripInternal && !!node && isInternalDeclaration(node, currentSourceFile);
    }

    function isScopeMarker(node: Node) {
        return isExportAssignment(node) || isExportDeclaration(node);
    }

    function hasScopeMarker(statements: readonly Statement[]) {
        return some(statements, isScopeMarker);
    }

    function ensureModifiers<T extends HasModifiers>(node: T): readonly Modifier[] | undefined {
        const currentFlags = getEffectiveModifierFlags(node);
        const newFlags = ensureModifierFlags(node);
        if (currentFlags === newFlags) {
            return visitArray(node.modifiers, n => tryCast(n, isModifier), isModifier);
        }
        return factory.createModifiersFromModifierFlags(newFlags);
    }

    function ensureModifierFlags(node: Node): ModifierFlags {
        let mask = ModifierFlags.All ^ (ModifierFlags.Public | ModifierFlags.Async | ModifierFlags.Override); // No async and override modifiers in declaration files
        let additions = (needsDeclare && !isAlwaysType(node)) ? ModifierFlags.Ambient : ModifierFlags.None;
        const parentIsFile = node.parent.kind === SyntaxKind.SourceFile;
        if (!parentIsFile || (isBundledEmit && parentIsFile && isExternalModule(node.parent as SourceFile))) {
            mask ^= ModifierFlags.Ambient;
            additions = ModifierFlags.None;
        }
        return maskModifierFlags(node, mask, additions);
    }

    function getTypeAnnotationFromAllAccessorDeclarations(node: AccessorDeclaration, accessors: AllAccessorDeclarations) {
        let accessorType = getTypeAnnotationFromAccessor(node);
        if (!accessorType && node !== accessors.firstAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.firstAccessor);
            // If we end up pulling the type from the second accessor, we also need to change the diagnostic context to get the expected error message
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(accessors.firstAccessor);
        }
        if (!accessorType && accessors.secondAccessor && node !== accessors.secondAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.secondAccessor);
            // If we end up pulling the type from the second accessor, we also need to change the diagnostic context to get the expected error message
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(accessors.secondAccessor);
        }
        return accessorType;
    }

    function transformHeritageClauses(nodes: NodeArray<HeritageClause> | undefined) {
        return factory.createNodeArray(filter(
            map(nodes, clause =>
                factory.updateHeritageClause(
                    clause,
                    visitNodes(
                        factory.createNodeArray(filter(clause.types, t => {
                            return isEntityNameExpression(t.expression) || (clause.token === SyntaxKind.ExtendsKeyword && t.expression.kind === SyntaxKind.NullKeyword);
                        })),
                        visitDeclarationSubtree,
                        isExpressionWithTypeArguments,
                    ),
                )),
            clause => clause.types && !!clause.types.length,
        ));
    }
}

function isAlwaysType(node: Node) {
    if (node.kind === SyntaxKind.InterfaceDeclaration) {
        return true;
    }
    return false;
}

// Elide "public" modifier, as it is the default
function maskModifiers(factory: NodeFactory, node: Node, modifierMask?: ModifierFlags, modifierAdditions?: ModifierFlags): Modifier[] | undefined {
    return factory.createModifiersFromModifierFlags(maskModifierFlags(node, modifierMask, modifierAdditions));
}

function maskModifierFlags(node: Node, modifierMask: ModifierFlags = ModifierFlags.All ^ ModifierFlags.Public, modifierAdditions: ModifierFlags = ModifierFlags.None): ModifierFlags {
    let flags = (getEffectiveModifierFlags(node) & modifierMask) | modifierAdditions;
    if (flags & ModifierFlags.Default && !(flags & ModifierFlags.Export)) {
        // A non-exported default is a nonsequitor - we usually try to remove all export modifiers
        // from statements in ambient declarations; but a default export must retain its export modifier to be syntactically valid
        flags ^= ModifierFlags.Export;
    }
    if (flags & ModifierFlags.Default && flags & ModifierFlags.Ambient) {
        flags ^= ModifierFlags.Ambient; // `declare` is never required alongside `default` (and would be an error if printed)
    }
    return flags;
}

function getTypeAnnotationFromAccessor(accessor: AccessorDeclaration): TypeNode | undefined {
    if (accessor) {
        return accessor.kind === SyntaxKind.GetAccessor
            ? accessor.type // Getter - return type
            : accessor.parameters.length > 0
            ? accessor.parameters[0].type // Setter parameter type
            : undefined;
    }
}

type ImportReferenceInformation =
    | { symbol: Symbol; requestingNode: undefined; isPresentInSource: true; }
    | { symbol: Symbol; requestingNode: Node; isPresentInSource: false; };

type ModuleReferenceInformation =
    | { sourceFile: SourceFile; requestingNode: undefined; isPresentInSource: true; }
    | { sourceFile: SourceFile; requestingNode: Node; isPresentInSource: false; };

type TypeReferenceInformation =
    | { specifier: string; mode: ResolutionMode; requestingNode: undefined; isPresentInSource: true; }
    | { specifier: string; mode: ResolutionMode; requestingNode: Node; isPresentInSource: false; };

type CanHaveLiteralInitializer = VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration;
function canHaveLiteralInitializer(node: Node): node is CanHaveLiteralInitializer {
    switch (node.kind) {
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
            return !hasEffectiveModifier(node, ModifierFlags.Private);
        case SyntaxKind.Parameter:
        case SyntaxKind.VariableDeclaration:
            return true;
    }
    return false;
}

type ProcessedDeclarationStatement =
    | FunctionDeclaration
    | ModuleDeclaration
    | ImportEqualsDeclaration
    | InterfaceDeclaration
    | ClassDeclaration
    | TypeAliasDeclaration
    | EnumDeclaration
    | VariableStatement
    | ImportDeclaration
    | ExportDeclaration
    | ExportAssignment;

function isPreservedDeclarationStatement(node: Node): node is ProcessedDeclarationStatement {
    switch (node.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ExportDeclaration:
        case SyntaxKind.ExportAssignment:
            return true;
    }
    return false;
}

type ProcessedComponent =
    | ConstructSignatureDeclaration
    | ConstructorDeclaration
    | MethodDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | PropertyDeclaration
    | PropertySignature
    | MethodSignature
    | CallSignatureDeclaration
    | IndexSignatureDeclaration
    | VariableDeclaration
    | TypeParameterDeclaration
    | ExpressionWithTypeArguments
    | TypeReferenceNode
    | ConditionalTypeNode
    | FunctionTypeNode
    | ConstructorTypeNode
    | ImportTypeNode;

function isProcessedComponent(node: Node): node is ProcessedComponent {
    switch (node.kind) {
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.Constructor:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.CallSignature:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.ExpressionWithTypeArguments:
        case SyntaxKind.TypeReference:
        case SyntaxKind.ConditionalType:
        case SyntaxKind.FunctionType:
        case SyntaxKind.ConstructorType:
        case SyntaxKind.ImportType:
            return true;
    }
    return false;
}

const enum InitializeTransformNarrowBehavior {
    None = 0,
    AsConst = 1,
    KeepLiterals = 1 << 2,
    AsConstOrKeepLiterals = AsConst | KeepLiterals,
    NotKeepLiterals = ~KeepLiterals,
    NoTypeReferences = 1 << 3,
}

const relatedSuggestionByDeclarationKind = {
    [SyntaxKind.ArrowFunction]: Diagnostics.Add_a_return_type_to_the_function_expression,
    [SyntaxKind.FunctionExpression]: Diagnostics.Add_a_return_type_to_the_function_expression,
    [SyntaxKind.MethodDeclaration]: Diagnostics.Add_a_return_type_to_the_method,
    [SyntaxKind.GetAccessor]: Diagnostics.Add_a_return_type_to_the_get_accessor_declaration,
    [SyntaxKind.SetAccessor]: Diagnostics.Add_a_type_to_parameter_of_the_set_accessor_declaration,
    [SyntaxKind.FunctionDeclaration]: Diagnostics.Add_a_return_type_to_the_function_declaration,
    [SyntaxKind.ConstructSignature]: Diagnostics.Add_a_return_type_to_the_function_declaration,
    [SyntaxKind.Parameter]: Diagnostics.Add_a_type_annotation_to_the_parameter_0,
    [SyntaxKind.VariableDeclaration]: Diagnostics.Add_a_type_annotation_to_the_variable_0,
    [SyntaxKind.PropertyDeclaration]: Diagnostics.Add_a_type_annotation_to_the_property_0,
    [SyntaxKind.PropertySignature]: Diagnostics.Add_a_type_annotation_to_the_property_0,
    [SyntaxKind.ExportAssignment]: Diagnostics.Move_the_expression_in_default_export_to_a_variable_and_add_a_type_annotation_to_it,
} satisfies Partial<Record<SyntaxKind, DiagnosticMessage>>;

const errorByDeclarationKind = {
    [SyntaxKind.FunctionExpression]: Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.FunctionDeclaration]: Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.ArrowFunction]: Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.MethodDeclaration]: Diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.ConstructSignature]: Diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.GetAccessor]: Diagnostics.At_least_one_accessor_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.SetAccessor]: Diagnostics.At_least_one_accessor_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.Parameter]: Diagnostics.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.VariableDeclaration]: Diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.PropertyDeclaration]: Diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.PropertySignature]: Diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations,
    [SyntaxKind.ComputedPropertyName]: Diagnostics.Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedDeclarations,
    [SyntaxKind.SpreadAssignment]: Diagnostics.Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations,
    [SyntaxKind.ShorthandPropertyAssignment]: Diagnostics.Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations,
    [SyntaxKind.ArrayLiteralExpression]: Diagnostics.Only_const_arrays_can_be_inferred_with_isolatedDeclarations,
    [SyntaxKind.ExportAssignment]: Diagnostics.Default_exports_can_t_be_inferred_with_isolatedDeclarations,
    [SyntaxKind.SpreadElement]: Diagnostics.Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations,
} satisfies Partial<Record<SyntaxKind, DiagnosticMessage>>;
