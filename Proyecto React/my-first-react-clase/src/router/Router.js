import { Routes, Route } from 'react-router-dom';

import Home from "../page/Home";
import About from "../page/About";
import Contact from "../page/Contact";
import Login from "../page/Login";
import Products from '../page/Products';

export default function MyRouters() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}