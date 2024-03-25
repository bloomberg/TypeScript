import { AccessorDeclaration, AllAccessorDeclarations, ArrayLiteralExpression, ArrowFunction, AsExpression, BigIntLiteral, BinaryExpression, BindingElement, BindingName, CompilerOptions, ComputedPropertyName, Debug, ElementAccessExpression, EntityNameOrEntityNameExpression, ExportAssignment, Expression, factory, FalseLiteral, forEachReturnStatement, FunctionDeclaration, FunctionExpression, FunctionLikeDeclaration, GetAccessorDeclaration, getEffectiveReturnTypeNode, getEffectiveTypeAnnotationNode, getJSDocTypeAssertionType, getStrictOptionValue, HasInferredType, Identifier, IntersectionTypeNode, isBlock, isClassExpression, isConstTypeReference, isDeclarationReadonly, isEntityNameExpression, isGetAccessor, isIdentifier, isJSDocTypeAssertion, isKeyword, isLiteralTypeNode, isOptionalDeclaration, isPrimitiveLiteralValue, isShorthandPropertyAssignment, isSpreadAssignment, isTypeQueryNode, isUnionTypeNode, isValueSignatureDeclaration, isVarConstLike, JSDocSignature, KeywordTypeSyntaxKind, MethodDeclaration, Node, NodeArray, NodeBuilderFlags, NodeFlags, nodeIsMissing, NoSubstitutionTemplateLiteral, NumericLiteral, ObjectLiteralExpression, ParameterDeclaration, ParenthesizedExpression, ParenthesizedTypeNode, PrefixUnaryExpression, PrimitiveLiteral, PropertyAccessExpression, PropertyAssignment, PropertyDeclaration, PropertyName, PropertySignature, SetAccessorDeclaration, setCommentRange, SignatureDeclaration, StringLiteral, SymbolAccessibility, SymbolTracker, SymbolVisibilityResult, SyntaxKind, TrueLiteral, TypeAssertion, TypeElement, TypeNode, TypeParameterDeclaration, UnionTypeNode, VariableDeclaration } from "../../_namespaces/ts";

interface SyntacticExpressionToTypeContext {
    enclosingDeclaration?: Node;
    flags: NodeBuilderFlags;
    tracker: Required<Pick<SymbolTracker, 'reportInferenceFallback'>>;
    isUndefinedIdentifier(name: Identifier): boolean;
    requiresAddingImplicitUndefined(name: ParameterDeclaration): boolean;
    isLiteralComputedName(name: ComputedPropertyName): boolean;
    isExpandoFunctionDeclaration(name: FunctionDeclaration | VariableDeclaration): boolean;
    isOptionalParameter(name: ParameterDeclaration): boolean;
    getAllAccessorDeclarations(declaration: AccessorDeclaration): AllAccessorDeclarations;
    isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, shouldComputeAliasToMakeVisible?: boolean): SymbolVisibilityResult;
    serializeExistingTypeNode(node: TypeNode | undefined, enclosingDeclaration?: Node): TypeNode | undefined;
    serializeReturnTypeForSignature(signatureDeclaration: SignatureDeclaration| JSDocSignature, enclosingDeclaration?: Node): TypeNode | undefined;
    serializeTypeOfExpression(expr: Expression, enclosingDeclaration?: Node): TypeNode | undefined;
    serializeTypeOfDeclaration(node: PropertyAssignment | PropertyAccessExpression | BinaryExpression | ElementAccessExpression | VariableDeclaration | ParameterDeclaration | BindingElement | PropertyDeclaration | PropertySignature | ExportAssignment, enclosingDeclaration?: Node): TypeNode | undefined;
    serializeNameOfParameter(parameter: ParameterDeclaration): BindingName | string;
    trackComputedName(accessExpression: EntityNameOrEntityNameExpression): void
}

