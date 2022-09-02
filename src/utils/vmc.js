export function decodeVMC(buffer) {
    const hex = buffer.toString('hex');
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str.substring(1, str.length - 1);
}
