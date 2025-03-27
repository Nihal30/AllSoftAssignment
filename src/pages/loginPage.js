import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { generateOTP, validateOTP } from "../Apis/API";

const LoginPage = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // To clear fields after form submission
  } = useForm();

  // Function to send OTP
  const sendOtp = async (data) => {
    console.log("Mobile Number Submitted:", data.mobile);
    setIsOtpSent(true); // Simulate OTP sent
    setLoading(true);

    try {
      const response = await generateOTP(data.mobile);
      console.log("response", response?.data?.status);

      if (response?.data?.status) {
        console.log("response", response);
        toast.success("OTP Send Successfully!!");
        setLoading(false);
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
    }
  };

  // Function to validate OTP
  const validateOtp = async (data) => {
    console.log("OTP Submitted:", data.otp);
    // Simulate successful login
    setLoading(true);

    try {
      const response = await validateOTP(data.mobile, data.otp);
      if (response?.data?.status) {
        console.log("response", response);
        localStorage.setItem("token", response?.data?.data.token);
        toast.success(" OTP Verify Successfully!!");
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ marginTop: "50px" }}
    >
      <Card
        className="p-4 text-center"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h5 className="mb-3">Login with OTP</h5>

        <Form onSubmit={handleSubmit(sendOtp)}>
          {/* Mobile Number Input */}
          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              {...register("mobile", {
                required: "Mobile number is required",
                // pattern: {
                //   value: /^[6-9]\d{9}$/,
                //   message: "Enter a valid 10-digit mobile number",
                // },
              })}
              isInvalid={!!errors.mobile}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mobile?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {!isOtpSent && (
            <Button
              type="submit"
              variant="dark"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : " Send OTP"}
            </Button>
          )}
        </Form>

        {isOtpSent && (
          <Form onSubmit={handleSubmit(validateOtp)} className="mt-3">
            {/* OTP Input */}
            <Form.Group className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Enter a valid 6-digit OTP",
                  },
                })}
                isInvalid={!!errors.otp}
              />
              <Form.Control.Feedback type="invalid">
                {errors.otp?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Verifying..." : " Verify OTP"}
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default LoginPage;
