import React, { useEffect, useState } from "react";
import { fetchCategories, fetchTaxBill } from "../services/useService_1";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material"; 

const RevenueChart: React.FC = () => {
  const [propertyId, setPropertyId] = useState<string>("");
  const [taxData, setTaxData] = useState<any | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [totalTaxAmount, setTotalTaxAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await fetchCategories(1, 100, "", "");
        console.log(data.data)
        setCategories(data.data);

        // Calculate total tax amount based on category count
        const totalAmount = data.data.reduce((sum: number, cat: any) => {
          if (cat.current_rate && cat.property_count) {
            return sum + cat.current_rate * cat.property_count;
          }
          return sum;
        }, 0);
        
        setTotalTaxAmount(totalAmount);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategoryData();

    console.log(validCategories)
  }, []);

  const handleFetchTaxBill = async () => {
    if (!propertyId.trim()) {
      setError("Please enter a valid Property ID.");
      return;
    }
    try {
      const response = await fetchTaxBill(propertyId);
      console.log("API Response:", response);

      if (response) {
        setTaxData(response);
        setError(null);
      } else {
        setError("No tax bill found for the provided Property ID.");
        setTaxData(null);
      }
    } catch (err: any) {
      console.error("Error fetching tax bill:", err);
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
      setTaxData(null);
    }
  };

    const validCategories = categories
    .filter(cat => cat.current_rate !== undefined && cat.current_rate !== null)
    .map(cat => ({
      name: cat.category_name,
      value: cat.current_rate, // Ensure correct data format
    }));

  return (
    <div className="p-6">
      {/* <Typography variant="h4" className="text-center text-gray-700 mb-4">
        Revenue Tracking Chart
      </Typography> */}

                {/* Top Section: Total Tax Amount & Search Bar */}
          <div className="flex items-center justify-between mb-6 gap-10">
            {/* Total Tax Amount Display */}
            <Paper className="p-4 bg-blue-500 text-white rounded-lg shadow-md flex items-center w-1/3 space-x-3">
              <MonetizationOn fontSize="large" /> 
              <div>
                <Typography variant="h6" className="text-left">
                  Total Expected Revenue
                </Typography>
                <Typography variant="h5" className="text-left font-bold">
                  {totalTaxAmount.toLocaleString()} XAF
                </Typography>
              </div>
            </Paper>

            {/* Property ID Input & Button */}
            <div className="flex items-center space-x-4 w-2/3">
              <TextField
                label="Enter Property ID"
                variant="outlined"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className="w-1/3" // Reduced width
              />
              <Button variant="contained" sx={{ backgroundColor: '#709ec9' }} onClick={handleFetchTaxBill}>
                Fetch Remaining Balance
              </Button>
            </div>
          </div>

      {error && <Typography color="error" className="text-center">{error}</Typography>}


       {/* Pie Chart for Tax Rate by Category */}

        {/* <PieChart>
        <Pie
          data={categories}
          dataKey="current_rate"
          nameKey="category_name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#709ec9"
          label
        >
          {categories.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.category_name} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
        </PieChart> */}
       {/* : (
        <Typography className="text-center text-gray-500">No category data available.</Typography> */}

        <Paper className="p-4 shadow-lg rounded-lg w-full mb-6">
      <Typography variant="h6" className="text-center text-gray-700 mb-4">
        Tax Rate by Category
      </Typography>
      <ResponsiveContainer width="100%" height={500}>
        {validCategories.length > 0 ? (
          <BarChart data={validCategories} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-18} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#709ec9" />
          </BarChart>
        ) : (
          <Typography className="text-center text-gray-500">
            No valid category data available.
          </Typography>
        )}
      </ResponsiveContainer>
    </Paper>


       {/* <Paper className="p-4 shadow-lg rounded-lg w-full mb-6">
        <Typography variant="h6" className="text-center text-gray-700 mb-4">
          Tax Rate by Category
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categories} dataKey="current_rate" nameKey="category_name" cx="50%" cy="50%" outerRadius={120} fill="#709ec9" label>
                    {categories.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.category_name} />
        ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper> */}

              
      {/* Chart Section */}
      <div className="flex justify-start space-x-6"> 
        {/* Tax Amount Chart */}
        <Paper className="p-4 shadow-lg rounded-lg w-1/2">
          <Typography variant="h6" className="text-center text-gray-700 mb-4">
            Tax Amount for {taxData?.owner_name || "N/A"}
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taxData ? [{ name: taxData.owner_name, tax: taxData.tax_amount }] : []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tax" fill="#709ec9" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Remaining Balance Chart */}
        <Paper className="p-4 shadow-lg rounded-lg w-1/2">
          <Typography variant="h6" className="text-center text-gray-700 mb-4">
            Remaining Balance for {taxData?.owner_name || "N/A"}
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taxData ? [{ name: taxData.owner_name, balance: Number(taxData.remaining_amount)}] : []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="balance" fill="#709ec9" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </div>

    </div>
  );
};

export default RevenueChart;
