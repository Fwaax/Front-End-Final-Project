import { decode } from "base-64";

function base64UrlDecode(input) {
    let base64 = input
    let padded = ''
    try {
        base64 = input.replace(/-/g, '+').replace(/_/g, '/');
        padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    } catch (error) {
        return;
    }

    return decode(padded);
}

function parseJWT(token) {
    const [headerB64, payloadB64, signatureB64] = token.split('.');

    const headerJson = base64Decode(headerB64);
    const payloadJson = base64Decode(payloadB64);

    const header = JSON.parse(headerJson);
    const payload = JSON.parse(payloadJson);

    return { header, payload, signature: signatureB64 };
}

function base64alt(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

    try {
        return decodeURIComponent(decode(base64));
    } catch (e) {
        return null;
    }
}

function base64Decode(base64) {
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }

    let output = '';
    let buffer;
    for (let i = 0; i < base64.length; i += 4) {
        buffer =
            (base64Chars.indexOf(base64.charAt(i)) << 18) |
            (base64Chars.indexOf(base64.charAt(i + 1)) << 12) |
            (base64Chars.indexOf(base64.charAt(i + 2)) << 6) |
            base64Chars.indexOf(base64.charAt(i + 3));

        output += String.fromCharCode((buffer >> 16) & 0xff);
        if (base64.charAt(i + 2) !== '=') {
            output += String.fromCharCode((buffer >> 8) & 0xff);
        }
        if (base64.charAt(i + 3) !== '=') {
            output += String.fromCharCode(buffer & 0xff);
        }
    }

    const res = output.replace("ÿ", "}")

    return res;
}

export { base64UrlDecode, parseJWT, base64alt }