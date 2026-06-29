import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import z from 'zod';
const server = new McpServer({ name: 'girlfriend-birthday-server', version: '1.0.0' });

server.registerTool(
    'get_girlfriend_birthday',
    {
        title: 'Get Girlfriend Birthday',
        description: 'Get the birthday of your girlfriend',
        inputSchema: {},
        outputSchema: { birthday: z.string() }
    },
    async () => {
        const output = { birthday: '陈颍的生日是 4月11日' };
        return {
            content: [{ type: 'text', text: JSON.stringify(output) }],
            structuredContent: output
        };
    }
)
const transport = new StdioServerTransport();
await server.connect(transport);