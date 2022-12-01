const {DeviceEventEmitter, Platform} = require('react-native');

import {RNSerialport, actions} from 'react-native-usb-serialport';
const TcpSocketCreateServer = require('react-native-usb-serialport/src/index.js')
    .createServer;

class SerialportGateway {
    static tcpSocketPort = 7700;
    static tcpSocketServer = undefined;

    // JAVA native gateway need these
    static isNativeGateway = true;
    static isNativeGatewayJsEventEmitOnSerialportData = true; // won't reduce native gateway performance

    // JS bridge gateway need these and isNativeGateway should be false
    static jsAppBus2DeviceName = {};
    static jsDeviceName2Socket = {};

    static emitter =
        Platform.OS === 'ios'
            ? {
                addListener: () => {},
                removeListener: () => {},
                emit: () => {},
            }
            : DeviceEventEmitter;

    static doInit() {
        this.emitter.addListener(
            actions.ON_SERVICE_STARTED,
            this.onServiceStarted,
            this,
        );
        this.emitter.addListener(
            actions.ON_SERVICE_STOPPED,
            this.onServiceStopped,
            this,
        );
        this.emitter.addListener(
            actions.ON_DEVICE_ATTACHED,
            this.onDeviceAttached,
            this,
        );
        this.emitter.addListener(
            actions.ON_DEVICE_DETACHED,
            this.onDeviceDetached,
            this,
        );
        this.emitter.addListener(actions.ON_ERROR, this.onError, this);
        this.emitter.addListener(actions.ON_CONNECTED, this.onConnected, this);
        this.emitter.addListener(
            actions.ON_DISCONNECTED,
            this.onDisconnected,
            this,
        );
        this.emitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
        // RNSerialport.setReturnedDataType(definitions.RETURNED_DATA_TYPES.HEXSTRING);
        Platform.OS === 'android' && RNSerialport.startUsbService();

        if (Platform.OS === 'android') {
            // who would build IoT project with ios :P
            this.tcpSocketServer = TcpSocketCreateServer((socket) => {
                console.warn(
                    'connected client ' + socket.remoteAddress + ':' + socket.remotePort,
                );
                if (!this.isNativeGateway) {
                    // setEncoding is meaningless when not isNativeGateway
                    socket.setEncoding('binary');
                }

                socket.on('data', (rawData) => {
                    if (this.isNativeGateway) {
                        console.warn('should not be here ');
                        return;
                    }

                    let data;
                    try {
                        data = JSON.parse(rawData);
                    } catch (err) {
                        data = [];
                        [].map.call(rawData, (value, index, str) => {
                            data.push(str.charCodeAt(index));
                        });
                    }
                    if (__DEV__) {
                        console.warn('from client ' + this.byteArray2HexArray(data));
                    }

                    let appBus = 0; // this example passthrough assume only one serial port, so 0 here, you can customize appBus from somewhere in the data received
                    let deviceName = this.jsAppBus2DeviceName[appBus];
                    if (deviceName) {
                        this.jsDeviceName2Socket[deviceName] = socket;
                        RNSerialport.writeBytes(deviceName, rawData);
                    }
                });

                socket.on('error', (error) => {
                    console.warn('client error ', error);
                    // socket.end();
                });

                socket.on('close', (error) => {
                    console.warn(
                        'closed client ' + socket.remoteAddress + ':' + socket.remotePort,
                    );
                    _.omitBy(this.jsDeviceName2Socket, (value) => value === socket);
                    // socket.destroy();
                });
            }).listen({port: this.tcpSocketPort});

            this.tcpSocketServer.on('error', (error) => {
                console.warn('server error ', error);
            });

            this.tcpSocketServer.on('close', () => {
                console.warn('server closed');
            });
        }
    }

    static doDestroy() {
        this.emitter.removeListener(
            actions.ON_SERVICE_STARTED,
            this.onServiceStarted,
            this,
        );
        this.emitter.removeListener(
            actions.ON_SERVICE_STOPPED,
            this.onServiceStopped,
            this,
        );
        this.emitter.removeListener(
            actions.ON_DEVICE_ATTACHED,
            this.onDeviceAttached,
            this,
        );
        this.emitter.removeListener(
            actions.ON_DEVICE_DETACHED,
            this.onDeviceDetached,
            this,
        );
        this.emitter.removeListener(actions.ON_ERROR, this.onError, this);
        this.emitter.removeListener(actions.ON_CONNECTED, this.onConnected, this);
        this.emitter.removeListener(
            actions.ON_DISCONNECTED,
            this.onDisconnected,
            this,
        );
        this.emitter.removeListener(actions.ON_READ_DATA, this.onReadData, this);

        if (Platform.OS === 'android') {
            RNSerialport.disconnectAllDevices();
            RNSerialport.stopUsbService();
            if (this.tcpSocketServer) {
                this.tcpSocketServer.destroy();
                this.tcpSocketServer = undefined;
            }
        }
    }

    static onServiceStarted(response) {
        console.warn('USB service started');

        if (this.isNativeGateway) {
            RNSerialport.setIsNativeGateway(this.isNativeGateway);
            RNSerialport.setIsNativeGatewayJsEventEmitOnSerialportData(
                this.isNativeGatewayJsEventEmitOnSerialportData,
            );
        }

        if (response.deviceAttached) {
            this.onDeviceAttached();
        }
    }

