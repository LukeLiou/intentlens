import * as vscode from "vscode";

export async function callLLM(prompt: string): Promise<{ content: string }> {
  const config = vscode.workspace.getConfiguration("intentlens");
  const apiKey = config.get<string>("apiKey", "").trim();
  const baseUrlRaw = config.get<string>("baseUrl", "https://api.openai.com/v1").trim();
  const model = config.get<string>("model", "gpt-4o-mini").trim();

  if (!apiKey) {
    throw new Error("Missing intentlens.apiKey. Please configure it in Settings.");
  }

  const baseUrl = baseUrlRaw.replace(/\/$/, "");
  const url = `${baseUrl}/chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "You are helpful and precise. Always respond in Chinese." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM request failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("LLM returned empty content.");
  }

  return { content };
}
