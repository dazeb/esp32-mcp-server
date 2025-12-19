import { SerialPort } from "serialport";
import { TIMEOUTS } from "../constants.js";
export async function detectBoards() {
    try {
        const ports = await SerialPort.list();
        const esp32Boards = [];
        for (const port of ports) {
            const isESP32 = port.vendorId === "10C4" || port.vendorId === "1A86" || port.vendorId === "0403" || port.path.includes("USB") || (port.manufacturer?.toLowerCase().includes("silicon") ?? false) || (port.manufacturer?.toLowerCase().includes("qinheng") ?? false);
            if (isESP32) {
                esp32Boards.push({ path: port.path, manufacturer: port.manufacturer, serialNumber: port.serialNumber, productId: port.productId, vendorId: port.vendorId });
            }
        }
        return esp32Boards;
    }
    catch (error) {
        throw new Error(`Failed to detect boards: ${error instanceof Error ? error.message : String(error)}`);
    }
}
export async function openSerialConnection(boardPath, baudRate = 115200) {
    return new Promise((resolve, reject) => {
        const port = new SerialPort({ path: boardPath, baudRate, dataBits: 8, stopBits: 1, parity: "none" }, (err) => {
            if (err)
                reject(new Error(`Failed to open ${boardPath}: ${err.message}`));
            else
                resolve(port);
        });
    });
}
export async function readSerialData(port, timeout = TIMEOUTS.SERIAL_READ) {
    return new Promise((resolve) => {
        let buffer = "";
        const timer = setTimeout(() => {
            port.removeAllListeners("data");
            resolve(buffer || "No data received");
        }, timeout);
        port.on("data", (chunk) => {
            buffer += chunk.toString("utf-8");
        });
    });
}
export async function closeSerialConnection(port) {
    return new Promise((resolve, reject) => {
        if (!port.isOpen) {
            resolve();
            return;
        }
        port.close((err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
