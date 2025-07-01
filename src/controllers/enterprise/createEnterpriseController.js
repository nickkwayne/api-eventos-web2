import { create, enterpriseValidator } from '../../models/enterpriseModel.js'

export default async function createEnterpriseController(req, res, next) {
    try {
        const enterprise = req.body
        const {success, error, data: enterpriseValidated} =
        enterpriseValidator(enterprise, {id: true})
        if(!success){
            return res.status(400).json({
                message: 'Erro ao cadastrar empresa, verifique seus dados e tente novamente !!',
                errors: error.flatten().fieldErrors
            })
        }
    
        const result = await create(enterpriseValidated) 
        return res.json({
            message: "Empresa cadastrada com sucesso !!",
            enterprise: result
        })
    } catch (error) {
        next(error)
    }
}