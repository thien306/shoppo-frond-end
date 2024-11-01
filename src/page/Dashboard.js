import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../css/Dashboard.css';
import getAllHomeCategories from '../service/CategoriesService';  
import { getAllTotalHomeProducts } from '../service/ProductService'; 
import getAllHomeSubCategory from "../service/SubCategoryService";
import  getallColor  from '..//service/ColorService'
import getallBrand from '../service/BrandService';

const Dashboard = () => {
  const [categories, setCategories] = useState(0);  
  const [subCategories, setSubCategories] = useState(0);  
  const [products, setProducts] = useState(0); 
  const [color, setColor] =  useState(0);
  const [brand, setBrand] =  useState(0);
  const navigate = useNavigate(); 

  const fetchDashboardData = async () => {
    try {
      const categoriesResponse = await getAllHomeCategories();  
      const subCategoriesResponse = await getAllHomeSubCategory();  
      const productsResponse = await getAllTotalHomeProducts();  
      const colorResponse = await getallColor();
      const brandResponse = await getallBrand();

      setCategories(categoriesResponse.length);
      setSubCategories(subCategoriesResponse.length);
      setProducts(productsResponse);
      setColor(colorResponse.length);
      setBrand(brandResponse.length);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData(); 
  }, []);

  return (
    <div className="dashboard">
      <h1>Bảng Điều Khiển</h1>

      <div className="card-container">
        <div className="card card-blue" onClick={() => navigate('/admin/homeCategories')}>
          <div className="card-header">
            <i className="fa fa-tags"></i>
            <span>{categories}</span> 
          </div>
          <div className="card-body">
            Danh mục
          </div>
        </div>

        <div className="card card-green" onClick={() => navigate('/admin/homeSubCategory')}>
          <div className="card-header">
            <i className="fa fa-list-alt"></i>
            <span>{subCategories}</span> 
          </div>
          <div className="card-body">
            Danh mục phụ
          </div>
        </div>

        <div className="card card-yellow" onClick={() => navigate('/admin/homeProducts')}>
          <div className="card-header">
            <i className="fa fa-box"></i>
            <span>{products}</span>  
          </div>
          <div className="card-body">
            Sản phẩm
          </div>
        </div>

        <div className="card card-cyan" onClick={() => navigate('/admin/utilities/colors')}>
          <div className="card-header">
            <i className="fa fa-box"></i>
            <span>{color}</span>  
          </div>
          <div className="card-body">
            Màu Sắc
          </div>
        </div>

        <div className="card card-purple" onClick={() => navigate('/admin/utilities/brans')}>
          <div className="card-header">
            <i className="fa fa-box"></i>
            <span>{brand}</span>  
          </div>
          <div className="card-body">
            Màu Sắc
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
