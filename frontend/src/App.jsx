import React from 'react';
import Footer from './components/Footer';
import './index.css'; // Ensure Tailwind CSS is imported
import SignInForm from './components/SignInForm';
import Navbar from './components/Navbar';
import SavedApplications from './pages/Savedapplications';
import { Route, Routes ,BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Applications from './pages/Applications';

function App() {
  return (
    
    
    <div>
    <Routes>
   
      <Route path="/applications" element={<Applications />} />
      <Route path="/saved-applications" element={<SavedApplications />} />
      {/* You can add other routes here */}
    </Routes>
  </div>
 
  );
}

export default App;
