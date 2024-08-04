import { Request, Response } from "express";
import {
  createEnquiryService,
  fetchEnquiriesService,
} from "../services/enquiriesServices";
import { Enquiry } from "../models/enquiriesModel";

export const getEnquiriesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const enquiries = await fetchEnquiriesService();
    res.json(enquiries);
    console.log("Enquiry sent to client:", enquiries);
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createEnquiryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userName, userEmail, message } = req.body;
    const newEnquiry = await createEnquiryService({
      userName,
      userEmail,
      message,
    } as Enquiry);
    res.status(201).json(newEnquiry);
    console.log("New Enquiry created:", newEnquiry);
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
