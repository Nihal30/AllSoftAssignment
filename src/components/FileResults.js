import { useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import moment from "moment";
import toast from "react-hot-toast";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const FileResults = ({ results }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [downloading, setDownloading] = useState({});

  // 🔹 Dummy Data for Testing
  const dummyFiles = [
    {
      document_id: 1,
      major_head: "Personal",
      minor_head: "Bills",
      file_url: "https://via.placeholder.com/150", // Sample Image
      document_remarks: "Electricity Bill",
      upload_time: "2024-03-25T14:20:00",
      uploaded_by: "John Doe",
    },
    {
      document_id: 2,
      major_head: "Professional",
      minor_head: "Contracts",
      file_url:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Sample PDF
      document_remarks: "Work Contract",
      upload_time: "2024-03-20T10:00:00",
      uploaded_by: "Jane Smith",
    },
    {
      document_id: 2,
      major_head: "Professional",
      minor_head: "Contracts",
      file_url:
        "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg", // Sample PDF
      document_remarks: "Work Contract",
      upload_time: "2024-03-20T10:00:00",
      uploaded_by: "Jane Smith",
    },
  ];

  // Use API Data or Dummy Data
  const files = results?.length > 0 ? results : dummyFiles;

  // Determine file type
  const getFileType = (url) => {
    if (url.endsWith(".pdf")) return "pdf";
    if (url.match(/\.(jpeg|jpg|png|gif)$/i)) return "image";
    return "other";
  };

  // File Download Function
  const handleDownloadZip = async (data) => {
    setDownloading((prev) => ({ ...prev, [data.document_id]: true }));

    if (files.length === 0) {
      toast.error("No files to download.");
      return;
    }

    const zip = new JSZip();

    try {
      // Fetch each file and add to ZIP
      await Promise.all(
        files.map(async (file, index) => {
          try {
            const response = await fetch(file.file_url, { mode: "cors" });
            if (!response.ok)
              throw new Error(`Failed to fetch ${file.file_url}`);
            const blob = await response.blob();
            const fileType = getFileType(file.file_url);
            const fileName = `${file.major_head}_${file.minor_head}_${
              index + 1
            }.${fileType === "image" ? "jpg" : "pdf"}`;
            zip.file(fileName, blob);
          } catch (fetchError) {
            console.error(`Skipping ${file.file_url}:`, fetchError);
          }
        })
      );

      // Generate ZIP file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "downloaded_files.zip");

      toast.success("Files downloaded successfully!");
      setDownloading((prev) => ({ ...prev, [data.document_id]: false }));
    } catch (error) {
      console.error("ZIP Download Error:", error);
      toast.error("Failed to download files.");
      setErrorMessage("Error downloading files.");
      setDownloading((prev) => ({ ...prev, [data.document_id]: false }));
    }
  };

  return (
    <Container className="mt-4 text-center">
      <h5 className="fw-bold">File Results</h5>

      <Row className="mt-3">
        {files?.length === 0 ? (
          <Col xs={12}>
            <h6 className="text-secondary">No files found.</h6>
          </Col>
        ) : (
          files?.map((file, index) => {
            const fileType = getFileType(file.file_url);

            return (
              <Col xs={12} sm={6} md={4} key={index} className="mb-3">
                <Card
                  className="shadow-sm rounded"
                  style={{ minWidth: "250px", height: "300px" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-between text-center">
                    <h6 className="fw-bold" style={{ fontSize: "14px" }}>
                      {file.major_head} - {file.minor_head}
                    </h6>
                    <p
                      className="text-secondary"
                      style={{ fontSize: "12px", marginBottom: "10px" }}
                    >
                      {file.document_remarks || "No remarks"}
                    </p>

                    {/* 🔹 File Preview */}
                    {fileType === "image" ? (
                      <img
                        src={file.file_url}
                        alt="Document"
                        width="100%"
                        height="100px"
                        style={{ borderRadius: "5px", objectFit: "cover" }}
                      />
                    ) : fileType === "pdf" ? (
                      <PictureAsPdfIcon sx={{ fontSize: 60, color: "red" }} />
                    ) : (
                      <InsertDriveFileIcon
                        sx={{ fontSize: 60, color: "gray" }}
                      />
                    )}

                    {/* 🔹 Upload Details */}
                    <div
                      className="mt-2"
                      style={{ fontSize: "12px", color: "#555" }}
                    >
                      <p className="mb-1">
                        📅{" "}
                        {moment(file.upload_time).format(
                          "DD MMM YYYY, hh:mm A"
                        )}
                      </p>
                      <p className="mb-0">
                        👤 Uploaded by: {file.uploaded_by || "Unknown"}
                      </p>
                    </div>
                  </Card.Body>

                  {/* 🔹 Download Button */}
                  <Button
                    variant="dark"
                    className="w-100 rounded-bottom"
                    disabled={downloading[file.document_id]}
                    onClick={() => handleDownloadZip(file)}
                  >
                    {downloading[file.document_id]
                      ? "Downloading..."
                      : "Download"}
                  </Button>
                </Card>
              </Col>
            );
          })
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
