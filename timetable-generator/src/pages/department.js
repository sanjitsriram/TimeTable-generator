import React from 'react';
import { Button,TextField,InputAdornment } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom'

function createData(DepartmentName, CourseID, CourseName) {
  return { DepartmentName, CourseID, CourseName };
}
const rows = [
  createData('CSE', 5269, 'OOPS'),
  createData('ECE', 7583, 'DSP'),
  createData('EEE', 9684, 'PROJECT REPORT WRITING'),
  createData('MECH',5621 , 'DATABASE'),
 
];

export default function DenseAppBar() {
  const navigate= useNavigate();
  return (
    <div className="p-4">
      <div className="flex justify-end">
      <Button 
  variant="contained" 
  sx={{ borderRadius: "10px" }} 
  onClick={() => navigate('/adddepartment')}
>
  Add Departments
</Button>

      </div>
      <div className="mt-6 w-3/4 mx-auto">
        <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px", marginLeft: "15px" }}>
  <TextField id="outlined-basic" label="Search" variant="outlined"sx={{
      width: "600px",
      "& .MuiOutlinedInput-root": {
        borderRadius: 4,
      },
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton edge="end" color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
</Box>
        </Box>
      </div>
      <TableContainer component={Paper} className="mt-9 w-3/4 mx-auto">
        <Table sx={{ maxWidth: 1500 }} aria-label="teachers table">
          <TableHead>
            <TableRow>
              <TableCell align="left"><strong>DepartmentName</strong></TableCell>
              <TableCell align="left"><strong>CourseID</strong></TableCell>
              <TableCell align="left"><strong>CourseName</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.UID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{row.DepartmentName}</TableCell>
                <TableCell align="left">{row.CourseID}</TableCell>
                <TableCell align="left">{row.CourseName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
