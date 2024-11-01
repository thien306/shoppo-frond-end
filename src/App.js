import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '..//src//page/Sidebar';
import Navbar from '..//src//page/Navbar';
import HomeProduct from "../src/component/admin/product/HomeProduct"
import HomeCategories from "../src/component/admin/categories/HomeCategories"
import HomeSubCategory from './component/admin/subCategory/HomeSubCategory';
import Dashboard from "../src/page/Dashboard"
import HomeColors from './component/utilities/HomeColors';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from './component/admin/product/ProductDetail';
import HomeBrands from '../src/component/utilities/HomeBrands'

const App = () => {
  return (
    <Router>
      <div className="app">
      <ToastContainer />

        <Sidebar />
        <div className="content">
          <Navbar />
          <Routes>

            <Route path="" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="" element={<HomeProduct />} />
            <Route path="/admin/homeProducts" element={<HomeProduct />} />

            <Route path="" element={<ProductDetail />} />
            <Route path="/admin/productDetail" element={<ProductDetail />} />

            <Route path="" element={<HomeCategories />} />
            <Route path="/admin/homeCategories" element={<HomeCategories />} />

            <Route path="" element={<HomeSubCategory />} />
            <Route path="/admin/homeSubCategory" element={<HomeSubCategory />} />

            <Route path="" element={<HomeColors />} />
            <Route path="/admin/utilities/colors" element={<HomeColors />} />

            <Route path="" element={<HomeBrands />} />
            <Route path="/admin/utilities/brands" element={<HomeBrands />} />
          </Routes>

        </div>
      </div>
    </Router>
  );
};

export default App;