    static onServiceStopped() {
        console.warn('USB service stopped');
    }

    static onDeviceAttached(deviceName) {
        console.warn('USB device attached ' + deviceName);
        this.fillDeviceListAndConnect();
    }

    static onDeviceDetached(deviceName) {
        console.warn('USB device detached ' + deviceName);
    }

    static onConnected(deviceName) {
        console.warn(deviceName, 'USB serialPort connected');

        let busIndex = this.getBusIndexFromDevPath(deviceName);

        if (this.isNativeGateway) {
            RNSerialport.appBus2DeviceNamePut(busIndex, deviceName);
        } else {
            this.jsAppBus2DeviceName[busIndex] = deviceName;
        }
    }
    static onDisconnected(deviceName) {
        console.warn(deviceName, 'USB serialPort disconnected');

        if (this.isNativeGateway) {
            // will auto appBus2DeviceName.values().removeIf(deviceName::equals) in RNSerialportModule.java
        } else {
            _.omitBy(this.jsAppBus2DeviceName, (value) => value === deviceName);
        }
    }

    static onReadData(data) {
        if (__DEV__) {
            console.warn('onUsbSerialportReceiveData', {
                linuxDevPath: data.deviceName,
                valueArray: this.byteArray2HexArray(data.payload),
            });
        }

        if (this.isNativeGateway) {
            // will comes here when isNativeGatewayJsEventEmitOnSerialportData is true
            this.emitter.emit('YOUR_APP_MAYBE_ALSO_NEED_JS_onSerialportReceiveData', {
                linuxDevPath: data.deviceName,
                valueArray: data.payload,
            });
        } else {
            let socket = this.jsDeviceName2Socket[data.deviceName];
            if (socket) {
                socket.write(data.payload);
            }
        }
    }

    static onError(error) {
        console.error(error);
    }

    // deviceName of usb serial device on your board, maybe replaced in fillDeviceListAndConnect()
    static usbSerialPath = [
        '/dev/bus/usb/001/003',
        '/dev/bus/usb/001/005',
        '/dev/bus/usb/001/007',
        '/dev/bus/usb/001/009',
    ];

    static getDevPathFromBusIndex(busIndex) {
        return this.usbSerialPath[busIndex] || this.usbSerialPath[0];
    }

    static getBusIndexFromDevPath(devPath) {
        let index = this.usbSerialPath.indexOf(devPath);
        return index === -1 ? 0 : index;
    }

    static fillDeviceListAndConnect() {
        RNSerialport.getDeviceList().then((list) => {
            // console.warn(list);
            // [
            //     {
            //         "name": "/dev/bus/usb/001/010",
            //         "productId": 20752,
            //         "vendorId": 1578
            //     },
            //     {
            //         "name": "/dev/bus/usb/001/009",
            //         "productId": 29987,
            //         "vendorId": 6790 // ch34x
            //     },
            //     {
            //         "name": "/dev/bus/usb/001/005",
            //         "productId": 29987,
            //         "vendorId": 6790 // ch34x
            //     },
            //     {
            //         "name": "/dev/bus/usb/002/002",
            //         "productId": 46880,
            //         "vendorId": 3034
            //     },
            //     {
            //         "name": "/dev/bus/usb/001/003",
            //         "productId": 29987,
            //         "vendorId": 6790 // ch34x
            //     },
            //     {
            //         "name": "/dev/bus/usb/001/007",
            //         "productId": 29987,
            //         "vendorId": 6790 // ch34x
            //     }
            // ]

            let ch34xUsbSerialPath = [];
            list.map((item) => {
                if (item.vendorId === 6790) {
                    ch34xUsbSerialPath.push(item.name);
                }
            });

            // If you use Beckhoff like module, pull and plug some modules,
            // their increased name should also be sorted.
            ch34xUsbSerialPath = ch34xUsbSerialPath.sort();

            ch34xUsbSerialPath.map((path, index) => {
                this.usbSerialPath[index] = path;
            });

            this.enableLinuxDev({
                devPaths: this.usbSerialPath,
            });
        });
    }

    static enableLinuxDev({devPaths}) {
        if (Platform.OS === 'android') {
            devPaths.map((path) => {
                RNSerialport.connectDevice(path, 115200);
            });
        }
    }

    static disableLinuxDev({devPaths}) {
        if (Platform.OS === 'android') {
            devPaths.map((path) => {
                RNSerialport.disconnectDevice(path);
            });
        }
    }

    static padHexString(string) {
        if (string.length === 1) {
            return '0' + string;
        } else {
            return string;
        }
    }

    static hexString2ByteArray(string) {
        let array = [];
        [].map.call(string, (value, index, str) => {
            if (index % 2 === 0) {
                array.push(parseInt(value + str[index + 1], 16));
            }
        });

        return array;
    }

    static byteArray2HexString(bytes) {
        return bytes
            .map((byte) => this.padHexString((byte & 0xff).toString(16)))
            .toString()
            .replace(/,/g, '')
            .toUpperCase();
    }

    static byteArray2HexArray(bytes) {
        return bytes
            .map((byte) => this.padHexString((byte & 0xff).toString(16)))
            .toString();
    }
}

module.exports = SerialportGateway;
