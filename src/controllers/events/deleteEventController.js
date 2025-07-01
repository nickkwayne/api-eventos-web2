import { remove, eventValidator } from "../../models/eventModel.js"

export default async function deleteEventController(req, res, next) {
    try{
        const {id} = req.params
        const user = {
            id: +id
        }

        const {success, error, data} = eventValidator(user, {user, name:true, description: true, date:true, accessibility:true, location:true, enterpriseId:true});

        if(!success){
            return res.status(400).json({
                message: 'Ocorreu um erro ao tentar deletar este Evento, verifique os dados e tente novamente !',
                errors: error.flatten().fieldErrors
            });
        }

        const result = await remove(data.id)

        return res.json({
            message: `Evento ID ${data.id} foi excluido com sucesso !!`,
            event: result,
        });
        
    } catch(error){
        if(error?.code === 'P2025' && error?.meta?.cause.includes('Record to delete does not exist')){
            return res.status(404).json({
                message: 'Evento não encontrado !!',
            })
        }
        next(error)
    }
}

