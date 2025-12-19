import { FlashConfig } from "../types.js";
export declare function flashFirmware(config: FlashConfig): Promise<string>;
export declare function getChipInfo(boardPath: string): Promise<string>;
