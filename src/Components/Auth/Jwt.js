import { decode } from "base-64";

function base64UrlDecode(input) {
    let base64 = input
    let padded = ''
    console.log(`JWT.JS : ${input}`);
    try {
        base64 = input.replace(/-/g, '+').replace(/_/g, '/');
        padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    } catch (error) {
        console.log(`base64.error : ${error}`);
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
    // Replace URL-safe characters with base64 standard characters
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding if necessary
    // while (base64.length % 4) {
    //     base64 += '=';
    // }

    try {
        // Decode base64 string
        console.log(`Window???? : ${base64}`);
        return decodeURIComponent(decode(base64));
    } catch (e) {
        console.error('Failed to decode base64 string:', e);
        return null;
    }
}

function base64Decode(base64) {
    // Define the base64 characters
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    // Replace URL-safe characters with standard base64 characters if needed
    base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding if necessary
    while (base64.length % 4) {
        base64 += '=';
    }

    let output = '';
    let buffer;

    // Decode each set of 4 base64 characters into 3 bytes
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