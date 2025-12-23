import * as vscode from "vscode";
import { callLLM } from "./ai/client";
import { buildPrompt, PromptKind } from "./ai/prompts";
import { getActiveSelectionText, getSurroundingCode, getTopImports } from "./utils/editor";
import { getFileDiff, getWorkspaceName } from "./utils/git";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showResultWebview(title: string, content: string) {
  const panel = vscode.window.createWebviewPanel(
    "intentlensResult",
    title,
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: false },
    { enableFindWidget: true }
  );
  const safeContent = escapeHtml(content).replace(/\n/g, "<br/>");
  panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(title)}</title>
<style>
  body { font-family: Arial, sans-serif; padding: 16px; line-height: 1.5; }
  h1 { font-size: 18px; margin-bottom: 12px; }
  .content { white-space: normal; }
</style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <div class="content">${safeContent}</div>
</body>
</html>`;
}

export function activate(context: vscode.ExtensionContext) {
  const explainSelection = vscode.commands.registerCommand(
    "intentlens.explainSelection",
    async () => {
      try {
        const config = vscode.workspace.getConfiguration("intentlens");
        const beginnerMode = config.get<boolean>("beginnerMode", false);
        const { selectedCode, filePath, languageId } = getActiveSelectionText();
        const imports = getTopImports(80);

        let kind: PromptKind = "explain";
        let promptVars: Record<string, string> = {
          filePath,
          languageId,
          imports,
          selectedCode
        };

        if (beginnerMode) {
          kind = "beginner";
          const surroundingCode = getSurroundingCode(20);
          promptVars = {
            filePath,
            languageId,
            surroundingCode,
            selectedCode
          };
        }

        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "IntentLens: thinking...",
            cancellable: false
          },
          async () => {
            const prompt = buildPrompt(kind, promptVars);
            const { content } = await callLLM(prompt);
            showResultWebview("IntentLens", content);
          }
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        vscode.window.showErrorMessage(`IntentLens: ${message}`);
      }
    }
  );

  const explainDiff = vscode.commands.registerCommand(
    "intentlens.explainDiff",
    async () => {
      try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          throw new Error("No active editor found.");
        }
        const filePath = editor.document.uri.fsPath;
        const languageId = editor.document.languageId;
        const workspaceName = getWorkspaceName();
        const diffText = await getFileDiff(filePath);

        const prompt = buildPrompt("diffImpact", {
          workspaceName,
          filePath,
          languageId,
          diffText
        });

        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "IntentLens: analyzing diff...",
            cancellable: false
          },
          async () => {
            const { content } = await callLLM(prompt);
            showResultWebview("IntentLens", content);
          }
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        vscode.window.showErrorMessage(`IntentLens: ${message}`);
      }
    }
  );

  context.subscriptions.push(explainSelection, explainDiff);
}

export function deactivate() {}
