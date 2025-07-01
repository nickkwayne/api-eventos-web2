import { create, userValidator } from "../../models/userModel.js"

export default async function createUserController(req, res, next) {
    try {
        const users = req.body
        const {success, error, data: userValidated} =
        userValidator(users, {id: true})
        if(!success){
            return res.status(400).json({
                message: 'Erro ao usuário, verifique seus dados e tente novamente !!',
                errors: error.flatten().fieldErrors
            });
        }
    
        const result = await create(userValidated) 
        return res.json({
            message: "Usuário criado com sucesso !!",
            property: result
        })
    } catch (error) {
        next(error)
    }
}