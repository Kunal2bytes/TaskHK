import { useEffect, useState } from "react";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { selectCartData, selectTaxdata } from "../Store/reducer/cardreducer";
import Header from "./header";
import { useNavigate } from "react-router";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the styles
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import styles
import Spinner from "./Popups/Indicator";
// import { Spinner } from "reactstrap";

const Section = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishList, setWishlist] = useState([]);
  const [save, setSave] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardAdd, setCardAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [showMsg,setShowMsg]=useState("");
  const [showMsg, setShowMsg] = useState(""); // Corrected state name for message

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [filteredRows, setFilteredRows] = useState([]);
  const product = useSelector(selectTaxdata);
  console.log(product);
  // const goToCheckout = () => {
  //   navigate("/cardlist", { state: { totalPrice } });
  // }
  const GetProduct = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setData(data);
      dispatch({ type: "GET_CARD", payload: data });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const filteredData = filteredRows.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    GetProduct();
  }, []);
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + parseFloat(item.sellingPrice || 0),
      0
    );
    setTotalPrice(total);
    console.log(cart);

    localStorage.setItem("cartTotalPrice", total); // store it
  }, [cart]);

  const handleAddToCart = (itemId, data) => {
    const isInCart = cart.some((item) => item.orderId === data.orderId);
    let updatedCart;
    setCardAdd(isInCart);
    if (isInCart) {
      updatedCart = cart.filter((item) => item.orderId !== data.orderId); // Remove item
    } else {
      updatedCart = [...cart, data]; // Add full product
    }

    setCart(updatedCart);

    dispatch({
      type: "GET_CARD_COUNT",
      payload: updatedCart,
    });
  };
  const role = localStorage.getItem("role"); // Get the role from localStorage

  useEffect(() => {
    const role = localStorage.getItem("role"); // Get the role from localStorage
    if (role === "admin") {
      setShowMsg("Admin login Successfully");
    } else if (role === "user") {
      setShowMsg("User login Successfully");
    } else {
      setShowMsg("No valid role found.");
    }
  }, []);

  const handleClick = (item) => {
    setSave(!save);
    let updatedCart;
    if (wishList.includes(item)) {
      updatedCart = wishList.filter((id) => id !== item); // Remove item
    } else {
      updatedCart = [...wishList, item]; // Add item
    }
    setWishlist(updatedCart); // Update cart
    dispatch({
      type: "GET_WISHLIST_COUNT",
      payload: updatedCart,
    });
  };

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("paymentFormData"));
    if (Array.isArray(storedArray)) {
      setFilteredRows(storedArray);
    }
  }, []);

  return (
    <>
      <Header setSearch={setSearch} totalPrice={totalPrice} />
      <div className="w-[100%] mt-20 mb-5  flex text-2xl font-bold  justify-start">
        <p className="ml-2">Special Product for you</p>
      </div>
      <div className="w-[100%] mt-3 mb-5 flex flex-wrap justify-center">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Cards
              key={item.orderId}
              data={item}
              cart={cart.some((cartItem) => cartItem.orderId === item.orderId)}
              handleAddToCart={handleAddToCart}
              handleClick={handleClick}
              wishList={wishList}
            />
          ))
        ) : (
          <p className="text-xl text-blue-500 font-medium mt-10">
            Loading products...
            <Spinner />
          </p>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Section;
