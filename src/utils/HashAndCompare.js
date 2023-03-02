import bcrypt from 'bcryptjs'

export const hash = ({plainText , salt = process.env.SALTROUND}={})=>{

    const hashResult = bcrypt.hashSync(plainText,parseInt(salt))
    return hashResult
}

export const compare = ({plainText , hashValue}={})=>{

    const compareResult = bcrypt.compareSync(plainText,hashValue)
    return compareResult
}