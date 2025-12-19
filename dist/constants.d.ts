export declare const ESP32_CHIPS: {
    readonly ESP32: {
        readonly name: "ESP32";
        readonly flashBaudRate: 921600;
        readonly defaultPartitions: readonly ["bootloader", "partition-table", "app"];
    };
    readonly "ESP32-S2": {
        readonly name: "ESP32-S2";
        readonly flashBaudRate: 921600;
        readonly defaultPartitions: readonly ["bootloader", "partition-table", "app"];
    };
    readonly "ESP32-S3": {
        readonly name: "ESP32-S3";
        readonly flashBaudRate: 921600;
        readonly defaultPartitions: readonly ["bootloader", "partition-table", "app"];
    };
    readonly "ESP32-C3": {
        readonly name: "ESP32-C3";
        readonly flashBaudRate: 921600;
        readonly defaultPartitions: readonly ["bootloader", "partition-table", "app"];
    };
    readonly "ESP32-C6": {
        readonly name: "ESP32-C6";
        readonly flashBaudRate: 921600;
        readonly defaultPartitions: readonly ["bootloader", "partition-table", "app"];
    };
};
export type ChipType = keyof typeof ESP32_CHIPS;
export declare const BAUD_RATES: readonly [9600, 19200, 38400, 57600, 74880, 115200, 230400, 460800, 921600];
export declare const PARTITION_ADDRESSES: {
    readonly bootloader: "0x1000";
    readonly "partition-table": "0x8000";
    readonly app: "0x10000";
};
export declare const CHARACTER_LIMIT = 25000;
export declare const TIMEOUTS: {
    readonly FLASH_OPERATION: 120000;
    readonly SERIAL_READ: 5000;
    readonly BOARD_DETECT: 10000;
};
