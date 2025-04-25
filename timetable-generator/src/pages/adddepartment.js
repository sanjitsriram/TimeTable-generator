import { Button, Box, Typography, TextField } from "@mui/material";
import React from "react";

const Department = () => {
  const handleSubmit = () => {
    alert("Department was Submitted Successfully!");  
  };

  return (
    <div className="bg-gray-200 px-3 py-9 w-full">
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 3, 
          p: 2, 
          borderRadius: "8px", 
          boxShadow: 1, 
          bgcolor: "white"
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
          Add Department
        </Typography>
        <Button variant="contained" >Delete</Button>
      </Box>
      <div className="bg-white px-5 py-10 rounded-xl border-2 w-[95%] mx-auto mt-5 shadow-md">
        <div className="mt-5">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Department Name</Typography>
          <TextField 
            id="department-name" 
            label="Department Name" 
            variant="outlined" 
            sx={{ width: "100%", mt: 1, borderRadius: 3 }} 
          />
        </div>
        <div className="mt-8">
          <Typography sx={{ fontWeight: "bold" }}>Course ID</Typography>
          <TextField 
            id="course-id" 
            label="Course ID" 
            variant="outlined" 
            sx={{ width: "100%", mt: 1, borderRadius: 3 }} 
          />
        </div>
        <div className="mt-8">
          <Typography sx={{ fontWeight: "bold" }}>Course Name</Typography>
          <TextField 
            id="course-name" 
            label="Course Name" 
            variant="outlined" 
            sx={{ width: "100%", mt: 1, borderRadius: 3 }} 
          />
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default Department;
