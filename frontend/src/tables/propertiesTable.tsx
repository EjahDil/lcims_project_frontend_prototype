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
  IconButton,
  MenuItem,
  Tooltip
  
} from "@mui/material";
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon} from '@mui/icons-material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import { fetchProperties } from "../services/useService"; // Import the API function
import { useNavigate } from "react-router-dom";
import Modal from "../components/modalforediting";
import EditPropertyForm from "../pages/updateProperty";
import DeletePropertyDialog from "../components/deletePropertyPopUp";
import { fetchTaxBill, getPropertyPaymentHistory } from "../services/useService_1";
import ProcessPropertyPaymentForm from "../pages/processPropertyPaymentForm";

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
  const [initialData, setInitialData] = useState<{ propertyId: number; amountPaid: string } | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  //const [loadingResponse, setLoadingResponse] = useState(false);
  const [search, setSearch] = useState("");
  const [taxBill, setTaxBill] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  //const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const [category_name, setCategoryName] = useState(''); 
  const [digital_address, setDigitalAddress] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedProperty, setSelectedProperty] =  useState<Property | null>(null);
  const [rowSelectionModel, setRowSelectionModel] =  React.useState<GridRowSelectionModel>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [taxHistory, setTaxHistory] = useState<any[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [openDialogPaymentDetails, setOpenDialogPaymentDetails] = useState(false);


  const [openTaxBillDialog, setOpenTaxBillDialog] = useState(false);
  const [openTaxHistoryDialog, setOpenTaxHistoryDialog] = useState(false);
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
      console.log(taxBill)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tax bill');
      console.log(error);
    }
  };

  if(taxHistory){
    console.log(taxHistory)
  }else{
    console.log("No tax bill found")
  }


  const handleFetchTaxHistory = async (propertyId: number) => {
    try {
        setError(null); // Clear any previous errors

        if (!propertyId) {
            throw new Error('Property ID is missing');
        }

        const taxHistoryData = await getPropertyPaymentHistory(propertyId.toString());
        setTaxHistory(taxHistoryData); // Update state with the fetched data
        console.log(taxHistoryData); // Debugging log
    } catch (err: any) {
        setError(err.message || 'Failed to fetch tax history'); // Handle and display error
    }
};

// useEffect(() => {
//   // Retrieve payment details from localStorage
//   const storedPaymentDetails = localStorage.getItem("paymentDetails");
//   if (storedPaymentDetails) {
//     setPaymentDetails(JSON.parse(storedPaymentDetails));
//   }
// }, [openModalPayment]);


  // Handle successful payment
  const handlePaymentSuccess = (payment: any) => {
    // Store payment details in state
    setPaymentDetails(payment);

    // Close the payment form modal
    setOpenModalPayment(false);

    // Open the payment details dialog
    setOpenDialogPaymentDetails(true);
  };

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


const handleProcessPayment = (propertyId: number) => {
  console.log("Processing payment for property with ID:", propertyId);

  // Find the property by ID
  const propertyToProcess = properties.find((property) => property.property_id === propertyId);

  if (propertyToProcess) {
    // Transform the data for the initial form state
    const transformedData = {
      propertyId: propertyToProcess.property_id,
      amountPaid: "", // Default to an empty string for the amount paid
    };

    setInitialData(transformedData);
    setOpenModalPayment(true);
  } else {
    console.error("Property not found with the specified ID:", propertyId);
  }
};




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

  // Function to handle closing the dialog
  const handleClose = () => {

    setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          const { role } = user;

          // Navigate based on the user's role
          if (role === "admin") {
            navigate("/admin/property-management");
          } else {
            navigate("/dashboard/property-management");
          }

           // Reload the page after navigation
          window.location.reload();

        } catch (err) {
          console.error("Error parsing user data from localStorage:", err);
        }
      }
  }, 0);
    setOpenDialogPaymentDetails(false);
  };

  // Ensure filteredProperties is initialized with properties on load
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties])

  // Handle Change in Dropdown
  const handleCategoryChange = (value: string) => {
    setCategoryName(value);
    if (value === '') {
      // Show all rows if 'All Types' is selected
      setFilteredProperties(properties);
    } else {
      // Filter rows based on selected category
      const filteredCategoryRows = properties.filter((property) => property.category_name === value);
      setFilteredProperties(filteredCategoryRows);
    }
  };

  // Handle Change in Digital Address Search Input
  const handleDigitalAddressSearch = (value: string) => {
    setDigitalAddress(value);
    
    if (value === '') {
      // Show all rows if the search input is cleared
      setFilteredProperties(properties);
    } else {
         // Filter rows based on the search value, including numbers
    const filteredDigitalAddress = properties.filter((property) =>
      property.digital_address.toString().toLowerCase().includes(value.toLowerCase())
    );

      setFilteredProperties(filteredDigitalAddress);
    }
  };
  
  

