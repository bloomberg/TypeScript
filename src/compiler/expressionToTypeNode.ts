import {
    AccessorDeclaration,
    AllAccessorDeclarations,
    ArrayLiteralExpression,
    ArrowFunction,
    AsExpression,
    ClassExpression,
    CompilerOptions,
    Debug,
    Expression,
    factory,
    forEachReturnStatement,
    FunctionExpression,
    FunctionLikeDeclaration,
    GetAccessorDeclaration,
    getEffectiveReturnTypeNode,
    getEffectiveSetAccessorTypeAnnotationNode,
    getEffectiveTypeAnnotationNode,
    getJSDocType,
    getJSDocTypeAssertionType,
    getStrictOptionValue,
    HasInferredType,
    Identifier,
    IntersectionTypeNode,
    isBlock,
    isConstTypeReference,
    isDeclarationReadonly,
    isEntityNameExpression,
    isGetAccessor,
    isIdentifier,
    isInJSFile,
    isJSDocTypeAssertion,
    isKeyword,
    isLiteralTypeNode,
    isPrimitiveLiteralValue,
    isShorthandPropertyAssignment,
    isSpreadAssignment,
    isTypePredicateNode,
    isTypeQueryNode,
    isUnionTypeNode,
    isValueSignatureDeclaration,
    isVarConstLike,
    JSDocSignature,
    KeywordTypeSyntaxKind,
    MethodDeclaration,
    Node,
    NodeArray,
    NodeBuilderFlags,
    NodeFlags,
    nodeIsMissing,
    ObjectLiteralExpression,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PrefixUnaryExpression,
    PrimitiveLiteral,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    SetAccessorDeclaration,
    setCommentRange,
    SignatureDeclaration,
    SymbolAccessibility,
    SyntacticTypeNodeBuilderContext,
    SyntaxKind,
    TypeAssertion,
    TypeElement,
    TypeNode,
    TypeParameterDeclaration,
    UnionTypeNode,
    VariableDeclaration,
} from "./_namespaces/ts";

