import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  let { id } = useParams();

  // Ma'lumotlar bazasidan ID boyicha mahsulotni izlash
  const product = {
    1: { name: "Product 1", description: "This is product 1" },
    2: { name: "Product 2", description: "This is product 2" },
    3: { name: "Product 3", description: "This is product 3" },
  }[id];

  if (!product) return <div>Mahsulot topilmadi</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
