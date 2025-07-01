import { getList } from "../../models/eventModel.js";

export default async function getEventController(req, res) {
    const result = await getList()

    return res.json(result)
    
}