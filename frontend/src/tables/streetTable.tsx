import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/Visibility';
import { fetchStreets } from '../services/useService';
import Modal from '../components/modalforediting';
import EditStreetForm from '../pages/updateStreet';
import DeleteStreetDialog from '../components/deleteStreetPopUp';
import { usePermissions } from '../contexts/permContext';
//import DeleteStreetDialog from './DeleteStreetDialog'; // Create a DeleteStreetDialog component for deleting streets

interface Street {
  street_id: number;
  street_name: string;
  zone_code: string;
  description?: string;
  created_at: string;
  updated_at: string;
  property_count: number;
  house_numbers: string[];
}

const StreetsTable = () => {
  const [initialStreetData, setInitialStreetData] = useState<{street_id: string; street_name: string; zone_code:string; description?: string } | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [streets, setStreets] = useState<Street[]>([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { checkPermission } = usePermissions();
  const hasPermission = checkPermission('streets:read');


  const [selectedStreet, setSelectedStreet] = useState<Street | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedStreetId, setSelectedStreetId] = useState<number | null>(null);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const gridRef = useRef<HTMLDivElement | null>(null);

  const canEditStreet = checkPermission('streets:update');
  const canDeleteStreet = checkPermission('streets:delete');
  const canCreateStreet = checkPermission('streets:create');

  const navigate = useNavigate();

  const loadStreets = async () => {
    try {
      const data = await fetchStreets({}); // You can pass query params if needed
      setStreets(data.data); // Assuming the API response contains the data in the 'data' field
    } catch (error) {
      console.error("Failed to fetch streets:", error);
    }
  };

    // Function to navigate to the Create Street page
    const handleCreateStreet = () => {
      navigate("/create-street");
    };

  const handleOpenDeleteDialog = (streetId: number) => {
    setSelectedStreetId(streetId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedStreetId(null);
    setOpenDeleteDialog(false);
  };

  const handleViewStreet = (street: Street) => {
    setSelectedStreet(street);
    setOpenDialog(true);
  };

  const handleEditStreet = (streetId: number) => {
    console.log("Edit street with ID:", streetId);
  
    // Find the specific street data to edit
    const streetToEdit = streets.find((street) => street.street_id === streetId); 
  
    if (streetToEdit) {
      // Transform streetToEdit to match the expected type
      const transformedStreet = {
        street_id: String(streetToEdit.street_id), // Convert role_id to string
        street_name: streetToEdit.street_name,     // Adjust the field names according to your data
        zone_code: streetToEdit.zone_code,       // Adjust field names
        description: streetToEdit.description,   // Adjust field names
      };
  
      setInitialStreetData(transformedStreet); 
      setOpenModal(true);
    } else {
      console.error("Street not found with the specified ID:", streetId);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);


  useEffect(() => {
    loadStreets();
  }, []);

  const filteredStreets = streets.filter((street) =>
    street.street_name.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "street_id", headerName: "Street ID", width: 150 },
    { field: "street_name", headerName: "Street Name", width: 200 },
    { field: "zone_code", headerName: "Zone Code", width: 150 },
    { field: "property_count", headerName: "Property Count", width: 180 },
    { field: "created_at", headerName: "Created At", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: GridRenderCellParams<Street>) => (
        <Box display="flex" gap={1}>
          {/* View Button - Always Visible */}
          <IconButton sx={{ color: '#709ec9' }} onClick={() => handleViewStreet(params.row)}>
            <ViewIcon />
          </IconButton>
    
          {/* Edit Button - Visible Only If User Has Edit Permission */}
          {canEditStreet && (
            <IconButton sx={{ color: '#709ec9' }} onClick={() => handleEditStreet(params.row.street_id)}>
              <EditIcon />
            </IconButton>
          )}
    
          {/* Delete Button - Visible Only If User Has Delete Permission */}
          {canDeleteStreet && (
            <IconButton color="error" onClick={() => handleOpenDeleteDialog(params.row.street_id)}>
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
      '@media (max-width: 1311px)': {
        '& .MuiDataGrid-root': {
          fontSize: '0.8rem', // Reduce font size
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: '0.9rem', // Reduce header font size
        },
        maxWidth: '80%', // Reduce table width
        margin: '0 auto', // Center the table
        overflowX: 'hidden'
      },

      '@media (max-width: 1273px)': {
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

      '@media (max-width: 1258px)': {
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

      '@media (max-width: 1213px)': {
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
  }}>
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search By Street Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
        />
            {canCreateStreet && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateStreet}
                sx={{
                  backgroundColor: "#709ec9",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#575447" },
                }}
              >
                Add Street
              </Button>
            )}

      </Box>

      <Box style={{ overflowX: "hidden" }}>
          <DataGrid
          rows={filteredStreets}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 15, 25]}
          initialState={{
            sorting: {
              sortModel: [{ field: "street_id", sort: "asc" }],
            },
          }}
          ref={gridRef}
          getRowId={(row) => row.street_id}
          onRowSelectionModelChange={setRowSelectionModel}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>

      {/* Dialog for Street Details */}
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
      }}>
        <DialogTitle>Street Details</DialogTitle>
        <DialogContent>
          {selectedStreet && (
            <Box>
              <Typography>Street Name: {selectedStreet.street_name}</Typography>
              <Typography>Zone Code: {selectedStreet.zone_code}</Typography>
              <Typography>Property Count: {selectedStreet.property_count}</Typography>
              <Typography>Created At: {selectedStreet.created_at}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#709ec9' }}>Close</Button>
        </DialogActions>
      </Dialog>

            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        {initialStreetData ? (
          <EditStreetForm
            initialData={initialStreetData}
            onClose={() => setOpenModal(false)}
          />
        ) : (
          <></> // Return an empty fragment if no data is available
        )}
      </Modal>

      {/* Dialog for deleting the street */}
      <DeleteStreetDialog
        open={openDeleteDialog}
        streetId={selectedStreetId}
        onClose={handleCloseDeleteDialog}
        onStreetDeleted={() => loadStreets()} // Refresh the list after deletion
      />
      </Box>
    </div>
  );
};

export default StreetsTable;
