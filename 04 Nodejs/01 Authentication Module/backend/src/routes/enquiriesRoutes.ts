import { Router } from "express";
import {
  createEnquiryController,
  getEnquiriesController,
} from "../controllers/enquiriesControllers";

const router = Router();

router.get("/enquiries", getEnquiriesController);
router.post("/enquiries", createEnquiryController);

export const enquiriesRoutes = router;