const handleCloseTaxHistoryDialog = () => {
  setOpenTaxHistoryDialog(false);
  
};


const handlePrint = () => {
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Details</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="bg-gray-100 font-sans p-6">
          <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-center text-2xl font-semibold mb-6">Payment Receipt</h2>
            
            <div class="flex justify-between mb-4">
              <p class="font-medium">Amount Paid:</p>
              <p>${paymentDetails.amount_paid}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p class="font-medium">Receipt Number:</p>
              <p>${paymentDetails.receipt_number}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p class="font-medium">Transaction Reference:</p>
              <p>${paymentDetails.transaction_reference}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p class="font-medium">Remaining Balance:</p>
              <p>${paymentDetails.remaining_balance}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p class="font-medium">Payment Date:</p>
              <p>${paymentDetails.payment_date}</p>
            </div>
            
            <div class="flex justify-between mb-4">
              <p class="font-medium">Tax Amount:</p>
              <p>${paymentDetails.tax_amount}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p class="font-medium">House Number:</p>
              <p>${paymentDetails.property_details.house_number}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p class="font-medium">Street Name:</p>
              <p>${paymentDetails.property_details.street_name}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p class="font-medium">Category Name:</p>
              <p>${paymentDetails.property_details.category_name}</p>
            </div>
            <div class="flex justify-between mb-4">
              <p class="font-medium">Owner Name:</p>
              <p>${paymentDetails.property_details.owner_name}</p>
            </div>

            <div class="mt-6 border-t-2 pt-4">
              <p class="font-semibold">Total Payment: ${paymentDetails.amount_paid}</p>
            </div>

            <div class="mt-8 text-center text-sm text-gray-500">
              <p>Thank you for your payment!</p>
              <p>Powered by LCC</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
};




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

        <Tooltip title="Tax Bill Details">
          <IconButton
            sx={{ color: '#709ec9' }}
            onClick={() => {
              handleFetchTaxBill(params.row.property_id); // Fetch the tax bill
              setOpenTaxBillDialog(true); // Open the dialog to display the tax bill
            }}
          >
            <ReceiptIcon />
          </IconButton>
        </Tooltip>

        
        <Tooltip title="Payment History">
          <IconButton
            sx={{ color: '#709ec9' }}
            onClick={() => {
               handleFetchTaxHistory(params.row.property_id); // Fetch the tax bill
              setOpenTaxHistoryDialog(true); // Open the dialog to display the tax bill
           }}
          >
            <HistoryIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Make Tax Payment">
          <IconButton
            sx={{ color: '#709ec9' }}
            onClick= {() => handleProcessPayment(params.row.property_id)}
          >
            <CreditCardIcon />
          </IconButton>
        </Tooltip>

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
            sx={{ color: '#709ec9' }}
            onClick={() => {
              setSelectedProperty(params.row);
              setOpenDialog(true);
            }}
          >
            <ViewIcon/>
          </IconButton>
          <IconButton
           sx={{ color: '#709ec9' }}
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

         <TextField
          label="Search Digital Address"
          value={digital_address}
          onChange={(e) => handleDigitalAddressSearch(e.target.value)}
          variant="outlined"
          size="small"
        />

        <TextField
       select
       label="Category Name"
       value={category_name}
       onChange={(e) => handleCategoryChange(e.target.value)}
       variant="outlined"
       size="small"
       >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Residential">Residential</MenuItem>
          <MenuItem value="Commercial">Commercial</MenuItem>
          <MenuItem value="Industrial">Industrial</MenuItem>
        </TextField>

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
        rows={filteredProperties}
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
          <Button  
          onClick={handleCloseDialog}
          sx={{ color: '#709ec9'}}>Close</Button>
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


       {/* Payment Form Modal */}
       <Modal isOpen={openModalPayment} onClose={() => setOpenModalPayment(false)}>
        <ProcessPropertyPaymentForm
          initialData={initialData!}
          onPaymentSuccess={handlePaymentSuccess} // Pass success handler
          onClose={() => setOpenModalPayment(false)}
        />
      </Modal>

      <Dialog open={openDialogPaymentDetails} onClose={handleClose}>
      <DialogTitle>Payment Details</DialogTitle>
      <DialogContent>
        {paymentDetails ? (
          <div>
            <p>Amount Paid: {paymentDetails.amount_paid}</p>
            <p>Receipt Number: {paymentDetails.receipt_number}</p>
            <p>Transaction Reference: {paymentDetails.transaction_reference}</p>
            <p>Remaining Balance: {paymentDetails.remaining_balance}</p>
            <p>Payment Date: {paymentDetails.payment_date}</p>

            {/* Property Details */}
            <p>Tax Amount: {paymentDetails.tax_amount}</p>
            <p>House Number: {paymentDetails.property_details.house_number}</p>
            <p>Street Name: {paymentDetails.property_details.street_name}</p>
            <p>Category Name: {paymentDetails.property_details.category_name}</p>
            <p>Owner Name: {paymentDetails.property_details.owner_name}</p>
          </div>
        ) : (
          <p>No payment details available.</p>
        )}
      </DialogContent>

      {/* Action buttons */}
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Button sx={{ color: 'black' }} onClick={handleClose}>
          Close
        </Button>
        <Button variant="contained" sx={{ color: 'white', backgroundColor: '#709ec9' }} onClick={handlePrint} style={{ marginLeft: "10px" }}>
          Print
        </Button>
      </div>
    </Dialog>
      
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
                <p>House Number: {taxBill.house_number}</p>
                <p>Street Name: {taxBill.street_name}</p>
                <p>Category Name: {taxBill.category_name}</p>
                <p>Owner Name: {taxBill.owner_name}</p>
                <p>Bill ID: {taxBill.bill_id}</p>
                <p>Tax Year: {taxBill.tax_year}</p>
                <p>Tax Amount: {taxBill.tax_amount}</p>
                <p>Due Date: {taxBill.due_date}</p>
                <p>Status: {taxBill.status}</p>
                <p>Total Paid: {taxBill.total_paid}</p>
                <p>Remaining Amount: {taxBill.remaining_amount}</p>
              </div>

            )}
          </DialogContent>
          <DialogActions>
            <Button 
              sx={{
                color: '#709ec9'
              }}
            onClick={handleCloseTaxBillDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
 
            <Dialog open={openTaxHistoryDialog} onClose={handleCloseTaxHistoryDialog}>
        <DialogTitle>Tax History</DialogTitle>
        <DialogContent>
        {taxHistory.length > 0 && (
          <div>
            <h3>Tax Bill for Property {taxHistory[taxHistory.length - 1].payment_id}</h3>
            <p>Tax Year: {taxHistory[taxHistory.length - 1].tax_year}</p>
            <p>Amount: {taxHistory[taxHistory.length - 1].amount}</p>
            <p>Status: {taxHistory[taxHistory.length - 1].status}</p>
          </div>
        )}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseTaxHistoryDialog} sx={{ color: '#709ec9' }}>
          Close
        </Button>
        </DialogActions>
        </Dialog>

    </Box>

  );
};

export default PropertiesTable;
