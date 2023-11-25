const vscode = require("vscode");
const prettier = require("prettier");

vscode.languages.registerDocumentFormattingEditProvider("json5", {
  async provideDocumentFormattingEdits(document) {
    console.log(document.uri);
    const firstLine = document.lineAt(0);
    const lastLine = document.lineAt(document.lineCount - 1);
    const fullTextRange = new vscode.Range(
      firstLine.range.start,
      lastLine.range.end
    );
    try {
      const response = await prettier.format(document.getText(), {
        semi: false,
        parser: "json5",
      });
      const newText = response;
      const textEdit = vscode.TextEdit.replace(fullTextRange, newText);

      vscode.window.showInformationMessage("Format Success!");

      return [textEdit];
    } catch (error) {
      vscode.window.showErrorMessage("Format Error! Please check your code.");
      return;
    }
  },
});

function deactivate() {}

module.exports = { deactivate };
