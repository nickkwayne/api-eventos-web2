import { remove, groupValidator } from "../../models/groupModel.js"

export default async function deleteGroupController(req, res, next) {
    try{
        const {id} = req.params
        const user = {
            id: +id
        }
        const {success, error, data} = groupValidator(user, {name:true, description: true, data:true, creatorId:true})

        if(!success){
            return res.status(400).json({
                message: 'Ocorreu um erro ao tentar deletar este grupo, verifique os dados e tente novamente !',
                errors: error.flatten().fieldErrors
            });
        }

        const result = await remove(data.id)

        return res.json({
            message: `Grupo com ID ${data.id} foi excluido com sucesso !!`,
            group: result,
        });
        
    } catch(error){
        if(error?.code === 'P2025' && error?.meta?.cause.includes('Record to delete does not exist')){
            return res.status(404).json({
                message: ' não encontrada !!',
            })
        }
        next(error)
    }
}