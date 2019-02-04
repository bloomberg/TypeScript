/*@internal*/
namespace ts {
    const enum ESNextSubstitutionFlags {
        /** Enables substitutions for async methods with `super` calls. */
        AsyncMethodsWithSuper = 1 << 0,
        /**
         * Enables substitutions for class expressions with static fields
         * which have initializers that reference the class name.
         */
        ClassAliases = 1 << 1,
    }

    /**
     * A mapping of private names to information needed for transformation.
     */
    type PrivateNameEnvironment = UnderscoreEscapedMap<PrivateNamedInstanceField>;

    /**
     * Identifies the type of private name.
     */
    const enum PrivateNameType {
        InstanceField
    }

    interface PrivateNamedInstanceField {
        type: PrivateNameType.InstanceField;
        weakMapName: Identifier;
    }

    export function transformESNext(context: TransformationContext) {
        const {
            resumeLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration
        } = context;

        const resolver = context.getEmitResolver();
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);

        const previousOnEmitNode = context.onEmitNode;
        context.onEmitNode = onEmitNode;

        const previousOnSubstituteNode = context.onSubstituteNode;
        context.onSubstituteNode = onSubstituteNode;

        let enabledSubstitutions: ESNextSubstitutionFlags;
        let enclosingFunctionFlags: FunctionFlags;
        let enclosingSuperContainerFlags: NodeCheckFlags = 0;

        /** Keeps track of property names accessed on super (`super.x`) within async functions. */
        let capturedSuperProperties: UnderscoreEscapedMap<true>;
        /** Whether the async function contains an element access on super (`super[x]`). */
        let hasSuperElementAccess: boolean;
        /** A set of node IDs for generated super accessors. */
        const substitutedSuperAccessors: boolean[] = [];

        let classAliases: Identifier[];

        /**
         * Tracks what computed name expressions originating from elided names must be inlined
         * at the next execution site, in document order
         */
        let pendingExpressions: Expression[] | undefined;

        /**
         * Tracks what computed name expression statements and static property initializers must be
         * emitted at the next execution site, in document order (for decorated classes).
         */
        let pendingStatements: Statement[] | undefined;

        const privateNameEnvironmentStack: PrivateNameEnvironment[] = [];

