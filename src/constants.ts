export const ESP32_CHIPS = {
  ESP32: { name: "ESP32", flashBaudRate: 921600, defaultPartitions: ["bootloader", "partition-table", "app"] },
  "ESP32-S2": { name: "ESP32-S2", flashBaudRate: 921600, defaultPartitions: ["bootloader", "partition-table", "app"] },
  "ESP32-S3": { name: "ESP32-S3", flashBaudRate: 921600, defaultPartitions: ["bootloader", "partition-table", "app"] },
  "ESP32-C3": { name: "ESP32-C3", flashBaudRate: 921600, defaultPartitions: ["bootloader", "partition-table", "app"] },
  "ESP32-C6": { name: "ESP32-C6", flashBaudRate: 921600, defaultPartitions: ["bootloader", "partition-table", "app"] },
} as const;

export type ChipType = keyof typeof ESP32_CHIPS;
export const BAUD_RATES = [9600, 19200, 38400, 57600, 74880, 115200, 230400, 460800, 921600] as const;
export const PARTITION_ADDRESSES = { bootloader: "0x1000", "partition-table": "0x8000", app: "0x10000" } as const;
export const CHARACTER_LIMIT = 25000;
export const TIMEOUTS = { FLASH_OPERATION: 120000, SERIAL_READ: 5000, BOARD_DETECT: 10000 } as const;
