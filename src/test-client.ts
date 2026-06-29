import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

async function main() {
    console.log("正在连接到 Streamable HTTP MCP Server...");
    // 1. 初始化 Streamable HTTP 客户端传输层，指向统一的 /mcp 接口
    const transport = new StreamableHTTPClientTransport(new URL("http://localhost:3001/mcp"));
    // 2. 创建 MCP Client
    const client = new Client(
        { name: "test-client", version: "1.0.0" },
        { capabilities: {} }
    );
    // 3. 建立连接
    await client.connect(transport);
    console.log("✅ 连接成功！\n");
    // 4. 获取服务端支持的工具列表
    console.log("正在获取工具列表...");
    const tools = await client.listTools();
    console.log("发现工具:", tools.tools.map(t => t.name), "\n");
    // 5. 调用指定的工具
    console.log("正在调用 get_girlfriend_birthday 工具...");
    const result = await client.callTool({
        name: "get_girlfriend_birthday",
        arguments: {}
    });
    console.log("🎉 调用结果:");
    console.log(JSON.stringify(result.content, null, 2));
    await transport.close();
    process.exit(0);
}

main().catch(console.error);
