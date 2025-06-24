import { create } from "../../models/enterpriseModel.js"

export default async function createenterpriseController(req, res, next) {
    try {
        const enterprise = req.body

        // Comentar a validação para não usar
        // const { success, error, data: eventsValidated } = eventValidator(event)

        // Passar diretamente o evento sem validação
        const result = await create(enterprise)  // Usar `event` diretamente, sem validação

        return res.json({
            message: "Cadastro de empresa criado com sucesso !!",
            property: result
        })
    } catch (error) {
        next(error)
    }
}