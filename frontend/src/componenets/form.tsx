import React, { useState } from "react";

interface  HouseFormData {
    houseNumber : string;
    streetName: string;
    taxAmount : number;
}

const Form = () => {

    const [formData, setFormData] = useState<HouseFormData>({

        houseNumber: "",
        streetName: '',
        taxAmount: 0,

    });
}

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit  = async (e: React.FormEvent) => {
        
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/submit-form', {
                method : 'POST',
                headers: {
                    'content-Type' : 'application/json',
                },

                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);

        } catch(error){
            console.error('Error', error);
        }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register House</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">House Number</label>
            <input
              type="text"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Name</label>
            <input
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax Amount</label>
            <input
              type="number"
              name="taxAmount"
              value={formData.taxAmount}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
  
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };


  export default Form;
