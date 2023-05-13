import crypto from "crypto";

export const getRandomPassword = (length: number): string => {
    const buffer: Buffer = crypto.randomBytes(Math.ceil(length / 2));
    return buffer.toString('hex').slice(0, length);
}