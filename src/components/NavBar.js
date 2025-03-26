import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import LOGO from "../assets/logo.jpeg"

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#36454F" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={LOGO} alt="LOGO" style={{width:50,borderRadius:50}} />
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search..."
            style={{ backgroundColor: "white", borderRadius: "5px" ,color:"#fff" ,borderColor:"1px sold #000"}}
          />
          <Button variant="contained" sx={{bgcolor:"#000"}}>
            Search
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
