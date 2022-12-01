import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Components/home';
import Register from './Components/register';
import Login from './Components/login';
import CategoryPage from './Components/category_page';
import SelectLocationCategory from './Components/selectLocationCategory';
import Dashboard from './Components/dashboard'
import AdDescription from './Components/ad_description';
import VerifyEmail from './Components/verify_email';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ads/:location/:category" element={<CategoryPage />} />
      <Route path="/post/new" element={<SelectLocationCategory />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/details/:adToken" element={<AdDescription />} />
      <Route path="/verifyemail/:verifyToken" element={<VerifyEmail />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
