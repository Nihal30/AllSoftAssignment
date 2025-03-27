import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";


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

          <Button type="submit" variant="primary" className="w-100">
            Send OTP
          </Button>
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

            <Button type="submit" variant="success" className="w-100">
              Verify OTP
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default LoginPage;
