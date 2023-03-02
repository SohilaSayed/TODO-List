import  jwt  from 'jsonwebtoken';


export const generateToken = ({payload={},signature = process.env.SIGNATURE,expiresIn = 60*60})=>{
    const token = jwt.sign(payload,signature,{expiresIn:parseInt(expiresIn)})
    return token
}

export const verifyToken = ({token="",signature = process.env.SIGNATURE}={})=>{
    const decoded = jwt.sign(token,signature)
    return decoded
}

export const destroyToken = ({payload={},signature = process.env.SIGNATURE,expiresIn = 60})=>{
    const tokenDest = jwt.sign({payload,signature,expiresIn:parseInt(expiresIn)})
    return tokenDest
}