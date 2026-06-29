import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import z from 'zod';

function createServer() {
    const server = new McpServer({
        name: 'girlfriend-birthday-server',
        version: '1.0.0'
    });

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
    );

    return server;
}

const app = express();
app.use(express.json());

app.post('/mcp', async (req, res) => {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined
    });

    try {
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);

        res.on('close', () => {
            void transport.close();
            void server.close();
        });
    } catch (error) {
        console.error('Failed to handle streamable HTTP request:', error);
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: '2.0',
                error: { code: -32603, message: 'Internal Server Error' },
                id: null
            });
        }
    }
});

app.get('/mcp', (_req, res) => {
    res.status(405).json({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Method not allowed.' },
        id: null
    });
});

app.delete('/mcp', (_req, res) => {
    res.status(405).json({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Method not allowed.' },
        id: null
    });
});

export default app;
