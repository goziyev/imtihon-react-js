import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";

function Home() {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products?featured=true")
      .then((res) => res.json())
      .then((el) => {
        setLoading(false);
        setData(el.data);
      });
  }, []);

  const styles = {
    justifyContent: "space-between",
    maxWidth: "1152px",
    padding: "0px 32px",
  };
  const imgstyle = {
    height: "416px",
    width: "320px",
    objectFit: "cover",
  };
  return (
    <>
      {" "}
      {loading && <Loader loading={loading} />}
      <div
        className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-5 px-4"
        style={styles}
      >
        <div className="md:w-1/2">
          <h3 className="mt-16 text-5xl text-gray-600 font-bold w-5/6 mb-5">
            We are changing the way people shop
          </h3>
          <p className="text-xl w-4/6 mb-8 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <button className="btn btn-primary">OUR PRODUCTS </button>
        </div>
        <div className="md:w-1/2">
          <div className="carousel carousel-center max-w-full md:max-w-4xl p-4 space-x-4 bg-neutral rounded-box mt-16">
            <div className="carousel-item">
              <img
                style={imgstyle}
                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp"
                className="rounded-box w-full"
                alt="carousel-img"
              />
            </div>
            <div className="carousel-item">
              <img
                style={imgstyle}
                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp"
                className="rounded-box w-full"
                alt="carousel-img"
              />
            </div>
            <div className="carousel-item">
              <img
                style={imgstyle}
                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp"
                className="rounded-box w-full"
                alt="carousel-img"
              />
            </div>
            <div className="carousel-item">
              <img
                style={imgstyle}
                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp"
                className="rounded-box w-full"
                alt="carousel-img"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <h2 className={style.text}>Featured Products</h2>
        <div className={style.cardWrapper}>
          {data &&
            data.map((el, index) => {
              return (
                <div
                  onClick={() => {
                    Navigate(`/products/${el.id}`);
                  }}
                  key={index}
                  className={style.card}
                >
                  <div className={style.cardImg}>
                    <img src={el.attributes.image} />
                  </div>
                  <div className={style.cardText}>
                    <h4>{el.attributes.title}</h4>
                    <h5>${el.attributes.price}</h5>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
