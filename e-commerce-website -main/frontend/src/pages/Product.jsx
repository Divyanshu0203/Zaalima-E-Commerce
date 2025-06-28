import React, { useContext } from "react";
import { StoreContext } from '../context/StoreContext';
import { useParams } from 'react-router-dom';
import Breadcrumb from "./../components/Breadcrumbs/Breadcrumbs";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";

const Product = () => {
    const { all_product } = useContext(StoreContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === Number(productId));

    // 💡 Avoid rendering if product is not found
    if (!product) {
        return <div style={{ padding: "2rem", fontSize: "1.2rem" }}>Loading product...</div>;
    }

    return (
        <div>
            <Breadcrumb product={product} />
            <ProductDisplay product={product} />
        </div>
    );
};

export default Product;
