

// import { useEffect, useState, useRef } from "react";
// import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import { Box, IconButton, TextField, CircularProgress } from "@mui/material";
// import { Delete as DeleteIcon, Visibility as ViewIcon } from "@mui/icons-material";
// import { ref, get, remove} from "firebase/database";
// import { database } from "@/firebaseConfig";

// interface MarriageCertificate {
//   id: string;
//   brideName: string;
//   groomName: string;
//   marriageDate: string;
//   marriagePlace: string;
//   registrationNumber: string;
//   createdBy: string;
//   registrationDateTime: string;
//   certificateImage: string;
// }

// const ArchiveTable = () => {
//   const [certificates, setCertificates] = useState<MarriageCertificate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const gridRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         const certificatesRef = ref(database, "marriageCertificates");
//         const snapshot = await get(certificatesRef);
//         if (snapshot.exists()) {
//           const data = snapshot.val();
//           const formattedData = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
//           setCertificates(formattedData);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCertificates();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       await remove(ref(database, `marriageCertificates/${id}`));
//       setCertificates((prev) => prev.filter((cert) => cert.id !== id));
//     } catch (error) {
//       console.error("Error deleting certificate:", error);
//     }
//   };

//   const filteredCertificates = certificates.filter((cert) =>
//     cert.brideName.toLowerCase().includes(search.toLowerCase()) ||
//     cert.groomName.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 120 },
//     { field: "brideName", headerName: "Bride Name", width: 150 },
//     { field: "groomName", headerName: "Groom Name", width: 150 },
//     { field: "marriageDate", headerName: "Marriage Date", width: 130 },
//     { field: "marriagePlace", headerName: "Marriage Place", width: 150 },
//     { field: "registrationNumber", headerName: "Reg. Number", width: 130 },
//     { field: "createdBy", headerName: "Created By", width: 150 },
//     {
//         field: "certificateImage",
//         headerName: "Certificate Image",
//         width: 180,
//         renderCell: (params: GridRenderCellParams<MarriageCertificate>) => {
//           if (!params.row.certificateImage) return <span>No Image</span>;
  
//           // Decode the Base64 image
//           const imageUrl = `data:image/png;base64,${params.row.certificateImage}`;
  
//           return <img src={imageUrl} alt="Certificate" width="50" height="50" />;
//         },
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 100,
//       renderCell: (params: GridRenderCellParams<MarriageCertificate>) => (
//         <Box display="flex" gap={1}>
//           <IconButton color="primary" onClick={() => console.log("View", params.row.id)}>
//             <ViewIcon />
//           </IconButton>
//           <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Box mb={2} padding={3} sx={{
//       overflowX:"hidden",
//       // Responsive styles
//       '@media (max-width: 1752px)': {
//         '& .MuiDataGrid-root': {
//           fontSize: '0.8rem', // Reduce font size
//         },}}}>
//         <TextField
//           label="Search by Name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           variant="outlined"
//           size="small"
//         />

//       {loading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" height={400}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <div ref={gridRef} style={{ height: 500, width: "100%" }}>
//           <DataGrid rows={filteredCertificates} columns={columns} />
//         </div>
//       )}
//       </Box>
//     </div>
//   );
// };

// export default ArchiveTable;





import { useEffect, useState, useRef } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, TextField, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
 import { Visibility as ViewIcon } from "@mui/icons-material";

interface MarriageCertificate {
  id: string;
  brideName: string;
  groomName: string;
  marriageDate: string;
  marriagePlace: string;
  registrationNumber: string;
  createdBy: string;
  registrationDateTime: string;
  certificateImage: string;
}

