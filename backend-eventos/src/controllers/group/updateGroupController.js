import { update, groupValidator } from "../../models/groupModel.js"

export default async function updateGroupController(req,res) {
try{
    const id = Number(req.params.id);
    const group = req.body

    const { success, error, data } = groupValidator(group, true);
    if (!success) {
      return res.status(400).json({ message: "Dados inválidos", errors: error.flatten().fieldErrors });
    }

    const result = await update(id, data)

    return res.json({
        message: "As informações do grupo foram atualizados com sucesso !!",
        group: result
    });
} catch (err) {
    console.error("Erro ao atualizar o grupo:", err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  } 
}