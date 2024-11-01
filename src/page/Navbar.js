import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//css/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-nav ml-auto">
        <a className="nav-item nav-link" href="/users">đăng xuất</a>
        <a className="nav-item nav-link" href="/settings">cài đặt</a>
      </div>
    </nav>
  );
};

export default NavBar;
