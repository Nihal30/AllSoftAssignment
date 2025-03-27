import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Badge,
} from "react-bootstrap";
import { searchDocuments } from "../Apis/API";
import toast from "react-hot-toast";

const FileSearch = ({setResults}) => {
  const { control, handleSubmit, setValue } = useForm();
  const [tags, setTags] = useState([]); // Store multiple tags
  const [newTag, setNewTag] = useState(""); // Store current input tag
  const [loading, setLoading] = useState(false);

  // Add a new tag
  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, { tag_name: newTag.trim() }]); // Add new tag object
      setNewTag(""); // Reset input
    }
  };

  // Remove a tag
  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  const token = localStorage.getItem("token");
  // Form submit handler
  const onSubmit = async (data) => {
    const payload = {
      major_head: data.category || "", // Category
      minor_head: "", // Not needed
      from_date: data.fromDate || "", // From Date
      to_date: data.toDate || "", // To Date
      tags: tags, // Tags in correct format
      uploaded_by: "",
      start: 0,
      length: 10,
      filterId: "",
      search: { value: data.search || "" }, // Search input added
    };

    console.log("Search Payload:", payload);

    try {
      setLoading(true);
      const response = await searchDocuments(payload, token);
      if (response?.data?.status) {
        console.log("Get Search Result successfully", response.data);
        setResults(response.data?.data)
        toast.success("Get Search Result successfully");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="p-3">
      <Container className="d-flex justify-content-between align-items-center">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="w-100"
          style={{ maxWidth: "700px" }}
        >
          {/* Category & Search Input Row */}
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Form.Select {...field}>
                      <option value="">Select Category</option>
                      <option value="Personal">Personal</option>
                      <option value="Professional">Professional</option>
                    </Form.Select>
                  )}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Enter search term"
                    />
                  )}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Multiple Tag Input */}
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

          {/* Display Added Tags */}
          <Row className="mb-2">
            <Col>
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  pill
                  bg="light"
                  text="dark"
                  className="me-2 p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveTag(index)}
                >
                  {tag.tag_name} ❌
                </Badge>
              ))}
            </Col>
          </Row>

          {/* Date Pickers */}
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>From Date</Form.Label>
                <Controller
                  name="fromDate"
                  control={control}
                  render={({ field }) => (
                    <Form.Control {...field} type="date" />
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
                    <Form.Control {...field} type="date" />
                  )}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Search Button */}
          <Button
            type="submit"
            variant="dark"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default FileSearch;
