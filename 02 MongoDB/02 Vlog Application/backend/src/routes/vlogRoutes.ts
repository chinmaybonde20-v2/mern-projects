import { Router } from "express";
import { getVlogsController } from "../controllers/vlogController";

const router = Router();

router.get("/vlogs", getVlogsController);

export const vlogRoutes = router;
