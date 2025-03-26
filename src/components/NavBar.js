import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Autocomplete,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LOGO from "../assets/logo.jpeg";

const categories = ["Personal", "Professional"];
const predefinedTags = ["Invoice", "Report", "Contract", "Receipt"];

const FileSearch = ({ onSearch }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Search Criteria:", data);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#36454F", padding: "10px" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <img src={LOGO} alt="LOGO" style={{ width: 120, borderRadius: 120 }} />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          {/* Dropdowns in a Single Row */}
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Category"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    minWidth: 260,
                  }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  options={predefinedTags}
                  freeSolo
                  onChange={(_, newValue) => setValue("tags", newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      fullWidth
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        minWidth: 260,
                      }}
                    />
                  )}
                />
              )}
            />
          </Box>
          {/* Date Pickers in a Single Row */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Controller
                name="fromDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="From Date"
                    onChange={(newValue) => setValue("fromDate", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        sx={{ backgroundColor: "white", borderRadius: "5px" }}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="toDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="To Date"
                    onChange={(newValue) => setValue("toDate", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        sx={{ backgroundColor: "white", borderRadius: "5px" }}
                      />
                    )}
                  />
                )}
              />
            </Box>
          </LocalizationProvider>
          {/* Search Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#000", color: "#fff", maxWidth: "88%" }}
          >
            Search
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default FileSearch;
