
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { deleteStreet } from '../services/useService_1';


interface DeleteStreetDialogProps {
  open: boolean;
  streetId: number | null; 
  onClose: () => void; 
  onStreetDeleted: () => void; // Callback to refresh the street list after deletion
}

const DeleteStreetDialog: React.FC<DeleteStreetDialogProps> = ({
  open,
  streetId,
  onClose,
  onStreetDeleted,
}) => {
  const handleConfirmDelete = async () => {
    if (streetId) {
      try {
        await deleteStreet(streetId); // Call the deleteStreet function
        // Notify parent component that the street was successfully deleted
        onStreetDeleted();
      } catch (error) {
        console.error('Error deleting street:', error);
        alert('Failed to delete the street. Please try again.');
      } finally {
        // Close the dialog whether successful or not
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-street-title">
      <DialogTitle id="delete-street-title">Confirm Street Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this street?</Typography>
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

export default DeleteStreetDialog;
