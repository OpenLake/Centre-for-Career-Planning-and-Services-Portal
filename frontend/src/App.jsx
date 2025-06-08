import React from 'react';
import './index.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Referrals from './pages/Referrals';
import ResumeBuilder from './pages/ResumeBuilder';
import ResetPasswordPage from './pages/ResetPasswordPage';

import {Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext';
import ForgotPassword from './components/ForgotPassword';
import VerifyEmail from './components/VerifyEmail';
import DiscussionForum from './pages/DiscussionForum';
import AddThread from './components/AddThread';
import Profile from './pages/Profile';

function App() {
  const { authUser } = useAuthContext();
  const {showForgotPassword, showVerifyEmail, showAddThread} = useAppContext();
  return (
    <>

      {showForgotPassword && <ForgotPassword />}
      {showVerifyEmail && <VerifyEmail />}
      {showAddThread && <AddThread />}
      
      
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/login' />} />
        <Route path='/discussion-forum' element={authUser ? <DiscussionForum /> : <Navigate to='/login' />} />
        <Route path='/dashboard' element={authUser ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login/>}/>
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup/>}/>
        <Route path='/analytics' element={<AnalyticsDashboard/>}/>
        <Route path='/referrals' element={<Referrals/>}/>
        <Route path='/resumebuilder' element={<ResumeBuilder/>} />
        {!authUser && <Route path='/reset-password/:resetToken' element={<ResetPasswordPage />} />}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
