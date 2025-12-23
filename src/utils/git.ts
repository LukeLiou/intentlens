import * as vscode from "vscode";
import { execFile } from "child_process";
import * as path from "path";

export function getWorkspaceRoot(): string {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    throw new Error("No workspace folder found.");
  }
  return folders[0].uri.fsPath;
}

export function getWorkspaceName(): string {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    return "unknown";
  }
  return folders[0].name;
}

export function getFileDiff(filePath: string): Promise<string> {
  const workspaceRoot = getWorkspaceRoot();
  const relativePath = path.relative(workspaceRoot, filePath);

  return new Promise((resolve, reject) => {
    execFile(
      "git",
      ["diff", "--", relativePath],
      { cwd: workspaceRoot, maxBuffer: 5 * 1024 * 1024 },
      (err, stdout, stderr) => {
        if (err) {
          reject(new Error(`git diff failed: ${stderr || err.message}`));
          return;
        }
        if (!stdout.trim()) {
          reject(new Error("No diff found for this file."));
          return;
        }
        resolve(stdout);
      }
    );
  });
}
