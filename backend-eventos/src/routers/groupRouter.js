import express from "express";
import createGroupController from "../controllers/group/createGroupController.js";
import updateGroupController from "../controllers/group/updateGroupController.js";
import getGroupController from "../controllers/group/getGroupController.js"; 
import deleteGroupController from "../controllers/group/deleteGroupController.js";

const router = express.Router();

router.post("/", createGroupController);
router.put("/:id", updateGroupController);
router.get("/list", getGroupController);
router.delete("/:id", deleteGroupController);

export default router;

