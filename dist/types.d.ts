import { ChipType } from "./constants.js";
export interface ESP32Board {
    path: string;
    manufacturer?: string;
    serialNumber?: string;
    productId?: string;
    vendorId?: string;
    chipType?: ChipType;
    profile?: BoardProfile;
}
export interface BoardProfile {
    name: string;
    chipType: ChipType;
    projectPath?: string;
    pinMappings?: Record<string, number>;
    notes?: string;
}
export interface FlashConfig {
    boardPath: string;
    firmwarePath: string;
    partition?: string;
    address?: string;
    baudRate?: number;
    eraseAll?: boolean;
}
export interface SerialMonitorConfig {
    boardPath: string;
    baudRate?: number;
    timeout?: number;
}
export declare enum ResponseFormat {
    MARKDOWN = "markdown",
    JSON = "json"
}
export interface PaginatedResponse<T> {
    total: number;
    count: number;
    offset: number;
    items: T[];
    has_more: boolean;
    next_offset?: number;
}
