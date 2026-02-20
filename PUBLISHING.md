# 🚀 Feishu Calendar SDK - NPM 发布指南

## 📋 发布准备完成

所有三个包已经构建完成并配置为 npm 发布就绪！

### 已准备的包

| 包名 | 版本 | 状态 |
|------|------|------|
| `@liaobinhua/feishu-calendar-sdk` | 0.1.0 | ✅ 就绪 |
| `@liaobinhua/feishu-calendar-mcp` | 0.1.0 | ✅ 就绪 |
| `@liaobinhua/feishu-calendar-opencode` | 0.1.0 | ✅ 就绪 |

### ✅ 验证通过

所有包都通过了 npm `npm publish --dry-run` 检查，没有发现错误！

---

## 🚀 发布步骤

### 步骤 1：登录 npm（首次发布需要）

```bash
npm login
```

### 步骤 2：发布包（按顺序执行）

```bash
# 1. 发布 SDK 包
cd packages/sdk && npm publish

# 2. 发布 MCP 服务器包
cd packages/mcp-server && npm publish

# 3. 发布 OpenCode 工具包
cd packages/opencode-tools && npm publish
```

### 快速批量发布

```bash
cd packages/sdk && npm publish && cd ../mcp-server && npm publish && cd ../opencode-tools && npm publish
```

---

## 📝 在 OpenClaw 中使用

发布后，你可以在 OpenClaw 中直接安装使用：

```bash
# 使用 npm 包（推荐）
openclaw plugins install @liaobinhua/feishu-calendar-sdk

# 或使用 MCP 服务器（可选）
openclaw plugins install @liaobinhua/feishu-calendar-mcp

# 或使用 OpenCode 自定义工具（可选）
openclaw plugins install @liaobinhua/feishu-calendar-opencode
```

---

## 📊 包大小信息

| 包 | 大小 |
|------|------|
| SDK | 1622 kB |
| MCP 服务器 | 2371 kB |
| OpenCode 工具 | 1630 kB |

---

## 🔍 故障排除

### 常见错误

**E401 Unauthorized**
```bash
# 解决方案
npm login
```

**E403 Forbidden**
```bash
# 解决方案
# 检查包名是否已被占用
npm view @liaobinhua/feishu-calendar-sdk
```

**E409 Conflict**
```bash
# 解决方案
# 更新版本号
npm version patch
```

**EPUBLISHFAIL**
```bash
# 解决方案
# 检查 .npmrc 配置
# 检查包名和版本格式
```

---

## 📖 后续操作

发布完成后，建议：

1. **创建第一个稳定版本（1.0.0）**
   - 修复可能的 bug
   - 收集用户反馈

2. **发布新功能版本**
   - 添加更多功能
   - 支持更多高级特性

3. **添加更多文档**
   - API 参考
   - 最佳实践
   - 示例教程

4. **CI/CD 集成**
   - 自动化发布流程
   - 自动生成 changelog

---

## ✅ OpenClaw 集成就绪

发布后，用户可以在 OpenClaw 中：

1. 通过 `openclaw plugins install` 安装包
2. 使用自然语言交互管理日历
3. 查询和操作日历、日程、会议室等

项目地址：https://github.com/liaobinhua/feishu-calendar-sdk

---

**准备好了吗？** 确认后你可以：
1. 登录 npm
2. 执行发布命令
3. 在 OpenClaw 中安装并测试

需要帮助？请随时在 GitHub issues 中提问！
