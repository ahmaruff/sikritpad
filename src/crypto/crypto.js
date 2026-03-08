const APP_KEY = "somesuperhardtoguessstringthatyouwillneverknow_unlessyouareretarded";
const ITERATION = 200000;

async function deriveId(password) {
    const enc = new TextEncoder();

    const salt = enc.encode(APP_KEY);

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const bits = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: ITERATION,
            hash: "SHA-256"
        },
        keyMaterial,
        384 // 48 bytes
    );

    const bytes = new Uint8Array(bits);

    // split hasil
    const noteIdBytes = bytes.slice(0, 16);
    const keyBytes = bytes.slice(16);

    // convert keyBytes jadi AES key
    const encKey = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    );

    const noteId = btoa(String.fromCharCode(...noteIdBytes));

    return { noteId, encKey };
}

async function encrypt(note, encKey) {
    const enc = new TextEncoder();

    const data = enc.encode(note);
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const cipherText = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        encKey,
        data
    );


    return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(cipherText))
    }
}

async function decrypt(blob, encKey) {
    const dec = new TextDecoder();

    const iv = new Uint8Array(blob.iv);
    const cipherText = new Uint8Array(blob.data);


    const plainText = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        encKey,
        cipherText
    );


    return dec.decode(plainText);
}

export { deriveId, encrypt, decrypt }
