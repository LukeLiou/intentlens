export type PromptKind = "explain" | "diffImpact" | "beginner";

type PromptVars = Record<string, string | undefined>;

function v(vars: PromptVars, key: string): string {
  return vars[key] ?? "";
}

export function buildPrompt(kind: PromptKind, vars: PromptVars): string {
  if (kind === "explain") {
    return `You are a senior frontend engineer. Explain the INTENT of the following code to a human reviewer.

Rules:
- Do NOT paraphrase line-by-line. Summarize behavior and intent.
- Focus on: purpose, inputs/outputs, state/data flow, side effects, and important assumptions.
- Mention any risky edge cases (race conditions, stale closures, dependency pitfalls, null/undefined).
- Keep it concise: max 10 bullet points.
- If this is React, explicitly describe state updates and effect triggers.
- Respond in Chinese.

Context:
- File: ${v(vars, "filePath")}
- Language: ${v(vars, "languageId")}
- Nearby imports (may be incomplete): ${v(vars, "imports")}

Code:
${v(vars, "selectedCode")}`;
  }

  if (kind === "diffImpact") {
    return `You are a meticulous code reviewer specializing in frontend regressions.

Task:
Explain what changed and what user-visible or system behavior may be affected.

Rules:
- Start with a 1-sentence summary of the intent of the change.
- Then provide:
  1) Behavioral changes (what will work differently)
  2) Risk areas / regressions to watch for
  3) Suggested tests or quick manual checks (max 6)
- Avoid generic advice. Tie every point to the diff.
- If the diff touches React hooks, call out dependency/closure issues explicitly.
- Respond in Chinese.

Context:
- Repo/Project: ${v(vars, "workspaceName")}
- File: ${v(vars, "filePath")}
- Language: ${v(vars, "languageId")}

Diff (unified):
${v(vars, "diffText")}`;
  }

  return `You are mentoring a new frontend developer. Explain the following code in a teaching style.

Rules:
- Use simple language.
- Explain "why" more than "what".
- Highlight 3 key concepts the reader must understand (e.g., React state, hooks, effect dependencies, async flow).
- Provide a short "mental model" section: how to reason about this code when modifying it.
- Keep within 250-350 words.
- End with: 3 questions a reviewer should ask before changing this code.
- Respond in Chinese.

Context:
- File: ${v(vars, "filePath")}
- Language: ${v(vars, "languageId")}
- Surrounding context (optional): ${v(vars, "surroundingCode")}

Code:
${v(vars, "selectedCode")}`;
}