        return chainBundle(transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());
            return visited;
        }

        function visitor(node: Node): VisitResult<Node> {
            return visitorWorker(node, /*noDestructuringValue*/ false);
        }

        function visitorNoDestructuringValue(node: Node): VisitResult<Node> {
            return visitorWorker(node, /*noDestructuringValue*/ true);
        }

        function visitorNoAsyncModifier(node: Node): VisitResult<Node> {
            if (node.kind === SyntaxKind.AsyncKeyword) {
                return undefined;
            }
            return node;
        }

        function visitorWorker(node: Node, noDestructuringValue: boolean): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsESNext) === 0) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.AwaitExpression:
                    return visitAwaitExpression(node as AwaitExpression);
                case SyntaxKind.YieldExpression:
                    return visitYieldExpression(node as YieldExpression);
                case SyntaxKind.ReturnStatement:
                    return visitReturnStatement(node as ReturnStatement);
                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(node as LabeledStatement);
                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(node as ObjectLiteralExpression);
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(node as BinaryExpression, noDestructuringValue);
                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(node as ForOfStatement, /*outermostLabeledStatement*/ undefined);
                case SyntaxKind.ForStatement:
                    return visitForStatement(node as ForStatement);
                case SyntaxKind.VoidExpression:
                    return visitVoidExpression(node as VoidExpression);
                case SyntaxKind.Constructor:
                    return visitConstructorDeclaration(node as ConstructorDeclaration);
                case SyntaxKind.MethodDeclaration:
                    return visitMethodDeclaration(node as MethodDeclaration);
                case SyntaxKind.GetAccessor:
                    return visitGetAccessorDeclaration(node as GetAccessorDeclaration);
                case SyntaxKind.SetAccessor:
                    return visitSetAccessorDeclaration(node as SetAccessorDeclaration);
                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(node as FunctionDeclaration);
                case SyntaxKind.FunctionExpression:
                    return visitFunctionExpression(node as FunctionExpression);
                case SyntaxKind.ArrowFunction:
                    return visitArrowFunction(node as ArrowFunction);
                case SyntaxKind.Parameter:
                    return visitParameter(node as ParameterDeclaration);
                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(node as ExpressionStatement);
                case SyntaxKind.ParenthesizedExpression:
                    return visitParenthesizedExpression(node as ParenthesizedExpression, noDestructuringValue);
                case SyntaxKind.CatchClause:
                    return visitCatchClause(node as CatchClause);
                case SyntaxKind.PropertyAccessExpression:
                    if (capturedSuperProperties && isPropertyAccessExpression(node) && node.expression.kind === SyntaxKind.SuperKeyword) {
                        capturedSuperProperties.set(node.name.escapedText, true);
                    }
                    return visitPropertyAccessExpression(node as PropertyAccessExpression);
                case SyntaxKind.ElementAccessExpression:
                    if (capturedSuperProperties && (<ElementAccessExpression>node).expression.kind === SyntaxKind.SuperKeyword) {
                        hasSuperElementAccess = true;
                    }
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.ClassExpression:
                    return visitClassExpression(node as ClassExpression);
                case SyntaxKind.ClassDeclaration:
                    return visitClassDeclaration(node as ClassDeclaration);
                case SyntaxKind.PropertyDeclaration:
                    return visitPropertyDeclaration(node as PropertyDeclaration);
                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(node as VariableStatement);
                case SyntaxKind.ComputedPropertyName:
                    return visitComputedPropertyName(node as ComputedPropertyName);
                case SyntaxKind.PrefixUnaryExpression:
                    return visitPrefixUnaryExpression(node as PrefixUnaryExpression);
                case SyntaxKind.PostfixUnaryExpression:
                    return visitPostfixUnaryExpression(node as PostfixUnaryExpression);
                case SyntaxKind.CallExpression:
                    return visitCallExpression(node as CallExpression);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        /**
         * Specialized visitor that visits the immediate children of a class with ESNext syntax.
         *
         * @param node The node to visit.
         */
        function classElementVisitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.Constructor:
                    // Constructors for classes using ESNext syntax (like class properties)
                    // are transformed in `visitClassDeclaration` or `visitClassExpression`.
                    // We elide them here. The default visitor checks the transformFlags to
                    // determine whether the node contains ESNext syntax, so it can skip over
                    // constructors.
                    return undefined;

                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MethodDeclaration:
                    // Fallback to the default visit behavior.
                    return visitor(node);

                case SyntaxKind.SemicolonClassElement:
                    return node;

                default:
                    return Debug.failBadSyntaxKind(node);
            }
        }
        /**
         * If the name is a computed property, this function transforms it, then either returns an expression which caches the
         * value of the result or the expression itself if the value is either unused or safe to inline into multiple locations
         * @param shouldHoist Does the expression need to be reused? (ie, for an initializer or a decorator)
         */
        function getPropertyNameExpressionIfNeeded(name: PropertyName, shouldHoist: boolean): Expression | undefined {
            if (isComputedPropertyName(name)) {
                const expression = visitNode(name.expression, visitor, isExpression);
                const innerExpression = skipPartiallyEmittedExpressions(expression);
                const inlinable = isSimpleInlineableExpression(innerExpression);
                const alreadyTransformed = isAssignmentExpression(innerExpression) && isGeneratedIdentifier(innerExpression.left);
                if (!alreadyTransformed && !inlinable && shouldHoist) {
                    const generatedName = getGeneratedNameForNode(name);
                    hoistVariableDeclaration(generatedName);
                    return createAssignment(generatedName, expression);
                }
                return (inlinable || isIdentifier(innerExpression)) ? undefined : expression;
            }
        }

        function visitComputedPropertyName(name: ComputedPropertyName) {
            let node = visitEachChild(name, visitor, context);
            if (some(pendingExpressions)) {
                const expressions = pendingExpressions;
                expressions.push(name.expression);
                pendingExpressions = [];
                node = updateComputedPropertyName(
                    node,
                    inlineExpressions(expressions)
                );
            }
            return node;
        }

        function visitPropertyDeclaration(node: PropertyDeclaration) {
            Debug.assert(!some(node.decorators));
            // Create a temporary variable to store a computed property name (if necessary).
            // If it's not inlineable, then we emit an expression after the class which assigns
            // the property name to the temporary variable.
            const expr = getPropertyNameExpressionIfNeeded(node.name, !!node.initializer);
            if (expr && !isSimpleInlineableExpression(expr)) {
                (pendingExpressions || (pendingExpressions = [])).push(expr);
            }
            return undefined;
        }

        function visitClassDeclaration(node: ClassDeclaration) {
            const savedPendingExpressions = pendingExpressions;
            pendingExpressions = undefined;
            startPrivateNameEnvironment();

            const extendsClauseElement = getEffectiveBaseTypeNode(node);
            const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword);

            const statements: Statement[] = [
                updateClassDeclaration(
                    node,
                    node.decorators,
                    node.modifiers,
                    node.name,
                    node.typeParameters,
                    node.heritageClauses,
                    transformClassMembers(node, isDerivedClass)
                )
            ];

            // Write any pending expressions from elided or moved computed property names
            if (some(pendingExpressions)) {
                statements.push(createExpressionStatement(inlineExpressions(pendingExpressions!)));
            }
            endPrivateNameEnvironment();
            pendingExpressions = savedPendingExpressions;

            // Emit static property assignment. Because classDeclaration is lexically evaluated,
            // it is safe to emit static property assignment after classDeclaration
            // From ES6 specification:
            //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
            //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.
            const staticProperties = getInitializedProperties(node, /*isStatic*/ true);
            if (some(staticProperties)) {
                addInitializedPropertyStatements(statements, staticProperties, getInternalName(node));
            }

            return statements;
        }

        function visitClassExpression(node: ClassExpression): Expression {
            const savedPendingExpressions = pendingExpressions;
            pendingExpressions = undefined;
            startPrivateNameEnvironment();

            // If this class expression is a transformation of a decorated class declaration,
            // then we want to output the pendingExpressions as statements, not as inlined
            // expressions with the class statement.
            //
            // In this case, we use pendingStatements to produce the same output as the
            // class declaration transformation. The VariableStatement visitor will insert
            // these statements after the class expression variable statement.
            const isDecoratedClassDeclaration = isClassDeclaration(getOriginalNode(node));

            const staticProperties = getInitializedProperties(node, /*isStatic*/ true);
            const extendsClauseElement = getEffectiveBaseTypeNode(node);
            const isDerivedClass = !!(extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword);

            const classExpression = updateClassExpression(
                node,
                node.modifiers,
                node.name,
                node.typeParameters,
                visitNodes(node.heritageClauses, visitor, isHeritageClause),
                transformClassMembers(node, isDerivedClass)
            );

            if (some(staticProperties) || some(pendingExpressions)) {
                if (isDecoratedClassDeclaration) {
                    Debug.assertDefined(pendingStatements, "Decorated classes transformed by TypeScript are expected to be within a variable declaration.");

                    // Write any pending expressions from elided or moved computed property names or private names
                    if (some(pendingExpressions)) {
                        pendingStatements!.push(createExpressionStatement(inlineExpressions(pendingExpressions!)));
                    }
                    pendingExpressions = savedPendingExpressions;

                    if (some(staticProperties)) {
                        addInitializedPropertyStatements(pendingStatements!, staticProperties, getInternalName(node));
                    }
                    endPrivateNameEnvironment();
                    return classExpression;
                }
                else {
                    const expressions: Expression[] = [];
                    const isClassWithConstructorReference = resolver.getNodeCheckFlags(node) & NodeCheckFlags.ClassWithConstructorReference;
                    const temp = createTempVariable(hoistVariableDeclaration, !!isClassWithConstructorReference);
                    if (isClassWithConstructorReference) {
                        // record an alias as the class name is not in scope for statics.
                        enableSubstitutionForClassAliases();
                        const alias = getSynthesizedClone(temp);
                        alias.autoGenerateFlags &= ~GeneratedIdentifierFlags.ReservedInNestedScopes;
                        classAliases[getOriginalNodeId(node)] = alias;
                    }

                    // To preserve the behavior of the old emitter, we explicitly indent
                    // the body of a class with static initializers.
                    setEmitFlags(classExpression, EmitFlags.Indented | getEmitFlags(classExpression));
                    expressions.push(startOnNewLine(createAssignment(temp, classExpression)));
                    // Add any pending expressions leftover from elided or relocated computed property names
                    addRange(expressions, map(pendingExpressions, startOnNewLine));
                    addRange(expressions, generateInitializedPropertyExpressions(staticProperties, temp));
                    expressions.push(startOnNewLine(temp));

                    pendingExpressions = savedPendingExpressions;
                    endPrivateNameEnvironment();
                    return inlineExpressions(expressions);
                }
            }

            pendingExpressions = savedPendingExpressions;
            endPrivateNameEnvironment();
            return classExpression;
        }

        function transformClassMembers(node: ClassDeclaration | ClassExpression, isDerivedClass: boolean) {
            // Declare private names.
            const privateNamedProperties = filter(node.members, isPrivateNamedPropertyDeclaration);
            privateNamedProperties.forEach(property => addPrivateNameToEnvironment(property.name));

            const members: ClassElement[] = [];
            const constructor = transformConstructor(node, isDerivedClass);
            if (constructor) {
                members.push(constructor);
            }

            addRange(members, visitNodes(node.members, classElementVisitor, isClassElement));
            return setTextRange(createNodeArray(members), /*location*/ node.members);
        }

        function transformConstructor(node: ClassDeclaration | ClassExpression, isDerivedClass: boolean) {
            const constructor = visitNode(getFirstConstructorWithBody(node), visitor, isConstructorDeclaration);
            const containsPropertyInitializerOrPrivateProperty = forEach(
                node.members,
                member => isInitializedProperty(member) || isPrivateNamedPropertyDeclaration(member)
            );
            if (!containsPropertyInitializerOrPrivateProperty) {
                return constructor;
            }
            const parameters = visitParameterList(constructor ? constructor.parameters : undefined, visitor, context);
            const body = transformConstructorBody(node, constructor, isDerivedClass);
            if (!body) {
                return undefined;
            }
            return startOnNewLine(
                setOriginalNode(
                    setTextRange(
                        createConstructor(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            parameters,
                            body
                        ),
                        constructor || node
                    ),
                    constructor
                )
            );
        }

        function transformConstructorBody(node: ClassDeclaration | ClassExpression, constructor: ConstructorDeclaration | undefined, isDerivedClass: boolean) {
            const properties = filter(node.members, (node): node is PropertyDeclaration => isPropertyDeclaration(node) && !hasStaticModifier(node));

            // Only generate synthetic constructor when there are property declarations to move.
            if (!constructor && !some(properties)) {
                return visitFunctionBody(/*node*/ undefined, visitor, context);
            }

            resumeLexicalEnvironment();

            let indexOfFirstStatement = 0;
            let statements: Statement[] = [];

            if (!constructor && isDerivedClass) {
                // Add a synthetic `super` call:
                //
                //  super(...arguments);
                //
                statements.push(
                    createExpressionStatement(
                        createCall(
                            createSuper(),
                            /*typeArguments*/ undefined,
                            [createSpread(createIdentifier("arguments"))]
                        )
                    )
                );
            }

            if (constructor) {
                indexOfFirstStatement = addPrologueDirectivesAndInitialSuperCall(constructor, statements, visitor);
            }

            // Add the property initializers. Transforms this:
            //
            //  public x = 1;
            //
            // Into this:
            //
            //  constructor() {
            //      this.x = 1;
            //  }
            //
            addInitializedPropertyStatements(statements, properties, createThis());

            // Add existing statements, skipping the initial super call.
            if (constructor) {
                addRange(statements, visitNodes(constructor.body!.statements, visitor, isStatement, indexOfFirstStatement));
            }

            statements = mergeLexicalEnvironment(statements, endLexicalEnvironment());

            return setTextRange(
                createBlock(
                    setTextRange(
                        createNodeArray(statements),
                        /*location*/ constructor ? constructor.body!.statements : node.members
                    ),
                    /*multiLine*/ true
                ),
                /*location*/ constructor ? constructor.body : undefined
            );
        }

        /**
         * Generates assignment statements for property initializers.
         *
         * @param properties An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function addInitializedPropertyStatements(statements: Statement[], properties: ReadonlyArray<PropertyDeclaration>, receiver: LeftHandSideExpression) {
            for (const property of properties) {
                const expression = transformProperty(property, receiver);
                if (!expression) {
                    continue;
                }
                const statement = createExpressionStatement(expression);
                setSourceMapRange(statement, moveRangePastModifiers(property));
                setCommentRange(statement, property);
                setOriginalNode(statement, property);
                statements.push(statement);
            }
        }

        /**
         * Generates assignment expressions for property initializers.
         *
         * @param properties An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function generateInitializedPropertyExpressions(properties: ReadonlyArray<PropertyDeclaration>, receiver: LeftHandSideExpression) {
            const expressions: Expression[] = [];
            for (const property of properties) {
                const expression = transformProperty(property, receiver);
                if (!expression) {
                    continue;
                }
                startOnNewLine(expression);
                setSourceMapRange(expression, moveRangePastModifiers(property));
                setCommentRange(expression, property);
                setOriginalNode(expression, property);
                expressions.push(expression);
            }

            return expressions;
        }

        /**
         * Transforms a property initializer into an assignment statement.
         *
         * @param property The property declaration.
         * @param receiver The object receiving the property assignment.
         */
        function transformProperty(property: PropertyDeclaration, receiver: LeftHandSideExpression) {
            // We generate a name here in order to reuse the value cached by the relocated computed name expression (which uses the same generated name)
            const propertyName = isComputedPropertyName(property.name) && !isSimpleInlineableExpression(property.name.expression)
                ? updateComputedPropertyName(property.name, getGeneratedNameForNode(property.name))
                : property.name;
            const initializer = visitNode(property.initializer, visitor, isExpression);

            if (isPrivateName(propertyName)) {
                const privateNameInfo = accessPrivateName(propertyName);
                if (privateNameInfo) {
                    switch (privateNameInfo.type) {
                        case PrivateNameType.InstanceField: {
                            return createCall(
                                createPropertyAccess(privateNameInfo.weakMapName, "set"),
                                /*typeArguments*/ undefined,
                                [receiver, initializer || createVoidZero()]
                            );
                        }
                    }
                }
            }
            if (!initializer) {
                return undefined;
            }
            const memberAccess = createMemberAccessForPropertyName(receiver, propertyName, /*location*/ propertyName);

            return createAssignment(memberAccess, initializer);
        }

        function startPrivateNameEnvironment() {
            const env: PrivateNameEnvironment = createUnderscoreEscapedMap();
            privateNameEnvironmentStack.push(env);
            return env;
        }

        function endPrivateNameEnvironment() {
            privateNameEnvironmentStack.pop();
        }

        function addPrivateNameToEnvironment(name: PrivateName) {
            const env = last(privateNameEnvironmentStack);
            const text = getTextOfPropertyName(name) as string;
            const weakMapName = createOptimisticUniqueName("_" + text.substring(1));
            weakMapName.autoGenerateFlags |= GeneratedIdentifierFlags.ReservedInNestedScopes;
            hoistVariableDeclaration(weakMapName);
            env.set(name.escapedText, { type: PrivateNameType.InstanceField, weakMapName });
            (pendingExpressions || (pendingExpressions = [])).push(
                createAssignment(
                    weakMapName,
                    createNew(
                        createIdentifier("WeakMap"),
                        /*typeArguments*/ undefined,
                        []
                    )
                )
            );
        }

        function accessPrivateName(name: PrivateName) {
            for (let i = privateNameEnvironmentStack.length - 1; i >= 0; --i) {
                const env = privateNameEnvironmentStack[i];
                if (env.has(name.escapedText)) {
                    return env.get(name.escapedText);
                }
            }
            return undefined;
        }

        function visitPropertyAccessExpression(node: PropertyAccessExpression) {
            if (isPrivateName(node.name)) {
                const privateNameInfo = accessPrivateName(node.name);
                if (privateNameInfo) {
                    switch (privateNameInfo.type) {
                        case PrivateNameType.InstanceField:
                            return setOriginalNode(
                                setTextRange(
                                    createClassPrivateFieldGetHelper(
                                        context,
                                        visitNode(node.expression, visitor, isExpression),
                                        privateNameInfo.weakMapName
                                    ),
                                    node
                                ),
                                node
                            );
                    }
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitPrefixUnaryExpression(node: PrefixUnaryExpression) {
            if (isPrivateNamedPropertyAccessExpression(node.operand)) {
                const operator = (node.operator === SyntaxKind.PlusPlusToken) ?
                    SyntaxKind.PlusEqualsToken : (node.operator === SyntaxKind.MinusMinusToken) ?
                        SyntaxKind.MinusEqualsToken : undefined;
                if (operator) {
                    const transformedExpr = setOriginalNode(
                        createBinary(
                            node.operand,
                            operator,
                            createNumericLiteral("1")
                        ),
                        node
                    );
                    const visited = visitNode(transformedExpr, visitor);
                    // If the private name was successfully transformed,
                    // return the transformed node. Otherwise, leave existing source untouched.
                    if (visited !== transformedExpr) {
                        return visited;
                    }
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitPostfixUnaryExpression(node: PostfixUnaryExpression) {
            if (isPrivateNamedPropertyAccessExpression(node.operand)) {
                const operator = (node.operator === SyntaxKind.PlusPlusToken) ?
                    SyntaxKind.PlusToken : (node.operator === SyntaxKind.MinusMinusToken) ?
                        SyntaxKind.MinusToken : undefined;
                if (operator) {
                    // Create a temporary variable if the receiver is not inlinable, since we
                    // will need to access it multiple times.
                    const receiver = isSimpleInlineableExpression(node.operand.expression) ?
                        undefined :
                        getGeneratedNameForNode(node.operand.expression);
                    // Create a temporary variable to store the value returned by the expression.
                    const returnValue = createTempVariable(/*recordTempVariable*/ undefined);

                    const transformedExpr = createCommaList(compact([
                        receiver && createAssignment(receiver, node.operand.expression),
                        // Store the existing value of the private name in the temporary.
                        createAssignment(returnValue, receiver ? createPropertyAccess(receiver, node.operand.name) : node.operand),
                        // Assign to private name.
                        createAssignment(
                            receiver ? createPropertyAccess(receiver, node.operand.name) : node.operand,
                            createBinary(
                                returnValue, operator, createNumericLiteral("1")
                            )
                        ),
                        // Return the cached value.
                        returnValue
                    ]) as Expression[]);
                    const visited = visitNode(transformedExpr, visitor);
                    // If the private name was successfully transformed,
                    // hoist the temporary variable and return the transformed node.
                    // Otherwise, leave existing source untouched.
                    if (visited !== transformedExpr) {
                        if (receiver) {
                            hoistVariableDeclaration(receiver);
                        }
                        hoistVariableDeclaration(returnValue);
                        return visited;
                    }
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitCallExpression(node: CallExpression) {
            if (isPrivateNamedPropertyAccessExpression(node.expression)) {
                // Transform call expressions of private names to properly bind the `this` parameter.
                let exprForPropertyAccess: Expression = node.expression.expression;
                let receiver = node.expression.expression;
                if (!isSimpleInlineableExpression(node.expression.expression)) {
                    const generatedName = getGeneratedNameForNode(node);
                    hoistVariableDeclaration(generatedName);
                    exprForPropertyAccess = setOriginalNode(
                        createAssignment(generatedName, exprForPropertyAccess),
                        node.expression.expression
                    );
                    receiver = generatedName;
                }
                return visitNode(
                    updateCall(
                        node,
                        createPropertyAccess(
                            updatePropertyAccess(
                                node.expression,
                                exprForPropertyAccess,
                                node.expression.name
                            ),
                            "call"
                        ),
                        /*typeArguments*/ undefined,
                        [receiver, ...node.arguments]
                    ),
                    visitor
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function enableSubstitutionForClassAliases() {
            if ((enabledSubstitutions & ESNextSubstitutionFlags.ClassAliases) === 0) {
                enabledSubstitutions |= ESNextSubstitutionFlags.ClassAliases;

                // We need to enable substitutions for identifiers. This allows us to
                // substitute class names inside of a class declaration.
                context.enableSubstitution(SyntaxKind.Identifier);

                // Keep track of class aliases.
                classAliases = [];
            }
        }


        function visitAwaitExpression(node: AwaitExpression): Expression {
            if (enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator) {
                return setOriginalNode(
                    setTextRange(
                        createYield(createAwaitHelper(context, visitNode(node.expression, visitor, isExpression))),
                        /*location*/ node
                    ),
                    node
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitYieldExpression(node: YieldExpression) {
            if (enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator) {
                if (node.asteriskToken) {
                    const expression = visitNode(node.expression, visitor, isExpression);

                    return setOriginalNode(
                        setTextRange(
                            createYield(
                                createAwaitHelper(context,
                                    updateYield(
                                        node,
                                        node.asteriskToken,
                                        createAsyncDelegatorHelper(
                                            context,
                                            createAsyncValuesHelper(context, expression, expression),
                                            expression
                                        )
                                    )
                                )
                            ),
                            node
                        ),
                        node
                    );
                }

                return setOriginalNode(
                    setTextRange(
                        createYield(
                            createDownlevelAwait(
                                node.expression
                                    ? visitNode(node.expression, visitor, isExpression)
                                    : createVoidZero()
                            )
                        ),
                        node
                    ),
                    node
                );
            }

            return visitEachChild(node, visitor, context);
        }

        function visitReturnStatement(node: ReturnStatement) {
            if (enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator) {
                return updateReturn(node, createDownlevelAwait(
                    node.expression ? visitNode(node.expression, visitor, isExpression) : createVoidZero()
                ));
            }

            return visitEachChild(node, visitor, context);
        }

        function visitLabeledStatement(node: LabeledStatement) {
            if (enclosingFunctionFlags & FunctionFlags.Async) {
                const statement = unwrapInnermostStatementOfLabel(node);
                if (statement.kind === SyntaxKind.ForOfStatement && (<ForOfStatement>statement).awaitModifier) {
                    return visitForOfStatement(<ForOfStatement>statement, node);
                }
                return restoreEnclosingLabel(visitEachChild(statement, visitor, context), node);
            }
            return visitEachChild(node, visitor, context);
        }

        function chunkObjectLiteralElements(elements: ReadonlyArray<ObjectLiteralElementLike>): Expression[] {
            let chunkObject: ObjectLiteralElementLike[] | undefined;
            const objects: Expression[] = [];
            for (const e of elements) {
                if (e.kind === SyntaxKind.SpreadAssignment) {
                    if (chunkObject) {
                        objects.push(createObjectLiteral(chunkObject));
                        chunkObject = undefined;
                    }
                    const target = e.expression;
                    objects.push(visitNode(target, visitor, isExpression));
                }
                else {
                    chunkObject = append(chunkObject, e.kind === SyntaxKind.PropertyAssignment
                        ? createPropertyAssignment(e.name, visitNode(e.initializer, visitor, isExpression))
                        : visitNode(e, visitor, isObjectLiteralElementLike));
                }
            }
            if (chunkObject) {
                objects.push(createObjectLiteral(chunkObject));
            }

            return objects;
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression): Expression {
            if (node.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                // spread elements emit like so:
                // non-spread elements are chunked together into object literals, and then all are passed to __assign:
                //     { a, ...o, b } => __assign({a}, o, {b});
                // If the first element is a spread element, then the first argument to __assign is {}:
                //     { ...o, a, b, ...o2 } => __assign({}, o, {a, b}, o2)
                const objects = chunkObjectLiteralElements(node.properties);
                if (objects.length && objects[0].kind !== SyntaxKind.ObjectLiteralExpression) {
                    objects.unshift(createObjectLiteral());
                }
                return createAssignHelper(context, objects);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
            return visitEachChild(node, visitorNoDestructuringValue, context);
        }

        function visitParenthesizedExpression(node: ParenthesizedExpression, noDestructuringValue: boolean): ParenthesizedExpression {
            return visitEachChild(node, noDestructuringValue ? visitorNoDestructuringValue : visitor, context);
        }

        function visitCatchClause(node: CatchClause): CatchClause {
            if (!node.variableDeclaration) {
                return updateCatchClause(
                    node,
                    createVariableDeclaration(createTempVariable(/*recordTempVariable*/ undefined)),
                    visitNode(node.block, visitor, isBlock)
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function wrapPrivateNameForDestructuringTarget(node: PrivateNamedPropertyAccessExpression) {
            return createPropertyAccess(
                createObjectLiteral([
                    createSetAccessor(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        "value",
                        [createParameter(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined, "x",
                            /*questionToken*/ undefined,
                            /*type*/ undefined,
                            /*initializer*/ undefined
                        )],
                        createBlock(
                            [createExpressionStatement(
                                visitNode(
                                    createAssignment(
                                        node,
                                        createIdentifier("x")
                                    ),
                                    visitor
                                )
                            )]
                        )
                    )
                ]),
                "value"
            );
        }

        function transformDestructuringAssignmentTarget(node: ArrayLiteralExpression | ObjectLiteralExpression) {
            const hasPrivateNames = isArrayLiteralExpression(node) ?
                forEach(node.elements, isPrivateNamedPropertyAccessExpression) :
                forEach(node.properties, property => isPropertyAssignment(property) && isPrivateNamedPropertyAccessExpression(property.initializer));
            if (!hasPrivateNames) {
                return node;
            }
            if (isArrayLiteralExpression(node)) {
                // Transforms private names in destructuring assignment array bindings.
                //
                // Source:
                // ([ this.#myProp ] = [ "hello" ]);
                //
                // Transformation:
                // [ { set value(x) { this.#myProp = x; } }.value ] = [ "hello" ];
                return updateArrayLiteral(
                    node,
                    node.elements.map(
                        expr => isPrivateNamedPropertyAccessExpression(expr) ?
                            wrapPrivateNameForDestructuringTarget(expr) :
                            expr
                    )
                );
            }
            else {
                // Transforms private names in destructuring assignment object bindings.
                //
                // Source:
                // ({ stringProperty: this.#myProp } = { stringProperty: "hello" });
                //
                // Transformation:
                // ({ stringProperty: { set value(x) { this.#myProp = x; } }.value }) = { stringProperty: "hello" };
                return updateObjectLiteral(
                    node,
                    node.properties.map(
                        prop => isPropertyAssignment(prop) && isPrivateNamedPropertyAccessExpression(prop.initializer) ?
                            updatePropertyAssignment(
                                prop,
                                prop.name,
                                wrapPrivateNameForDestructuringTarget(prop.initializer)
                            ) :
                            prop
                    )
                );
            }
        }

        /**
         * Visits a BinaryExpression that contains a destructuring assignment.
         *
         * @param node A BinaryExpression node.
         */
        function visitBinaryExpression(node: BinaryExpression, noDestructuringValue: boolean): Expression {
            if (isDestructuringAssignment(node)) {
                const left = transformDestructuringAssignmentTarget(node.left);
                if (left !== node.left || node.left.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                    return flattenDestructuringAssignment(
                        left === node.left ? node : updateBinary(
                            node,
                            left,
                            node.right,
                            node.operatorToken.kind
                        ) as DestructuringAssignment,
                        visitor,
                        context,
                        node.left.transformFlags & TransformFlags.ContainsObjectRestOrSpread
                            ? FlattenLevel.ObjectRest : FlattenLevel.All,
                        !noDestructuringValue
                    );
                }
            }
            else if (node.operatorToken.kind === SyntaxKind.CommaToken) {
                return updateBinary(
                    node,
                    visitNode(node.left, visitorNoDestructuringValue, isExpression),
                    visitNode(node.right, noDestructuringValue ? visitorNoDestructuringValue : visitor, isExpression)
                );
            }
            else if (isAssignmentExpression(node) && isPropertyAccessExpression(node.left) && isPrivateName(node.left.name)) {
                const privateNameInfo = accessPrivateName(node.left.name);
                if (privateNameInfo && privateNameInfo.type === PrivateNameType.InstanceField) {
                    if (isCompoundAssignment(node.operatorToken.kind)) {
                        const isReceiverInlineable = isSimpleInlineableExpression(node.left.expression);
                        const getReceiver = isReceiverInlineable ? node.left.expression : createTempVariable(hoistVariableDeclaration);
                        const setReceiver = isReceiverInlineable
                            ? node.left.expression
                            : createAssignment(getReceiver, node.left.expression);
                        return setOriginalNode(
                            createClassPrivateFieldSetHelper(
                                context,
                                setReceiver,
                                privateNameInfo.weakMapName,
                                createBinary(
                                    createClassPrivateFieldGetHelper(
                                        context,
                                        getReceiver,
                                        privateNameInfo.weakMapName
                                    ),
                                    getOperatorForCompoundAssignment(node.operatorToken.kind),
                                    visitNode(node.right, visitor)
                                )
                            ),
                            node
                        );
                    }
                    else {
                        return setOriginalNode(
                            createClassPrivateFieldSetHelper(
                                context,
                                node.left.expression,
                                privateNameInfo.weakMapName,
                                visitNode(node.right, visitor)
                            ),
                            node
                        );
                    }
                }
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a VariableDeclaration node with a binding pattern.
         *
         * @param node A VariableDeclaration node.
         */
        function visitVariableDeclaration(node: VariableDeclaration): VisitResult<VariableDeclaration> {
            // If we are here it is because the name contains a binding pattern with a rest somewhere in it.
            if (isBindingPattern(node.name) && node.name.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                return flattenDestructuringBinding(
                    node,
                    visitor,
                    context,
                    FlattenLevel.ObjectRest
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitVariableStatement(node: VariableStatement) {
            const savedPendingStatements = pendingStatements;
            pendingStatements = [];

            const visitedNode = visitEachChild(node, visitor, context);
            const statement = some(pendingStatements) ?
                [visitedNode, ...pendingStatements] :
                visitedNode;

            pendingStatements = savedPendingStatements;
            return statement;
        }

        function visitForStatement(node: ForStatement): VisitResult<Statement> {
            return updateFor(
                node,
                visitNode(node.initializer, visitorNoDestructuringValue, isForInitializer),
                visitNode(node.condition, visitor, isExpression),
                visitNode(node.incrementor, visitor, isExpression),
                visitNode(node.statement, visitor, isStatement)
            );
        }

        function visitVoidExpression(node: VoidExpression) {
            return visitEachChild(node, visitorNoDestructuringValue, context);
        }

        /**
         * Visits a ForOfStatement and converts it into a ES2015-compatible ForOfStatement.
         *
         * @param node A ForOfStatement.
         */
        function visitForOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement | undefined): VisitResult<Statement> {
            if (node.initializer.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                node = transformForOfStatementWithObjectRest(node);
            }
            if (node.awaitModifier) {
                return transformForAwaitOfStatement(node, outermostLabeledStatement);
            }
            else {
                return restoreEnclosingLabel(visitEachChild(node, visitor, context), outermostLabeledStatement);
            }
        }

        function transformForOfStatementWithObjectRest(node: ForOfStatement) {
            const initializerWithoutParens = skipParentheses(node.initializer) as ForInitializer;
            if (isVariableDeclarationList(initializerWithoutParens) || isAssignmentPattern(initializerWithoutParens)) {
                let bodyLocation: TextRange | undefined;
                let statementsLocation: TextRange | undefined;
                const temp = createTempVariable(/*recordTempVariable*/ undefined);
                const statements: Statement[] = [createForOfBindingStatement(initializerWithoutParens, temp)];
                if (isBlock(node.statement)) {
                    addRange(statements, node.statement.statements);
                    bodyLocation = node.statement;
                    statementsLocation = node.statement.statements;
                }
                else if (node.statement) {
                    append(statements, node.statement);
                    bodyLocation = node.statement;
                    statementsLocation = node.statement;
                }
                return updateForOf(
                    node,
                    node.awaitModifier,
                    setTextRange(
                        createVariableDeclarationList(
                            [
                                setTextRange(createVariableDeclaration(temp), node.initializer)
                            ],
                            NodeFlags.Let
                        ),
                        node.initializer
                    ),
                    node.expression,
                    setTextRange(
                        createBlock(
                            setTextRange(createNodeArray(statements), statementsLocation),
                            /*multiLine*/ true
                        ),
                        bodyLocation
                    )
                );
            }
            return node;
        }

        function convertForOfStatementHead(node: ForOfStatement, boundValue: Expression) {
            const binding = createForOfBindingStatement(node.initializer, boundValue);

            let bodyLocation: TextRange | undefined;
            let statementsLocation: TextRange | undefined;
            const statements: Statement[] = [visitNode(binding, visitor, isStatement)];
            const statement = visitNode(node.statement, visitor, isStatement);
            if (isBlock(statement)) {
                addRange(statements, statement.statements);
                bodyLocation = statement;
                statementsLocation = statement.statements;
            }
            else {
                statements.push(statement);
            }

            return setEmitFlags(
                setTextRange(
                    createBlock(
                        setTextRange(createNodeArray(statements), statementsLocation),
                        /*multiLine*/ true
                    ),
                    bodyLocation
                ),
                EmitFlags.NoSourceMap | EmitFlags.NoTokenSourceMaps
            );
        }

        function createDownlevelAwait(expression: Expression) {
            return enclosingFunctionFlags & FunctionFlags.Generator
                ? createYield(/*asteriskToken*/ undefined, createAwaitHelper(context, expression))
                : createAwait(expression);
        }

        function transformForAwaitOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement | undefined) {
            const expression = visitNode(node.expression, visitor, isExpression);
            const iterator = isIdentifier(expression) ? getGeneratedNameForNode(expression) : createTempVariable(/*recordTempVariable*/ undefined);
            const result = isIdentifier(expression) ? getGeneratedNameForNode(iterator) : createTempVariable(/*recordTempVariable*/ undefined);
            const errorRecord = createUniqueName("e");
            const catchVariable = getGeneratedNameForNode(errorRecord);
            const returnMethod = createTempVariable(/*recordTempVariable*/ undefined);
            const callValues = createAsyncValuesHelper(context, expression, /*location*/ node.expression);
            const callNext = createCall(createPropertyAccess(iterator, "next"), /*typeArguments*/ undefined, []);
            const getDone = createPropertyAccess(result, "done");
            const getValue = createPropertyAccess(result, "value");
            const callReturn = createFunctionCall(returnMethod, iterator, []);

            hoistVariableDeclaration(errorRecord);
            hoistVariableDeclaration(returnMethod);

            const forStatement = setEmitFlags(
                setTextRange(
                    createFor(
                        /*initializer*/ setEmitFlags(
                            setTextRange(
                                createVariableDeclarationList([
                                    setTextRange(createVariableDeclaration(iterator, /*type*/ undefined, callValues), node.expression),
                                    createVariableDeclaration(result)
                                ]),
                                node.expression
                            ),
                            EmitFlags.NoHoisting
                        ),
                        /*condition*/ createComma(
                            createAssignment(result, createDownlevelAwait(callNext)),
                            createLogicalNot(getDone)
                        ),
                        /*incrementor*/ undefined,
                        /*statement*/ convertForOfStatementHead(node, getValue)
                    ),
                    /*location*/ node
                ),
                EmitFlags.NoTokenTrailingSourceMaps
            );

            return createTry(
                createBlock([
                    restoreEnclosingLabel(
                        forStatement,
                        outermostLabeledStatement
                    )
                ]),
                createCatchClause(
                    createVariableDeclaration(catchVariable),
                    setEmitFlags(
                        createBlock([
                            createExpressionStatement(
                                createAssignment(
                                    errorRecord,
                                    createObjectLiteral([
                                        createPropertyAssignment("error", catchVariable)
                                    ])
                                )
                            )
                        ]),
                        EmitFlags.SingleLine
                    )
                ),
                createBlock([
                    createTry(
                        /*tryBlock*/ createBlock([
                            setEmitFlags(
                                createIf(
                                    createLogicalAnd(
                                        createLogicalAnd(
                                            result,
                                            createLogicalNot(getDone)
                                        ),
                                        createAssignment(
                                            returnMethod,
                                            createPropertyAccess(iterator, "return")
                                        )
                                    ),
                                    createExpressionStatement(createDownlevelAwait(callReturn))
                                ),
                                EmitFlags.SingleLine
                            )
                        ]),
                        /*catchClause*/ undefined,
                        /*finallyBlock*/ setEmitFlags(
                            createBlock([
                                setEmitFlags(
                                    createIf(
                                        errorRecord,
                                        createThrow(
                                            createPropertyAccess(errorRecord, "error")
                                        )
                                    ),
                                    EmitFlags.SingleLine
                                )
                            ]),
                            EmitFlags.SingleLine
                        )
                    )
                ])
            );
        }

        function visitParameter(node: ParameterDeclaration): ParameterDeclaration {
            if (node.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                // Binding patterns are converted into a generated name and are
                // evaluated inside the function body.
                return updateParameter(
                    node,
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    node.dotDotDotToken,
                    getGeneratedNameForNode(node),
                    /*questionToken*/ undefined,
                    /*type*/ undefined,
                    visitNode(node.initializer, visitor, isExpression)
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitConstructorDeclaration(node: ConstructorDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = FunctionFlags.Normal;
            const updated = updateConstructor(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitParameterList(node.parameters, visitor, context),
                transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitGetAccessorDeclaration(node: GetAccessorDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = FunctionFlags.Normal;
            const updated = updateGetAccessor(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitNode(node.name, visitor, isPropertyName),
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitSetAccessorDeclaration(node: SetAccessorDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = FunctionFlags.Normal;
            const updated = updateSetAccessor(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitNode(node.name, visitor, isPropertyName),
                visitParameterList(node.parameters, visitor, context),
                transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitMethodDeclaration(node: MethodDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateMethod(
                node,
                /*decorators*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Generator
                    ? visitNodes(node.modifiers, visitorNoAsyncModifier, isModifier)
                    : node.modifiers,
                enclosingFunctionFlags & FunctionFlags.Async
                    ? undefined
                    : node.asteriskToken,
                visitNode(node.name, visitor, isPropertyName),
                visitNode<Token<SyntaxKind.QuestionToken>>(/*questionToken*/ undefined, visitor, isToken),
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator
                    ? transformAsyncGeneratorFunctionBody(node)
                    : transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitFunctionDeclaration(node: FunctionDeclaration) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateFunctionDeclaration(
                node,
                /*decorators*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Generator
                    ? visitNodes(node.modifiers, visitorNoAsyncModifier, isModifier)
                    : node.modifiers,
                enclosingFunctionFlags & FunctionFlags.Async
                    ? undefined
                    : node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator
                    ? transformAsyncGeneratorFunctionBody(node)
                    : transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitArrowFunction(node: ArrowFunction) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateArrowFunction(
                node,
                node.modifiers,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                node.equalsGreaterThanToken,
                transformFunctionBody(node),
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function visitFunctionExpression(node: FunctionExpression) {
            const savedEnclosingFunctionFlags = enclosingFunctionFlags;
            enclosingFunctionFlags = getFunctionFlags(node);
            const updated = updateFunctionExpression(
                node,
                enclosingFunctionFlags & FunctionFlags.Generator
                    ? visitNodes(node.modifiers, visitorNoAsyncModifier, isModifier)
                    : node.modifiers,
                enclosingFunctionFlags & FunctionFlags.Async
                    ? undefined
                    : node.asteriskToken,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                enclosingFunctionFlags & FunctionFlags.Async && enclosingFunctionFlags & FunctionFlags.Generator
                    ? transformAsyncGeneratorFunctionBody(node)
                    : transformFunctionBody(node)
            );
            enclosingFunctionFlags = savedEnclosingFunctionFlags;
            return updated;
        }

        function transformAsyncGeneratorFunctionBody(node: MethodDeclaration | AccessorDeclaration | FunctionDeclaration | FunctionExpression): FunctionBody {
            resumeLexicalEnvironment();
            const statements: Statement[] = [];
            const statementOffset = addPrologue(statements, node.body!.statements, /*ensureUseStrict*/ false, visitor);
            appendObjectRestAssignmentsIfNeeded(statements, node);

            const savedCapturedSuperProperties = capturedSuperProperties;
            const savedHasSuperElementAccess = hasSuperElementAccess;
            capturedSuperProperties = createUnderscoreEscapedMap<true>();
            hasSuperElementAccess = false;

            const returnStatement = createReturn(
                createAsyncGeneratorHelper(
                    context,
                    createFunctionExpression(
                        /*modifiers*/ undefined,
                        createToken(SyntaxKind.AsteriskToken),
                        node.name && getGeneratedNameForNode(node.name),
                        /*typeParameters*/ undefined,
                        /*parameters*/ [],
                        /*type*/ undefined,
                        updateBlock(
                            node.body!,
                            visitLexicalEnvironment(node.body!.statements, visitor, context, statementOffset)
                        )
                    )
                )
            );

            // Minor optimization, emit `_super` helper to capture `super` access in an arrow.
            // This step isn't needed if we eventually transform this to ES5.
            const emitSuperHelpers = languageVersion >= ScriptTarget.ES2015 && resolver.getNodeCheckFlags(node) & (NodeCheckFlags.AsyncMethodWithSuperBinding | NodeCheckFlags.AsyncMethodWithSuper);

            if (emitSuperHelpers) {
                enableSubstitutionForAsyncMethodsWithSuper();
                const variableStatement = createSuperAccessVariableStatement(resolver, node, capturedSuperProperties);
                substitutedSuperAccessors[getNodeId(variableStatement)] = true;
                addStatementsAfterPrologue(statements, [variableStatement]);
            }

            statements.push(returnStatement);

            addStatementsAfterPrologue(statements, endLexicalEnvironment());
            const block = updateBlock(node.body!, statements);

            if (emitSuperHelpers && hasSuperElementAccess) {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                    addEmitHelper(block, advancedAsyncSuperHelper);
                }
                else if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuper) {
                    addEmitHelper(block, asyncSuperHelper);
                }
            }

            capturedSuperProperties = savedCapturedSuperProperties;
            hasSuperElementAccess = savedHasSuperElementAccess;

            return block;
        }

        function transformFunctionBody(node: FunctionDeclaration | FunctionExpression | ConstructorDeclaration | MethodDeclaration | AccessorDeclaration): FunctionBody;
        function transformFunctionBody(node: ArrowFunction): ConciseBody;
        function transformFunctionBody(node: FunctionLikeDeclaration): ConciseBody {
            // The function only needs to be transformed if there are object rest parameters.
            // It's not enough to rely on the ContainsESNext transform flag check to transform function bodies
            // because any function containing PropertyDeclaration nodes will contain ESNext syntax.
            if (!(node.transformFlags & TransformFlags.ContainsObjectRestOrSpread)) {
                return (node.body && visitFunctionBody(node.body, visitor, context)) || createBlock([]);
            }
            resumeLexicalEnvironment();
            let statementOffset = 0;
            const statements: Statement[] = [];
            const body = visitNode(node.body, visitor, isConciseBody);
            if (isBlock(body)) {
                statementOffset = addPrologue(statements, body.statements, /*ensureUseStrict*/ false, visitor);
            }
            addRange(statements, appendObjectRestAssignmentsIfNeeded(/*statements*/ undefined, node));
            const leadingStatements = endLexicalEnvironment();
            if (statementOffset > 0 || some(statements) || some(leadingStatements)) {
                const block = convertToFunctionBody(body, /*multiLine*/ true);
                addStatementsAfterPrologue(statements, leadingStatements);
                addRange(statements, block.statements.slice(statementOffset));
                return updateBlock(block, setTextRange(createNodeArray(statements), block.statements));
            }
            return body;
        }

        function appendObjectRestAssignmentsIfNeeded(statements: Statement[] | undefined, node: FunctionLikeDeclaration): Statement[] | undefined {
            for (const parameter of node.parameters) {
                if (parameter.transformFlags & TransformFlags.ContainsObjectRestOrSpread) {
                    const temp = getGeneratedNameForNode(parameter);
                    const declarations = flattenDestructuringBinding(
                        parameter,
                        visitor,
                        context,
                        FlattenLevel.ObjectRest,
                        temp,
                        /*doNotRecordTempVariablesInLine*/ false,
                        /*skipInitializer*/ true,
                    );
                    if (some(declarations)) {
                        const statement = createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                declarations
                            )
                        );
                        setEmitFlags(statement, EmitFlags.CustomPrologue);
                        statements = append(statements, statement);
                    }
                }
            }
            return statements;
        }

        function enableSubstitutionForAsyncMethodsWithSuper() {
            if ((enabledSubstitutions & ESNextSubstitutionFlags.AsyncMethodsWithSuper) === 0) {
                enabledSubstitutions |= ESNextSubstitutionFlags.AsyncMethodsWithSuper;

                // We need to enable substitutions for call, property access, and element access
                // if we need to rewrite super calls.
                context.enableSubstitution(SyntaxKind.CallExpression);
                context.enableSubstitution(SyntaxKind.PropertyAccessExpression);
                context.enableSubstitution(SyntaxKind.ElementAccessExpression);

                // We need to be notified when entering and exiting declarations that bind super.
                context.enableEmitNotification(SyntaxKind.ClassDeclaration);
                context.enableEmitNotification(SyntaxKind.MethodDeclaration);
                context.enableEmitNotification(SyntaxKind.GetAccessor);
                context.enableEmitNotification(SyntaxKind.SetAccessor);
                context.enableEmitNotification(SyntaxKind.Constructor);
                // We need to be notified when entering the generated accessor arrow functions.
                context.enableEmitNotification(SyntaxKind.VariableStatement);
            }
        }

        /**
         * Called by the printer just before a node is printed.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to be printed.
         * @param emitCallback The callback used to emit the node.
         */
        function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) {
            // If we need to support substitutions for `super` in an async method,
            // we should track it here.
            if (enabledSubstitutions & ESNextSubstitutionFlags.AsyncMethodsWithSuper && isSuperContainer(node)) {
                const superContainerFlags = resolver.getNodeCheckFlags(node) & (NodeCheckFlags.AsyncMethodWithSuper | NodeCheckFlags.AsyncMethodWithSuperBinding);
                if (superContainerFlags !== enclosingSuperContainerFlags) {
                    const savedEnclosingSuperContainerFlags = enclosingSuperContainerFlags;
                    enclosingSuperContainerFlags = superContainerFlags;
                    previousOnEmitNode(hint, node, emitCallback);
                    enclosingSuperContainerFlags = savedEnclosingSuperContainerFlags;
                    return;
                }
            }
            // Disable substitution in the generated super accessor itself.
            else if (enabledSubstitutions && substitutedSuperAccessors[getNodeId(node)]) {
                const savedEnclosingSuperContainerFlags = enclosingSuperContainerFlags;
                enclosingSuperContainerFlags = 0 as NodeCheckFlags;
                previousOnEmitNode(hint, node, emitCallback);
                enclosingSuperContainerFlags = savedEnclosingSuperContainerFlags;
                return;
            }

            previousOnEmitNode(hint, node, emitCallback);
        }

        /**
         * Hooks node substitutions.
         *
         * @param hint The context for the emitter.
         * @param node The node to substitute.
         */
        function onSubstituteNode(hint: EmitHint, node: Node) {
            node = previousOnSubstituteNode(hint, node);
            if (hint === EmitHint.Expression) {
                return substituteExpression(<Expression>node);
            }
            return node;
        }

        function substituteExpression(node: Expression) {
            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    return substitutePropertyAccessExpression(<PropertyAccessExpression>node);
                case SyntaxKind.ElementAccessExpression:
                    return substituteElementAccessExpression(<ElementAccessExpression>node);
                case SyntaxKind.CallExpression:
                    return substituteCallExpression(<CallExpression>node);
                case SyntaxKind.Identifier:
                    return substituteExpressionIdentifier(node as Identifier);
            }
            return node;
        }

        function substitutePropertyAccessExpression(node: PropertyAccessExpression) {
            if (enclosingSuperContainerFlags && node.expression.kind === SyntaxKind.SuperKeyword) {
                return setTextRange(
                    createPropertyAccess(
                        createFileLevelUniqueName("_super"),
                        node.name),
                    node
                );
            }
            return node;
        }

        function substituteElementAccessExpression(node: ElementAccessExpression) {
            if (enclosingSuperContainerFlags && node.expression.kind === SyntaxKind.SuperKeyword) {
                return createSuperElementAccessInAsyncMethod(
                    node.argumentExpression,
                    node
                );
            }
            return node;
        }

        function substituteCallExpression(node: CallExpression): Expression {
            if (!enclosingSuperContainerFlags) {
                return node;
            }
            const expression = node.expression;
            if (isSuperProperty(expression)) {
                const argumentExpression = isPropertyAccessExpression(expression)
                    ? substitutePropertyAccessExpression(expression)
                    : substituteElementAccessExpression(expression);
                return createCall(
                    createPropertyAccess(argumentExpression, "call"),
                    /*typeArguments*/ undefined,
                    [
                        createThis(),
                        ...node.arguments
                    ]
                );
            }
            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Expression {
            return trySubstituteClassAlias(node) || node;
        }

        function trySubstituteClassAlias(node: Identifier): Expression | undefined {
            if (enabledSubstitutions & ESNextSubstitutionFlags.ClassAliases) {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.ConstructorReferenceInClass) {
                    // Due to the emit for class decorators, any reference to the class from inside of the class body
                    // must instead be rewritten to point to a temporary variable to avoid issues with the double-bind
                    // behavior of class names in ES6.
                    // Also, when emitting statics for class expressions, we must substitute a class alias for
                    // constructor references in static property initializers.
                    const declaration = resolver.getReferencedValueDeclaration(node);
                    if (declaration) {
                        const classAlias = classAliases[declaration.id!]; // TODO: GH#18217
                        if (classAlias) {
                            const clone = getSynthesizedClone(classAlias);
                            setSourceMapRange(clone, node);
                            setCommentRange(clone, node);
                            return clone;
                        }
                    }
                }
            }

            return undefined;
        }

        function isSuperContainer(node: Node) {
            const kind = node.kind;
            return kind === SyntaxKind.ClassDeclaration
                || kind === SyntaxKind.Constructor
                || kind === SyntaxKind.MethodDeclaration
                || kind === SyntaxKind.GetAccessor
                || kind === SyntaxKind.SetAccessor;
        }

        function createSuperElementAccessInAsyncMethod(argumentExpression: Expression, location: TextRange): LeftHandSideExpression {
            if (enclosingSuperContainerFlags & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                return setTextRange(
                    createPropertyAccess(
                        createCall(
                            createIdentifier("_superIndex"),
                            /*typeArguments*/ undefined,
                            [argumentExpression]
                        ),
                        "value"
                    ),
                    location
                );
            }
            else {
                return setTextRange(
                    createCall(
                        createIdentifier("_superIndex"),
                        /*typeArguments*/ undefined,
                        [argumentExpression]
                    ),
                    location
                );
            }
        }
    }

    const assignHelper: EmitHelper = {
        name: "typescript:assign",
        scoped: false,
        priority: 1,
        text: `
            var __assign = (this && this.__assign) || function () {
                __assign = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };`
    };

    export function createAssignHelper(context: TransformationContext, attributesSegments: Expression[]) {
        if (context.getCompilerOptions().target! >= ScriptTarget.ES2015) {
            return createCall(createPropertyAccess(createIdentifier("Object"), "assign"),
                              /*typeArguments*/ undefined,
                              attributesSegments);
        }
        context.requestEmitHelper(assignHelper);
        return createCall(
            getHelperName("__assign"),
            /*typeArguments*/ undefined,
            attributesSegments
        );
    }

    const awaitHelper: EmitHelper = {
        name: "typescript:await",
        scoped: false,
        text: `
            var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }`
    };

    function createAwaitHelper(context: TransformationContext, expression: Expression) {
        context.requestEmitHelper(awaitHelper);
        return createCall(getHelperName("__await"), /*typeArguments*/ undefined, [expression]);
    }

    const asyncGeneratorHelper: EmitHelper = {
        name: "typescript:asyncGenerator",
        scoped: false,
        text: `
            var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var g = generator.apply(thisArg, _arguments || []), i, q = [];
                return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
                function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
                function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
                function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
                function fulfill(value) { resume("next", value); }
                function reject(value) { resume("throw", value); }
                function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
            };`
    };

    function createAsyncGeneratorHelper(context: TransformationContext, generatorFunc: FunctionExpression) {
        context.requestEmitHelper(awaitHelper);
        context.requestEmitHelper(asyncGeneratorHelper);

        // Mark this node as originally an async function
        (generatorFunc.emitNode || (generatorFunc.emitNode = {} as EmitNode)).flags |= EmitFlags.AsyncFunctionBody;

        return createCall(
            getHelperName("__asyncGenerator"),
            /*typeArguments*/ undefined,
            [
                createThis(),
                createIdentifier("arguments"),
                generatorFunc
            ]
        );
    }

    const asyncDelegator: EmitHelper = {
        name: "typescript:asyncDelegator",
        scoped: false,
        text: `
            var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
                var i, p;
                return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
                function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
            };`
    };

    function createAsyncDelegatorHelper(context: TransformationContext, expression: Expression, location?: TextRange) {
        context.requestEmitHelper(awaitHelper);
        context.requestEmitHelper(asyncDelegator);
        return setTextRange(
            createCall(
                getHelperName("__asyncDelegator"),
                /*typeArguments*/ undefined,
                [expression]
            ),
            location
        );
    }

    const asyncValues: EmitHelper = {
        name: "typescript:asyncValues",
        scoped: false,
        text: `
            var __asyncValues = (this && this.__asyncValues) || function (o) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var m = o[Symbol.asyncIterator], i;
                return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
                function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
                function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
            };`
    };

    function createAsyncValuesHelper(context: TransformationContext, expression: Expression, location?: TextRange) {
        context.requestEmitHelper(asyncValues);
        return setTextRange(
            createCall(
                getHelperName("__asyncValues"),
                /*typeArguments*/ undefined,
                [expression]
            ),
            location
        );
    }

    const classPrivateFieldGetHelper: EmitHelper = {
        name: "typescript:classPrivateFieldGet",
        scoped: false,
        text: `var _classPrivateFieldGet = function (receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver); };`
    };

    function createClassPrivateFieldGetHelper(context: TransformationContext, receiver: Expression, privateField: Identifier) {
        context.requestEmitHelper(classPrivateFieldGetHelper);
        return createCall(getHelperName("_classPrivateFieldGet"), /* typeArguments */ undefined, [receiver, privateField]);
    }

    const classPrivateFieldSetHelper: EmitHelper = {
        name: "typescript:classPrivateFieldSet",
        scoped: false,
        text: `var _classPrivateFieldSet = function (receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } privateMap.set(receiver, value); return value; };`
    };

    function createClassPrivateFieldSetHelper(context: TransformationContext, receiver: Expression, privateField: Identifier, value: Expression) {
        context.requestEmitHelper(classPrivateFieldSetHelper);
        return createCall(getHelperName("_classPrivateFieldSet"), /* typeArguments */ undefined, [receiver, privateField, value]);
    }
}
