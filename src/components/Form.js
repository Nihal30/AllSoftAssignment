    import React, { useState } from "react";
    import {
    Container,
    Card,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Chip,
    Box,
    IconButton,
    } from "@mui/material";
    import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
    import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
    import { DatePicker } from "@mui/x-date-pickers/DatePicker";
    import { useForm, Controller } from "react-hook-form";
    import dayjs from "dayjs";
    import { Close } from "@mui/icons-material";

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

    const personalNames = ["John", "Tom", "Emily", "Sara"];
    const professionalDepartments = ["Accounts", "HR", "IT", "Finance"];

    // Handle File Upload
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile.type === "image/png" || selectedFile.type === "application/pdf")) {
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
        <Container maxWidth="sm" style={{ marginTop: "30px" }}>
        <Card style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
            File Upload
            </Typography>

            {/* ✅ Wrapped DatePicker inside LocalizationProvider */}
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
                    sx={{ width: "100%", marginBottom: "15px" }}
                />
                )}
            />
            </LocalizationProvider>
            {errors.date && <Typography color="error">{errors.date.message}</Typography>}

            {/* Category Dropdown */}
            <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                <Select {...field}>
                    <MenuItem value="Personal">Personal</MenuItem>
                    <MenuItem value="Professional">Professional</MenuItem>
                </Select>
                )}
            />
            </FormControl>
            {errors.category && <Typography color="error">{errors.category.message}</Typography>}

            {/* Dynamic Dropdown */}
            {category && (
            <FormControl fullWidth margin="normal">
                <InputLabel>{category === "Personal" ? "Select Name" : "Select Department"}</InputLabel>
                <Controller
                name="subCategory"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                    <Select {...field}>
                    {(category === "Personal" ? personalNames : professionalDepartments).map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </Select>
                )}
                />
            </FormControl>
            )}
            {errors.subCategory && <Typography color="error">{errors.subCategory.message}</Typography>}

            {/* Tag Input Field */}
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <TextField
                label="Add Tag"
                variant="outlined"
                size="small"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                sx={{ flexGrow: 1, marginRight: "10px" }}
            />
            <Button variant="contained" onClick={handleAddTag}>
                Add
            </Button>
            </Box>

            {/* Display Tags */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "15px" }}>
            {tags.map((tag, index) => (
                <Chip key={index} label={tag} onDelete={() => handleDeleteTag(tag)} />
            ))}
            </Box>

            {/* File Upload Section */}
            <Box
            sx={{
                border: "2px dashed #aaa",
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
                marginBottom: "15px",
                cursor: "pointer",
                "&:hover": { borderColor: "#000" },
            }}
            >
            <input
                type="file"
                accept="image/png, application/pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
            />
            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <Typography variant="body1" color="primary">
                Click to Upload Image or PDF
                </Typography>
            </label>
            </Box>

            {/* Image Preview */}
            {preview && (
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              marginBottom: "15px",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "rgba(255,255,255,0.6)",
              }}
              onClick={() => {
                setFile(null);
                setPreview("");
              }}
            >
              <Close />
            </IconButton>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", maxHeight: "200px", borderRadius: "8px" }}
            />
          </Box>
        )}

            {/* Remarks Field */}
            <TextField
            fullWidth
            label="Remarks"
            multiline
            rows={3}
            variant="outlined"
            {...register("remarks", { required: "Remarks are required" })}
            margin="normal"
            />
            {errors.remarks && <Typography color="error">{errors.remarks.message}</Typography>}

            {/* Submit Button */}
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
            Upload File
            </Button>
        </Card>
        </Container>
    );
    };

    export default FileUploadComponent;
