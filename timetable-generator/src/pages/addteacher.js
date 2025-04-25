import { Button, Box, Typography, TextField } from "@mui/material";
import React from "react";

const Teacher = () => {
      const handleSubmit = () => {
            alert("Teachers was Submitted Successfully! ");
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
          Add Teachers
        </Typography>
        <Button variant="contained" >Delete</Button>
      </Box>
      <div className="bg-white px-5 py-10 rounded-xl border-2 w-[95%] mx-auto mt-5 shadow-md">
        
       
        <div style={{ marginTop: "20px" }}>
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Teacher ID</Typography>
          <TextField 
            id="teacher-id" 
            label="Teacher ID" 
            variant="outlined" 
            sx={{ width: "100%", mt: 1, borderRadius: 3 }} 
          />
        </div> 
        <div className="mt-8">
          <Typography sx={{ fontWeight: "bold" }}>Teacher Name</Typography>
          <TextField 
            id="teacher-name" 
            label="Teacher Name" 
            variant="outlined" 
            sx={{ width: "100%", mt: 1, borderRadius: 3 }} 
          />
        </div>
        <div className="mt-8">
          <Typography sx={{ fontWeight: "bold" }}>Department</Typography>
          <TextField 
            id="department" 
            label="Department" 
            variant="outlined" 
            sx={{ width: "100%", mt: 1, borderRadius: 3 }} 
          />
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
