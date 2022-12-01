import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {Platform} from 'react-native';


function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join('');
}

const dec2Hex = (amount) => {
    const hexAmount = amount.toString(16);
    const hex2Complement = (hexAmount.length % 2 === 0) ? hexAmount : ('0' + hexAmount);
    let prefix = null;
    if (hexAmount.length > 0 && hexAmount.length <= 2) {
        prefix = '0200';
    } else if (hexAmount.length > 2 && hexAmount.length <= 4) {
        prefix = '02';
    } else if (hexAmount.length > 5 && hexAmount.length <= 6) {
        prefix = '03';
    }
    return {prefix, hex2Complement};
};

const payWithOROCard = async (price) => {
    try {
        await NfcManager.requestTechnology([NfcTech.IsoDep]);

        const selectAppletBytes = hexToBytes('00A4040006A0112233440000');
        const verifyPinBytes = hexToBytes('8020000003111111');
        const checkBalanceBytes = hexToBytes('80500000');

        await NfcManager.isoDepHandler.transceive(selectAppletBytes);
        await NfcManager.isoDepHandler.transceive(verifyPinBytes);
        const balanceBytes = await NfcManager.isoDepHandler.transceive(checkBalanceBytes);
        const hex = bytesToHex(balanceBytes);
        if (hex.slice(-4) === '9000') {
            const cardBalance = parseInt(hex.slice(0, -4), 16)
            return price <= cardBalance;
        } else {
            alert('failed to scan ORO card, please try again');
            NfcManager.cancelTechnologyRequest();
        }
    } catch (e) {
        alert('failed to scan ORO card, please try again');
        NfcManager.cancelTechnologyRequest();
    } finally {
        NfcManager.cancelTechnologyRequest();
    }
};

export default {
    hexToBytes,
    bytesToHex,
    dec2Hex,
    payWithOROCard,
};
