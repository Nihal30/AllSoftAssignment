import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Container, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // To clear fields after form submission
  } = useForm();

  // Function to send OTP
  const sendOtp = (data) => {
    console.log("Mobile Number Submitted:", data.mobile);
    setIsOtpSent(true); // Simulate OTP sent

    // try {
    //   const response = await axios.post("{{base_url_documents}}/generateOTP", { mobile_number: data.mobile });
    //   if (response.status === 200) setIsOtpSent(true);
    // } catch (error) {
    //   console.error("Error sending OTP:", error);
    // }
  };

  // Function to validate OTP
  const validateOtp = (data) => {
    console.log("OTP Submitted:", data.otp);
    navigate("/dashboard"); // Simulate successful login

    // try {
    //   const response = await axios.post("{{base_url_documents}}/validateOTP", { mobile_number: data.mobile, otp: data.otp });
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

        <form onSubmit={handleSubmit(sendOtp)}>
          {/* Mobile Number Input */}
          <TextField
            fullWidth
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
            })}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send OTP
          </Button>
        </form>

        {isOtpSent && (
          <form onSubmit={handleSubmit(validateOtp)}>
            {/* OTP Input */}
            <TextField
              fullWidth
              label="Enter OTP"
              variant="outlined"
              margin="normal"
              {...register("otp", {
                required: "OTP is required",
                pattern: { value: /^\d{6}$/, message: "Enter a valid 6-digit OTP" },
              })}
              error={!!errors.otp}
              helperText={errors.otp?.message}
            />

            <Button type="submit" variant="contained" color="success" fullWidth>
              Verify OTP
            </Button>
          </form>
        )}
      </Card>
    </Container>
  );
};

export default LoginPage;
