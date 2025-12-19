import { z } from "zod";
import { ResponseFormat } from "../types.js";
import { detectBoards } from "../services/serial.js";
import { getChipInfo } from "../services/esptool.js";
export const DetectBoardsSchema = z.object({
    response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN).describe("Output format: 'markdown' or 'json'"),
}).strict();
export async function detectBoardsTool(params) {
    try {
        const boards = await detectBoards();
        if (boards.length === 0)
            return { content: [{ type: "text", text: "No ESP32 boards detected. Check USB connections." }] };
        for (const board of boards) {
            try {
                const info = await getChipInfo(board.path);
                const chipMatch = info.match(/Chip is (ESP32[-\w]*)/);
                if (chipMatch)
                    board.chipType = chipMatch[1];
            }
            catch { }
        }
        const output = {
            count: boards.length,
            boards: boards.map(b => ({ path: b.path, chip: b.chipType || "Unknown", manufacturer: b.manufacturer || "Unknown", serial: b.serialNumber || "N/A", vid: b.vendorId || "N/A", pid: b.productId || "N/A" }))
        };
        let textContent;
        if (params.response_format === ResponseFormat.MARKDOWN) {
            const lines = [`# Connected ESP32 Boards (${boards.length})`, ""];
            for (const b of output.boards) {
                lines.push(`## ${b.path}`, `- **Chip**: ${b.chip}`, `- **Manufacturer**: ${b.manufacturer}`, `- **Serial**: ${b.serial}`, `- **VID/PID**: ${b.vid}:${b.pid}`, "");
            }
            textContent = lines.join("\n");
        }
        else {
            textContent = JSON.stringify(output, null, 2);
        }
        return { content: [{ type: "text", text: textContent }], structuredContent: output };
    }
    catch (error) {
        return { content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }] };
    }
}
