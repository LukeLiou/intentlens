# IntentLens

中文 | [English](#english)

## 中文
IntentLens 是一款 VS Code 扩展，用更易懂的方式解释前端代码与 diff，适合读遗留代码、做代码评审与新成员上手。

<p align="center">
  <img src="https://mall-sld-test.oss-cn-beijing.aliyuncs.com/lib/intentlens/assets/intentlens_menu.png" alt="IntentLens 命令截图" width="520" />
</p>

### 功能亮点
- 解释选中代码：用自然语言快速说明这段代码的意图。
- 解释 Diff 影响：告诉你改动带来的行为变化与风险点。
- 新手模式：教学式解释，适合新人、导师与评审场景。

### 快速开始
1) 配置设置：
   - `intentlens.apiKey`：OpenAI 兼容 API Key。DeepSeek 的 Key 一般以 `sk-` 开头。
   - `intentlens.baseUrl`：API 地址（默认：https://api.openai.com/v1，也可配置 https://api.deepseek.com/v1）。
   - `intentlens.model`：模型名（默认：gpt-4o-mini）。
   - `intentlens.beginnerMode`：开启教学式解释。

可选模型建议（DeepSeek）：
> **日常写代码 / 快速解释 / 意图识别**  
> 推荐模型：✅ `deepseek-chat`

> **深度推理 / 复杂问题 / 架构分析**  
> 推荐模型：✅ `deepseek-reasoner`

2) 使用命令：
   - 命令面板：
     - "IntentLens: Explain Selected Code（解释选中代码）"
     - "IntentLens: Explain Diff Impact（解释 Diff 影响）"
   - 右键菜单：已支持选中代码后直接右键调用。

### 输出示例（重点结果更突出）
**Explain Selected Code**
> **结论**：将组件名从 `loadingState` 改为 `loadingState1`  
> **行为变化**：旧引用可能失效，导致组件无法渲染或使用  
> **风险区域**：所有引用处需同步更新，动态组件或路由更需关注  
> **建议检查**：更新引用、验证渲染与样式、更新相关测试

**Explain Diff Impact**
> **结论**：组件名变更会影响引用一致性  
> **影响**：未更新的引用会产生渲染失败  
> **测试**：引用点检查、样式验证、回归测试覆盖

### 适用场景
1) 新人上手 React Hook：选中组件运行 Explain Selected Code。
2) 表单校验改动评审：运行 Explain Diff Impact 检查行为变化与测试点。
3) 排查副作用与依赖：用新手模式理解异步流程与 effect 触发。

### 团队价值
- 评审效率提升：10 秒内理解意图与影响。
- 无需改变流程：只需两条命令即可使用。
- 适合上手与辅导：像资深同事讲解代码。
- 降低反复沟通：提前提示风险与缺失测试。
- 兼容遗留代码：不必逐行阅读即可掌握意图。
- 灵活安全：支持自建或企业网关。

### 隐私与安全
- 仅发送选中代码或当前文件的 diff 到配置的 LLM 端点。
- 企业环境可接内部网关或 Azure OpenAI。
- 不会上传整个仓库。

### 常见问题
1) 没有输出？
   - 可能未选中代码、文件无 diff，或未设置 `intentlens.apiKey`。
2) 无法获取 git diff？
   - 文件不在 Git 仓库中，或系统找不到 `git`。
3) 支持更多语言/框架吗？
   - 支持。提示词与语言无关，可按你的技术栈调整。
4) 能用本地模型吗？
   - 可以，只要提供 OpenAI 兼容的 `chat/completions` 端点。
5) 会上传整个仓库吗？
   - 不会，仅发送选中代码或当前文件 diff。
6) 和 Copilot 有什么区别？
   - IntentLens 专注解释意图与影响，不做代码生成。

## English
IntentLens is a VS Code extension that explains frontend code and diffs in human terms, ideal for reading legacy code, reviewing changes, and onboarding new team members.

### Features
- Explain Selected Code: Understand what a block of code intends to do in seconds.
- Explain Diff Impact: See how a change affects behavior and risk areas.
- Beginner Mode: Teaching-style explanations for new developers, mentors, and reviewers.

### Quick Start
1) Configure settings:
   - `intentlens.apiKey`: Your OpenAI-compatible API key. DeepSeek keys usually start with `sk-`.
   - `intentlens.baseUrl`: API base URL (default: https://api.openai.com/v1, or https://api.deepseek.com/v1).
   - `intentlens.model`: Model name (default: gpt-4o-mini).
   - `intentlens.beginnerMode`: Teaching-style explanations for selected code.

Model suggestions (DeepSeek):
> **Daily coding / quick explanation / intent recognition**  
> Recommended model: ✅ `deepseek-chat`

> **Deep reasoning / complex problems / architecture analysis**  
> Recommended model: ✅ `deepseek-reasoner`

2) Use the commands:
   - Command Palette:
     - "IntentLens: Explain Selected Code (解释选中代码)"
     - "IntentLens: Explain Diff Impact (解释 Diff 影响)"
   - Right-click menu: available after selecting code.

### Output Focus (Key Results First)
**Explain Selected Code**
> **Result**: Component renamed from `loadingState` to `loadingState1`  
> **Behavior**: Old references may break rendering  
> **Risk**: All references must be updated, especially dynamic usage  
> **Checks**: Update references, verify render/styles, refresh tests

**Explain Diff Impact**
> **Result**: Rename affects reference consistency  
> **Impact**: Stale references cause render failures  
> **Tests**: Reference audit, style verification, regression coverage

### Demo Scenarios
1) Onboarding a new dev into a React Hook: select a hook-heavy component and run Explain Selected Code.
2) Reviewing a form validation diff: run Explain Diff Impact to spot behavior changes and test ideas.
3) Investigating side effects and dependencies: use Beginner Mode to surface async flow and effect triggers.

### Team Adoption Pitch
- Instant clarity in reviews: understand intent and impact in ~10 seconds.
- No workflow changes: works inside VS Code with two simple commands.
- Great for onboarding: explains code like a senior pairing session.
- Reduces review churn: highlights risks and missing tests early.
- Handles legacy code: summarize intent without reading line-by-line.
- Safe and flexible: use your own endpoint or company gateway.

### Privacy & Security Notes
- The extension sends selected code or file diffs to the configured LLM endpoint.
- For enterprise usage, route through an internal gateway or Azure OpenAI.
- IntentLens does not upload entire repositories.

### FAQ
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
