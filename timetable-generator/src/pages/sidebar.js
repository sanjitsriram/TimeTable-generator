import React from "react";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Man3Icon from '@mui/icons-material/Man3';


const Sidebar=()=>{
  return(
    <div className='w-64 bg-gray-800 fixed h-full px-4 py-2'>
      <div>
      <img 
      src="https://media.licdn.com/dms/image/v2/C511BAQHqIES8oTFy1g/company-background_10000/company-background_10000/0/1584495553549/solamalai_college_of_engineering_cover?e=2147483647&v=beta&t=LTpcC88Ft0PIrGe16qPPdVr6Oe1nMwaIzseIxpNz_9o"
      className="w-75 h-16 mb-3 object-cover" />
        <h1 className='text-2x text-white font-bold'>Admin Dashboard</h1>
      </div>
      <hr/>
      <ul className='mt-3 text-white font-bold'>
      <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href="teachers" className='px-3'>
            <Man3Icon className='inline'></Man3Icon>Teachers</a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="departments" className="px-3">
            <AccountBalanceIcon className='inline'></AccountBalanceIcon>Departments</a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="classroom" className="px-3">
            <PeopleIcon className='inline'></PeopleIcon>ClassRoom</a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="course" className="px-3">
            <AutoStoriesIcon className='inline'></AutoStoriesIcon>Course</a>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="class-timing" className="px-3" >
            <AccessAlarmsIcon className='inline'></AccessAlarmsIcon>Class Timing</a>
        </li>
        
      </ul>
    </div>
  )
}
export default Sidebar;