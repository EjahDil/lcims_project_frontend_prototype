import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { deleteCategory } from '../services/useService_1';

interface DeleteCategoryDialogProps {
  open: boolean;
  categoryId: number | null;
  onClose: () => void;
  onCategoryDeleted: () => void; // Callback to refresh the category list after deletion
}

const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
  open,
  categoryId,
  onClose,
  onCategoryDeleted,
}) => {
  const handleConfirmDelete = async () => {
    if (categoryId) {
      try {
        await deleteCategory(categoryId); // Call the deleteCategory function
        // Notify parent component that the category was successfully deleted
        onCategoryDeleted();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete the category. Please try again.');
      } finally {
        // Close the dialog whether successful or not
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-category-title">
      <DialogTitle id="delete-category-title">Confirm Category Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this category? This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#709ec9' }}>
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
