import express from "express";
import {
  getAllHelpdeskTickets,
  getHelpdeskTicketById,
  respondToHelpdeskTicket,
} from "../../controllers/admin/helpdesk";
import { body, param, query } from "express-validator";

const router = express.Router();

// List all tickets (with optional filters)
router.get(
  "/",
  [
    query("status")
      .optional()
      .isIn(["open", "in_progress", "resolved", "closed"]),
    query("issueType")
      .optional()
      .isIn(["payment", "profile", "technical", "other"]),
  ],
  getAllHelpdeskTickets
);
// View a specific ticket
router.get("/:id", [param("id").isMongoId()], getHelpdeskTicketById);
// Respond/update status
router.put(
  "/:id/respond",
  [
    param("id").isMongoId(),
    body("adminResponse").optional().isString().isLength({ min: 1 }),
    body("status")
      .optional()
      .isIn(["open", "in_progress", "resolved", "closed"]),
  ],
  respondToHelpdeskTicket
);

export default router;
