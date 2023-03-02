

const dataMethod = ['body','params','query']
const validationErr = []
export const validation = (schema) => {
        return(req,res,next)=>{

        dataMethod.forEach(key =>{
            if(schema[key]){
                const validationResult = schema[key].validate(req[key],{abortEarly : false})
                if(validationResult.error){
                    validationErr.push(validationResult.error.details)
                }
            }
        })

        if(validationErr.length > 0){
            return res.json({message : "Validation Error" , validationErr})
        }

        return next()
    }
}