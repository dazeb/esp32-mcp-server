import { z } from "zod";
export declare const MonitorSerialSchema: z.ZodObject<{
    board_path: z.ZodString;
    baud_rate: z.ZodDefault<z.ZodEffects<z.ZodEnum<z.Writeable<any>>, number, any>>;
    timeout: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    board_path: string;
    baud_rate: number;
    timeout: number;
}, {
    board_path: string;
    baud_rate?: any;
    timeout?: number | undefined;
}>;
export type MonitorSerialInput = z.infer<typeof MonitorSerialSchema>;
export declare function monitorSerialTool(params: MonitorSerialInput): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
