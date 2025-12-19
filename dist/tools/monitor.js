import { z } from "zod";
import { BAUD_RATES } from "../constants.js";
import { openSerialConnection, readSerialData, closeSerialConnection } from "../services/serial.js";
export const MonitorSerialSchema = z.object({
    board_path: z.string().describe("Device path (e.g., COM3, /dev/ttyUSB0)"),
    baud_rate: z.enum([...BAUD_RATES.map(String)]).transform(val => parseInt(val, 10)).default("115200").describe("Serial baud rate"),
    timeout: z.number().int().min(1000).max(60000).default(5000).describe("Read timeout in milliseconds"),
}).strict();
export async function monitorSerialTool(params) {
    let port;
    try {
        port = await openSerialConnection(params.board_path, params.baud_rate);
        const data = await readSerialData(port, params.timeout);
        return { content: [{ type: "text", text: `📡 Serial Output (${params.baud_rate} baud)\n\n\`\`\`\n${data}\n\`\`\`` }] };
    }
    catch (error) {
        return { content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }] };
    }
    finally {
        if (port)
            await closeSerialConnection(port);
    }
}
