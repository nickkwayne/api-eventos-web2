import { remove, userValidator } from "../../models/userModel.js"

export default async function deleteUserController(req, res, next) {
    try{
        const {id} = req.params
        const user = {
            id: +id
        }

        const {success, error, data} = userValidator(user, {user, cpf:true, name: true, email:true, pass:true, gender:true})

        if(!success){
            return res.status(400).json({
                message: 'Ocorreu um erro ao tentar deletar seu usuário, verifique os dados e tente novamente !',
                errors: error.flatten().fieldErrors
            });
        }

        const result = await remove(data.id)

        return res.json({
            message: `Usuário com ID ${data.id} foi excluido com sucesso !!`,
            users: result,
        });
        
    } catch(error){
        if(error?.code === 'P2025' && error?.meta?.cause.includes('Record to delete does not exist')){
            return res.status(404).json({
                message: 'Empresa não encontrada !!',
            })
        }
        next(error)
    }
}