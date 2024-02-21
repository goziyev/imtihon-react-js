import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import Loader from "../loader";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const Navigate = useNavigate();
  let { id } = useParams();
  const selectRef = useRef(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const colorRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((response) => response.json())
      .then((el) => {
        setData(el.data.attributes);
        console.log(el.data.attributes);
        setLoading(false);
        console.log(el.data.attributes);
      })
      .catch((error) => console.log("Error fetching product details:", error));
  }, [id]);

  const originalString = String(data.price);
  const modifiedString = originalString.replace(/(\d)(?=\d{2}$)/g, "$1.");

  const handleSubmit = (e) => {
    e.preventDefault();

    data.product_of_color = colorRef.current.value;
    data.number_of_product = selectRef.current.value;
    
    dispatch({ type: "Add_customer", payload: data });
    
    toast.success("Mahsulot savatchaga qo'shildi");
    setTimeout(() => {}, 2000);
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className={style.container}>
        <div className={style.links}>
          <p
            onClick={() => {
              Navigate("/");
            }}
          >
            Home /
          </p>
          <p
            onClick={() => {
              Navigate("/products");
            }}
          >
            Products
          </p>
        </div>
        <div className={style.cardWrapper}>
          {!loading && (
            <>
              <div className={style.cardImg}>
                <img src={data.image} alt="" />
              </div>
              <div className={`${style.cardTexts}`}>
                <h4 className={style.cardTitle}>{data.title}</h4>
                <p className={style.cardcomp}>{data.company}</p>
                <p className={style.cardPrice}>${modifiedString}</p>
                <p className={style.cardDesc}>{data.description}</p>
                <p className={style.cardColor}>Colors</p>
                <div style={{ display: "flex", gap: "5px" }}>
                  {data.colors.map((el, index) => {
                    return (
                      <label
                        key={index}
                        style={{
                          backgroundColor: el,
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          border:
                            selectedColor === el ? "2px solid red" : "none", 
                          cursor: "pointer", 
                        }}
                        onClick={() => setSelectedColor(el)}
                      >
                        <input
                          type="radio"
                          name="color"
                          value={el}
                          style={{ display: "none" }}
                          ref={colorRef}
                        />
                      </label>
                    );
                  })}
                </div>
                <form className={style.productForm} onSubmit={handleSubmit}>
                  <label htmlFor="select">Miqdori</label>
                  <select id="select" ref={selectRef}>
                    {[...Array(20)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <button type="submit">Savatchaga qo'shish</button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
