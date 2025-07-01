import express from "express";
import createUserController from "../controllers/user/createUserController.js";
import updateUserController from "../controllers/user/updateUserController.js";
import getUserController from "../controllers/user/getUserController.js";
import deleteUserController from "../controllers/user/deleteUserController.js";

const router = express.Router();

router.post("/", createUserController);
router.put("/:id", updateUserController);
router.get("/list", getUserController);
router.delete("/:id", deleteUserController);

export default router;