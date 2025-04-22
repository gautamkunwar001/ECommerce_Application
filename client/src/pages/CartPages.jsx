import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total * 100;
      // return total.toLocaleString("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // });
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // load razorpay
  const loadRazorpay = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      }
    });
  };

  // Checkout handler for Razorpay
  const checkOutHandler = async () => {
    try {
      const amount = totalPrice();
      const response = await axios.post("/api/v1/product/payment/process", {
        amount,
      });

      const { order_id, amount: orderAmount } = response.data;

      await loadRazorpay();

      // console.log("Order from backend:", data);

      // if (!data?.order_id || !data?.amount) {
      //   toast.error("Invalid payment response from server.");
      //   return;
      // }

      // Razorpay options for payment
      const options = {
        key: "rzp_test_9d4lqjoEN9h07d", // Add your Razorpay key here
        amount: orderAmount, // Razorpay expects the amount in paise (1 INR = 100 paise)
        currency: "INR",
        name: "DealWatcher",
        description: "Payment for products",
        image: "/your-logo.png",
        order_id: order_id, // Pass the order ID you get from your backend
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "/api/v1/product/payment/verify",
              {
                response,
                cart,
              }
            );
            // .then((res) => {
            //   console.log("Payment success", res.data);
            //   toast.success("Payment Completed Successfully!");
            //   localStorage.removeItem("cart");
            //   setCart([]);
            //   navigate("/dashboard/user/orders");
            // })
            // .catch((error) => {
            //   console.error("Payment verification failed", error);
            // });
            console.log("Payment verified:", verifyRes.data);
            toast.success("Payment Successful!");
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
          } catch (err) {
            console.error("Payment verification failed", err);
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: auth?.user?.name,
          email: auth?.user?.email,
          contact: auth?.user?.phone,
        },
        theme: {
          color: "#F37254", // Customize the color as needed
        },
      };

      // Open Razorpay payment window
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout!"
                    }`
                  : "Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: ₹{p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>

              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}

              {/* Razorpay Payment Button */}
              {cart.length > 0 && (
                <button
                  className="btn btn-primary"
                  onClick={() => checkOutHandler(totalPrice())}
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
