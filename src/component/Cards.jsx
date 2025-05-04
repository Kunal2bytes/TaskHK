import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Cards = ({wishList, data, cart,handleAddToCart,handleClick }) => {
 const dispatch=useDispatch();
 console.log(data)
 const isSave=wishList.includes(data.orderId);

  if (!data) return null;
  return (
    <div className="m-2 w-[300px] rounded-2xl cursor-pointer  hover:shadow-2xl shadow-gray-400  relative flex flex-col  justify-between p-2">
      <div className="flex justify-center items-center">
        <img
          src={data.image}
          alt={data.name}
          className="w-[200px] h-[180px] object-contain"
        />
      </div>

      <div className="text-center">
        <p className="font-bold">{data.productName}</p>
        <p className="text-green-600">{data.sellingPrice} ₹</p>
      </div>

      <button
        onClick={() => handleAddToCart(data.orderId, data)} // Pass the item ID to the parent
        className="bg-amber-300 p-2 cursor-pointer w-full mt-1"
      >
        <span className="text-white">
        {cart ? "Remove from Cart" : "Add to Cart"}
          </span>
      </button>

      <div onClick={() => handleClick(data.orderId)} className=" cursor-pointer absolute">
        {/* <FaHeart size={16} className="text-red-500"  /> */}
        {isSave ? (
          <FaHeart size={16} className="text-red-500" />
        ) : (
          <CiHeart size={20} />
        )}
      </div>
    </div>
  );
};

export default Cards;
