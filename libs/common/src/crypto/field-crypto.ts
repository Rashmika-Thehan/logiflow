import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class FieldCryptoError extends Error { }

const ALGORITHM = 'aes-256-gcm';

function keyFor(kid: string): Buffer {
    const raw = process.env[`FIELD_KEY_${kid.toUpperCase()}`];
    if (!raw) throw new FieldCryptoError(`No field encryption key configured for "${kid}"`);
    const key = Buffer.from(raw, 'base64');
    if (key.length !== 32) throw new FieldCryptoError(`Field key "${kid}" must be 32 bytes, base64-encoded`);
    return key;
}

const b64 = (buf: Buffer) => buf.toString('base64url');
const unb64 = (s: string) => Buffer.from(s, 'base64url');

// Output: enc.<kid>.<iv>.<tag>.<ciphertext>. The kid lets keys rotate: new data
// uses FIELD_KEY_CURRENT, old data still decrypts while its key stays configured.
export function encryptField(plaintext: string, aad: string): string {
    const kid = (process.env.FIELD_KEY_CURRENT ?? 'v1').toLowerCase();
    const iv = randomBytes(12);
    const cipher = createCipheriv(ALGORITHM, keyFor(kid), iv);
    cipher.setAAD(Buffer.from(aad, 'utf8'));
    const data = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    return ['enc', kid, b64(iv), b64(cipher.getAuthTag()), b64(data)].join('.');
}

export function decryptField(blob: string, aad: string): string {
    const [prefix, kid, iv, tag, data] = String(blob).split('.');
    if (prefix !== 'enc' || !kid || !iv || !tag || !data) throw new FieldCryptoError('Malformed encrypted field');
    try {
        const decipher = createDecipheriv(ALGORITHM, keyFor(kid), unb64(iv));
        decipher.setAAD(Buffer.from(aad, 'utf8'));
        decipher.setAuthTag(unb64(tag));
        return Buffer.concat([decipher.update(unb64(data)), decipher.final()]).toString('utf8');
    } catch (err) {
        if (err instanceof FieldCryptoError) throw err;
        throw new FieldCryptoError('Could not decrypt field (wrong key, or the message was altered or re-targeted)');
    }
}