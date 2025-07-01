import { update } from "../../models/enterpriseModel.js"

export default async function updateEnterpriseController(req,res) {
    const {id} = req.params
    const enterprise = req.body

    const result = await update(+id, enterprise)

    return res.json({
        message: "Dados de Empresa atualizados com sucesso !!",
        enterprise: result
    })
    
}