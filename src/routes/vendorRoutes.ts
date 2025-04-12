import express from "express";
import {
  signupVendor,
  fillVendorDetails,
} from "../controllers/vendorController";

const router = express.Router();

router.post("/signup", (req, res) => signupVendor(req, res));
router.post("/details", fillVendorDetails);

export default router;
