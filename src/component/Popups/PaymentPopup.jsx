
import React, { useState } from "react";
import { FaIndianRupeeSign, FaRegCreditCard } from "react-icons/fa6";
import { IoMdCard } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../reusable/Button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const PaymentPopup = ({ onCancel, onClose, amount = 0 }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(""); // ✅ Track selected method

  const onConfirm = () => {

    if (paymentMethod==="Card") {
      // navigate("/products", { state: { paymentMethod, amount } }); 
            toast.success("Payment Done successfully!", {
              autoClose: 2000,
              className: 'zoom-toast',
            });
          
          setTimeout(() => {
            navigate('/products');
          }, 1600);
    
        }else{
          toast.success("Payment Done successfully!", {
            autoClose: 2000,
            className: 'zoom-toast',
          });
        
        setTimeout(() => {
          navigate('/products');
        }, 1600);
        
        }

  };

  return (
    <>
      {/* Popup Content */}
      <div
        className="fixed top-12 left-1/2 transform -translate-x-1/2 
                   bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-nunito-semibold text-[#3F8CFF]">
            Select Payment Method
          </h2>
          <button onClick={onClose} className="text-gray-600">
            <IoCloseSharp size={24} />
          </button>
        </div>

        {/* Payment Options */}
        <div className="w-full flex justify-center">
          <div className="mt-4 flex flex-col gap-2 w-full">
            {/* Card */}
            <div
              className={`flex gap-4 rounded shadow-md p-2 m-1 cursor-pointer ${
                paymentMethod === "Card" ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setPaymentMethod("Card")}
            >
              <input
                type="radio"
                name="payment"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={() => setPaymentMethod("Card")}
              />
              <p className="flex items-center gap-1">
                <span className="text-[#3F8CFF]">
                  <FaRegCreditCard />
                </span>
                Card
              </p>
            </div>

            {/* Online */}
            <div
              className={`flex gap-4 rounded shadow-md p-2 m-1 cursor-pointer ${
                paymentMethod === "Online" ? "border-2 border-green-500" : ""
              }`}
              onClick={() => setPaymentMethod("Online")}
            >
              <input
                type="radio"
                name="payment"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() => setPaymentMethod("Online")}
              />
              <p className="flex items-center gap-1">
                <IoMdCard className="text-green-400" />
                Online
              </p>
            </div>

            {/* Amount */}
            <div className="p-1 h-10 mt-1 w-full border border-gray-300 rounded-xl flex justify-center items-center font-nunito-semibold">
              <FaIndianRupeeSign size={18} />
              {amount}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex gap-3 justify-end">
          <Button
            propClass="py-2 px-2 w-[120px] bg-white border border-black flex justify-center"
            text="Cancel"
            onClick={onClose}
          />
          <Button
            disabled={!paymentMethod}
            variant="primary"
            propClass="py-2 px-2 text-center"
            text="Pay Amount"
            onClick={onConfirm}
          />
        </div>
      </div>

    </>
  );
};

export default PaymentPopup;
