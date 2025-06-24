/*import { create, eventValidator } from "../../models/eventModel.js"

export default async function createeventsController(req, res, next) {
    try {
        const event = req.body

        const { success, error, data: eventsValidated } = eventValidator(event)

        if (!success) {
            return res.status(400).json({
                message: 'Erro ao cadastrar evento, verifique os dados e tente novamente!',
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
*/
import { create } from "../../models/eventModel.js"

export default async function createeventsController(req, res, next) {
    try {
        const event = req.body

        // Comentar a validação para não usar
        // const { success, error, data: eventsValidated } = eventValidator(event)

        // Passar diretamente o evento sem validação
        const result = await create(event)  // Usar `event` diretamente, sem validação

        return res.json({
            message: "Evento criado com sucesso !!",
            property: result
        })
    } catch (error) {
        next(error)
    }
}
