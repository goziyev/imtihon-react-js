import  { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import Loader from "../loader";
import { useTranslation } from "react-i18next";

const ProductList = () => {
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [replace, setReplace] = useState(true);
  const [cardPrice, setCardPrice] = useState(1000);

  const searchRef = useRef();
  const categoryRef = useRef();
  const companyRef = useRef();
  const sortByRef = useRef();
  const priceRef = useRef();

  useEffect(() => {}, [data]);

  useEffect(() => {
    fetchProducts();
    let lang = localStorage.getItem("lang");
    i18n.changeLanguage(lang);
  }, []);
  const fetchProducts = () => {
    setLoading(true);
    const apiUrl = `https://strapi-store-server.onrender.com/api/products`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((el) => {
        setLoading(false);
        setData(el.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  function FormReset() {
    searchRef.current.value = "";
    categoryRef.current.value = "all";
    companyRef.current.value = "all";
    priceRef.current.value = "100000";
  }

  const FilterSearch = async () => {
    try {
      const URL = `https://strapi-store-server.onrender.com/api/products?search=${searchRef.current.value}&category=${categoryRef.current.value}&company=${companyRef.current.value}&order=a-z&price=${priceRef.current.value}`;
      const response = await fetch(URL);
      const element = await response.json();
      setData(element.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className={style.container}>
        <form
          className={`bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center ${style.formWrapper}`}
        >
          <div className={style.div}>
            <label htmlFor="productName">{t("productSearch")}</label>
            <input type="text" ref={searchRef} />
          </div>
          <div className={style.div}>
            <label htmlFor="productName">{t("productCategory")}</label>
            <select ref={categoryRef}>
              <option value="all">All</option>
              <option value="Tables">Table</option>
              <option value="Chairs">Chairs</option>
              <option value="Kids">Kids</option>
              <option value="Sofas">Sofas</option>
              <option value="Beds">Beds</option>
            </select>
          </div>
          <div className={style.div}>
            <label htmlFor="productName">{t("productCompany")}</label>
            <select ref={companyRef}>
              <option value="all">All</option>
              <option value="Modenza">Modenza</option>
              <option value="Luxora">Luxora</option>
              <option value="Artifex">Artifex</option>
              <option value="Comfora">Comfora</option>
              <option value="Homestead">Homestead</option>
            </select>
          </div>
          <div className={style.div}>
            <label htmlFor="productName">{t("productSort")}</label>
            <select ref={sortByRef}>
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
            </select>
          </div>

          <div className={style.product}>
            <div className={style.priceTop}>
              <label>select price</label>
              <label>${cardPrice}</label>
            </div>
            <input
              min="1000"
              max="100000"
              ref={priceRef}
              onChange={(e) => {
                setCardPrice(e.target.value);
              }}
              type="range"
              value={cardPrice}
              className="range range-info range-sm w-64 "
            />
            <div className={style.priceBottom}>
              <label>
                <b>0</b>
              </label>
              <label>
                <b>$1,000,00</b>
              </label>
            </div>
          </div>
          <div
            className="form-control"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <label className="label cursor-pointer" htmlFor="chexboxInput">
              {t("productShop")}
            </label>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              id="chexboxInput"
            />
          </div>
          <div className={style.buttons}>
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                setLoading(true);
                e.preventDefault();
                FilterSearch();
              }}
            >
              {t("search")}
            </button>
            <button
              className="btn btn-accent btn-sm"
              onClick={(e) => {
                setLoading(true);
                e.preventDefault();
                FormReset();
                fetchProducts();
              }}
            >
              {t("reset")}
            </button>
          </div>
        </form>
        <div className={style.replaceWrapper}>
          <p>
            {data.length} {t("products")}
          </p>
          <div className={style.replaceButtons}>
            <button
              onClick={() => {
                setReplace(true);
              }}
              type="button"
              className={
                replace
                  ? "text-xl btn btn-circle btn-sm btn-primary text-primary-content"
                  : "text-xl btn btn-circle btn-sm btn-ghost text-based-content"
              }
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
              </svg>
            </button>
            <button
              onClick={() => {
                setReplace(false);
              }}
              type="button"
              className={
                !replace
                  ? "text-xl btn btn-circle btn-sm btn-primary text-primary-content"
                  : "text-xl btn btn-circle btn-sm btn-ghost text-based-content"
              }
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {data.length == 0 && (
          <h2 className="mt-5 font-bold">{t("noProduct")}</h2>
        )}

        {replace ? (
          <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                    <div className="card-body items-center text-center">
                      <h4 className="card-title capitalize tracking-wider">
                        {el.attributes.title}
                      </h4>
                      <h5>${el.attributes.price}</h5>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className={style.cardsWrapper}>
            {data &&
              data.map((el, index) => {
                return (
                  <div
                    onClick={() => {
                      Navigate(`/products/${el.id}`);
                    }}
                    key={index}
                    className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
                  >
                    <div>
                      <img
                        src={el.attributes.image}
                        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="ml-0 sm:ml-16">
                      <h4 className="capitalize font-medium text-lg">
                        {el.attributes.title}
                      </h4>
                      <h5 className="capitalize text-md text-neutral-content">
                        {el.attributes.company}
                      </h5>
                    </div>
                    <p className="font-medium ml-0 sm:ml-auto text-lg">
                      ${el.attributes.price}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
        {data.length > 0 && (
          <div className="flex justify-end">
            <div className="join">
              <button className="btn btn-xs sm:btn-md border-none join-item bg-base-300 border-base-300 ">
                1
              </button>
              <button className="btn btn-xs sm:btn-md border-none join-item ">
                2
              </button>
              <button className="btn btn-xs sm:btn-md border-none join-item ">
                3
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
