import { spawn } from "child_process";
import { PARTITION_ADDRESSES, TIMEOUTS } from "../constants.js";
import * as fs from "fs/promises";
export async function flashFirmware(config) {
    try {
        await fs.access(config.firmwarePath);
    }
    catch {
        throw new Error(`Firmware file not found: ${config.firmwarePath}`);
    }
    const address = config.address || PARTITION_ADDRESSES.app;
    const baudRate = config.baudRate || 921600;
    const args = ["--chip", "auto", "--port", config.boardPath, "--baud", String(baudRate)];
    if (config.eraseAll)
        args.push("erase_flash");
    args.push("write_flash", "-z", address, config.firmwarePath);
    return new Promise((resolve, reject) => {
        const esptool = spawn("esptool.py", args);
        let stdout = "", stderr = "";
        esptool.stdout.on("data", (data) => { stdout += data.toString(); });
        esptool.stderr.on("data", (data) => { stderr += data.toString(); });
        const timeout = setTimeout(() => { esptool.kill(); reject(new Error("Flash operation timed out")); }, TIMEOUTS.FLASH_OPERATION);
        esptool.on("close", (code) => {
            clearTimeout(timeout);
            if (code === 0)
                resolve(stdout + stderr);
            else
                reject(new Error(`Flash failed (code ${code}): ${stderr || stdout}`));
        });
        esptool.on("error", (err) => { clearTimeout(timeout); reject(new Error(`Failed to run esptool: ${err.message}`)); });
    });
}
export async function getChipInfo(boardPath) {
    return new Promise((resolve, reject) => {
        const esptool = spawn("esptool.py", ["--port", boardPath, "chip_id"]);
        let output = "";
        esptool.stdout.on("data", (data) => { output += data.toString(); });
        esptool.stderr.on("data", (data) => { output += data.toString(); });
        esptool.on("close", (code) => {
            if (code === 0)
                resolve(output);
            else
                reject(new Error(`Failed to get chip info: ${output}`));
        });
        esptool.on("error", (err) => { reject(new Error(`esptool not found: ${err.message}`)); });
    });
}
