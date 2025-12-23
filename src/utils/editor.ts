import * as vscode from "vscode";

export function getActiveSelectionText(): {
  selectedCode: string;
  filePath: string;
  languageId: string;
} {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    throw new Error("No active editor found.");
  }
  const selection = editor.selection;
  if (selection.isEmpty) {
    throw new Error("No code selected.");
  }
  const selectedCode = editor.document.getText(selection);
  if (!selectedCode.trim()) {
    throw new Error("Selected code is empty.");
  }
  return {
    selectedCode,
    filePath: editor.document.uri.fsPath,
    languageId: editor.document.languageId
  };
}

export function getTopImports(maxLines = 80): string {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return "";
  }
  const doc = editor.document;
  const maxLineIndex = Math.min(maxLines, doc.lineCount) - 1;
  const importLines: string[] = [];
  const importRegex = /^(\s*(import|export)\s+|\s*const\s+\w+\s*=\s*require\()/;

  for (let i = 0; i <= maxLineIndex; i++) {
    const line = doc.lineAt(i).text;
    if (importRegex.test(line)) {
      importLines.push(line);
    }
    if (importLines.length >= 30) {
      break;
    }
  }

  return importLines.join("\n");
}

export function getSurroundingCode(rangePaddingLines = 20): string {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return "";
  }
  const doc = editor.document;
  const selection = editor.selection;
  const startLine = Math.max(0, selection.start.line - rangePaddingLines);
  const endLine = Math.min(doc.lineCount - 1, selection.end.line + rangePaddingLines);

  const range = new vscode.Range(startLine, 0, endLine, doc.lineAt(endLine).text.length);
  return doc.getText(range);
}
