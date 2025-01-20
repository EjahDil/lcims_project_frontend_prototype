
import React, { useState } from "react";
import FormContainer from "../components/formContainer";
import { fetchPropertyDetails } from "../services/useService";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const UserPropertyForm: React.FC = () => {
  //const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = useState<any | null >(null);

  // State for controlling dialog visibility
  const [openPropertyDialog, setOpenPropertyDialog] = useState(false);

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
      // Call the fetchProperties function from the API service
      const response = await fetchPropertyDetails(formData.property_id);

      if (response.data && response.data.length > 0) {
        setPropertyDetails(response.data);
        console.log(response.data) // Assuming the response returns an array
        setOpenPropertyDialog(true);
      } else {
        setError("No property found with the provided ID.");
      }
    } catch (err: any) {
      console.error("Error fetching property details:", err);
      setError(
        err.response?.data?.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleClosePropertyDialog = () => {
    setOpenPropertyDialog(false);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Property Details</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body class="bg-gray-100 font-sans p-6">
            <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h2 class="text-center text-2xl font-semibold mb-6">Property Details</h2>
              
              <div class="flex justify-between mb-4">
                <p class="font-medium">House Number:</p>
                <p>${propertyDetails.house_number}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Digital Address:</p>
                <p>${propertyDetails.digital_address}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Status:</p>
                <p>${propertyDetails.status}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Total Area:</p>
                <p>${propertyDetails.total_area} sq. meters</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Longitude:</p>
                <p>${propertyDetails.longitude}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Latitude:</p>
                <p>${propertyDetails.latitude}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Street Name:</p>
                <p>${propertyDetails.street_name}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Zone Code:</p>
                <p>${propertyDetails.zone_code}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Category Name:</p>
                <p>${propertyDetails.category_name}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Owner Name:</p>
                <p>${propertyDetails.owner_details.full_name}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Owner Contact:</p>
                <p>${propertyDetails.owner_details.contact_number}</p>
              </div>
              <div class="flex justify-between mb-4">
                <p class="font-medium">Email:</p>
                <p>${propertyDetails.owner_details.email}</p>
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
    <FormContainer title="View Property Details">
      <p className="text-gray-600 text-sm mb-4">
        Enter the Property ID below to fetch and view its details.
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

      <Dialog open={openPropertyDialog} onClose={handleClosePropertyDialog}>
        <DialogTitle>Property Details</DialogTitle>
        <DialogContent>
          {propertyDetails ? (
            <div>
              <p>House Number: {propertyDetails.house_number}</p>
              <p>Digital Address: {propertyDetails.digital_address}</p>
              <p>Status: {propertyDetails.status}</p>
              <p>Total Area: {propertyDetails.total_area}</p>
              <p>Longitude: {propertyDetails.longitude}</p>
              <p>Latitude: {propertyDetails.latitude}</p>
              <p>Street Name: {propertyDetails.street_name}</p>
              <p>Zone Code: {propertyDetails.zone_code}</p>
              <p>Category Name: {propertyDetails.category_name}</p>
              <p>Owner Name: {propertyDetails.owner_details.full_name}</p>
              <p>Contact: {propertyDetails.owner_details.contact_number}</p>
              <p>Email: {propertyDetails.owner_details.email}</p>
            </div>
          ) : (
            <p>No property details available.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePropertyDialog} sx={{ color: "black"}}>
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

export default UserPropertyForm;
