

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { processPropertyPayment } from "../services/useService_1";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const PayTaxForm: React.FC = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState<any>(null); 

   // State for controlling dialog visibility
   const [openTaxHistoryDialog, setOpenTaxHistoryDialog] = useState(false);

  const [formData, setFormData] = useState({
    property_id: "",
    amount_paid: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "amount_paid" ? +value : value });
  };


  const handleCloseTaxHistoryDialog = () => {
    setOpenTaxHistoryDialog(false);
    // Redirect to a relevant page after success
    setTimeout(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const { role } = user;

            // Navigate based on the user's role
            if (role === "admin") {
              navigate("/admin/property-management");
            } else {
              navigate("/dashboard/property-management");
            }

             // Reload the page after navigation
            window.location.reload();

          } catch (err) {
            console.error("Error parsing user data from localStorage:", err);
          }
        }
    }, 0);
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      // Call the processPropertyPayment function from the API service
      const response = await processPropertyPayment(
        formData.property_id,
        formData.amount_paid
      );

      console.log("Tax Payment Successful", response);


    // Destructure the response to get payment and message
    const { payment } = response;

    // Set the payment details in the state
    setPaymentDetails(payment);

      setSuccess("Payment processed successfully");
      setFormData({
        property_id: "",
        amount_paid: 0,
      });


      // Open the dialog with payment details
      setOpenTaxHistoryDialog(true);

    } catch (err: any) {
      console.error("Error processing payment:", err);
      setError(
        err.response?.data?.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <FormContainer title="Pay Property Tax">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Property ID */}
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

        {/* Amount Paid */}
        <div>
          <label htmlFor="amount_paid" className="block text-gray-700">
            Amount Paid
          </label>
          <input
            type="number"
            id="amount_paid"
            name="amount_paid"
            value={formData.amount_paid}
            onChange={handleChange}
            required
            min={1}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold"
          >
            Pay Tax
          </button>
        </div>
      </form>


      {/* Dialog for Payment Details */}
      <Dialog open={openTaxHistoryDialog} onClose={handleCloseTaxHistoryDialog}>
        <DialogTitle>Tax Payment Details</DialogTitle>
        <DialogContent>
          {paymentDetails ? (
            <div>
              {/* <h3>Payment for Property: {paymentDetails.property_id}</h3> */}
              <p>Amount Paid: {paymentDetails.amount_paid}</p>
              <p>Receipt Number: {paymentDetails.receipt_number}</p>
              <p>Transaction Reference: {paymentDetails.transaction_reference}</p>
              <p>Remaining Balance: {paymentDetails.remaining_balance}</p>
              <p>Payment Date: {paymentDetails.payment_date}</p>


            {/* Adding property details */}
            <p>Tax Amount: {paymentDetails.tax_amount}</p>
            <p>House Number: {paymentDetails.property_details.house_number}</p>
            <p>Street Name: {paymentDetails.property_details.street_name}</p>
            <p>Category Name: {paymentDetails.property_details.category_name}</p>
            <p>Owner Name: {paymentDetails.property_details.owner_name}</p>
            </div>
          ) : (
            <p>No payment details available</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaxHistoryDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </FormContainer>
  );
};

export default PayTaxForm;
