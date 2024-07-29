import { Request, Response } from "express";
import { fetchVlogsService } from "../services/vlogService";

export const getVlogsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vlogs = await fetchVlogsService();
    res.json(vlogs);
    console.log("Vlogs sent to client:", vlogs);
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
