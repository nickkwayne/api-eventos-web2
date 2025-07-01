import { remove, enterpriseValidator } from "../../models/enterpriseModel.js"

export default async function deleteEnterpriseController(req, res, next) {
    try{
        const {id} = req.params
        const user = {
            id: +id
        }

        const {success, error, data} = enterpriseValidator(user, {user, name:true, cnpj: true, email:true, pass:true})

        if(!success){
            return res.status(400).json({
                message: 'Ocorreu um erro ao tentar deletar este cadastro, verifique os dados e tente novamente !',
                errors: error.flatten().fieldErrors
            });
        }

        const result = await remove(data.id)

        return res.json({
            message: `Empresa com ID ${data.id} foi excluida com sucesso !!`,
            enterprise: result,
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

