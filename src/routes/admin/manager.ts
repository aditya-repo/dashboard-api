import { Router } from "express";
import {
  createManager,
  getManagers,
  updateManager,
} from "../../controllers/admin/manager";

const router = Router();

// Create manager
router.post("/", createManager);
// Get all managers
router.get("/", getManagers);
// Update manager by id
router.put("/:id", updateManager);

export default router;
