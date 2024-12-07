import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { deleteUser } from '../services/useService'; // Ensure the service is correctly imported

interface DeleteConfirmationDialogProps {
  open: boolean;
  userId: number | null;
  onClose: () => void; // Callback to close the dialog
  onUserDeleted: () => void; // Callback to refresh the user list after deletion
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  userId,
  onClose,
  onUserDeleted,
}) => {
  const handleConfirmDelete = async () => {
    if (userId !== null) {
      try {
        await deleteUser(userId.toString());
        //alert('User successfully deactivated.');
        onUserDeleted(); // Notify parent to refresh the user list
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to deactivate the user. Please try again.');
      } finally {
        onClose(); // Ensure the dialog is closed after the operation
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-confirmation-title">
      <DialogTitle id="delete-confirmation-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to deactivate this user?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
