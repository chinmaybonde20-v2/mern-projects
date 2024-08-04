import vlogModel from "../models/vlogModel";
import { Vlog } from "../models/vlogModel";

export const fetchVlogsService = async (): Promise<Vlog[]> => {
  try {
    const vlogs = await vlogModel.find();
    console.log("Fetched Vlogs:", vlogs);
    return vlogs;
  } catch (error) {
    console.error("Error fetching vlogs:", error);
    throw error;
  }
};

export const addVlogService = async (vlogData: Vlog): Promise<Vlog> => {
  try {
    const newVlog = new vlogModel(vlogData);
    await newVlog.save();
    console.log("Added Vlog:", newVlog);
    return newVlog;
  } catch (error) {
    console.error("Error adding vlog:", error);
    throw error;
  }
};

export const updateVlogService = async (
  id: string,
  vlogData: Partial<Vlog>
): Promise<Vlog | null> => {
  try {
    const updatedVlog = await vlogModel.findByIdAndUpdate(id, vlogData, {
      new: true,
    });
    console.log("Updated Vlog:", updatedVlog);
    return updatedVlog;
  } catch (error) {
    console.error("Error updating vlog:", error);
    throw error;
  }
};

export const deleteVlogService = async (id: string): Promise<Vlog | null> => {
  try {
    const deletedVlog = await vlogModel.findByIdAndDelete(id);
    console.log("Deleted Vlog:", deletedVlog);
    return deletedVlog;
  } catch (error) {
    console.error("Error deleting vlog:", error);
    throw error;
  }
};
