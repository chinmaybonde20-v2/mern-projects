import mongoose, { Document, Schema } from "mongoose";

export interface Enquiry extends Document {
  userName: string;
  userEmail: string;
  message: string;
}

const enquirySchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: { type: String, required: true },
    message: { type: String, required: true },
  },
  { collection: "enquiries" }
);

const enquiryModel = mongoose.model<Enquiry>("Enquiry", enquirySchema);

export default enquiryModel;
