import React, { useState } from "react";
import { processPropertyPayment } from "../services/useService_1";

// Props for ProcessPropertyPaymentForm
interface ProcessPropertyPaymentFormProps {
  initialData: { propertyId: number; amountPaid: string };
  onClose: () => void;
  onPaymentSuccess: (payment: any) => void;
}

const ProcessPropertyPaymentForm: React.FC<ProcessPropertyPaymentFormProps> = ({ initialData, onClose, onPaymentSuccess}) => {
  const [formData, setFormData] = useState<{ propertyId: number; amountPaid: string }>({
    propertyId: initialData.propertyId,
    amountPaid: initialData.amountPaid,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Convert amountPaid to number before sending
      const amountPaidNumber = parseFloat(formData.amountPaid);

      if (isNaN(amountPaidNumber)) {
        throw new Error("Please enter a valid number for the amount.");
      }

     const response =  await processPropertyPayment(String(formData.propertyId), amountPaidNumber);

      // Destructure the response to get payment and message
       const { payment } = response;

      // Trigger the success callback
      onPaymentSuccess(payment);
      
    // Save payment details to localStorage
    localStorage.setItem("paymentDetails", JSON.stringify(payment));
       
      if (response) {
        setSuccess("Payment processed successfully.");
      }

        // Call the onClose prop to close the form
      if (onClose) {
        onClose();
      }
    } catch (err: any) {
      console.error("Error processing payment:", err);
      setError(err || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Process Property Payment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Property ID */}
          <div>
            <label htmlFor="propertyId" className="block text-gray-700">
              Property ID
            </label>
            <input
              type="text"
              id="propertyId"
              name="propertyId"
              value={formData.propertyId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Amount Paid */}
          <div>
            <label htmlFor="amountPaid" className="block text-gray-700">
              Amount Paid
            </label>
            <input
              type="text"
              id="amountPaid"
              name="amountPaid"
              value={formData.amountPaid}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold"
            >
              Process Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcessPropertyPaymentForm;
