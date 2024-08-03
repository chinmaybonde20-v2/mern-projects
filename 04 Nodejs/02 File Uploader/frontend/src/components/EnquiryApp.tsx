import React from "react";
import { EnquiryForm } from "./EnquiryForm";
import { EnquiriesTable } from "./EnquiriesTable";
import "../assets/style.css";
export const EnquiryApp = () => {
  return (
    <div>
      <h1>Enquiry App</h1>
      <EnquiryForm />
      <hr />
      <EnquiriesTable />
    </div>
  );
};
