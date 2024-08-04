import { Request, Response } from "express";
import {
  fetchVlogsService,
  addVlogService,
  updateVlogService,
  deleteVlogService,
} from "../services/vlogService";
import { Vlog } from "../models/vlogModel";

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

export const addVlogController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vlogData: Vlog = req.body;
    const newVlog = await addVlogService(vlogData);
    res.status(201).json(newVlog);
    console.log("Vlog added:", newVlog);
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateVlogController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vlogData: Partial<Vlog> = req.body;
    const { id } = req.params;
    const updatedVlog = await updateVlogService(id, vlogData);
    if (updatedVlog) {
      res.json(updatedVlog);
      console.log("Vlog updated:", updatedVlog);
    } else {
      res.status(404).json({ error: "Vlog not found" });
    }
  } catch (error) {
    console.error("Error handling PUT request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteVlogController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedVlog = await deleteVlogService(id);
    if (deletedVlog) {
      res.json(deletedVlog);
      console.log("Vlog deleted:", deletedVlog);
    } else {
      res.status(404).json({ error: "Vlog not found" });
    }
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
