import React from "react";
import { useForm, Controller } from "react-hook-form";
import LOGO from "../assets/logo.jpeg";
import { Navbar, Container, Form, Button, Row, Col } from "react-bootstrap";

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
    <Navbar bg="success" variant="dark" expand="lg" className="p-3">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div>
          <img src={LOGO} alt="LOGO" style={{ width: 120, borderRadius: 120 }} />
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit(onSubmit)} className="w-100" style={{ maxWidth: "600px" }}>
          {/* Dropdowns Row */}
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Form.Select {...field} isInvalid={!!errors.category}>
                      <option value="">Select Category</option>
                      {categories.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                />
                <Form.Control.Feedback type="invalid">{errors.category?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Enter tags"
                      onChange={(e) => setValue("tags", e.target.value.split(","))}
                    />
                  )}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Date Pickers Row */}
          <Row className="mb-2" >
            <Col md={6}>
              <Form.Group>
                <Form.Label>From Date</Form.Label>
                <Controller
                  name="fromDate"
                  control={control}
                  render={({ field }) => (
                    <Form.Control {...field} type="date" onChange={(e) => setValue("fromDate", e.target.value)} />
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>To Date</Form.Label>
                <Controller
                  name="toDate"
                  control={control}
                  render={({ field }) => (
                    <Form.Control {...field} type="date" onChange={(e) => setValue("toDate", e.target.value)} />
                  )}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Search Button */}
          <Button type="submit" variant="dark" className="w-100">
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default FileSearch;
