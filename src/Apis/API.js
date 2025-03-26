import axios from "axios";


const BASE_URL = process.env.API_URL
console.log('BASE_URL', BASE_URL)
// Generate OTP
export const generateOTP = async (mobile_number) => {
  return axios.post(`${BASE_URL}/generateOTP`, { mobile_number });
};

// Validate OTP
export const validateOTP = async (mobile_number, otp) => {
  return axios.post(`${BASE_URL}/validateOTP`, { mobile_number, otp });
};

// Upload File
export const uploadFile = async (formData, token) => {
  return axios.post(`${BASE_URL}/saveDocumentEntry`, formData, {
    headers: { token, "Content-Type": "multipart/form-data" },
  });
};

// Search Documents
export const searchDocuments = async (data, token) => {
  return axios.post(`${BASE_URL}/searchDocumentEntry`, data, {
    headers: { token, "Content-Type": "application/json" },
  });
};

// Fetch Tags
export const fetchTags = async (token) => {
  return axios.post(`${BASE_URL}/documentTags`, { term: "" }, {
    headers: { token, "Content-Type": "application/json" },
  });
};
