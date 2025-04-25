import { Button, Box, Typography, TextField } from "@mui/material";
import React from "react";

const ClassRoom = () => {
  const handleSubmit = () => {
    alert("Classroom was Submitted Successfully! ");
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
          Add ClassRoom
        </Typography>
        <Button variant="contained">Delete</Button>
      </Box>
      <div className="bg-white px-5 py-10 rounded-xl border-2 w-[95%] mx-auto mt-5 shadow-md">
        <div className="mt-5">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Class ID</Typography>
          <TextField 
            id="class-id" 
            label="Enter Class ID" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 }}} 
          />
        </div>
        <div className="mt-8">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Capacity</Typography>
          <TextField 
            id="capacity" 
            label="Enter Capacity" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 }}} 
          />
        </div>
        <div className="mt-8">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Departments</Typography>
          <TextField 
            id="departments" 
            label="Enter Department Name" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 }}} 
          />
        </div>
        <div className="mt-8">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Sections</Typography>
          <TextField 
            id="departments" 
            label="Enter Sections Name" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 }}} 
          />
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="contained"  onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default ClassRoom;
