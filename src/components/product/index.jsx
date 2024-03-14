import { useEffect, useRef, useState } from "react";
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
  const [active, setActive] = useState(0);
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((response) => response.json())
      .then((el) => {
        setData(el.data.attributes);
        setColor(el.data.attributes.colors[0]);
        setLoading(false);
      })
      .catch((error) => console.log("Error fetching product details:", error));
  }, [id]);

  function getData() {
    let data = [];
    if (localStorage.getItem("products")) {
      data = JSON.parse(localStorage.getItem("products"));
    }
    return data;
  }

  const originalString = String(data.price);
  const modifiedString = originalString.replace(/(\d)(?=\d{2}$)/g, "$1.");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    const fur = {
      id,
      color,
      count: selectRef.current.value,
      image: data.image,
      title: data.title,
      price: data.price,
      company: data.company,
    };
    console.log(fur);
    let product = getData();
    if (product.length) {
      let exsist = product.find((el) => {
        return el.id == fur.id && el.color == fur.color;
      });
      if (exsist) {
        let copied = JSON.parse(JSON.stringify(product));
        copied.map((el) => {
          if (el.id == fur.id && el.color == fur.color) {
            el.count = Number(el.count) + Number(fur.count);
          }
          return el;
        });
        localStorage.setItem("products", JSON.stringify(copied));
        dispatch({ type: "ADD", payload: fur.count });
      } else {
        product.push(fur);
        localStorage.setItem("products", JSON.stringify(product));
        dispatch({ type: "ADD", payload: fur.count });
      }
    } else {
      product.push(fur);
      localStorage.setItem("products", JSON.stringify(product));
      dispatch({ type: "ADD", payload: fur.count });
    }
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
                      <span
                        key={index}
                        style={{
                          backgroundColor: el,
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          border: active == index ? "2px solid black" : "",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setActive(index);
                          setColor(el);
                        }}
                      ></span>
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
