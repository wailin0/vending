import SerialPortAPI from 'react-native-serial-port-api';

export const startSession = async () => {
    const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
    try {
        await serialPort.send("03FFFF01")
    }
    catch (e) {
        throw new Error(e)
    }
}

export const endSession = async () => {
    const serialPort = await SerialPortAPI.open('/dev/ttyS5', {baudRate: 9600});
    try {
        await serialPort.send("0707")
    }
    catch (e) {
        throw new Error(e)
    }
}

export default {
    startSession,
    endSession
}
