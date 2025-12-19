import { z } from "zod";
import { flashFirmware } from "../services/esptool.js";
import { PARTITION_ADDRESSES } from "../constants.js";

export const FlashFirmwareSchema = z.object({
  board_path: z.string().describe("Device path (e.g., COM3, /dev/ttyUSB0)"),
  firmware_path: z.string().describe("Absolute path to .bin firmware file"),
  partition: z.enum(["bootloader", "partition-table", "app"]).default("app").describe("Target partition"),
  address: z.string().optional().describe("Custom flash address (hex, e.g., 0x10000)"),
  baud_rate: z.number().int().min(9600).max(921600).default(921600).describe("Flash baud rate"),
  erase_all: z.boolean().default(false).describe("Erase entire flash before writing"),
}).strict();

export type FlashFirmwareInput = z.infer<typeof FlashFirmwareSchema>;

export async function flashFirmwareTool(params: FlashFirmwareInput) {
  try {
    const address = params.address || PARTITION_ADDRESSES[params.partition];
    const result = await flashFirmware({
      boardPath: params.board_path,
      firmwarePath: params.firmware_path,
      partition: params.partition,
      address,
      baudRate: params.baud_rate,
      eraseAll: params.erase_all,
    });
    return { content: [{ type: "text" as const, text: `✅ Firmware flashed successfully\n\n${result}` }] };
  } catch (error) {
    return {
      content: [{ type: "text" as const, text: `❌ Flash failed: ${error instanceof Error ? error.message : String(error)}\n\nTroubleshooting:\n- Ensure board is connected\n- Hold BOOT button during flash\n- Check firmware path\n- Try lower baud rate (115200)` }]
    };
  }
}
