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
  IconButton,
  
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import {fetchCategoryRates } from "../services/useService";
import { useNavigate } from "react-router-dom";
import EditTaxForm from "../pages/updateRates";
import Modal from "../components/modalforediting";

//import ModalCompo from '../components/modalforediting';
//import EditPropertyForm from "../forms/EditPropertyForm";
//import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";


// export interface Property {
//     property_id: number;
//     category_name: string;
//     type: string;
//     status: string;
//     digital_address: string;
//     house_number:string

//   }

// interface FetchPropertiesResponse {
//     data: Property[];
//     total: number;
// }


// export interface CategoryRateData {
//   fixed_amount: number;
//   effective_date: string;
//   end_date: string;
// }


export interface CategoryRate {
  category_id: number
  rate_id: number;
  fixed_amount: number;
  effective_date: string;
  end_date: string;
  status: string;
  category_name: string;
  created_by_user: string;
}


const TaxRatesTable = () => {
  const [initialData, setInitialData] = useState<CategoryRate | null>(null);
  const [rates, setRates] = useState<CategoryRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [filteredData, setFilteredData] = useState<CategoryRate[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRate, setSelectedRate] = useState<CategoryRate | null>(null);
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement | null>(null); 

  const loadRates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) throw new Error("Token not found");

      const data = await fetchCategoryRates();
      setRates(data); // API should return data in the structure of CategoryRate[]
      setFilteredData(data);
      setTotal(data.length); 
    } catch (error) {
      console.error("Failed to fetch category rates:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleEditRates = (id: number) => {
    console.log("Edit tax rate with ID:", id);
  
    // Find the specific rate data to edit
    const rateToEdit = rates.find((rate) => rate.rate_id === id);
  
    if (rateToEdit) {
      setInitialData(rateToEdit); // Set the initial data for the form
      setOpenModal(true); // Open the modal to edit the tax rate
    } else {
      console.error("Tax rate not found with the specified ID:", id);
    }
  
    // Additional logic for handling edits can be added here if needed
  };
  
  // const handleCreateRate = () => {
  //   navigate("/form");
  // };

  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const filtered = rates.filter((item) => {
      const matchesSearch = item.category_name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        status === "" || item.status.toLowerCase() === status.toLowerCase();
      return matchesSearch && matchesStatus;
    });
    setFilteredData(filtered);
  }, [search, status, rates]);

  useEffect(() => {
    loadRates();
  }, [paginationModel, search, status]);

  const columns: GridColDef[] = [
    { field: "rate_id", headerName: "ID", width: 100 },
    { field: "category_name", headerName: "Category Name", width: 150 },
    { field: "fixed_amount", headerName: "Fixed Amount", width: 150 },
    { field: "effective_date", headerName: "Effective Date", width: 180 },
    { field: "end_date", headerName: "End Date", width: 180 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "created_by_user",
      headerName: "Created By",
      width: 150,
      renderCell: (params: GridRenderCellParams) => params.row.created_by_user || "N/A",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<CategoryRate>) => (
        <Box display="flex" gap={0.5}>
          <IconButton
            color="primary"
            onClick={() => {
              setSelectedRate(params.row);
              setOpenDialog(true);
            }}
          >
            <ViewIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              console.log(`Delete rate with ID: ${params.row.rate_id}`);
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
        setRowSelectionModel([]);
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
           {/* Add Tax Payment Button */}
        <Button
      variant="contained"
      color="secondary"
      onClick={() => navigate("/pay-tax")}
      sx={{
        backgroundColor: "#709ec9",
        color: "#fff",
        "&:hover": { backgroundColor: "#575447" },
      }}
    >
      Go to Tax Payment
    </Button>
    </Box>

    <DataGrid
      rows={filteredData}
      columns={columns}
      getRowId={(row: CategoryRate) => row.rate_id}
      pagination
      paginationMode="server"
      rowCount={total}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      loading={loading}
      initialState={{
        sorting: {
          sortModel: [{ field: "rate_id", sort: "asc" }],
        },
      }}
      pageSizeOptions={[10, 20, 50]}
      sx={{
        flexGrow: 1,
        minWidth: 0,
        width: "99%",
        "& .MuiDataGrid-cell": {
          whiteSpace: "nowrap",
          overflowX: "hidden",
        },
        "@media (max-width: 1200px)": {
          "& .MuiDataGrid-root": {
            fontSize: "0.8rem",
          },
          "& .MuiDataGrid-columnHeader": {
            fontSize: "0.9rem",
          },
          maxWidth: "100%",
          margin: "0 auto",
          overflowX: "hidden",
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
        <DialogTitle>Property Details</DialogTitle>
        <DialogContent>
          {selectedRate && (
            <Box>
                <Typography>Name: {selectedRate?.category_name}</Typography>
                <Typography>Status: {selectedRate?.status}</Typography>
                <Typography>Fixed Amount: {selectedRate?.fixed_amount}</Typography>
                <Typography>Effective Date: {selectedRate?.effective_date}</Typography>
                <Typography>End Date: {selectedRate?.end_date}</Typography>

            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

{/* 
      <DeleteConfirmationDialog
        open={openConfirmDialog}
        propertyId={propertyIdToDelete}
        onClose={handleDeleteCloseDialog}
        onPropertyDeleted={loadProperties}
      /> */}
    </Box>
  );
};

export default TaxRatesTable;
