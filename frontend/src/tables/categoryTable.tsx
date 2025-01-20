


import { useState, useEffect, useRef } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";

import ViewIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchCategories } from "../services/useService_1";
import { useNavigate } from "react-router-dom";
import { AttachMoney } from "@mui/icons-material";
import { CategoryRate } from "./taxRatesTable";
import Modal from "../components/modalforediting";
import EditTaxForm from "../pages/updateRates";
import EditCategoryForm from "../pages/updateCategory";
import DeleteCategoryDialog from "../components/deleteCategoryPopup";
//import { fetchCategoryRates } from "../services/useService";


interface Category {
    category_id: number;         
    category_name: string;       
    description?: string;         
    status: string;              
    created_at: string;          
    updated_at: string;           
    property_count: number;       
    current_rate: number;     

};


// interface PaginatedResponse<T> {
//     total: number;
//     page: number;
//     limit: number;
//     data: T[];
//   }

const CategoriesTable = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  //const [status, setStatus] = useState("");
  const [initialData, setInitialData] = useState<CategoryRate | null>(null);
  const [initialCategoryData, setInitialCategoryData] = useState<{
    category_id: string;
    category_name: string;
    description?: string;
  } | null>(null);
  
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  //const [openModal, setOpenModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(false);
  //const [rates, setRates] = useState<CategoryRate[]>([]);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories(paginationModel.page + 1, paginationModel.pageSize, search, status);
      setCategories(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // const loadRates = async () => {
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("token"); // Retrieve the token from local storage
  //     if (!token) throw new Error("Token not found");

  //     const data = await fetchCategoryRates();
  //     setRates(data); // API should return data in the structure of CategoryRate[] 
  //   } catch (error) {
  //     console.error("Failed to fetch category rates:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateProperty = () => {
    navigate('/create-category');
  };

  const handleEditRates = (id: number) => {
    console.log("Edit tax rate with ID:", id);
  
    // Find the specific rate data to edit
    const rateToEdit = categories.find((category) => category.category_id === id);
  
    if (rateToEdit) {
      setInitialData(rateToEdit); // Set the initial data for the form
      setOpenRateModal(true); // Open the modal to edit the tax rate
    } else {
      console.error("Tax rate not found with the specified ID:", id);
    }
  
    // Additional logic for handling edits can be added here if needed
  };
  
  const handleEditCategory = (id: number) => {
    console.log("Edit category with ID:", id);
  
    // Find the specific category data to edit
    const categoryToEdit = categories.find((category) => category.category_id === id);
  
    if (categoryToEdit) {
      // Transform categoryToEdit to match the expected type
      const transformedCategory = {
        category_id: String(categoryToEdit.category_id), // Convert category_id to string
        category_name: categoryToEdit.category_name,
        description: categoryToEdit.description,
      };
  
      setInitialCategoryData(transformedCategory);
      setOpenCategoryModal(true);
    } else {
      console.error("Category not found with the specified ID:", id);
    }
  };
  

  const handleCategoryClose = () => {
    setOpenCategoryModal(false);
    setInitialCategoryData(null); // Reset data when closing
  };



  // const handleCreateRate = () => {
  //   navigate("/form");
  // };


  const handleViewStreet = (category: Category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  // const handleEditCategory = (id: number) => {
  //   console.log("Edit category with ID:", id);
  //   const categoryToEdit = categories.find((category) => category.category_id === id);
  //   if (categoryToEdit) {
  //     setSelectedCategory(categoryToEdit);
  //     setOpenModal(true); // Open the modal to edit category details
  //   }
  // };

  const handleOpenDialog = (categoryId: number) => {
    setCategoryIdToDelete(categoryId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCloseDialog = () => {
    setCategoryIdToDelete(null);
    setOpenDeleteDialog(false);
  };




  const handleCloseModal = () => setOpenRateModal(false);

  const columns: GridColDef[] = [
    { field: "category_id", headerName: "ID", width: 100 },
    { field: "category_name", headerName: "Category Name", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "current_rate", headerName: "Current Tax Rate", width: 150 },
    { field: "created_at", headerName: "Created At", width: 180 },
    {
      field: "set_tax_rate",
      headerName: "SetTaxRate",
      width: 150,
      renderCell: (params: GridRenderCellParams<Category>) => (
        <Box 
        justifyContent="center"  
        alignItems="center"    
        style={{ height: '100%' }} 
        display="flex">
        <IconButton sx={{ color: '#709ec9' }} onClick={() => handleEditRates(params.row.category_id)}>
          <AttachMoney />
        </IconButton>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<Category>) => (
        <Box display="flex" gap={0.5}>
        <IconButton sx={{ color: '#709ec9' }} onClick={() => handleViewStreet(params.row)}>
            <ViewIcon />
        </IconButton>
          <IconButton 
         sx={{ color: '#709ec9' }}
         onClick={() => handleEditCategory(params.row.category_id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
          color="error" 
          onClick={() => handleOpenDialog(params.row.category_id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    loadCategories();
  }, [paginationModel, search, status]);


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
    <div>
      {/* Your search and filter UI can be added here */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search By Category Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
        />

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
        rows={categories}
        columns={columns}
        getRowId={(row: Category) => row.category_id}
        rowCount={total}
        paginationMode="server"
        pageSizeOptions={[10, 25, 50]} // Updated prop name
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        loading={loading}
        initialState={{
            sorting: {
              sortModel: [{ field: "category_id", sort: "asc" }],
            },
          }}
        ref={gridRef}
        rowSelectionModel={rowSelectionModel} // Bind the selection model to the state
        onRowSelectionModelChange={(newSelectionModel) => {
        setRowSelectionModel([...newSelectionModel]); // Update selection state
        }}
        />

        {/* Dialog for viewing category details */}
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
        <DialogTitle>Category Details</DialogTitle>
        <DialogContent>
          {selectedCategory && (
            <Box>
              <Typography>Category ID: {selectedCategory.category_id}</Typography>
              <Typography>Category Name: {selectedCategory.category_name}</Typography>
              <Typography>Status: {selectedCategory.status}</Typography>
              <Typography>Tax Rate: {selectedCategory.current_rate}</Typography>
              <Typography>Description: {selectedCategory.description || "N/A"}</Typography>
              <Typography>Created At: {new Date(selectedCategory.created_at).toLocaleString()}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: '#709ec9' }} onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Modal isOpen={openRateModal} onClose={handleCloseModal}>
        {initialData ? (
          <EditTaxForm
            initialData={initialData} 
            onClose={handleCloseModal} 
          />
        ) : (
          <></> // Return an empty fragment if no initial data is available
        )}
      </Modal>

            <Modal isOpen={openCategoryModal} onClose={handleCategoryClose}>
        {initialCategoryData ? (
          <EditCategoryForm
            initialData={initialCategoryData}
            onClose={handleCategoryClose}
          />
        ) : (
          <></> // Empty fragment if no data
        )}
      </Modal>

      <DeleteCategoryDialog
        open={openDeleteDialog}
        categoryId={categoryIdToDelete}
        onClose={handleDeleteCloseDialog}
        onCategoryDeleted={() => loadCategories()}
      />


    </div>
  );
};

export default CategoriesTable;
