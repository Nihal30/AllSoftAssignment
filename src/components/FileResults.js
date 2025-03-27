import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const dummyFiles = [
  {
    name: "Invoice_001.pdf",
    type: "pdf",
    url: "https://example.com/sample.pdf",
  },
  {
    name: "Tiger.jpg",
    type: "image",
    url: "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
  },
  {
    name: "Contract_Agreement.pdf",
    type: "pdf",
    url: "https://example.com/contract.pdf",
  },
  {
    name: "Dog.jpg",
    type: "image",
    url: "https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg",
  },
  {
    name: "Presentation.pptx",
    type: "pptx",
    url: "https://example.com/sample.pptx",
  },
];

const FileResults = ({ files = dummyFiles }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownloadZip = async (file) => {
    if (file.type !== "pdf" && file.type !== "image") {
      setErrorMessage("Only PDF and image files can be downloaded.");
      return;
    }

    const zip = new JSZip();
    const response = await fetch(file.url);
    const blob = await response.blob();
    zip.file(file.name, blob);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "download.zip");
    });
  };

  return (
    <Container className="mt-4 text-center">
      <h5 className="fw-bold">File Results</h5>

      <Row className="mt-3">
        {files.length === 0 ? (
          <Col xs={12}>
            <h6 className="text-secondary">No files found.</h6>
          </Col>
        ) : (
          files.map((file, index) => (
            <Col xs={12} sm={6} md={4} key={index} className="mb-3">
              <Card
                className="shadow-sm rounded"
                style={{ minWidth: "250px", height: "220px" }}
              >
                <Card.Body className="d-flex flex-column justify-content-between text-center">
                  <h6 className="fw-bold" style={{ fontSize: "14px" }}>
                    {file.name}
                  </h6>
                  <p
                    className="text-secondary"
                    style={{ fontSize: "12px", marginBottom: "10px" }}
                  >
                    {file.type.toUpperCase()}
                  </p>

                  {file.type === "image" ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      width="100%"
                      height="100px"
                      style={{ borderRadius: "5px", objectFit: "cover" }}
                    />
                  ) : file.type === "pdf" ? (
                    <PictureAsPdfIcon sx={{ fontSize: 60, color: "red", }} />
                  ) : (
                    <InsertDriveFileIcon sx={{ fontSize: 60, color: "red" }} />
                  )}
                </Card.Body>

                <Button
                  variant="dark"
                  className="w-100 rounded-bottom"
                  onClick={() => handleDownloadZip(file)}
                  disabled={file.type !== "pdf" && file.type !== "image"}
                >
                  Download
                </Button>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {errorMessage && (
        <Alert
          variant="danger"
          className="mt-3 text-center"
          onClose={() => setErrorMessage("")}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};

export default FileResults;
