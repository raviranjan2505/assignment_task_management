import express from "express";
import { login, logout, register,updateProfile,selfUpdate,createManagerTeam,allUsers,selfProfile} from "../controllers/user.controller.js";
import { authenticate, isAdmin, isSelf,isManager,isManagerOfTeam } from "../middleware/authorised.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/admin/allUsers", authenticate, isAdmin,allUsers);
router.put("/admin/update/:id", authenticate, isAdmin, updateProfile);
router.put("/update/:id", authenticate, isSelf, selfUpdate);
router.get("/:id", authenticate,selfProfile);


// Update team member's profile
router.post("/create-manager-team", authenticate, isAdmin, createManagerTeam);
router.put("/manager/:id/updateProfile", authenticate, isManager, isManagerOfTeam,updateProfile );

export default router;
