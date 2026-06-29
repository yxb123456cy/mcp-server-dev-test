import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// 1. 初始化 MCP Server
const server = new Server(
    {
        name: "girlfriend-birthday-server",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// 2. 注册 Tool 列表
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "get_girlfriend_birthday",
                description: "获取女朋友陈颍的生日",
                inputSchema: {
                    type: "object",
                    properties: {}, // 不需要任何输入参数
                    required: [],
                },
            },
        ],
    };
});

// 3. 实现 Tool 调用逻辑
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "get_girlfriend_birthday") {
        return {
            content: [
                {
                    type: "text",
                    text: "陈颍的生日是 4月11日",
                },
            ],
        };
    }

    throw new Error(`未找到该工具: ${request.params.name}`);
});

// 4. 启动服务器 (本地 Stdio 模式)
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    // 注意: Stdio 模式下，普通日志必须输出到 stderr，否则会破坏 MCP 协议的 JSON 格式
    console.error("MCP Server 启动成功! 正在通过 stdio 监听...");
}

main().catch((error) => {
    console.error("服务器启动失败:", error);
    process.exit(1);
});
