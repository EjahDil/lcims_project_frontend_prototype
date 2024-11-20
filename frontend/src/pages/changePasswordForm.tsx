import React, { useState } from "react";
import FormContainer from "../components/formContainer";
import axios from "axios" // Adjust the import path as needed

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field: "oldPassword" | "newPassword") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try{
      const response = await axios.post(
        "https://lcims-backend.onrender.com/api/v1/auth/change-password",
        {
          currentPassword: formData.oldPassword,
          newPassword: formData.newPassword
        },
        {
          headers : {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200){
        setStatusMessage("Password updated successfully");
      }
    } catch(error:any){
      console.error("Error updating password:", error);
      setStatusMessage(
        error.response?.data?.message || "An error occurred while updating your password."
      );
    } finally {
      setIsSubmitting(false);
    }
    console.log("Password change request submitted", formData);
    // Add logic to handle the password change (e.g., API call)
  };

  return (
    <FormContainer title="Change Password" showButton={false}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative space-y-4">
        <label className="block ml-1 font-semibold text-lg">Old Password</label>
        {/* Old Password */}
          <input
            type={showPasswords.oldPassword ? "text" : "password"}
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Old Password"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("oldPassword")}
            className="absolute right-3 top-1/2 transform -translate-y-1/3 text-gray-500"
          >
            {showPasswords.oldPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* New Password */}
        <div className="relative space-y-4">
        <label className="block ml-1 font-semibold text-lg ">New Password</label>
          <input
            type={showPasswords.newPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="New Password"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("newPassword")}
            className="absolute right-3 top-1/2 transform -translate-y-1/3 text-gray-500"
          >
            {showPasswords.newPassword ? "Hide" : "Show"}
          </button>
        </div>

            {/* Status Message */}
            {statusMessage && (
      <p
        className={`text-center font-semibold ${
          statusMessage.includes("successfully") ? "text-[#575447]" : "text-red-500"
        }`}
      >
        {statusMessage}
      </p>
    )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-3/4 sm:w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold transition"
          >
            {isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default ChangePassword;
