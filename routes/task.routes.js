import express from "express";
import { createTask ,getAllTasks,updateTask,deleteTask,assignTask,updateTaskStatus,getUserTasks,assignTaskToTeamMember} from "../controllers/task.controller.js";
import { authenticate,isAdmin,isManager,isManagerOfTeam } from "../middleware/authorised.js";

const router = express.Router();
// only admin can access these routes
router.post("/create", authenticate, isAdmin, createTask);
router.get("/fetch", authenticate, isAdmin, getAllTasks);
router.put("/update/:id", authenticate, isAdmin, updateTask);
router.delete("/delete/:id", authenticate, isAdmin, deleteTask);
router.post('/:userId/assign',authenticate,isAdmin, assignTask);
router.get('/:userId/tasks',authenticate,isAdmin, getUserTasks);
router.patch('/status/:taskId',authenticate,isAdmin, updateTaskStatus);

// only manager can access thair team
router.post("/manager/:id/assign", authenticate, isManager, isManagerOfTeam, assignTaskToTeamMember);
router.patch('/manager/status/:taskId',authenticate,isManager,updateTaskStatus);







export default router;