export function createSyntacticTypeNodeBuilder(options: CompilerOptions) {
    const strictNullChecks = getStrictOptionValue(options, "strictNullChecks");

    return {
        typeFromExpression,
        serializeTypeOfDeclaration,
        serializeReturnTypeForSignature,
        serializeTypeOfExpression,
        serializeTypeOfAccessor
    };
    function serializeExistingTypeAnnotation(type: TypeNode | undefined, context: SyntacticTypeNodeBuilderContext, enclosingDeclaration?: Node, addUndefined?: boolean) {
        if(!type) return;
        if(addUndefined && !canAddUndefined(type)) {
            context.tracker.reportInferenceFallback(type);
        }
        return context.serializeExistingTypeNode(type, enclosingDeclaration, addUndefined);
    }
    function serializeTypeOfAccessor(accessor: AccessorDeclaration, context: SyntacticTypeNodeBuilderContext) {
        return typeFromAccessor(accessor, context) ?? inferAccessorType(accessor, context.getAllAccessorDeclarations(accessor), context);
    }

    function serializeTypeOfExpression(expr: Expression, context: SyntacticTypeNodeBuilderContext, addUndefined?: boolean, preserveLiterals?: boolean) {
        return typeFromExpression(expr, context, /*isConstContext*/ false, addUndefined, preserveLiterals) ?? inferExpressionType(expr, context);
    }
    function serializeTypeOfDeclaration(node: HasInferredType, context: SyntacticTypeNodeBuilderContext) {
        switch (node.kind) {
            case SyntaxKind.PropertySignature:
                return serializeExistingTypeAnnotation(getEffectiveTypeAnnotationNode(node), context, node) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
            case SyntaxKind.Parameter:
                return typeFromParameter(node, context);
            case SyntaxKind.VariableDeclaration:
                return typeFromVariable(node, context);
            case SyntaxKind.PropertyDeclaration:
                return typeFromProperty(node, context);
            case SyntaxKind.BindingElement:
                return inferTypeOfDeclaration(node, context);
            case SyntaxKind.ExportAssignment:
                return serializeTypeOfExpression(node.expression, context, /*addUndefined*/ undefined, /*preserveLiterals*/ true);
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.BinaryExpression:
                return inferTypeOfDeclaration(node, context);
            case SyntaxKind.PropertyAssignment:
                return typeFromExpression(node.initializer, context) ?? inferTypeOfDeclaration(node, context, node.initializer);
            default:
                Debug.assertNever(node, `Node needs to be an inferrable node, found ${Debug.formatSyntaxKind((node as Node).kind)}`);
        }
    }
    function serializeReturnTypeForSignature(node: SignatureDeclaration | JSDocSignature, context: SyntacticTypeNodeBuilderContext): TypeNode | undefined {
        switch (node.kind) {
            case SyntaxKind.GetAccessor:
                return serializeTypeOfAccessor(node, context);
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.JSDocFunctionType:
            case SyntaxKind.JSDocSignature:
                return createReturnFromSignature(node, context);
            default:
                Debug.assertNever(node, `Node needs to be an inferrable node, found ${Debug.formatSyntaxKind((node as Node).kind)}`);
        }
    }
    function getTypeAnnotationFromAccessor(accessor: AccessorDeclaration): TypeNode | undefined {
        if (accessor) {
            return accessor.kind === SyntaxKind.GetAccessor
                ? (isInJSFile(accessor) && getJSDocType(accessor)) || getEffectiveReturnTypeNode(accessor)
                : getEffectiveSetAccessorTypeAnnotationNode(accessor);
        }
    }
    function getTypeAnnotationFromAllAccessorDeclarations(node: AccessorDeclaration, accessors: AllAccessorDeclarations) {
        let accessorType = getTypeAnnotationFromAccessor(node);
        if (!accessorType && node !== accessors.firstAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.firstAccessor);
        }
        if (!accessorType && accessors.secondAccessor && node !== accessors.secondAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.secondAccessor);
        }
        return accessorType;
    }

    function typeFromAccessor(node: AccessorDeclaration, context: SyntacticTypeNodeBuilderContext) {
        const accessorDeclarations = context.getAllAccessorDeclarations(node);
        const accessorType = getTypeAnnotationFromAllAccessorDeclarations(node, accessorDeclarations);
        if (accessorType && !isTypePredicateNode(accessorType)) {
            return serializeExistingTypeAnnotation(accessorType, context);
        }
        if (accessorDeclarations.getAccessor) {
            const oldEnclosingDecl = context.enclosingDeclaration;
            context.enclosingDeclaration = accessorDeclarations.getAccessor;
            const result = createReturnFromSignature(accessorDeclarations.getAccessor, context);
            context.enclosingDeclaration = oldEnclosingDecl;
            return result;
        }
    }
    function typeFromVariable(node: VariableDeclaration, context: SyntacticTypeNodeBuilderContext) {
        const declaredType = getEffectiveTypeAnnotationNode(node);
        if (declaredType) {
            return serializeExistingTypeAnnotation(declaredType, context);
        }
        let resultType;
        if (node.initializer) {
            if (!context.isExpandoFunctionDeclaration(node)) {
                resultType = typeFromExpression(node.initializer, context, /*isConstContext*/ undefined, /*requiresAddingUndefined*/ undefined, isVarConstLike(node));
            }
        }
        return resultType ?? inferTypeOfDeclaration(node, context);
    }
    function typeFromParameter(node: ParameterDeclaration, context: SyntacticTypeNodeBuilderContext) {
        const parent = node.parent;
        if (parent.kind === SyntaxKind.SetAccessor) {
            return serializeTypeOfAccessor(parent, context);
        }
        const declaredType = getEffectiveTypeAnnotationNode(node);
        let resultType;
        const requiresAddingImplicitUndefined = context.requiresAddingImplicitUndefined(node);
        if (declaredType) {
            return serializeExistingTypeAnnotation(declaredType, context, undefined, requiresAddingImplicitUndefined);
        }
        if (node.initializer && isIdentifier(node.name)) {
            resultType = typeFromExpression(node.initializer, context, undefined, requiresAddingImplicitUndefined);
        }
        return resultType ?? inferTypeOfDeclaration(node, context);
    }
    function typeFromProperty(node: PropertyDeclaration, context: SyntacticTypeNodeBuilderContext) {
        const declaredType = getEffectiveTypeAnnotationNode(node);
        if (declaredType) {
            return serializeExistingTypeAnnotation(declaredType, context);
        }
        let resultType;
        if (node.initializer) {
            const isReadonly = isDeclarationReadonly(node);
            resultType = typeFromExpression(node.initializer, context, /*isConstContext*/ undefined, /*requiresAddingUndefined*/ undefined, isReadonly);
        }
        return resultType ?? inferTypeOfDeclaration(node, context);
    }

    function inferTypeOfDeclaration(
        node: HasInferredType,
        context: SyntacticTypeNodeBuilderContext,
        enclosingDeclaration?: Node,
    ) {
        context.tracker.reportInferenceFallback(node);
        return context.serializeTypeOfDeclaration(node, enclosingDeclaration);
    }

    function inferExpressionType(node: Expression, context: SyntacticTypeNodeBuilderContext, reportFallback = true, requiresAddingUndefined?: boolean) {
        if (reportFallback) {
            context.tracker.reportInferenceFallback(node);
        }
        return context.serializeTypeOfExpression(node) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function inferReturnTypeOfSignatureSignature(node: SignatureDeclaration | JSDocSignature, context: SyntacticTypeNodeBuilderContext, enclosingDeclaration?: Node) {
        context.tracker.reportInferenceFallback(node);
        return context.serializeReturnTypeForSignature(node, enclosingDeclaration) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function inferAccessorType(node: GetAccessorDeclaration | SetAccessorDeclaration, allAccessors: AllAccessorDeclarations, context: SyntacticTypeNodeBuilderContext) {
        if (node.kind === SyntaxKind.GetAccessor) {
            return createReturnFromSignature(node, context);
        }
        else {
            context.tracker.reportInferenceFallback(node);
            return (allAccessors.getAccessor && createReturnFromSignature(allAccessors.getAccessor, context))
                ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
    }

    function typeFromTypeAssertion(expression: Expression, type: TypeNode, context: SyntacticTypeNodeBuilderContext, requiresAddingUndefined: boolean) {
        if (isConstTypeReference(type)) {
            return typeFromExpression(expression, context, /*isConstContext*/ true, requiresAddingUndefined);
        }
        return serializeExistingTypeAnnotation(type, context, undefined, requiresAddingUndefined);
    }
    function typeFromExpression(node: Expression, context: SyntacticTypeNodeBuilderContext, isConstContext = false, requiresAddingUndefined = false, preserveLiterals = false): TypeNode | undefined {
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                if (isJSDocTypeAssertion(node)) {
                    return typeFromTypeAssertion(node.expression, getJSDocTypeAssertionType(node), context, requiresAddingUndefined);
                }
                return typeFromExpression((node as ParenthesizedExpression).expression, context, isConstContext, requiresAddingUndefined);
            case SyntaxKind.Identifier:
                if (context.isUndefinedIdentifierExpression(node as Identifier)) {
                    return createUndefinedTypeNode();
                }
                break;
            case SyntaxKind.NullKeyword:
                if (strictNullChecks) {
                    return addUndefinedIfNeeded(factory.createLiteralTypeNode(factory.createNull()), requiresAddingUndefined, context);
                }
                else {
                    return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                }
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                return typeFromFunctionLikeExpression(node as ArrowFunction | FunctionExpression, context, requiresAddingUndefined);
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
                const asExpression = node as AsExpression | TypeAssertion;
                return typeFromTypeAssertion(asExpression.expression, asExpression.type, context, requiresAddingUndefined);
            case SyntaxKind.PrefixUnaryExpression:
                const unaryExpression = node as PrefixUnaryExpression;
                if (isPrimitiveLiteralValue(unaryExpression)) {
                    return typeFromPrimitiveLiteral(
                        unaryExpression.operator === SyntaxKind.PlusToken ? unaryExpression.operand: unaryExpression, 
                        unaryExpression.operand.kind === SyntaxKind.BigIntLiteral ? SyntaxKind.BigIntKeyword: SyntaxKind.NumberKeyword, 
                        context, 
                        isConstContext || preserveLiterals, 
                        requiresAddingUndefined
                    );
                }
                break;
            case SyntaxKind.ArrayLiteralExpression:
                return typeFromArrayLiteral(node as ArrayLiteralExpression, context, isConstContext, requiresAddingUndefined);
            case SyntaxKind.ObjectLiteralExpression:
                return typeFromObjectLiteral(node as ObjectLiteralExpression, context, isConstContext, requiresAddingUndefined);
            case SyntaxKind.ClassExpression:
                return inferExpressionType(node as ClassExpression, context, true, requiresAddingUndefined);
            case SyntaxKind.TemplateExpression:
                if (!isConstContext && !preserveLiterals) {
                    return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
                }
                break;
            default: 
                let typeKind: KeywordTypeSyntaxKind | undefined;
                switch(node.kind) {
                    case SyntaxKind.NumericLiteral:
                        typeKind = SyntaxKind.NumberKeyword
                        break;
                    case SyntaxKind.NoSubstitutionTemplateLiteral:
                    case SyntaxKind.StringLiteral:
                        typeKind = SyntaxKind.StringKeyword;
                        break;
                    case SyntaxKind.BigIntLiteral:
                        typeKind = SyntaxKind.BigIntKeyword;
                        break;
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.FalseKeyword:
                        typeKind = SyntaxKind.BooleanKeyword;
                        break;
                }
                if(typeKind) {
                    return typeFromPrimitiveLiteral(node as PrimitiveLiteral, typeKind, context, isConstContext || preserveLiterals, requiresAddingUndefined);
                }
            
        }
        return undefined;
    }
    function typeFromFunctionLikeExpression(fnNode: FunctionExpression | ArrowFunction, context: SyntacticTypeNodeBuilderContext, requiresAddingUndefined: boolean) {
        context.enclosingDeclaration = fnNode;
        const returnType = serializeExistingTypeAnnotation(fnNode.type, context, fnNode) ??
            createReturnFromSignature(fnNode, context);
        const fnTypeNode = factory.createFunctionTypeNode(
            reuseTypeParameters(fnNode.typeParameters, context),
            fnNode.parameters.map(p => ensureParameter(p, context)),
            returnType,
        );
        return addUndefinedIfNeeded(fnTypeNode, requiresAddingUndefined, context);
    }
    function canGetTypeFromArrayLiteral(arrayLiteral: ArrayLiteralExpression, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean) {
        if (!isConstContext) {
            context.tracker.reportInferenceFallback(arrayLiteral);
            return false;
        }
        for (const element of arrayLiteral.elements) {
            if (element.kind === SyntaxKind.SpreadElement) {
                context.tracker.reportInferenceFallback(element);
                return false;
            }
        }
        return true;
    }
    function typeFromArrayLiteral(arrayLiteral: ArrayLiteralExpression, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean, requiresAddingUndefined: boolean) {
        if (!canGetTypeFromArrayLiteral(arrayLiteral, context, isConstContext)) {
            return inferExpressionType(arrayLiteral, context, /*reportFallback*/ false, requiresAddingUndefined);
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
                const elementType = typeFromExpression(element, context, isConstContext) ?? inferExpressionType(element, context);
                elementTypesInfo.push(elementType);
            }
        }
        const tupleType = factory.createTupleTypeNode(elementTypesInfo);
        tupleType.emitNode = { flags: 1, autoGenerate: undefined, internalFlags: 0 };
        return addUndefinedIfNeeded(factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleType), requiresAddingUndefined, context);
    }
    function canGetTypeFromObjectLiteral(objectLiteral: ObjectLiteralExpression, context: SyntacticTypeNodeBuilderContext) {
        let result = true;
        for (const prop of objectLiteral.properties) {
            if (prop.flags & NodeFlags.ThisNodeHasError) {
                result = false;
                break; // Bail if parse errors
            }
            if (prop.kind === SyntaxKind.ShorthandPropertyAssignment || prop.kind === SyntaxKind.SpreadAssignment) {
                context.tracker.reportInferenceFallback(prop);
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
                    context.tracker.reportInferenceFallback(prop.name);
                    result = false;
                }
            }
        }
        return result;
    }
    function typeFromObjectLiteral(objectLiteral: ObjectLiteralExpression, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean, requiresAddingUndefined: boolean) {
        if (!canGetTypeFromObjectLiteral(objectLiteral, context)) return inferExpressionType(objectLiteral, context, /*reportFallback*/ false, requiresAddingUndefined);

        const properties: TypeElement[] = [];
        const oldFlags = context.flags;
        context.flags |= NodeBuilderFlags.InObjectTypeLiteral;
        for (const prop of objectLiteral.properties) {
            Debug.assert(!isShorthandPropertyAssignment(prop) && !isSpreadAssignment(prop));

            let name = prop.name;
            if (prop.name.kind === SyntaxKind.ComputedPropertyName) {
                let computedNameExpressionType;
                if (isEntityNameExpression(prop.name.expression)) {
                    const visibilityResult = context.isEntityNameVisible(prop.name.expression, /*shouldComputeAliasToMakeVisible*/ false);

                    if (!context.isNonNarrowedBindableName(prop.name)) {
                        context.tracker.reportInferenceFallback(prop.name);
                    }
                    if (visibilityResult.accessibility === SymbolAccessibility.Accessible) {
                        context.trackComputedName(prop.name.expression);
                    }
                    else {
                        context.tracker.reportInferenceFallback(prop.name);
                        computedNameExpressionType = inferExpressionType(prop.name.expression, context, /*reportFallback*/ false);
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
                    newProp = typeFromObjectLiteralMethod(prop, name, context, isConstContext);
                    break;
                case SyntaxKind.PropertyAssignment:
                    newProp = typeFromObjectLiteralPropertyAssignment(prop, name, context, isConstContext);
                    break;
                case SyntaxKind.SetAccessor:
                case SyntaxKind.GetAccessor:
                    newProp = typeFromObjectLiteralAccessor(prop, name, context);
                    break;
            }
            if (newProp) {
                setCommentRange(newProp, prop);
                properties.push(newProp);
            }
        }

        context.flags = oldFlags;
        return addUndefinedIfNeeded(factory.createTypeLiteralNode(properties), requiresAddingUndefined, context);
    }

    function typeFromObjectLiteralPropertyAssignment(prop: PropertyAssignment, name: PropertyName, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean) {
        const modifiers = isConstContext ?
            [factory.createModifier(SyntaxKind.ReadonlyKeyword)] :
            [];
        const typeNode = typeFromExpression(prop.initializer, context, isConstContext) ?? inferTypeOfDeclaration(prop, context, prop.initializer);
        return factory.createPropertySignature(
            modifiers,
            name,
            /*questionToken*/ undefined,
            typeNode,
        );
    }

    function ensureParameter(p: ParameterDeclaration, context: SyntacticTypeNodeBuilderContext) {
        // TODO: We will probably need to add a fake scopes for the signature (to hold the type parameters and the parameter)
        // For now this is good enough since the new serialization is used for Nodes in the same context.
        return factory.updateParameterDeclaration(
            p,
            [],
            p.dotDotDotToken,
            context.serializeNameOfParameter(p),
            context.isOptionalParameter(p) ? (p.questionToken || factory.createToken(SyntaxKind.QuestionToken)) : undefined,
            typeFromParameter(p, context), // Ignore private param props, since this type is going straight back into a param
            /*initializer*/ undefined,
        );
    }
    function reuseTypeParameters(typeParameters: NodeArray<TypeParameterDeclaration> | undefined, context: SyntacticTypeNodeBuilderContext) {
        // TODO: We will probably need to add a fake scopes for the signature (to hold the type parameters and the parameter)
        // For now this is good enough since the new serialization is used for Nodes in the same context.
        return typeParameters?.map(tp =>
            factory.updateTypeParameterDeclaration(
                tp,
                tp.modifiers,
                tp.name,
                serializeExistingTypeAnnotation(tp.constraint, context, tp.parent),
                serializeExistingTypeAnnotation(tp.default, context, tp.parent),
            )
        );
    }
    function typeFromObjectLiteralMethod(method: MethodDeclaration, name: PropertyName, context: SyntacticTypeNodeBuilderContext, isConstContext: boolean) {
        const returnType = createReturnFromSignature(method, context);
        const typeParameters = reuseTypeParameters(method.typeParameters, context);
        const parameters = method.parameters.map(p => ensureParameter(p, context));
        if (isConstContext) {
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
    function typeFromObjectLiteralAccessor(accessor: GetAccessorDeclaration | SetAccessorDeclaration, name: PropertyName, context: SyntacticTypeNodeBuilderContext) {
        const allAccessors = context.getAllAccessorDeclarations(accessor);
        const getAccessorType = allAccessors.getAccessor && getTypeAnnotationFromAccessor(allAccessors.getAccessor);
        const setAccessorType = allAccessors.setAccessor && getTypeAnnotationFromAccessor(allAccessors.setAccessor);
        // We have types for both accessors, we can't know if they are the same type so we keep both accessors
        if (getAccessorType !== undefined && setAccessorType !== undefined) {
            const parameters = accessor.parameters.map(p => ensureParameter(p, context));

            if (isGetAccessor(accessor)) {
                return factory.updateGetAccessorDeclaration(
                    accessor,
                    [],
                    name,
                    parameters,
                    serializeExistingTypeAnnotation(getAccessorType, context),
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
            const propertyType = foundType ? serializeExistingTypeAnnotation(foundType, context) : inferAccessorType(accessor, allAccessors, context);

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
    function typeFromPrimitiveLiteral(node: PrimitiveLiteral, baseType: KeywordTypeSyntaxKind, context: SyntacticTypeNodeBuilderContext, preserveLiterals: boolean, requiresAddingUndefined: boolean) {
        let result;
        if (preserveLiterals) {
            if (node.kind === SyntaxKind.PrefixUnaryExpression && node.operator === SyntaxKind.PlusToken) {
                result = factory.createLiteralTypeNode(node.operand);
            }
            result = factory.createLiteralTypeNode(node);
        }
        else {
            result = factory.createKeywordTypeNode(baseType);
        }
        return addUndefinedIfNeeded(result, requiresAddingUndefined, context);
    }

    function addUndefinedIfNeeded(node: TypeNode, addUndefined: boolean, context: SyntacticTypeNodeBuilderContext) {
        if (!strictNullChecks || !addUndefined) return node;
        if(!canAddUndefined(node)) {
            context.tracker.reportInferenceFallback(node);
        }
        if(isUnionTypeNode(node)) {
            return factory.createUnionTypeNode([...node.types, factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)]);
        }
        return factory.createUnionTypeNode([node, factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)]);
    }
    function canAddUndefined(node: TypeNode): boolean {
        if (!strictNullChecks) return true;
        if (
            isKeyword(node.kind)
            || node.kind === SyntaxKind.LiteralType
            || node.kind === SyntaxKind.FunctionType
            || node.kind === SyntaxKind.ConstructorType
            || node.kind === SyntaxKind.ArrayType
            || node.kind === SyntaxKind.TupleType
            || node.kind === SyntaxKind.TypeLiteral
            || node.kind === SyntaxKind.TemplateLiteralType
            || node.kind === SyntaxKind.ThisType
        ) {
            return true;
        }
        if (node.kind === SyntaxKind.ParenthesizedType) {
            return canAddUndefined((node as ParenthesizedTypeNode).type);
        }
        if (node.kind === SyntaxKind.UnionType || node.kind === SyntaxKind.IntersectionType) {
            return (node as UnionTypeNode | IntersectionTypeNode).types.every(canAddUndefined);
        }
        return false;
    }

    function createReturnFromSignature(fn: SignatureDeclaration | JSDocSignature, context: SyntacticTypeNodeBuilderContext) {
        let returnType;
        const returnTypeNode = getEffectiveReturnTypeNode(fn);
        if (returnTypeNode) {
            returnType = serializeExistingTypeAnnotation(returnTypeNode, context, fn);
        }
        if (!returnType && isValueSignatureDeclaration(fn)) {
            returnType = typeFromSingleReturnExpression(fn, context);
        }
        return returnType ?? inferReturnTypeOfSignatureSignature(fn, context, fn);
    }

    function typeFromSingleReturnExpression(declaration: FunctionLikeDeclaration | undefined, context: SyntacticTypeNodeBuilderContext): TypeNode | undefined {
        let candidateExpr: Expression | undefined;
        if (declaration && !nodeIsMissing(declaration.body)) {
            const body = declaration.body;
            if (body && isBlock(body)) {
                forEachReturnStatement(body, s => {
                    if (!candidateExpr) {
                        candidateExpr = s.expression;
                    }
                    else {
                        candidateExpr = undefined;
                        return true;
                    }
                });
            }
            else {
                candidateExpr = body;
            }
        }
        if (candidateExpr) {
            return typeFromExpression(candidateExpr, context);
        }
    }
}


