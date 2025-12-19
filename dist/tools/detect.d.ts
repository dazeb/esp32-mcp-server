import { z } from "zod";
import { ResponseFormat } from "../types.js";
export declare const DetectBoardsSchema: z.ZodObject<{
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    response_format: ResponseFormat;
}, {
    response_format?: ResponseFormat | undefined;
}>;
export type DetectBoardsInput = z.infer<typeof DetectBoardsSchema>;
export declare function detectBoardsTool(params: DetectBoardsInput): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent?: undefined;
} | {
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent: {
        count: number;
        boards: {
            path: string;
            chip: string;
            manufacturer: string;
            serial: string;
            vid: string;
            pid: string;
        }[];
    };
}>;
