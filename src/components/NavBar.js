import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import LOGO from "../assets/logo.jpeg";

const NavBar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Search Query:", data.search);
    reset(); // Clear the search input after submission
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#36454F" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={LOGO} alt="LOGO" style={{ width: 50, borderRadius: 50 }} />
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "10px" }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search..."
            {...register("search", { required: "Search field cannot be empty" })}
            error={!!errors.search}
            helperText={errors.search?.message}
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: "#000" }}>
            Search
          </Button>
        </form>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
