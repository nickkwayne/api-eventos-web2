import { create, groupValidator } from "../../models/groupModel.js"

export default async function createGroupController(req, res, next) {
    try {
        const group = req.body
        const {success, error, data: groupValidated} =
        groupValidator(group, {id: true})
        if(!success){
            return res.status(400).json({
                message: 'Erro ao criar Grupo, verifique seus dados e tente novamente !!',
                errors: error.flatten().fieldErrors
            })
        }
    
        const result = await create(groupValidated) 
        return res.json({
            message: "Grupo criado com sucesso !!",
            group: result
        })
    } catch (error) {
        next(error)
    }
}