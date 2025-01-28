import { createRoot } from 'react-dom/client'

import './index.css';
import React from 'react';

import Profile from './pages/Profile.jsx';
import SignInForm from './components/SignInForm';
import Navbar from './components/Navbar';
import SavedApplications from './pages/Savedapplications.jsx';
import { Route, Routes ,BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Applications from './pages/Applications.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
  
   <Route path="/profile" element={<Profile />} />
   <Route path="/applications" element={<Applications />} />
   <Route path="/saved-applications" element={<SavedApplications />} />
   {/* You can add other routes here */}

      
    </Routes>
  </BrowserRouter>
)
