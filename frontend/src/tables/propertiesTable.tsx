import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton
  
} from "@mui/material";
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { fetchProperties } from "../services/useService"; // Import the API function
import { useNavigate } from "react-router-dom";
import Modal from "../components/modalforediting";
import EditPropertyForm from "../pages/updateProperty";
import DeletePropertyDialog from "../components/deletePropertyPopUp";
import { fetchTaxBill } from "../services/useService_1";
//import ModalCompo from '../components/modalforediting';
//import EditPropertyForm from "../forms/EditPropertyForm";
//import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";


export interface Property {
  property_id: number; 
  category_name: string;
  type: string;
  status: string;
  digital_address: string;
  house_number:string
  owner_details: {
    full_name: string;
    contact_number: string;
    email: string;
  };
}

interface FetchPropertiesResponse {
    data: Property[];
    total: number;
}

const PropertiesTable = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  //const [loadingResponse, setLoadingResponse] = useState(false);
  const [search, setSearch] = useState("");
  const [taxBill, setTaxBill] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  //const [errorResponse, setErrorResponse] = useState<string | null>(null);
  //const [category_name, setCategoryName] = useState(''); 
  //const [status, setStatus] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedProperty, setSelectedProperty] =  useState<Property | null>(null);
  const [rowSelectionModel, setRowSelectionModel] =  React.useState<GridRowSelectionModel>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  //const [taxHistory, setTaxHistory] = useState<any[]>([]);

  const [openTaxBillDialog, setOpenTaxBillDialog] = useState(false);
  //const [openTaxHistoryDialog, setOpenTaxHistoryDialog] = useState(false);
  const [propertyIdToDelete, setPropertyIdToDelete] = useState<number | null>(null);;
  const gridRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();


  const handleFetchTaxBill = async (propertyId: number) => {
    try {

      setError(null); // Clear any previous errors

      if (!propertyId) {
        throw new Error('Property ID is missing');
      }

      const billData = await fetchTaxBill(propertyId.toString());
      setTaxBill(billData); 
      console.log(taxBill)// Update state with the fetched data
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tax bill');
      console.log(error);
    }
  };


//   const handleFetchTaxHistory = async (propertyId: number) => {
//     try {
//         setError(null); // Clear any previous errors

//         if (!propertyId) {
//             throw new Error('Property ID is missing');
//         }

//         const taxHistoryData = await getPropertyPaymentHistory(propertyId.toString());
//         setTaxHistory(taxHistoryData); // Update state with the fetched data
//         console.log(taxHistoryData); // Debugging log
//     } catch (err: any) {
//         setError(err.message || 'Failed to fetch tax history'); // Handle and display error
//     }
// };

// const handleProcessPayment = async (propertyId: string, amountPaid: number) => {
//   try {
//     setLoading(true);
//     setErrorResponse(null); // Clear previous errors

//     const paymentResponse = await processPropertyPayment(propertyId, amountPaid);


//     const { payment, message } = paymentResponse;

//     //setPaymentDetails(payment); // Update the state with the payment details
//     console.log(payment); // Log payment details for debugging
//     alert(message || "Payment processed successfully!");


