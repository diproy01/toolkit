// libs/utils/passwordUtils.ts

import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class PasswordUtils {
    static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        if (!plainPassword || !hashedPassword) {
            throw new Error('パスワードが必要です');
        }
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

}