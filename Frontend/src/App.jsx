import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home'
import PeonHome from './Peon-Desktop/PeonHome';
import AdminHome from './Admin-Desktop/AdminHome';
import PhotoClick from './photoclick/PhotoClick';
import TaskList from './components/tasklist/TaskList';
import UserData from './pages/personalData/UserData';
import PeonData from './Peon-Desktop/peon-navbar/PeonData';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './context/ProtectedRoute';
import { useAuthContext } from './context/Authcontext';





function App() {
  const { authUser } = useAuthContext();

  console.log("Current User:", authUser); // Debug: Check user data on every render

  return (
    <>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roleRequired="admin">
                <AdminHome />
              </ProtectedRoute>
            }
          />

          {/* Peon Routes */}
          <Route
            path="/peonhome"
            element={
              <ProtectedRoute roleRequired="peon">
                <PeonHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/peondata"
            element={
              <ProtectedRoute roleRequired="peon">
                <PeonData />
              </ProtectedRoute>
            }
          />

          {/* General User Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute roleRequired="user">
                <Home/>
              </ProtectedRoute>
            }
          />
          <Route path="/photoclick" element={<PhotoClick />} />
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/userdata" element={<UserData />} />

          {/* Authentication Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Default Route Based on Role */}
          <Route
  path="/"
  element={
    authUser ? (
      authUser.role === "admin" ? (
        <Navigate to="/admin" />
      ) : authUser.role === "peon" ? (
        <Navigate to="/peonhome" />
      ) : (
        <Navigate to="/home" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>

        </Routes>
      </Router>
      <Toaster />
    </>
  );
}


export default App