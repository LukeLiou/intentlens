# IntentLens

## What is IntentLens?
IntentLens is a VS Code extension that explains frontend code and diffs in human terms, ideal for reading legacy code, reviewing changes, and onboarding new team members.

## Features
- Explain Selected Code: Understand what a block of code intends to do in seconds.
- Explain Diff Impact: See how a change affects behavior and risk areas.
- Beginner Mode: Teaching-style explanations for new developers, mentors, and reviewers.

## Quick Start
1) Run the extension in development mode:
   - Open this project in VS Code.
   - Press F5 to launch the Extension Development Host.

2) Configure settings:
   - `intentlens.apiKey`: Your OpenAI-compatible API key.
   - `intentlens.baseUrl`: API base URL (default: https://api.openai.com/v1).
   - `intentlens.model`: Model name (default: gpt-4o-mini).
   - `intentlens.beginnerMode`: Teaching-style explanations for selected code.

3) Use the commands:
   - Command Palette:
     - "IntentLens: Explain Selected Code"
     - "IntentLens: Explain Diff Impact"
   - Optional: You can add context menu entries in `package.json` if your team prefers right-click flows.

## Demo Scenarios
1) Onboarding a new dev into a React Hook: select a hook-heavy component and run Explain Selected Code.
2) Reviewing a form validation diff: run Explain Diff Impact to spot behavior changes and test ideas.
3) Investigating side effects and dependencies: use Beginner Mode to surface async flow and effect triggers.

## Team Adoption Pitch
- Instant clarity in reviews: understand intent and impact in ~10 seconds.
- No workflow changes: works inside VS Code with two simple commands.
- Great for onboarding: explains code like a senior pairing session.
- Reduces review churn: highlights risks and missing tests early.
- Handles legacy code: summarize intent without reading line-by-line.
- Safe and flexible: use your own endpoint or company gateway.

## Privacy & Security Notes
- The extension sends selected code or file diffs to the configured LLM endpoint.
- For enterprise usage, route through an internal gateway or Azure OpenAI.
- IntentLens does not upload entire repositories.

## FAQ
1) Why is there no output?
   - You might not have selected code, the file has no diff, or `intentlens.apiKey` is not set.
2) Why can't git diff be fetched?
   - The file may not be in a Git repo, or `git` is not available in PATH.
3) Can it support more languages or frameworks?
   - Yes. The prompts are language-agnostic; tweak them for your stack.
4) Can I use a local model?
   - Yes, if it exposes an OpenAI-compatible `chat/completions` endpoint.
5) Does it upload my whole repo?
   - No. Only the selected code or the unified diff for the active file.
6) How is this different from Copilot?
   - IntentLens focuses on explaining intent and impact, not code generation.
