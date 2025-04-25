import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* ---------- page imports ---------- */
import WelcomePage    from './pages/welcome/welcomepage';
import AddTeachers    from './pages/addteacher/addteacher';
import DepartmentForm from './pages/adddepartmennts/adddepartment';
import AddClassroom   from './pages/addclassrooms/addclassrooms';
import AddCourses     from './pages/addcources/addcources';
import AddTiming      from './pages/addclasstimings/addclasstimings';
import GeneratePage   from './pages/generate/generatepage';

/* ---------- quick sanity log ---------- */
console.log({
  WelcomePage,
  AddTeachers,
  DepartmentForm,
  AddClassroom,
  AddCourses,
  AddTiming,
  GeneratePage
});   // In browser console, each value must be ƒ. If any is {}, fix that file's export.

const App = () => (
  <Router>
    <Routes>
      <Route path="/"               element={<WelcomePage />} />
      <Route path="/add-teachers"   element={<AddTeachers />} />
      <Route path="/add-department" element={<DepartmentForm />} />
      <Route path="/add-classrooms" element={<AddClassroom />} />
      <Route path="/add-courses"    element={<AddCourses />} />
      <Route path="/add-timing"     element={<AddTiming />} />
      <Route path="/generate"       element={<GeneratePage />} />

      {/* fallback 404 */}
      <Route path="*" element={<h2 style={{ padding: '2rem' }}>404 ‑ Page Not Found</h2>} />
    </Routes>
  </Router>
);

export default App;
