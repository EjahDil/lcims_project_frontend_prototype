

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { deleteRole } from '../services/useService_1';

interface DeleteRoleDialogProps {
  open: boolean;
  roleId: string | null; 
  onClose: () => void; 
  onRoleDeleted: () => void; // Callback to refresh the role list after deletion
}

const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({
  open,
  roleId,
  onClose,
  onRoleDeleted,
}) => {
  const handleConfirmDelete = async () => {
    if (roleId) {
      try {
        await deleteRole(roleId);
        // Notify parent component that the role was successfully deleted
        onRoleDeleted();
      } catch (error) {
        console.error('Error deleting role:', error);
        alert('Failed to delete the role. Please try again.');
      } finally {
        // Close the dialog whether successful or not
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-role-title">
      <DialogTitle id="delete-role-title">Confirm Role Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this role?</Typography>
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

export default DeleteRoleDialog;
