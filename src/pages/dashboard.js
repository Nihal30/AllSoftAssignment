import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Form from "../components/Form";
import FileResults from "../components/FileResults";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [results,setResults]=useState(null)
  console.log('results', results)

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check token in localStorage
    // console.log('token', token)
    if (!token) {
      navigate("/"); // Redirect to login if token is missing
    }
  }, [navigate]);

  return (
    <div>
      <NavBar  setResults={setResults}/>
      <Form />
      <FileResults  results={results}/>
    </div>
  );
};

export default Dashboard;
