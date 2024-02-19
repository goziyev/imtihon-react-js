import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import style from "./index.module.css";
import Loader from "../loader";

const ProductDetails = () => {
  const Navigate = useNavigate();
  let { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
                      <span
                        key={index}
                        className={style.colors}
                        style={{ background: `${el}` }}
                      ></span>
                    );
                  })}
                </div>
                <form className={style.productForm}>
                  <label htmlFor="select">Amount</label>
                  <select id="select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                  </select>
                  <button onClick={(e) => e.preventDefault()}>
                    ADD TO BAG
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
