import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import EditBlogs from './components/EditBlogs';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />} />
          <Route path='/edit/:id' element={<EditBlogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
