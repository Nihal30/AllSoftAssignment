import React from "react";
import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"; // PDF Icon
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"; // Generic File Icon

const dummyFiles = [
  { name: "Invoice_001.pdf", type: "pdf", url: "https://example.com/sample.pdf" },
  { name: "Tiger", type: "image", url: "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" },
  { name: "Contract_Agreement.pdf", type: "pdf", url: "https://example.com/contract.pdf" },
  { name: "Dog", type: "image", url: "https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg" },
  { name: "Presentation.pptx", type: "pdf", url: "https://example.com/sample.pptx" },
];

const FileResults = ({ files = dummyFiles }) => {
  const handleDownload = (fileUrl) => {
    console.log("Downloading:", fileUrl);
  };

  return (
    <Box sx={{ margin: "auto", marginTop: "30px", padding: "20px" ,display:"flex",flexDirection:"column",gap:1,alignItems:"center"}}>
      <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
        File Results
      </Typography>

      <Grid container spacing={2} >
        {files.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" textAlign="center">
              No files found.
            </Typography>
          </Grid>
        ) : (
          files.map((file, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                boxShadow: 3, 
                borderRadius: "10px",
                minWidth:250, 
                height: "220px",  // Fixed height
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between" 
              }}>
                <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "14px" }}>
                    {file.name}
                  </Typography>
                  <Typography color="textSecondary" sx={{ fontSize: "12px", marginBottom: "10px" }}>
                    {file.type.toUpperCase()}
                  </Typography>

                  {/* File Preview Handling */}
                  {file.type === "image" ? (
                    <img 
                      src={file.url} 
                      alt={file.name} 
                      width="100%" 
                      height="100px" 
                      style={{ borderRadius: "5px", objectFit: "cover" }} 
                    />
                  ) : file.type === "pdf" ? (
                    <PictureAsPdfIcon sx={{ fontSize: 60, color: "red" }} />
                  ) : (
                    <InsertDriveFileIcon sx={{ fontSize: 60, color: "gray" }} />
                  )}
                </CardContent>

                {/* Sticky Download Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleDownload(file.url)}
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "0 0 10px 10px",
                    "&:hover": { bgcolor: "#333" },
                  }}
                >
                  Download
                </Button>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default FileResults;
