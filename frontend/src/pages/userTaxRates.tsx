

import React, { useState } from "react";
import FormContainer from "../components/formContainer";
import { fetchTaxBill } from "../services/useService_1";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const UserTaxBillForm: React.FC = () => {
  const [taxBillDetails, setTaxBillDetails] = useState<any | null>(null);

  // State for controlling dialog visibility
  const [openTaxBillDialog, setOpenTaxBillDialog] = useState(false);

  const [formData, setFormData] = useState({
    property_id: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the property_id is empty
    if (!formData.property_id) {
      setError("Please enter a property ID.");
      return;
    }

    setError(null);

    try {
      // Call the fetchTaxBill function from the API service
      const response = await fetchTaxBill(formData.property_id);

      if (response) {
        setTaxBillDetails(response);
        console.log(response); // Log the response
        setOpenTaxBillDialog(true);
      } else {
        setError("No tax bill found for the provided property ID.");
      }
    } catch (err: any) {
      console.error("Error fetching tax bill:", err);
      setError(
        err.response?.data?.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleCloseTaxBillDialog = () => {
    setOpenTaxBillDialog(false);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Tax Bill Details</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body class="bg-gray-100 font-sans p-6">
            <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h2 class="text-center text-2xl font-semibold mb-6">Tax Bill Details</h2>
              
              <div class="flex justify-between mb-4">
                <p class="font-medium">Property ID:</p>
                <p>${taxBillDetails.property_id}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">House Number:</p>
                <p>${taxBillDetails.house_number}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Street Name:</p>
                <p>${taxBillDetails.street_name}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Category Name:</p>
                <p>${taxBillDetails.category_name}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Owner Name:</p>
                <p>${taxBillDetails.owner_name}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Bill ID:</p>
                <p>${taxBillDetails.bill_id}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Tax Year:</p>
                <p>${taxBillDetails.tax_year}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Tax Amount:</p>
                <p>${taxBillDetails.tax_amount}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Due Date:</p>
                <p>${taxBillDetails.due_date}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Status:</p>
                <p>${taxBillDetails.status}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Total Paid:</p>
                <p>${taxBillDetails.total_paid}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Remaining Amount:</p>
                <p>${taxBillDetails.remaining_amount}</p>
              </div>

              <div class="mt-6 border-t-2 pt-4 text-center text-sm text-gray-500">
                <p>Generated on ${new Date().toLocaleDateString()}</p>
                <p>Thank you for using our service!</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <FormContainer title="View Tax Bill Details">
      <p className="text-gray-600 text-sm mb-4">
        Enter the Property ID below to fetch and view its tax bill details.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label htmlFor="property_id" className="block text-gray-700">
            Property ID
          </label>
          <input
            type="text"
            id="property_id"
            name="property_id"
            value={formData.property_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold"
          >
            View Details
          </button>
        </div>
      </form>

      <Dialog open={openTaxBillDialog} onClose={handleCloseTaxBillDialog}>
        <DialogTitle>Tax Bill Details</DialogTitle>
        <DialogContent>
          {taxBillDetails ? (
            <div>
              <p>Property ID: {taxBillDetails.property_id}</p>
              <p>House Number: {taxBillDetails.house_number}</p>
              <p>Street Name: {taxBillDetails.street_name}</p>
              <p>Category Name: {taxBillDetails.category_name}</p>
              <p>Owner Name: {taxBillDetails.owner_name}</p>
              <p>Bill ID: {taxBillDetails.bill_id}</p>
              <p>Tax Year: {taxBillDetails.tax_year}</p>
              <p>Tax Amount: {taxBillDetails.tax_amount}</p>
              <p>Due Date: {taxBillDetails.due_date}</p>
              <p>Status: {taxBillDetails.status}</p>
              <p>Total Paid: {taxBillDetails.total_paid}</p>
              <p>Remaining Amount: {taxBillDetails.remaining_amount}</p>
            </div>
          ) : (
            <p>No tax bill details available.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaxBillDialog} sx={{ color: "black" }}>
            Close
          </Button>
          <Button
            variant="contained"
            sx={{ color: "white", backgroundColor: "#709ec9" }}
            onClick={handlePrint}
            style={{ marginLeft: "10px" }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </FormContainer>
  );
};

export default UserTaxBillForm;
