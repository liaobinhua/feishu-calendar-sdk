# 🚀 飞书日历 SDK - OpenClaw 快速开始

## 📦 安装

### 方法 1：使用 npm 包（推荐）

```bash
# 安装到 OpenClaw
openclaw plugins install @liaobinhua/feishu-calendar-sdk
```

### 方法 2：使用 SKILL.md 文件

```bash
# 复制技能文件到 OpenClaw
cp -r skills/feishu-calendar ~/.openclaw/skills/

# 或创建软链接（可选）
ln -s /root/git/feishu-calendar-sdk/skills/feishu-calendar ~/.openclaw/skills/feishu-calendar
```

---

## ⚙️ 配置

### 步骤 1：获取飞书应用凭证

1. 访问 [飞书开放平台](https://open.feishu.cn/)
2. 创建一个新应用或使用现有应用
3. 在"凭证与基础信息"页面获取 `App ID` 和 `App Secret`

### 步骤 2：配置环境变量

编辑 `~/.openclaw/openclaw.json`（或在 OpenClaw 界面配置）：

```json
{
  "skills": {
    "entries": {
      "feishu-calendar": {
        "enabled": true,
        "apiKey": "FEISHU_APP_SECRET",
        "env": {
          "FEISHU_APP_ID": "cli_xxxxxxxxxxxxxxxx",
          "FEISHU_APP_SECRET": "xxxxxxxxxxxxxxxxxxxx"
        }
      }
    }
  }
}
```

或设置环境变量：

```bash
export FEISHU_APP_ID="cli_xxxxxxxxxxxxxxxx"
export FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxxxxx"
```

---

## ✅ 验证安装

### 1. 检查技能是否已加载

在 OpenClaw 中输入：
```
查看已安装的技能
```

或检查 OpenClaw 日志：
```bash
# 查看技能列表
openclaw skills list
```

### 2. 测试基本功能

在 OpenClaw 中输入：
```
列出我的所有日历
```

如果成功列出日历，说明 SDK 已正确安装！

---

## 💡 使用示例

### 日历管理

```
创建一个名为"工作"的新日历
```

```
查看我的主日历详情
```

```
将工作日历重命名为"项目日历"
```

```
删除测试日历
```

### 日程管理

```
创建一个明天下午 2 点的会议
```

```
查看明天的所有日程
```

```
查看下周的会议
```

```
将明天下午 2 点的会议改到 3 点
```

```
取消明天的会议
```

### 忙闲查询

```
查看我下周的空闲时间
```

```
查看我明天下午 2 点到 5 点是否有空
```

```
查看我下周一整天的可用时间
```

### 会议室管理

```
列出 3 楼的所有会议室
```

```

查看会议室 A 的容量
```

```
查询会议室 A 明天的可用时间
```

### 订阅管理

```
订阅日历更新通知
```

```

查看所有订阅
```

```

取消订阅
```

---

## 🎯 高级用法

### 循环日程

```
创建一个每周一上午 10 点的例会
```

```
创建每月底的项目总结会议
```

### 多参与者会议

```
创建一个明天下午 2 点的会议，参与者是张三、李四和王五
```

### 会议室查询

```
查询明天下午 2 点到 4 点有哪些空闲会议室
```

```
查询 3 楼适合 10 人以上的会议室
```

---

## 📚 文档链接

- **GitHub 仓库**：https://github.com/liaobinhua/feishu-calendar-sdk
- **npm 包页面**：https://www.npmjs.com/package/@liaobinhua/feishu-calendar-sdk
- **OpenClaw 文档**：https://openclaw.ai/
- **快速开始指南**：[./docs/zh-CN/getting-started.md](docs/zh-CN/getting-started.md)
- **API 参考**：[./docs/zh-CN/api-reference.md](docs/zh-CN/api-reference.md)

---

## 🔧 故障排除

### 问题 1：技能未加载

**解决方案：**
```bash
# 检查技能文件是否存在
ls -la ~/.openclaw/skills/feishu-calendar

# 检查环境变量
echo $FEISHU_APP_ID
echo $FEISHU_APP_SECRET

# 重新加载技能
openclaw skills reload
```

### 问题 2：认证失败

**解决方案：**
1. 检查 App ID 和 App Secret 是否正确
2. 确保应用有日历 API 权限
3. 检查应用是否已发布（需要在飞书后台发布）

### 问题 3：权限错误

**解决方案：**
1. 在飞书开放平台申请以下权限：
   - `calendar:calendar:readonly` - 读取日历
   - `calendar:calendar` - 管理日历
   - `calendar:event:readonly` - 读取日程
   - `calendar:event` - 管理日程

2. 等待权限生效（可能需要几分钟到几小时）

### 问题 4：包未找到

**解决方案：**
```bash
# 手动安装 npm 包
npm install -g @liaobinhua/feishu-calendar-sdk

# 然后重新加载 OpenClaw
```

---

## 📞 获取帮助

如果遇到问题：

1. **查看 OpenClaw 日志**
   ```bash
   # 查看最新日志
   tail -f ~/.openclaw/logs/openclaw.log
   ```

2. **查看 GitHub Issues**
   - https://github.com/liaobinhua/feishu-calendar-sdk/issues

3. **查看飞书 API 文档**
   - https://open.feishu.cn/document/server-docs/docs/calendar-v4

4. **查看 OpenClaw 文档**
   - https://openclaw.ai/

---

## ✨ 开始使用

安装配置完成后，你就可以在 OpenClaw 中使用自然语言来管理你的飞书日历了！

试试这些指令：
- "帮我创建一个明天下午 3 点的团队会议"
- "查看下周的所有日程"
- "查询我周三的空闲时间"
- "列出所有可用的会议室"

享受智能、高效的日历管理体验！📅
