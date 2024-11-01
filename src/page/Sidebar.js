import React, { useState } from 'react';
import '../css/SideBar.css';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBox, faTags, faListAlt, faBars } from '@fortawesome/free-solid-svg-icons'; // Import faBars

const SideBar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  return (
    <div className="sidebar">
      <h2>shopii</h2>
      <ul>
        <li>
          <NavLink to="/admin/dashboard" activeClassName="active">
            <FontAwesomeIcon icon={faHouse} />
            Bảng Điều Khiển
          </NavLink>
        </li>

        <li 
          className="menu-item" 
          onMouseEnter={() => setHoveredMenu("sanpham")} 
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <NavLink to="/admin/homeProducts" activeClassName="active">
            <FontAwesomeIcon icon={faBox} />
            Sản Phẩm - Danh Mục
          </NavLink>
          {hoveredMenu === "sanpham" && (
            <div className="submenu">
              <div className="submenu-section">
                <h3>Sản Phẩm</h3>
                <ul>
                  <li>
                    <NavLink to="/admin/homeProducts">Sản Phẩm</NavLink>
                  </li>
                </ul>
              </div>
              <div className="submenu-section">
                <h3>Danh Mục</h3>
                <ul>
                  <li>
                    <NavLink to="/admin/homeCategories">Danh mục chính</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/homeSubCategory">Danh mục phụ</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </li>

        <li 
          className="menu-item" 
          onMouseEnter={() => setHoveredMenu("tienich")} 
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <NavLink to="/admin/utilities/colors" activeClassName="active">
            <FontAwesomeIcon icon={faBars} /> {/* Use faBars icon here */}
            Tiện ích
          </NavLink>
          
          {hoveredMenu === "tienich" && (
            <div className="submenu">
              <div className="submenu-section">
                <h3>Tiện Ích</h3>
                <ul>
                  <li>
                    <NavLink to="/admin/utilities/colors">Màu Sắc</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/utilities/brands">Thương Hiệu</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
