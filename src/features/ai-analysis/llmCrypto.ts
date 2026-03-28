/**
 * AES-GCM encryption/decryption for LLM API keys stored in localStorage.
 * A device-specific CryptoKey is generated once and stored as JWK.
 */

const KEY_STORAGE = 'AISVSwise_enc_key';

async function getOrCreateKey(): Promise<CryptoKey> {
    const stored = localStorage.getItem(KEY_STORAGE);
    if (stored) {
        const jwk = JSON.parse(stored) as JsonWebKey;
        return crypto.subtle.importKey('jwk', jwk, { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']);
    }
    const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    const jwk = await crypto.subtle.exportKey('jwk', key);
    localStorage.setItem(KEY_STORAGE, JSON.stringify(jwk));
    return key;
}

export async function encryptApiKey(plaintext: string): Promise<string> {
    const key = await getOrCreateKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plaintext);
    const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
    const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.byteLength);
    return btoa(String.fromCharCode(...combined));
}

export async function decryptApiKey(b64: string): Promise<string | null> {
    try {
        const key = await getOrCreateKey();
        const combined = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
        const iv = combined.slice(0, 12);
        const ciphertext = combined.slice(12);
        const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
        return new TextDecoder().decode(plaintext);
    } catch {
        return null;
    }
}
