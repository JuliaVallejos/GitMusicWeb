const Joi = require("joi")

const validator = {
// valida los campos esenciales (userBase)
    validNewUser: (req, res, next) => {
        const schema = Joi.object({
            firstName: Joi.string().trim().required().min(2).max(20),
            lastName: Joi.string().trim().required().min(2).max(20),
            email: Joi.string().trim().required().email({minDomainSegments: 1, tlds: {allow: false}}),
            password: Joi.string().trim().required().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,50}$/), // PASS: LMAYUSC, LMINUSC,N0-9,3,8CARAC
            google:Joi.string(),
            pic:Joi.string()
        })
        const validation = schema.validate(req.body, {abortEarly:false}) 
        if (!validation.error) {
            next() // todo ok
         }else {
            res.json({success: false, errores: validation.error})
           
    }
}
    
// no está implementado aún, falta resolver renderizado de errores en front

}
module.exports = validator