import React from "react";
import './Breadcrumbs.css';
import arrow_icon from './../../assets/breadcrum_arrow.png';

const Breadcrumb = ({ product }) => {
    return (
        <div className="breadcrumb">
            Home <img src={arrow_icon} alt="" /> Shop <img src={arrow_icon} alt="" /> {product?.category || "Unknown"} <img src={arrow_icon} alt="" /> {product?.name || "Loading..."}
        </div>
    );
};

export default Breadcrumb;
