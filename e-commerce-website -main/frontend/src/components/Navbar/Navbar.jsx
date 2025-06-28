import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import cart_icon from '../../assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import hamburger from './../../assets/hamburger.png';
import profile_icon from './../../assets/profile_icon.png';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(StoreContext);
  const menuRef = useRef();
  const navigate = useNavigate();

  const hamburger_toggle = () => {
    menuRef.current.classList.toggle('nav-menu-visible');
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>E-Commerce Website</p>
      </div>

      <img className="nav-hamburger" onClick={hamburger_toggle} src={hamburger} alt="Menu" />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("home")}>
          <Link to="/" style={{ textDecoration: 'none' }} className={menu === "home" ? "active" : ""}>Home</Link>
        </li>
        <li onClick={() => setMenu("men")}>
          <Link to="/men" style={{ textDecoration: 'none' }} className={menu === "men" ? "active" : ""}>Men</Link>
        </li>
        <li onClick={() => setMenu("women")}>
          <Link to="/women" style={{ textDecoration: 'none' }} className={menu === "women" ? "active" : ""}>Women</Link>
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" style={{ textDecoration: 'none' }} className={menu === "kids" ? "active" : ""}>Kids</Link>
        </li>
      </ul>

      <div className="nav-login-cart">
        {!localStorage.getItem('token') ? (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/admin-register">
              <button style={{ marginLeft: '10px' }}>Register as Admin</button>
            </Link>
          </>
        ) : (
          <div className='navbar-profile'>
            <img src={profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>Orders</li>
              <hr />
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
