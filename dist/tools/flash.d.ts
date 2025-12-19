import { z } from "zod";
export declare const FlashFirmwareSchema: z.ZodObject<{
    board_path: z.ZodString;
    firmware_path: z.ZodString;
    partition: z.ZodDefault<z.ZodEnum<["bootloader", "partition-table", "app"]>>;
    address: z.ZodOptional<z.ZodString>;
    baud_rate: z.ZodDefault<z.ZodNumber>;
    erase_all: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    board_path: string;
    firmware_path: string;
    partition: "bootloader" | "partition-table" | "app";
    baud_rate: number;
    erase_all: boolean;
    address?: string | undefined;
}, {
    board_path: string;
    firmware_path: string;
    partition?: "bootloader" | "partition-table" | "app" | undefined;
    address?: string | undefined;
    baud_rate?: number | undefined;
    erase_all?: boolean | undefined;
}>;
export type FlashFirmwareInput = z.infer<typeof FlashFirmwareSchema>;
export declare function flashFirmwareTool(params: FlashFirmwareInput): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
