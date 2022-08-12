import Reader from "react-native-acs";

export const start = async () => {
    try {
        const response = await Reader.Init()
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const connect = async (slotNum) => {
    try {
        const response = await Reader.ConnectToCard(slotNum)
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const selectApplet = async (slotNum) => {
    try {
        const response = await Reader.Transmit(slotNum, "00A4040006A0112233440000")
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const verifyPin = async (slotNum) => {
    try {
        const response = await Reader.Transmit(slotNum, "8020000003111111")
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const checkBalance = async (slotNum) => {
    try {
        const response = await Reader.Transmit(slotNum, "80500000")
        return response
    } catch (e) {
        throw new Error(e)
    }
}

const dec2Hex = async (amount) => {
    const hexAmount = amount.toString(16)
    const hex2Complement = (hexAmount.length % 2 === 0) ? hexAmount : ("0" + hexAmount)
    let prefix = null
    if (hexAmount.length > 0 && hexAmount.length <= 2) {
        prefix = "0200"
    } else if (hexAmount.length > 2 && hexAmount.length <= 4) {
        prefix = "02"
    } else if (hexAmount.length > 5 && hexAmount.length <= 6) {
        prefix = "03"
    }
    return {prefix, hex2Complement}
}

export const addBalance = async (slotNum, amount) => {
    try {
        const {prefix, hex2Complement} = await dec2Hex(Math.floor(Number(amount)))
        const response = await Reader.Transmit(slotNum, "80300000" + prefix + hex2Complement)
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export const removeBalance = async (slotNum, amount) => {
    try {
        const {prefix, hex2Complement} = await dec2Hex(Math.floor(Number(amount)))
        const response = await Reader.Transmit(slotNum, "80400000" + prefix + hex2Complement)
        return response
    } catch (e) {
        throw new Error(e)
    }
}

export default {
    start,
    connect,
    selectApplet,
    verifyPin,
    checkBalance,
    addBalance,
    removeBalance
}
