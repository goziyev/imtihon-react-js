import React from "react";
import { Link, useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Product 1", description: "This is product 1" },
  { id: 2, name: "Product 2", description: "This is product 2" },
  { id: 3, name: "Product 3", description: "This is product 3" },
];

const ProductList = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <h2>Mahsulotlar ro'yxati</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            onClick={() => {
              Navigate(`/products/${product.id}`);
            }}
          >
            <p>{product.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