//   } catch (err: any) {
//     setErrorResponse(err.message || "Failed to process payment");
//     console.error(err);
//     console.log(errorResponse);
//   } finally {
//     setLoading(false);
//   }
// };



  const loadProperties = async () => {
    setLoading(true);
    try {
      const params = {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search,
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

  const handleEditProperty = (id: number) => {
    console.log("Edit property with ID:", id);
    const propertyToEdit = properties.find((property) => property.property_id === id);
    if (propertyToEdit) {
      setSelectedProperty(propertyToEdit);
      setOpenModal(true); // Open the modal to edit property details
    }
    // Implement additional edit logic if needed
  };

  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleDeleteCloseDialog = () => setOpenConfirmDialog(false);

const handleCloseTaxBillDialog = () => {
  setOpenTaxBillDialog(false);
};

// const handleCloseTaxHistoryDialog = () => {
//   setOpenTaxHistoryDialog(false);
// };


  useEffect(() => {
    loadProperties();

  }, [paginationModel, search]);

  const columns: GridColDef[] = [
    { field: "property_id", headerName: "ID", width: 100 },
    { 
      field: "owner_details", 
      headerName: "Owner's Full Name", 
      width: 150, 
      renderCell: (params: GridRenderCellParams) => params.row.owner_details?.full_name || "N/A", 
    },
    { field: "category_name", headerName: "Category Name", width: 100 },
    //{ field: "status", headerName: "Status", width: 150 },
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
      field: "paymentActions",
      headerName: "Payment Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<Property>) => (
        <Box display="flex" gap={0.5}>
                <IconButton
          sx={{ color: 'black' }}
          onClick={() => {
            handleFetchTaxBill(params.row.property_id); // Fetch the tax bill
            setOpenTaxBillDialog(true); // Open the dialog to display the tax bill
          }}
        >
            <ReceiptIcon />
          </IconButton>
          <IconButton
            sx={{ color: 'black' }}
            // onClick={() => {
            //   handleFetchTaxHistory(params.row.property_id); // Fetch the tax bill
            //   setOpenTaxHistoryDialog(true); // Open the dialog to display the tax bill
            // }}
          >
            <HistoryIcon />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<Property>) => (
        <Box display="flex" gap={0.1}>
             <IconButton
           sx={{ color: 'black' }}
            onClick={() => {
              setSelectedProperty(params.row);
              setOpenDialog(true);
            }}
          >
            <ViewIcon/>
          </IconButton>
          <IconButton
            sx={{ color: 'black' }}
            onClick={() => handleEditProperty(params.row.property_id)}
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
          label="Search By Street Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
        />
        {/* <TextField
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
        </TextField> */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProperty}
          sx={{
            backgroundColor: "#FF4C4C",
            color: "black",
            "&:hover": { backgroundColor: "#1C1C1C", color:"white" },
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
        initialState={{
          sorting: {
            sortModel: [{ field: "property_id", sort: "asc" }],
          },
        }}
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
          {selectedProperty && (
            <Box>
                <Typography>Owner's Full Name: {selectedProperty.owner_details.full_name}</Typography>
                <Typography>Category Name: {selectedProperty.category_name}</Typography>
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
      
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {selectedProperty ? (
          <EditPropertyForm 
            property={selectedProperty} 
            onClose={handleCloseModal} 
          />
        ) : (
          <></> // Return an empty fragment if no property is selected
        )}
      </Modal>
      
      <DeletePropertyDialog
        open={openConfirmDialog}
        propertyId={propertyIdToDelete}
        onClose={handleDeleteCloseDialog}
        onPropertyDeleted={loadProperties}
      />

    <Dialog open={openTaxBillDialog} onClose={handleCloseTaxBillDialog}>
          <DialogTitle>Tax Bill Details</DialogTitle>
          <DialogContent>
            {taxBill && (
              <div>
                <h3>Tax Bill for Property {taxBill.property_id}</h3>
                <p>Tax Year: {taxBill.tax_year}</p>
                <p>Amount: {taxBill.tax_amount}</p>
                <p>Status: {taxBill.status}</p>
                {/* Display other tax bill details as needed */}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTaxBillDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
 
        {/* <Dialog open={openTaxHistoryDialog} onClose={handleCloseTaxHistoryDialog}>
          <DialogTitle>Tax History</DialogTitle>
          <DialogContent>
            {taxHistory.length > 0 && (
              <div>
                <h3>Tax Bill for Property {taxHistory[0].payment_id}</h3>
                <p>Tax Year: {taxHistory[0].payment_id}</p>
                <p>Amount: {taxHistory[0].payment_id}</p> */}
                {/* <p>Status: {taxHistory.}</p> */}
               {/* </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTaxHistoryDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>  */}


    </Box>

  );
};

export default PropertiesTable;
