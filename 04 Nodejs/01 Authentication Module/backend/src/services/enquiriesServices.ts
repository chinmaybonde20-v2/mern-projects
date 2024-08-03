import enquiryModel, { Enquiry } from "../models/enquiriesModel";

export const fetchEnquiriesService = async (): Promise<Enquiry[]> => {
  try {
    const enquiries = await enquiryModel.find();
    console.log("Fetched Enquiries:", enquiries);
    return enquiries;
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    throw error;
  }
};

export const createEnquiryService = async (
  enquiryData: Partial<Enquiry>
): Promise<Enquiry> => {
  try {
    const newEnquiry = new enquiryModel(enquiryData);
    await newEnquiry.save();
    console.log("Enquiry saved:", newEnquiry);
    return newEnquiry;
  } catch (error) {
    console.error("Error creating enquiry:", error);
    throw error;
  }
};