const ArchiveTable = () => {
  const [certificates, setCertificates] = useState<MarriageCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<MarriageCertificate | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Simulating fetching certificates
    const fetchCertificates = () => {
      setLoading(true);
      const fakeCertificates: MarriageCertificate[] = [
        {
          id: "1",
          groomName: "Marc Aurel",
          brideName: "Alice Linda",
          marriageDate: "2023-05-10",
          marriagePlace: "Yaounde",
          registrationNumber: "Ya12345",
          createdBy: "dilan",
          registrationDateTime: "2023-05-10T10:00:00",
          certificateImage: "/assets/img/certificateImage1.jpg",
        },
        {
          id: "2",
          groomName: "Dilan",
          brideName: "Jessyka",
          marriageDate: "2022-11-15",
          marriagePlace: "Limbe",
          registrationNumber: "LI67890",
          createdBy: "dilan",
          registrationDateTime: "2022-11-15T14:00:00",
          certificateImage: "/assets/img/CertificateImageTwo.png",
        },
        {
          id: "3",
          groomName: "James",
          brideName: "Sarah",
          marriageDate: "2021-08-20",
          marriagePlace: "BUEA",
          registrationNumber: "BU34567",
          createdBy: "dilan",
          registrationDateTime: "2021-08-20T09:30:00",
          certificateImage: "/assets/img/certificateImage3.jpg",
        },
      ];
      setCertificates(fakeCertificates);
      setLoading(false);
    };
    fetchCertificates();
  }, []);

  // const handleDelete = (id: string) => {
  //   setCertificates((prev) => prev.filter((cert) => cert.id !== id));
  // };


  const handleView = (certificate: MarriageCertificate) => {
    setSelectedCertificate(certificate);
    setOpenDialog(true);
  };

  const handleCreateCivilDoc = () => {
    const url = "https://birth-certificate-generator-1.onrender.com/";
    // Open the URL in a new tab
    window.open(url, "_blank");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCertificate(null);
  };

  const filteredCertificates = certificates.filter((cert) =>
    cert.brideName.toLowerCase().includes(search.toLowerCase()) ||
    cert.groomName.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "groomName", headerName: "Groom Name", width: 150 },
    { field: "brideName", headerName: "Bride Name", width: 150 },
    { field: "marriageDate", headerName: "Marriage Date", width: 130 },
    { field: "marriagePlace", headerName: "Marriage Place", width: 150 },
    { field: "registrationNumber", headerName: "Reg. Number", width: 130 },
    { field: "createdBy", headerName: "Created By", width: 150 },
    {
      field: "certificateImage",
      headerName: "Certificate Image",
      width: 180,
      renderCell: (params: GridRenderCellParams<MarriageCertificate>) => {
        if (!params.row.certificateImage) return <span>No Image</span>;

        return <img src={params.row.certificateImage} alt="Certificate" width="50" height="50" />;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: GridRenderCellParams<MarriageCertificate>) => (
        <Box display="flex" gap={1}>
          <IconButton sx={{ color: '#709ec9' }} onClick={() => handleView(params.row)}>
            <ViewIcon />
          </IconButton>
          {/* <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton> */}
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Box mb={2} padding={3} sx={{
        overflowX: "hidden",
        '@media (max-width: 1752px)': {
          '& .MuiDataGrid-root': {
            fontSize: '0.8rem',
          },
        }
      }}>
        <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
        />

            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateCivilDoc}
                sx={{
                  backgroundColor: "#709ec9",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#575447" },
                }}
              >
                Print out a New Certificate
              </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={400}>
            <CircularProgress />
          </Box>
        ) : (
          <div ref={gridRef} style={{ height: 400, width: "auto" }}>
            <DataGrid rows={filteredCertificates} columns={columns} />
          </div>
        )}
        

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Marriage Certificate Details</DialogTitle>
        <DialogContent>
          {selectedCertificate && (
            <>
              <p><strong>Groom Name:</strong> {selectedCertificate.groomName}</p>
              <p><strong>Bride Name:</strong> {selectedCertificate.brideName}</p>
              <p><strong>Marriage Date:</strong> {selectedCertificate.marriageDate}</p>
              <p><strong>Marriage Place:</strong> {selectedCertificate.marriagePlace}</p>
              <p><strong>Registration Number:</strong> {selectedCertificate.registrationNumber}</p>
              <p><strong>Created By:</strong> {selectedCertificate.createdBy}</p>
              <p><strong>Registration Date Time:</strong> {selectedCertificate.registrationDateTime}</p>
              <div>
                <strong>Certificate Image:</strong>
                {selectedCertificate.certificateImage && (
                  <img
                    src={selectedCertificate.certificateImage}
                    alt="Certificate"
                    width="150"
                    height="150"
                  />
                )}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#709ec9' }}>Close</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </div>
  );
};

export default ArchiveTable;
