import express from "express";
import {
  createHelpdeskTicket,
  getOwnHelpdeskTickets,
  getHelpdeskTicketById,
} from "../../controllers/vendor/helpdesk";
import { helpdeskUpload } from "../../middlewares/upload";
import { body, query, param } from "express-validator";

const router = express.Router();

// Create a helpdesk ticket (with optional images)
router.post(
  "/",
  helpdeskUpload.array("images", 5),
  [
    body("vendorId").isMongoId(),
    body("issueType").isIn(["payment", "profile", "technical", "other"]),
    body("subject").isString().isLength({ min: 5, max: 100 }),
    body("body").isString().isLength({ min: 10 }),
  ],
  createHelpdeskTicket
);
// List own tickets
router.get("/", [query("vendorId").isMongoId()], getOwnHelpdeskTickets);
// View a specific ticket
router.get("/:id", [param("id").isMongoId()], getHelpdeskTicketById);

export default router;
