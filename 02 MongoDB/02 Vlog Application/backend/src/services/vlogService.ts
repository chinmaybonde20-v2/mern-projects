import vlogModel from "../models/vlogModel";

export const fetchVlogsService = async (): Promise<any[]> => {
  try {
    const vlogs = await vlogModel.find();
    console.log("Fetched Vlogs:", vlogs);
    return vlogs;
  } catch (error) {
    console.error("Error fetching vlogs:", error);
    throw error;
  }
};
