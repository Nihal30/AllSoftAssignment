import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
        setIsOtpSent(true);

    try {
    //   const response = await axios.post("{{base_url_documents}}/generateOTP", {
    //     mobile_number: mobile,
    //   });
    //   if (response.status === 200) {
    //     setIsOtpSent(true);
    //   }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const validateOtp = async () => {
        navigate("/dashboard");

    // try {
    //   const response = await axios.post("{{base_url_documents}}/validateOTP", {
    //     mobile_number: mobile,
    //     otp: otp,
    //   });
    //   if (response.status === 200) {
    //     localStorage.setItem("token", response.data.token);
    //     navigate("/dashboard");
    //   }
    // } catch (error) {
    //   console.error("Error validating OTP:", error);
    // }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
    <Card style={{ padding: "20px", width: "100%", maxWidth: "400px", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Login with OTP
      </Typography>
      <TextField
        fullWidth
        label="Mobile Number"
        variant="outlined"
        margin="normal"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={sendOtp}>
        Send OTP
      </Button>
      {isOtpSent && (
        <>
          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button variant="contained" color="success" fullWidth onClick={validateOtp}>
            Verify OTP
          </Button>
        </>
      )}
    </Card>
  </Container>
  );
};

export default LoginPage;
