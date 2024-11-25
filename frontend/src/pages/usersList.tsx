import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton, TextField, MenuItem, Button, Box } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { fetchUsers } from '../services/useService';
import { usePermissions } from '../contexts/permContext';

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

  const [users, setUsers] = useState<User[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // Zero-based index
    pageSize: 10,
  });
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const handleDelete = (id: number) => {
    console.log('Delete user with ID:', id);
    // Implement delete logic
  };

  const handleEdit = (id: number) => {
    console.log('Edit user with ID:', id);
    // Implement edit logic
  };

  const handleView = (id: number) => {
    console.log('View user with ID:', id);
    // Implement view logic (e.g., open a popup or modal)
  };

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'last_login', headerName: 'Last Login', flex: 1.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" gap={1}>
          <IconButton color="primary" onClick={() => handleEdit(params.row.user_id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleView(params.row.user_id)}>
            <ViewIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.user_id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (!hasPermission) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <Box padding={3}>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
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
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
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
        <Button variant="contained" color="primary" onClick={loadUsers} 
         sx={{
          backgroundColor: "#709ec9", // Set background color
          color: "#fff", // Set text color
          "&:hover": {
            backgroundColor: "#575447", // Darker shade for hover effect
          },
        }}>
          Apply Filters
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
        sx={{
          flexGrow: 1, // Allow DataGrid to expand and fill the available space
        }}
      />
    </Box>
  );
};

export default UserTable;
