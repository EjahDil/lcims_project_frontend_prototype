import React, { useEffect, useState, useRef } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
import { IconButton, TextField, MenuItem, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Typography, Modal } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { deleteUser, fetchUsers } from '../services/useService';
import { usePermissions } from '../contexts/permContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection
import EditUserForm from '../pages/updateUser';
import ModalCompo from '../components/modalforediting';
import DeleteConfirmationDialog from '../components/deleteUserPopUp';


interface User {
  user_id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  digital_address: string;
}

const UserTable: React.FC = () => {
  const { checkPermission } = usePermissions(); // Use the hook to get permissions
  const hasPermission = checkPermission('users:read');
  const navigate = useNavigate(); // Initialize navigate function for redirection

  const [users, setUsers] = useState<User[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State for selected user
  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog visibility
  const [rowSelectionModel, setRowSelectionModel] =  React.useState<GridRowSelectionModel>([]); // Manage selection state
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);


  const gridRef = React.useRef<HTMLDivElement | null>(null); // Reference to the DataGrid for outside click detection

  const loadUsers = async () => {
    setLoading(true);
    try {
      const params = {
        page: paginationModel.page + 1, // Convert to 1-based index
        limit: paginationModel.pageSize,
        search,
        role,
        status,
      };
      const data = await fetchUsers(params);
      setUsers(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [paginationModel, search, role, status]);

  const handleDelete = async (user_id: number) => {
    setUserIdToDelete(user_id); // Set the user ID to delete
    setOpenConfirmDialog(true);
  };
  
  const handleEdit = (id: number) => {
    console.log('Edit user with ID:', id);
    const userToEdit = users.find((user) => user.user_id === id);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setOpenModal(true); // Open the modal to edit user details
    }
    // Implement edit logic
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true); // Open the dialog when the "View" icon is clicked
  };

  const handleCreateUser = () => {
    navigate('/create-user'); // Redirect to the create user page
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setSelectedUser(null); // Reset selected user
  };


  const handleDeleteCloseDialog = () => {
    setOpenConfirmDialog(false);
    setUserIdToDelete(null); // Clear the user ID
  };


  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedUser(null); // Reset selected user
  };

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', minWidth: 200, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 100, flex: 2 },
    { field: 'role', headerName: 'Role', minWidth: 100, flex: 1 },
    { field: 'status', headerName: 'Status', minWidth: 100, flex: 1 },
    { field: 'last_login', headerName: 'Last Login', minWidth: 150, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" gap={0.1}>
          <IconButton color="primary" onClick={() => handleEdit(params.row.user_id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleView(params.row)}>
            <ViewIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.user_id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Handle click outside the DataGrid to clear selection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        gridRef.current &&
        event.target instanceof Node && // Ensure event.target is a DOM node
        !gridRef.current.contains(event.target)
      ) {
        setRowSelectionModel([]); // Clear selection if clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside); // Cleanup the event listener
    };
  }, []);

  if (!hasPermission) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <Box padding={3} sx={{
      overflowX:"hidden",
      // Responsive styles
      '@media (max-width: 1700px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '75%', // Reduce table width
        margin: '0 auto', // Center the table
        overflowX: 'hidden'
      },

      '@media (max-width: 881px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '60%', // Reduce table width
      },

      '@media (max-width: 818px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '45%', // Reduce table width
        overflowX: 'hidden',
        marginLeft: '140px',
      },
      '@media (max-width: 745px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '40%', // Reduce table width
        overflowX: 'hidden',
        marginLeft: '140px',
      },

      '@media (max-width: 683px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '30%',
        overflowX: 'hidden',
        marginLeft: '140px',
      },
      '@media (max-width: 585px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '25%',
        overflowX: 'hidden',
        marginLeft: '140px',
      },
  }}>
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          variant="outlined"
          size="small"
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="admin">admin</MenuItem>
          <MenuItem value="property_registrator">property_registrator</MenuItem>
          <MenuItem value="tax_officer">tax_officer</MenuItem>
          <MenuItem value="city_officer">city_officer</MenuItem>
        </TextField>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          variant="outlined"
          size="small"
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleCreateUser} 
         sx={{
          backgroundColor: "#709ec9", // Set background color
          color: "#fff", // Set text color
          "&:hover": {
            backgroundColor: "#575447", // Darker shade for hover effect
          },
        }}>
          Create User
        </Button>
      </Box>

      <DataGrid
        rows={users}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={total}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={loading}
        getRowId={(row) => row.user_id}
        pageSizeOptions={[10, 20, 50]}
        sx={{
          flexGrow: 1, // Allow DataGrid to expand and fill the available space
          minWidth: 0, // Prevent overflow
          width: '100%', // Default to full width
          '& .MuiDataGrid-cell': {
            whiteSpace: 'nowrap', // Prevent text wrapping
            overflowX: 'hidden', // Add ellipsis for overflowing text
          },
          // Responsive styles
          '@media (max-width: 1200px)': {
            '& .MuiDataGrid-root': {
              fontSize: '0.8rem', // Reduce font size
            },
            '& .MuiDataGrid-columnHeader': {
              fontSize: '0.9rem', // Reduce header font size
            },
            maxWidth: '100%', // Reduce table width
            margin: '0 auto', // Center the table
            overflowX: 'hidden'
          },
        }}
        ref={gridRef} // Set the reference for the DataGrid
        rowSelectionModel={rowSelectionModel} // Bind the selection model to the state
        onRowSelectionModelChange={(newSelectionModel) => {
          setRowSelectionModel([...newSelectionModel]); // Update selection state
        }}
      />

      {/* Dialog for displaying user details */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        sx={{
          backdropFilter: 'none', // Ensure backdrop filter does not cover interaction
          padding: 1,
          zIndex: 1300, // Higher z-index for the dialog to appear on top of other content
        }}
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
      >
      <DialogTitle>User Details</DialogTitle>
  <DialogContent>
    {selectedUser && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 1,
        }}
      >
        {/* Circle with Username Initials */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: '#709ec9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: 1,
          }}
        >
          {selectedUser.username
            .split(' ')
            .map((word) => word[0].toUpperCase())
            .join('')}
        </Box>

        {/* User Info */}
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: 1 }}>
            Username: {selectedUser.username}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '0.9rem', marginBottom: 1 }}>
            Email: {selectedUser.email}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '0.85rem', marginBottom: 1 }}>
            Role: {selectedUser.role}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '0.85rem', marginBottom: 1 }}>
            Status: {selectedUser.status}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '0.85rem', marginBottom: 1 }}>
            Last Login: {selectedUser.last_login}
          </Typography>
        </Box>
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="primary">
      Close
    </Button>
  </DialogActions>
      </Dialog>

{/* Modal for editing user details */}
<ModalCompo isOpen={openModal} onClose={handleCloseModal}>
  {selectedUser ? (
    <EditUserForm user={selectedUser} onClose={handleCloseModal} />
  ) : (
    <></> // Return an empty fragment if no user is selected
  )}
</ModalCompo>

<DeleteConfirmationDialog
        open={openConfirmDialog}
        userId={userIdToDelete}
        onClose={handleDeleteCloseDialog}
        onUserDeleted={loadUsers}
      />
    </Box>
  );
};

export default UserTable;