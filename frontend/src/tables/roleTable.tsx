
import { useEffect, useState, useRef } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { fetchRoles } from "../services/useService_1";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modalforediting";
import EditRoleForm from "../pages/updateRole";
import DeleteRoleDialog from "../components/deleteRolePopUp";
import { usePermissions } from "../contexts/permContext";


interface Role {
  role_id: number;
  role_name: string;
  user_count: number;
  description: string;
}

const RolesTable = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [initialData, setInitialData] = useState<{ role_id: string; description: string } | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { checkPermission } = usePermissions();
  const hasPermission = checkPermission('roles:read');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const canEditRole = checkPermission('roles:update');
  const canDeleteRole = checkPermission('roles:delete');
  const canCreateRole = checkPermission('roles:create');

  const navigate = useNavigate();

  const loadRoles = async () => {
    setLoading(true);
    try {
      const data = await fetchRoles(); // Consume the `fetchRoles` endpoint
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = (roleId: number) => {
    setSelectedRoleId(roleId.toString());
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedRoleId(null);
    setOpenDeleteDialog(false);
  };

  const handleCreateRole = () => {
    navigate('/create-role');
  };

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setOpenDialog(true);
  };

  const handleEditRole = (id: number) => {
    console.log("Edit role with ID:", id);
  
    // Find the specific role data to edit
    const roleToEdit = roles.find((role) => role.role_id === id);
  
    if (roleToEdit) {
      // Transform roleToEdit to match the expected type
      const transformedRole = {
        role_id: String(roleToEdit.role_id), // Convert role_id to string
        description: roleToEdit.description,
      };
  
      setInitialData(transformedRole); 
      setOpenModal(true);
    } else {
      console.error("Role not found with the specified ID:", id);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    loadRoles();
  }, []);

  const filteredRoles = roles.filter((role) =>
    role.role_name.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "role_id", headerName: "Role ID", width: 100,},
    { field: "role_name", headerName: "Role Name", width: 200 },
    { field: "user_count", headerName: "User Count", width: 150 },
    { field: "description", headerName: "Role Description", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<Role>) => (
        <Box display="flex" gap={0.5}>
          {/* View Button - Always Visible */}
          <IconButton sx={{ color: '#709ec9' }} onClick={() => handleViewRole(params.row)}>
            <ViewIcon />
          </IconButton>
    
          {/* Edit Button - Visible Only If User Has Edit Permission */}
          {canEditRole && (
            <IconButton sx={{ color: '#709ec9' }} onClick={() => handleEditRole(params.row.role_id)}>
              <EditIcon />
            </IconButton>
          )}
    
          {/* Delete Button - Visible Only If User Has Delete Permission */}
          {canDeleteRole && (
            <IconButton color="error" onClick={() => handleOpenDeleteDialog(params.row.role_id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ),
    },
    
  ];

  // Clear selection when clicking outside the DataGrid
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        gridRef.current &&
        event.target instanceof Node &&
        !gridRef.current.contains(event.target)
      ) {
        setRowSelectionModel([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  if (!hasPermission) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-black">
        You do not have permission to view this page.
      </div>
    );
  }


  return (
    <div>
      <Box mb={2} padding={3} sx={{
      overflowX:"hidden",
      // Responsive styles
      '@media (max-width: 1752px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '78%', // Reduce table width
        margin: '0 auto', // Center the table
        overflowX: 'hidden'
      },

      '@media (max-width: 1116px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '70%', // Reduce table width
        margin: '0 auto', // Center the table
        overflowX: 'hidden'
      },

      '@media (max-width: 1079px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '60%', // Reduce table width
        margin: '0 auto', // Center the table
        overflowX: 'hidden'
      },
      '@media (max-width: 1032px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '50%', // Reduce table width
        margin: '0 auto', // Center the table
        overflowX: 'hidden'
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
 
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateRole}
          sx={{
            backgroundColor: "#709ec9",
            color: "#fff",
            "&:hover": { backgroundColor: "#575447" },
          }}
        >
          Create Role
        </Button>
      </Box>


      <div ref={gridRef} style={{ height: 400, width: "auto" }}>
        <DataGrid
          rows={filteredRoles}
          columns={columns}
          loading={loading}
          initialState={{
            sorting: {
              sortModel: [{ field: "role_id", sort: "asc" }],
            },
          }}
          getRowId={(row) => row.role_id}
          onRowSelectionModelChange={setRowSelectionModel}
          rowSelectionModel={rowSelectionModel}
          
        />
      </div>

      <Dialog 
      open={openDialog} 
      onClose={handleCloseDialog}
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
        <DialogTitle>Role Details</DialogTitle>
        <DialogContent>
          {selectedRole && (
            <div>
              <h3>Role Name: {selectedRole.role_name}</h3>
              <p>User Count: {selectedRole.user_count}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#709ec9'}}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      {initialData ? (
        <EditRoleForm
          initialData={initialData}
          onClose={() => setOpenModal(false)}
        />
      ) : (
        <></> // Return an empty fragment if no data is available
      )}
    </Modal>

    <DeleteRoleDialog
        open={openDeleteDialog}
        roleId={selectedRoleId}
        onClose={handleCloseDeleteDialog}
        onRoleDeleted={loadRoles}
      />
      </Box>
    </div>

  );
};

export default RolesTable;
