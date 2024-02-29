import {CodeFixContextBase, Diagnostics, DiagnosticWithLocation, textChanges} from "../_namespaces/ts";
import {codeFixAll, createCodeFixAction, registerCodeFix} from "../_namespaces/ts.codefix";
import {ChangeTracker} from "../textChanges";


const fixId = "fixMissingReferenceDirectivesForIsolatedDeclarations";
const errorCodes = [
  Diagnostics.Declaration_emit_for_this_expression_requires_adding_a_type_reference_directive_to_0_with_isolatedDeclarations,
  Diagnostics.Declaration_emit_for_this_expression_requires_adding_a_path_reference_directive_to_0_with_isolatedDeclarations
].map((diag) => diag.code);

registerCodeFix({
  errorCodes,
  fixIds: [fixId],
  getCodeActions(context) {
    const {span, sourceFile, program} = context;
    const diags = program.getDeclarationDiagnostics(sourceFile);
    const diagOnNode = diags.find((diag) => diag.start === span.start);
    if (diagOnNode) {
      const changes = textChanges.ChangeTracker.with(context, (changeTracker) => fixDiag(context, diagOnNode, changeTracker));
      return [
        createCodeFixAction(
          fixId,
          changes,
          Diagnostics.Add_triple_slash_directives_for_import_resolution,
          fixId,
          // TODO: ADD
          Diagnostics.Add_triple_slash_directives_for_import_resolution)];
    }
  },
  getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
    fixDiag(context, diag, changes)
  }),
});

function fixDiag(context: CodeFixContextBase, diag: DiagnosticWithLocation, changeTracker: ChangeTracker) {
  const messageText = diag.messageText as string;
  const first = messageText.indexOf("'");
  const last = messageText.lastIndexOf("'");
  const tripleSlashType = diag.code === Diagnostics.Declaration_emit_for_this_expression_requires_adding_a_type_reference_directive_to_0_with_isolatedDeclarations.code ? 'types' : 'path'
  changeTracker.insertText(context.sourceFile, 0, `/// <reference ${tripleSlashType}='${messageText.substring(first + 1, last)}' />\n`);
}
