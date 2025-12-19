# ESP32 MCP Server

Production-grade MCP server bridging ESP32 development workflows with Claude AI.

## 🚀 Features

- **Auto-Detection**: USB enumeration for ESP32/S2/S3/C3/C6 boards
- **Firmware Flashing**: Deploy .bin files to any partition via esptool.py  
- **Serial Monitoring**: Real-time output capture with configurable rates
- **Chip Identification**: Automatic ESP32 variant detection

## 📋 Prerequisites

```bash
# Python 3.x + esptool
pip install esptool

# Node.js 18+
node --version
```

## 🔧 Installation

```bash
git clone <repository>
cd esp32-mcp-server
npm install
npm run build
```

## 🎯 Usage

**Local (stdio):**
```bash
npm start
```

**Remote (HTTP):**
```bash
TRANSPORT=http PORT=3000 npm start
```

## 🛠️ MCP Tools

### 1. `esp32_detect_boards`
Enumerate connected ESP32 boards.

```json
{ "response_format": "json" }
```

**Response:**
```json
{
  "count": 1,
  "boards": [{
    "path": "/dev/ttyUSB0",
    "chip": "ESP32-C6",
    "manufacturer": "Silicon Labs",
    "serial": "0001",
    "vid": "10C4",
    "pid": "EA60"
  }]
}
```

### 2. `esp32_flash_firmware`
Flash firmware to ESP32 partitions.

```json
{
  "board_path": "/dev/ttyUSB0",
  "firmware_path": "/path/to/firmware.bin",
  "partition": "app",
  "baud_rate": 921600
}
```

### 3. `esp32_monitor_serial`
Capture serial output.

```json
{
  "board_path": "COM3",
  "baud_rate": 115200,
  "timeout": 10000
}
```

## 🏗️ Architecture

```
esp32-mcp-server/
├── src/
│   ├── index.ts         # Server entry
│   ├── types.ts         # Interfaces
│   ├── constants.ts     # ESP32 specs
│   ├── services/
│   │   ├── serial.ts    # SerialPort wrapper
│   │   └── esptool.ts   # Firmware operations
│   └── tools/
│       ├── detect.ts    # Board enumeration
│       ├── flash.ts     # Firmware flashing
│       └── monitor.ts   # Serial capture
└── dist/                # Compiled JS
```

## 🐛 Troubleshooting

**esptool not found:**
```bash
pip install --upgrade esptool
```

**Permission denied (Linux):**
```bash
sudo usermod -a -G dialout $USER
# Logout/login required
```

**Flash fails:**
- Hold BOOT button during flash
- Reduce baud_rate to 115200
- Use data-capable USB cable

## 📝 License

MIT
