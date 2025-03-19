const bcrypt = require('bcrypt');

const saltRounds = 10;

export async function hashPassword(password:string): Promise<string>{
    return await bcrypt.hash(password,saltRounds)
}

export async function comparePasswords(password:string, hash: string): Promise<string>{
    return await bcrypt.compare(password,hash)
}