export function createSyntacticExpressionToTypeWorker(options: CompilerOptions) {
    const strictNullChecks = getStrictOptionValue(options, "strictNullChecks");

    return {
        typeFromExpression,
        serializeTypeOfDeclaration,
        serializeReturnTypeForSignature,
        serializeTypeOfExpression,
    }
    function serializeExistingTypeAnnotation(type: TypeNode | undefined, context: SyntacticExpressionToTypeContext, enclosingDeclaration?: Node) {
        return context.serializeExistingTypeNode(type, enclosingDeclaration);
    }
    function serializeTypeOfExpression(expr: Expression, context: SyntacticExpressionToTypeContext, addUndefined?: boolean, preserveLiterals?: boolean) {
        return typeFromExpression(expr, context, /*isConstContext*/ false, addUndefined, preserveLiterals) ?? inferExpressionType(expr, context);
    }
    function serializeTypeOfDeclaration(node: HasInferredType, context: SyntacticExpressionToTypeContext) {
        switch (node.kind) {
            case SyntaxKind.PropertySignature:
                return serializeExistingTypeAnnotation(getEffectiveTypeAnnotationNode(node) , context) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
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
                return serializeExistingTypeAnnotation(getEffectiveTypeAnnotationNode(node) , context) ?? inferTypeOfDeclaration(node, context)
            case SyntaxKind.PropertyAssignment:
                return typeFromExpression(node.initializer, context) ?? inferTypeOfDeclaration(node, context, node.initializer);
            default:
                Debug.assertNever(node, `Node needs to be an inferrable node, found ${Debug.formatSyntaxKind((node as Node).kind)}`);
        }
    }
    function serializeReturnTypeForSignature(node: SignatureDeclaration | JSDocSignature, context: SyntacticExpressionToTypeContext): TypeNode | undefined {
        switch (node.kind) {
            case SyntaxKind.GetAccessor:
                return typeFromAccessor(node, context);
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
                ? accessor.type // Getter - return type
                : accessor.parameters.length > 0
                ? accessor.parameters[0].type // Setter parameter type
                : undefined;
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

    function typeFromAccessor(node: AccessorDeclaration, context: SyntacticExpressionToTypeContext) {
        const accessorDeclarations = context.getAllAccessorDeclarations(node);
        const accessorType = getTypeAnnotationFromAllAccessorDeclarations(node, accessorDeclarations);
        if (accessorType) {
            return serializeExistingTypeAnnotation(accessorType, context)
        }
        if (accessorDeclarations.getAccessor) {
            return createReturnFromSignature(accessorDeclarations.getAccessor, context);
        }
        return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }
    function typeFromVariable(node: VariableDeclaration, context: SyntacticExpressionToTypeContext) {
        const declaredType = getEffectiveTypeAnnotationNode(node);
        if (declaredType) {
            return serializeExistingTypeAnnotation(declaredType, context);
        }
        let resultType;
        // let isolatedDeclarationsDiagnostic: typeof createVariableOrPropertyError | undefined = createVariableOrPropertyError;
        if (node.initializer) {
            if (!(isClassExpression(node.initializer) || context.isExpandoFunctionDeclaration(node))) {
                resultType = typeFromExpression(node.initializer, context, /*isConstContext*/ undefined, /*requiresAddingUndefined*/ undefined, isVarConstLike(node));
            }
        }
        return resultType ?? inferTypeOfDeclaration(node,context);
    }
    function typeFromParameter(node: ParameterDeclaration, context: SyntacticExpressionToTypeContext) {
        const parent = node.parent;
        if (parent.kind === SyntaxKind.SetAccessor) {
            return typeFromAccessor(parent, context);
        }
        const declaredType = getEffectiveTypeAnnotationNode(node);
        const addUndefined = context.requiresAddingImplicitUndefined(node);
        let resultType;
        if (!addUndefined) {
            if (declaredType) {
                return serializeExistingTypeAnnotation(declaredType, context, node.parent);
            }
            if (node.initializer && isIdentifier(node.name)) {
                resultType = typeFromExpression(node.initializer, context);
            }
        }
        return resultType ?? inferTypeOfDeclaration(node, context, node.parent);
    }
    function typeFromProperty(node: PropertyDeclaration, context: SyntacticExpressionToTypeContext) {
        const declaredType = getEffectiveTypeAnnotationNode(node);
        if (declaredType) {
            return serializeExistingTypeAnnotation(declaredType, context);
        }
        let resultType;
        if (node.initializer) {
            const isOptional = isOptionalDeclaration(node);
            const isReadonly = isDeclarationReadonly(node);
            resultType = typeFromExpression(node.initializer, context, /*isConstContext*/ undefined, isOptional, isReadonly);
            if (isOptional && resultType) {
                return addUndefinedInUnion(resultType);
            }
        }
        return resultType ?? inferTypeOfDeclaration(node, context);
    }

    function inferTypeOfDeclaration(
        node: PropertyAssignment | PropertyAccessExpression | BinaryExpression | ElementAccessExpression |VariableDeclaration | ParameterDeclaration | BindingElement | PropertyDeclaration | PropertySignature | ExportAssignment,
        context: SyntacticExpressionToTypeContext,
        enclosingDeclaration?: Node,
    ) {
        context.tracker.reportInferenceFallback(node);

        // const savedFlags = context.flags;
        // context.flags |=  node.kind === SyntaxKind.PropertyAssignment ? NodeBuilderFlags.InObjectTypeLiteral : NodeBuilderFlags.None;
        const result = context.serializeTypeOfDeclaration(node, enclosingDeclaration);
        // context.flags = savedFlags;
        return result;
    }
    

    function inferExpressionType(node: Expression, context: SyntacticExpressionToTypeContext, reportFallback = true) {
        if(reportFallback) {
            context.tracker.reportInferenceFallback(node);
        }
        return context.serializeTypeOfExpression(node) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function inferReturnTypeOfSignatureSignature(node: SignatureDeclaration| JSDocSignature, context: SyntacticExpressionToTypeContext) {
        context.tracker.reportInferenceFallback(node);
        return context.serializeReturnTypeForSignature(node, node) ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function inferAccessorType(node: GetAccessorDeclaration | SetAccessorDeclaration, allAccessors: AllAccessorDeclarations, context: SyntacticExpressionToTypeContext) {
        if (node.kind === SyntaxKind.GetAccessor) {
            return createReturnFromSignature(node, context);
        }
        else {
            context.tracker.reportInferenceFallback(node);
            return (allAccessors.getAccessor && createReturnFromSignature(allAccessors.getAccessor, context))
                ?? factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
    }

    function typeFromTypeAssertion(expression: Expression, type: TypeNode, context: SyntacticExpressionToTypeContext, requiresAddingUndefined: boolean) {
        if (isConstTypeReference(type)) {
            return typeFromExpression(expression, context, /*isConstContext*/ true, requiresAddingUndefined);
        }
        if (requiresAddingUndefined && !canAddUndefined(type)) {
            return undefined;
        }
        return serializeExistingTypeAnnotation(type, context);
    }
    function typeFromExpression(node: Expression, context: SyntacticExpressionToTypeContext, isConstContext = false, requiresAddingUndefined = false, preserveLiterals = false): TypeNode | undefined {
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                if(isJSDocTypeAssertion(node)) {
                    return typeFromTypeAssertion(node.expression, getJSDocTypeAssertionType(node), context, requiresAddingUndefined)
                }
                return typeFromExpression((node as ParenthesizedExpression).expression, context, isConstContext, requiresAddingUndefined);
            case SyntaxKind.Identifier:
                if (context.isUndefinedIdentifier(node as Identifier)) {
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
                return typeFromFunctionLikeExpression(node as ArrowFunction | FunctionExpression, context);
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
                const asExpression = node as AsExpression | TypeAssertion;
                return typeFromTypeAssertion(asExpression.expression, asExpression.type, context, requiresAddingUndefined);
            case SyntaxKind.PrefixUnaryExpression:
                const unaryExpression = node as PrefixUnaryExpression;
                if (isPrimitiveLiteralValue(unaryExpression)) {
                    if (unaryExpression.operand.kind === SyntaxKind.BigIntLiteral) {
                        return typeFromPrimitiveLiteral(unaryExpression, SyntaxKind.BigIntKeyword, isConstContext || preserveLiterals);
                    }
                    if (unaryExpression.operand.kind === SyntaxKind.NumericLiteral) {
                        return typeFromPrimitiveLiteral(unaryExpression, SyntaxKind.NumberKeyword, isConstContext || preserveLiterals);
                    }
                }
                break;
            case SyntaxKind.NumericLiteral:
                return typeFromPrimitiveLiteral(node as NumericLiteral, SyntaxKind.NumberKeyword, isConstContext || preserveLiterals);
            case SyntaxKind.TemplateExpression:
                if (!isConstContext && !preserveLiterals) {
                    return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
                }
                break;
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.StringLiteral:
                return typeFromPrimitiveLiteral(node as StringLiteral | NoSubstitutionTemplateLiteral, SyntaxKind.StringKeyword, isConstContext || preserveLiterals);
            case SyntaxKind.BigIntLiteral:
                return typeFromPrimitiveLiteral(node as BigIntLiteral, SyntaxKind.BigIntKeyword, isConstContext || preserveLiterals);
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return typeFromPrimitiveLiteral(node as TrueLiteral | FalseLiteral, SyntaxKind.BooleanKeyword, isConstContext || preserveLiterals);
            case SyntaxKind.ArrayLiteralExpression:
                return typeFromArrayLiteral(node as ArrayLiteralExpression, context, isConstContext);
            case SyntaxKind.ObjectLiteralExpression:
                return typeFromObjectLiteral(node as ObjectLiteralExpression, context, isConstContext);
        }
        return undefined;
    }
    function typeFromFunctionLikeExpression(fnNode: FunctionExpression | ArrowFunction, context: SyntacticExpressionToTypeContext) {
        const returnType = serializeExistingTypeAnnotation(fnNode.type, context, fnNode) ??
            createReturnFromSignature(fnNode, context);
        const fnTypeNode = factory.createFunctionTypeNode(
            reuseTypeParameters(fnNode.typeParameters, context),
            fnNode.parameters.map(p => ensureParameter(p, context)),
            returnType,
        );
        return fnTypeNode;
    }
    function canGetTypeFromArrayLiteral(arrayLiteral: ArrayLiteralExpression, context: SyntacticExpressionToTypeContext, isConstContext: boolean) {
        if(!isConstContext) {
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
    function typeFromArrayLiteral(arrayLiteral: ArrayLiteralExpression, context: SyntacticExpressionToTypeContext, isConstContext: boolean) {
        if (!canGetTypeFromArrayLiteral(arrayLiteral, context, isConstContext)) {
            return inferExpressionType(arrayLiteral, context, /*reportFallback*/ false);
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
        return factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleType);
    }
    function canGetTypeFromObjectLiteral(objectLiteral: ObjectLiteralExpression, context: SyntacticExpressionToTypeContext) {
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
    function typeFromObjectLiteral(objectLiteral: ObjectLiteralExpression, context: SyntacticExpressionToTypeContext, isConstContext: boolean) {
        if (!canGetTypeFromObjectLiteral(objectLiteral, context)) return inferExpressionType(objectLiteral, context, /*reportFallback*/ false);

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

                    if (!context.isLiteralComputedName(prop.name)) {
                        context.tracker.reportInferenceFallback(prop.name);
                    }
                    if (visibilityResult.accessibility === SymbolAccessibility.Accessible) {
                        context.trackComputedName(prop.name.expression);
                    }
                    else{
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
        return factory.createTypeLiteralNode(properties);
    }

    function typeFromObjectLiteralPropertyAssignment(prop: PropertyAssignment, name: PropertyName, context: SyntacticExpressionToTypeContext, isConstContext: boolean) {
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

    function ensureParameter(p: ParameterDeclaration, context: SyntacticExpressionToTypeContext) {
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
    function reuseTypeParameters(typeParameters: NodeArray<TypeParameterDeclaration> | undefined, context: SyntacticExpressionToTypeContext) {
        // TODO: We will probably need to add a fake scopes for the signature (to hold the type parameters and the parameter)
        // For now this is good enough since the new serialization is used for Nodes in the same context. 
        return typeParameters?.map(tp => factory.updateTypeParameterDeclaration(
            tp,
            tp.modifiers,
            tp.name,
            serializeExistingTypeAnnotation(tp.constraint, context, tp.parent),
            serializeExistingTypeAnnotation(tp.default, context, tp.parent),
        ));
    }
    function typeFromObjectLiteralMethod(method: MethodDeclaration, name: PropertyName, context: SyntacticExpressionToTypeContext, isConstContext: boolean) {
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
    function typeFromObjectLiteralAccessor(accessor: GetAccessorDeclaration | SetAccessorDeclaration, name: PropertyName, context: SyntacticExpressionToTypeContext) {
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
    function typeFromPrimitiveLiteral(node: PrimitiveLiteral, baseType: string | KeywordTypeSyntaxKind, preserveLiterals = false) {
        if (preserveLiterals) {
            if (node.kind === SyntaxKind.PrefixUnaryExpression && node.operator === SyntaxKind.PlusToken) {
                return factory.createLiteralTypeNode(node.operand);
            }
            return factory.createLiteralTypeNode(node);
        }
        else {
            return typeof baseType === "number" ? factory.createKeywordTypeNode(baseType) : factory.createTypeReferenceNode(baseType);
        }
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

    function addUndefinedInUnion(type: TypeNode) {
        if (!strictNullChecks) return type;
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

    function createReturnFromSignature(fn: SignatureDeclaration | JSDocSignature, context: SyntacticExpressionToTypeContext) {
        let returnType;
        const returnTypeNode = getEffectiveReturnTypeNode(fn);
        if(returnTypeNode) {
            returnType = serializeExistingTypeAnnotation(returnTypeNode, context, fn);
        }
        if(!returnType && isValueSignatureDeclaration(fn)) {
            returnType = typeFromSingleReturnExpression(fn, context);
        }
        return returnType ?? inferReturnTypeOfSignatureSignature(fn, context);
    }
    
    function typeFromSingleReturnExpression(declaration: FunctionLikeDeclaration | undefined, context: SyntacticExpressionToTypeContext): TypeNode | undefined {
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
        if(candidateExpr) {
            return typeFromExpression(candidateExpr, context);
        }
    }
}