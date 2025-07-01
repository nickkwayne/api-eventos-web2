import { update } from "../../models/userModel.js"

export default async function updateUserController(req,res) {
    const {id} = req.params
    const users = req.body

    const result = await update(+id, users)

    return res.json({
        message: "Dados de Usuário atualizados com sucesso !!",
        users: result
    })
    
}