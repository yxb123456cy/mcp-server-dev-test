import app from './server.js';

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
    console.log('MCP Server is running in stateless Streamable HTTP mode.');
    console.log(`- MCP Endpoint: http://localhost:${PORT}/mcp`);
});
