import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { Close } from "@mui/icons-material";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

const FileUploadComponent = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: dayjs(),
      category: "",
      subCategory: "",
      remarks: "",
    },
  });

  const category = watch("category");
  const categories = ["Personal", "Professional"];

  const personalNames = ["John", "Tom", "Emily", "Sara"];
  const professionalDepartments = ["Accounts", "HR", "IT", "Finance"];

  // Handle File Upload
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/png" ||
        selectedFile.type === "application/pdf")
    ) {
      setFile(selectedFile);

      // If it's an image, generate a preview
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(""); // Clear preview if it's a PDF
      }
    } else {
      alert("Only Image (PNG) and PDF files are allowed.");
      setFile(null);
      setPreview(""); // Clear preview
    }
  };

  // Add Tags
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prevTags) => [...prevTags, newTag.trim()]);
      setNewTag(""); // Clear input after adding
    }
  };

  // Remove Tags
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  // Handle Form Submit
  const onSubmit = (data) => {
    console.log("Form Data:", {
      ...data,
      tags,
      file: file ? file.name : "No file selected",
    });
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "500px" }}>
      <Card className="p-4 text-center">
        <h5 className="mb-3">File Upload</h5>

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Select Date"
                value={field.value}
                onChange={(newValue) => setValue("date", newValue)}
                className="form-control mb-3"
              />
            )}
          />
        </LocalizationProvider>
        {errors.date && <p className="text-danger">{errors.date.message}</p>}

        {/* Category Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            <option value="Personal">Personal</option>
            <option value="Professional">Professional</option>
          </Form.Select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </Form.Group>

        {/* Subcategory Dropdown (Personal Names / Departments) */}
        {category && (
          <Form.Group className="mb-3">
            <Form.Label>
              {category === "Personal" ? "Select Name" : "Select Department"}
            </Form.Label>
            <Form.Select
              {...register("subCategory", {
                required: "This field is required",
              })}
            >
              <option value="">
                Select {category === "Personal" ? "Name" : "Department"}
              </option>
              {(category === "Personal"
                ? personalNames
                : professionalDepartments
              ).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
            {errors.subCategory && (
              <p className="text-danger">{errors.subCategory.message}</p>
            )}
          </Form.Group>
        )}

        {/* Tag Input Field */}
        <Row className="mb-3">
          <Col xs={8}>
            <Form.Control
              type="text"
              placeholder="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
          </Col>
          <Col xs={4}>
            <Button variant="dark" onClick={handleAddTag} className="w-100">
              Add
            </Button>
          </Col>
        </Row>

        {/* Display Tags */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary">
              {tag}{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteTag(tag)}
              >
                ×
              </span>
            </span>
          ))}
        </div>

        {/* File Upload */}
        <Form.Group className="mb-3">
          <Form.Label>Upload Image/PDF</Form.Label>
          <div
            className="border p-3 text-center"
            style={{ borderStyle: "dashed", borderRadius: "8px" }}
          >
            <input
              type="file"
              accept="image/png, application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              Click to Upload
            </label>
          </div>
        </Form.Group>

        {/* Image Preview */}
        {preview && (
          <div className="position-relative mb-3">
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", maxHeight: "200px", borderRadius: "8px" }}
            />
            <button
              className="btn btn-danger btn-sm position-absolute top-0 end-0"
              onClick={() => {
                setFile(null);
                setPreview("");
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Remarks Field */}
        <Form.Group className="mb-3">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("remarks", { required: "Remarks are required" })}
          />
          {errors.remarks && (
            <p className="text-danger">{errors.remarks.message}</p>
          )}
        </Form.Group>

        {/* Submit Button */}
        <Button
          variant="dark"
          className="w-100"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Card>
    </Container>
  );
};

export default FileUploadComponent;
