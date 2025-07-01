import { getList } from "../../models/groupModel.js";

export default async function getGruoupController(req, res) {
    const result = await getList()

    return res.json(result)
    
}