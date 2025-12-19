#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { DetectBoardsSchema, detectBoardsTool } from "./tools/detect.js";
import { FlashFirmwareSchema, flashFirmwareTool } from "./tools/flash.js";
import { MonitorSerialSchema, monitorSerialTool } from "./tools/monitor.js";

const server = new McpServer({ name: "esp32-mcp-server", version: "1.0.0" });

server.registerTool("esp32_detect_boards", {
  title: "Detect ESP32 Boards",
  description: "Auto-detect connected ESP32 boards via USB. Returns chip type, manufacturer, serial number.",
  inputSchema: DetectBoardsSchema,
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true }
}, detectBoardsTool);

server.registerTool("esp32_flash_firmware", {
  title: "Flash Firmware to ESP32",
  description: "Flash compiled .bin firmware to ESP32 partitions using esptool.py",
  inputSchema: FlashFirmwareSchema,
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true }
}, flashFirmwareTool);

server.registerTool("esp32_monitor_serial", {
  title: "Monitor ESP32 Serial Output",
  description: "Capture serial output from ESP32 for debugging boot logs and runtime messages",
  inputSchema: MonitorSerialSchema,
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true }
}, monitorSerialTool);

async function runStdio() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ESP32 MCP server running via stdio");
}

async function runHTTP() {
  const app = express();
  app.use(express.json());
  app.post('/mcp', async (req, res) => {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    res.on('close', () => transport.close());
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });
  const port = parseInt(process.env.PORT || '3000');
  app.listen(port, () => { console.error(`ESP32 MCP server running on http://localhost:${port}/mcp`); });
}

const transport = process.env.TRANSPORT || 'stdio';
if (transport === 'http') {
  runHTTP().catch(err => { console.error("Server error:", err); process.exit(1); });
} else {
  runStdio().catch(err => { console.error("Server error:", err); process.exit(1); });
}
