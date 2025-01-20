

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { deleteProperty } from '../services/useService';
 // Ensure the service is correctly imported

interface DeletePropertyDialogProps {
  open: boolean;
  propertyId: number | null;
  onClose: () => void; // Callback to close the dialog
  onPropertyDeleted: () => void; // Callback to refresh the property list after deletion
}

const DeletePropertyDialog: React.FC<DeletePropertyDialogProps> = ({
  open,
  propertyId,
  onClose,
  onPropertyDeleted,
}) => {
  const handleConfirmDelete = async () => {
    if (propertyId !== null) {
      try {
        await deleteProperty(propertyId.toString());
        // Alert or show success message
        onPropertyDeleted(); // Notify parent to refresh the property list
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete the property. Please try again.');
      } finally {
        onClose(); // Ensure the dialog is closed after the operation
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-property-title">
      <DialogTitle id="delete-property-title">Confirm Property Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this property?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#709ec9'}}>
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePropertyDialog;
