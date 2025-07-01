import { getList } from "../../models/enterpriseModel.js";

export default async function getEnterpriseController(req, res) {
    const result = await getList()

    return res.json(result)
    
}