
import { create, eventValidator } from "../../models/eventModel.js"

export default async function createEventController(req, res, next) {
    try {
        const event = req.body
        const {success, error, data: eventsValidated} =
        eventValidator(event, {id: true})
        if(!success){
            return res.status(400).json({
                message: 'Erro ao cadastrar Evento, verifique seus dados e tente novamente !!',
                errors: error.flatten().fieldErrors
            })
        }
    
        const result = await create(eventsValidated) 
        return res.json({
            message: "Evento criado com sucesso !!",
            property: result
        })
    } catch (error) {
        next(error)
    }
}
