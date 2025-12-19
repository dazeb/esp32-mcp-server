import { SerialPort } from "serialport";
import { ESP32Board } from "../types.js";
export declare function detectBoards(): Promise<ESP32Board[]>;
export declare function openSerialConnection(boardPath: string, baudRate?: number): Promise<SerialPort>;
export declare function readSerialData(port: SerialPort, timeout?: number): Promise<string>;
export declare function closeSerialConnection(port: SerialPort): Promise<void>;
