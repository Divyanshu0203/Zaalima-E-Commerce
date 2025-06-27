import React, { useState, useEffect } from "react";
import './ListProduct.css';
import bin from './../../assets/recycle-bin.png';
import { toast } from "react-toastify";

const ListProduct = () => {
  const backend_url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const response = await fetch(`${backend_url}/api/products`);
    const json = await response.json();
    if (response.ok) {
      setAllProducts(json);
    } else {
      toast.error(json.error || "Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProduct = async (id) => {
    const response = await fetch(`${backend_url}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error || "Failed to delete product.");
    } else {
      await fetchInfo();
      toast.success("Product removed");
    }
  };

  return (
    <div className="list-product">
      <h1>All Products</h1>
      <div className="listproduct-format-main">
        <p>Image</p>
        <p>Title</p>
        <p>Price</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => (
          <React.Fragment key={product._id}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="product" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.new_price}</p>
              <img
                onClick={() => removeProduct(product._id)}
                src={bin}
                alt="remove"
                className="listproduct-remove-icon"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
