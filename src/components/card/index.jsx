import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function Card() {
  const dispatch = useDispatch();
  let total = 0;
  const [products, setProducts] = useState([]);
  function getData() {
    let data = [];
    if (localStorage.getItem("products")) {
      data = JSON.parse(localStorage.getItem("products"));
    }
    return data;
  }
  useEffect(() => {
    let data = getData();
    data.forEach((el) => {
      total = total + Number(el.price * el.number_of_product);
    });
    setProducts(data);
  }, []);

  function handleDelete(elId) {
    let a = confirm("Rostdan ham o'chirmoqchimisiz ? ");
    let data = getData();
    if (a) {
      data = data.filter((el) => {
        el.id != elId;
      });
      localStorage.setItem("products", JSON.stringify(data));
      setProducts(data);
    } else {
      let a = confirm("Balki o'ylab ko'rarsiz o'chirishni istaysizmi ? ");
      if (a) {
        localStorage.setItem("products", JSON.stringify(data));
        setProducts(data);
      } else {
        alert(
          "ha mayli o'chirmay qo'yaveramiz lekin o'ylab ko'rarsiz siz bekorga bosmadingiz tugmani bu balki hayotingizni o'zgartirib yuborar"
        );
      }
    }
  }
  return (
    <section
      className="align-element py-20 mt-14 ml-auto mr-auto"
      style={{ maxWidth: "1152px", padding: "0px 32px" }}
    >
      {products.length == 0 ? (
        <div className="border-b border-base-300 pb-5">
          <h2 className="text-3xl font-medium tracking-wider capitalize">
            Your cart is empty
          </h2>
        </div>
      ) : (
        <>
          <div className="border-b border-base-300 pb-5">
            <h2 className="text-3xl font-medium tracking-wider capitalize">
              Shopping Cart
            </h2>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {products.map((el, index) => {
                return (
                  <article
                    key={index}
                    className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
                  >
                    <img
                      src={el.image}
                      alt="avant-garde lamp"
                      className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
                    />
                    <div className="sm:ml-16 sm:w-48">
                      <h3 className="capitalize font-medium">{el.title}</h3>
                      <h4 className="mt-2 capitalize text-sm text-neutral-content">
                        {el.company}
                      </h4>
                      <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                        color :
                        <span
                          className="badge badge-sm"
                          style={{
                            backgroundColor: `${el.color}`,
                          }}
                        ></span>
                      </p>
                    </div>
                    <div className="sm:ml-12">
                      <div className="form-control max-w-xs">
                        <label htmlFor="amount" className="label p-0">
                          <span className="label-text">Amount</span>
                        </label>
                        <select
                          defaultValue={el.count}
                          name="amount"
                          id="amount"
                          className="mt-2 select select-base select-bordered select-xs"
                        >
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
                        </select>
                      </div>
                      <button
                        onClick={() => {
                          handleDelete(el.id);
                        }}
                        className="mt-2 btn btn-primary text-sm"
                      >
                        remove
                      </button>
                    </div>
                    <p className="font-medium sm:ml-auto">
                      ${((parseFloat(el.price) * 1) / 100).toFixed(2)}
                    </p>
                  </article>
                );
              })}
            </div>
            <div className="lg:col-span-4 lg:pl-4">
              <div className="card bg-base-200">
                <div className="card-body">
                  <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                    <span>Subtotal</span>
                    <span className="font-medium">$179.99</span>
                  </p>
                  <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                    <span>Shipping</span>
                    <span className="font-medium">$5.00</span>
                  </p>
                  <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                    <span>Tax</span>
                    <span className="font-medium">$18.00</span>
                  </p>
                  <p className="flex justify-between text-sm mt-4 pb-2">
                    <span>Order Total</span>
                    <span className="font-medium">
                      ${((parseFloat(total) * 1) / 100).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
              <a href="/login" className="btn btn-primary btn-block mt-8">
                please login
              </a>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Card;
