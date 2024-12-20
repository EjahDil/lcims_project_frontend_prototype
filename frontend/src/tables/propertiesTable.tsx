import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton
  
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { fetchProperties } from "../services/useService"; // Import the API function
import { useNavigate } from "react-router-dom";
//import ModalCompo from '../components/modalforediting';
//import EditPropertyForm from "../forms/EditPropertyForm";
//import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";


export interface Property {
    property_id: number; // Adjust type as per your data (e.g., string or number)
    category_name: string;
    type: string;
    status: string;
    digital_address: string;
    house_number:string

  }

interface FetchPropertiesResponse {
    data: Property[];
    total: number;
}

const PropertiesTable = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category_name, setCategoryName] = useState(''); 
  const [status, setStatus] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedProperty, setSelectedProperty] =  useState<Property | null>(null);
  const [rowSelectionModel, setRowSelectionModel] =  React.useState<GridRowSelectionModel>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [propertyIdToDelete, setPropertyIdToDelete] = useState<number | null>(null);;
  const gridRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();


  const loadProperties = async () => {
    setLoading(true);
    try {
      const params = {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search,
        status
      };
      const data: FetchPropertiesResponse = await fetchProperties(params);
      console.log(data);
      setProperties(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProperty = () => {
    navigate('/form')
    //setOpenModal(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleDeleteCloseDialog = () => setOpenConfirmDialog(false);


  useEffect(() => {
    loadProperties();
  }, [paginationModel, search, status, category_name]);

  const columns: GridColDef[] = [
    { field: "property_id", headerName: "ID", width: 100 },
    { field: "category_name", headerName: "Name", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "created_at", headerName: "Created At", width: 180 },
    { 
    field: "created_by_user", 
    headerName: "Created By", 
    width: 150, 
    renderCell: (params: GridRenderCellParams) => params.row.created_by_user?.username || "N/A", 
    },
    { field: "digital_address", headerName: "Digital Address", width: 180 },
    { field: "house_number", headerName: "House Number", width: 120 },
    { field: "street_name", headerName: "Street Name", width: 150 },
    { field: "zone_code", headerName: "Zone Code", width: 120 },
    { 
      field: "owner_details", 
      headerName: "Owner's Email Address", 
      width: 150, 
      renderCell: (params: GridRenderCellParams) => params.row.owner_details?.email || "N/A", 
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<Property>) => (
        <Box display="flex" gap={0.1}>
             <IconButton
            color="primary"
            onClick={() => {
              setSelectedProperty(params.row);
              setOpenDialog(true);
            }}
          >
            <ViewIcon/>
          </IconButton>
          <IconButton
            color="primary"
            //onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setPropertyIdToDelete(params.row.property_id);
              setOpenConfirmDialog(true);
            }}
          >
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

  return (
    <Box padding={3} sx={{ overflowX: "hidden" }}>
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
       label="Category Name"
       value={category_name}
       onChange={(e) => setCategoryName(e.target.value)}
       variant="outlined"
       size="small"
       >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="residential">Residential</MenuItem>
          <MenuItem value="commercial">Commercial</MenuItem>
          <MenuItem value="industrial">Industrial</MenuItem>
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
          <MenuItem value="occupied">Active</MenuItem>
          <MenuItem value="vacant">Inactive</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={loadProperties}
          sx={{
            backgroundColor: "#709ec9",
            color: "#fff",
            "&:hover": { backgroundColor: "#575447" },
          }}
        >
          Apply Filters
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProperty}
          sx={{
            backgroundColor: "#709ec9",
            color: "#fff",
            "&:hover": { backgroundColor: "#575447" },
          }}
        >
          Create Property
        </Button>
      </Box>

      <DataGrid
        rows={properties}
        columns={columns}
        getRowId={(row: Property) => row.property_id}
        pagination
        paginationMode="server"
        rowCount={total}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={loading}
        pageSizeOptions={[10, 20, 50]}

        sx={{
          flexGrow: 1, // Allow DataGrid to expand and fill the available space
          minWidth: 0, // Prevent overflow
          width: '99%', // Default to full width
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

        ref={gridRef}
        rowSelectionModel={rowSelectionModel} // Bind the selection model to the state
        onRowSelectionModelChange={(newSelectionModel) => {
        setRowSelectionModel([...newSelectionModel]); // Update selection state
        }}
      />

      {/* Dialog for displaying property details */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Property Details</DialogTitle>
        <DialogContent>
          {selectedProperty && (
            <Box>
                <Typography>Name: {selectedProperty.category_name}</Typography>
                <Typography>Status: {selectedProperty.status}</Typography>
                <Typography>House Number: {selectedProperty.house_number}</Typography>
                <Typography>Digital Address: {selectedProperty.digital_address}</Typography>

            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
{/* 
      <ModalCompo isOpen={openModal} onClose={handleCloseModal}>
        <EditPropertyForm
          property={selectedProperty}
          onClose={handleCloseModal}
        />
      </ModalCompo>

      <DeleteConfirmationDialog
        open={openConfirmDialog}
        propertyId={propertyIdToDelete}
        onClose={handleDeleteCloseDialog}
        onPropertyDeleted={loadProperties}
      /> */}
    </Box>
  );
};

export default PropertiesTable;
