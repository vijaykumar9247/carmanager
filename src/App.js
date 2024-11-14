import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import EditCar from './components/EditCar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { Button } from 'react-bootstrap';

const App = () => {
  return (
    
    <AuthProvider>
   
      <BrowserRouter>
     
        
        
        <div className="min-h-screen bg-gray-50">
        <Navbar/>
          <div className="container mx-auto px-4 py-8">
           
            <Routes>
          
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/" element={<PrivateRoute element={CarList} />} />
              <Route path="/add-car" element={<PrivateRoute element={AddCar} />} />
              <Route path="/edit-car/:id" element={<PrivateRoute element={EditCar} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
