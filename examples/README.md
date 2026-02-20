# Feishu Calendar SDK Examples

This directory contains example code demonstrating how to use the Feishu Calendar SDK in various contexts.

## Examples

### [basic-usage.ts](./basic-usage.ts)
Basic usage of the SDK showing calendar listing, event creation, and free/busy queries.

### [mcp-integration.ts](./mcp-integration.ts)
Demonstrates how to use the MCP server to integrate with OpenCode and other MCP-compatible tools.

### [opencode-integration.ts](./opencode-integration.ts)
Shows how to use the OpenCode custom tools for Feishu Calendar management.

### [openclaw-integration.ts](./openclaw-integration.ts)
Demonstrates natural language calendar management through OpenClaw skills.

## Running Examples

Each example requires the following environment variables:

```bash
export FEISHU_APP_ID="cli_xxxxxxxxxxxxxxxx"
export FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxxxxx"
```

Or create a `.env` file:

```bash
FEISHU_APP_ID=cli_xxxxxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxx
```

Then run any example:

```bash
# Using Bun
bun run examples/basic-usage.ts

# Using Node
node examples/basic-usage.ts
```

## Integration Guides

### OpenCode (MCP)
1. Install the MCP server:
   ```bash
   npm install -g @liaobinhua/feishu-calendar-mcp
   ```

2. Add to `opencode.json`:
   ```json
   {
     "mcp": {
       "feishu-calendar": {
         "type": "local",
         "command": ["npx", "-y", "@liaobinhua/feishu-calendar-mcp"]
       }
     }
   }
   ```

3. Set environment variables or configure in opencode.json

### OpenCode (Custom Tools)
1. Copy tools to `.opencode/tools/`:
   ```bash
   cp -r packages/opencode-tools/src/* .opencode/tools/
   ```

2. Configure environment variables

### OpenClaw (Skill)
1. Copy skill to OpenClaw:
   ```bash
   cp -r skills/feishu-calendar ~/.openclaw/skills/
   ```

2. Configure in `~/.openclaw/openclaw.json`

## Troubleshooting

### Authentication Errors
Make sure your `FEISHU_APP_ID` and `FEISHU_APP_SECRET` are correct.

### Permission Errors
Ensure your app has the necessary permissions in the Feishu admin console.

### Rate Limiting
The SDK automatically handles rate limiting. If you hit limits frequently, consider batching requests.

## Getting Help

- GitHub Issues: https://github.com/liaobinhua/feishu-calendar-sdk/issues
- Feishu API Docs: https://open.feishu.cn/document/server-docs/docs/calendar-v4
