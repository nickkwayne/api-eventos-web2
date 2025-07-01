import { update } from "../../models/eventModel.js"

export default async function updateEventController(req,res) {
    const {id} = req.params
    const event = req.body

    const result = await update(+id, event)

    return res.json({
        message: "Evento atualizado com sucesso !!",
        event: result
    })
    
}