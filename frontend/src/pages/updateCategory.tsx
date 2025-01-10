

import React, { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { updateCategory } from "../services/useService_1";

interface EditCategoryFormProps {
  initialData: {
    category_id: string;
    category_name: string;
    description?: string;
  };
  onClose: () => void;
  onCategoryUpdated: () => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
  initialData,
  onClose,
  onCategoryUpdated,
}) => {
  const [categoryData, setCategoryData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setCategoryData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await updateCategory(parseInt(categoryData.category_id), {
        category_name: categoryData.category_name,
        description: categoryData.description,
      });
      onCategoryUpdated(); // Notify parent to refresh the list
      onClose(); // Close the form
    } catch (err: any) {
      setError(err || "Failed to update the category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <TextField
            label="Category Name"
            value={categoryData.category_name}
            onChange={(e) => handleChange("category_name", e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Description"
            value={categoryData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryForm;
