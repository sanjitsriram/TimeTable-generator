import { Button, Box, Typography, TextField } from "@mui/material";
import React from "react";

const ClassTiming = () => {
  const handleSubmit = () => {
    alert("Class Timing was Submitted Successfully! ");
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
          Add Class Timing
        </Typography>
        <Button variant="contained" >Delete</Button>
      </Box>

      <div className="bg-white px-5 py-10 rounded-xl border-2 w-[95%] mx-auto mt-5 shadow-md">
        <div className="mt-5">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Class Room ID</Typography>
          <TextField 
            id="classroom-id" 
            label="Enter Class Room ID" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 }}}
          />
        </div>

        <div className="mt-8">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Teacher Name</Typography>
          <TextField 
            id="teacher-name" 
            label="Enter Teacher Name" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 }}}
          />
        </div>

        <div className="mt-8">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Timing</Typography>
          <TextField 
            id="timing" 
            label="Enter Class Timing" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 }}}
          />
        </div>

        <div className="mt-8">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Days of the Week</Typography>
          <TextField 
            id="days-of-week" 
            label="Enter Days of the Week" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 }}}
          />
        </div>
        <div className="mt-8">
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>Departments</Typography>
          <TextField 
            id="departments" 
            label="Enter Departments" 
            variant="outlined" 
            fullWidth
            sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 }}}
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

export default ClassTiming;
