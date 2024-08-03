import { Router } from "express";
import {
  getVlogsController,
  addVlogController,
  updateVlogController,
  deleteVlogController,
} from "../controllers/vlogController";

const router = Router();

router.get("/vlogs", getVlogsController);
router.post("/vlogs", addVlogController);
router.put("/vlogs/:id", updateVlogController);
router.delete("/vlogs/:id", deleteVlogController);

export const vlogRoutes = router;
