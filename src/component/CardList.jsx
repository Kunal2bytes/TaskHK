// import { useSelector } from "react-redux";
// import Header from "./header";
// import { selectCartData } from "../Store/reducer/cardreducer";
// import ChooseForm from "./customer/ChooseForm";
// import Button from "./reusable/Button";
// import { useEffect, useState } from "react";
// import Popup from "./reusable/Popup";
// import PaymentPopup from "./Popups/PaymentPopup";
// import { useLocation } from "react-router";

// const CardList = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   // const totalPrice = location.state?.totalPrice;
//   // console.log(totalPrice)
//   const cardlist = useSelector(selectCartData);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // if (!cardlist || cardlist.length === 0) return <p>No items in cart</p>;
//   useEffect(() => {
//     const storedPrice = localStorage.getItem("cartTotalPrice");
//     if (storedPrice) {
//       setTotalPrice(storedPrice);
//     }
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="flex  w-[100%]">
//         <div className="flex flex-wrap gap-4 mt-14 p-4">
//           {!cardlist || cardlist.length === 0 ? (
//             <div></div>
//           ) : (
//             cardlist.map((item) => (
//               <div className="flex w-[100%]  justify-between">
//                 <div
//                   key={item.id}
//                   className="m-2 w-[100%] h-[300px] relative flex flex-col 
//             justify-between   cursor-pointer 
//             bg-white p-4 rounded-lg shadow-md text-gray-700 text-sm leading-relaxed
            
//             hover:shadow-2xl shadow-gray-400 "
//                 >
//                   <div className="flex justify-center  items-center">
//                     <img
//                       src={item.image}
//                       alt={item.productName}
//                       className="w-[35vw] rounded-2xl   h-[180px] object-contain"
//                     />
//                   </div>

//                   <div className="text-center flex justify-between">
//                     <p className="font-bold text-3xl">{item.productName}</p>
//                     <p className="text-green-600 text-lg">
//                       {item.sellingPrice} ₹
//                     </p>
//                   </div>
//                 </div>

//                 <div className=" bg-white p-4  text-gray-700 text-lg font-extralight ">
//                   {item.description}
//                   {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae doloribus tempore optio possimus earum sapiente deserunt voluptatibus placeat ullam eos laboriosam corporis mollitia autem dolor aspernatur molestias, aut culpa iste!</p> */}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         <div>
//           <p></p>
//         </div>
//       </div>

// {!cardlist || cardlist.length === 0 ?(<div>

// </div>):<div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto mt-4">
//         <p className="text-lg font-semibold text-gray-800">
//           Total: ₹{totalPrice}
//         </p>
//         <Button
//           text={"Pay"}
//           onClick={() => setIsOpen(true)}
//           variant={"primary"}
//           propClass={
//             "bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-md transition duration-300"
//           }
//         />
//       </div>
        
// }

//       <Popup isOpen={isOpen} propsClass={""} onClose={() => setIsOpen(false)}>
//         <PaymentPopup amount={totalPrice} onClose={() => setIsOpen(false)} />
//         {/* <SettingsPopup onClose={() => setShowSetting(false)} /> */}
//       </Popup>
//       {/* <ChooseForm/> */}
//     </>
//   );
// };

// export default CardList;
import { useSelector } from "react-redux";
import Header from "./header";
import { selectCartData } from "../Store/reducer/cardreducer";
import Button from "./reusable/Button";
import { useEffect, useState } from "react";
import Popup from "./reusable/Popup";
import PaymentPopup from "./Popups/PaymentPopup";
import { MdShoppingCart } from "react-icons/md";
import { ToastContainer } from "react-toastify";

const CardList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cardlist = useSelector(selectCartData);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedPrice = localStorage.getItem("cartTotalPrice");
    if (storedPrice) {
      setTotalPrice(parseFloat(storedPrice)); // ensure it's a number
    }
  }, []);

  return (
    <>
      <Header />

      <div className="flex flex-col items-center mt-16 p-4 w-full">
        {(!cardlist || cardlist.length === 0) ? (
          <div className="text-center flex items-center text-2xl text-gray-600 font-semibold mt-20">
          <MdShoppingCart size={30} className="mr-2" />
          Your cart is empty.
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-4 justify-center w-full">
              {cardlist.map((item) => (
                <div
                  key={item.id}
                  className="flex w-[90%] justify-between bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <div className="w-[50%]">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-[180px] object-contain rounded-lg"
                    />
                  </div>
                  <div className="w-[50%] pl-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xl font-bold">{item.productName}</p>
                      <p className="text-green-600 text-lg">{item.sellingPrice} ₹</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total and Pay Button */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
              <p className="text-lg font-semibold text-gray-800">
                Total: ₹{totalPrice}
              </p>
              <Button
                text={"Pay"}
                onClick={() => setIsOpen(true)}
                variant={"primary"}
                propClass={
                  "bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-md transition duration-300"
                }
              />
            </div>
          </>
        )}
      </div>
      <ToastContainer /> 
      <Popup isOpen={isOpen} propsClass={""} onClose={() => setIsOpen(false)}>
        <PaymentPopup amount={totalPrice} onClose={() => setIsOpen(false)} />
      </Popup>
    </>
  );
};

export default CardList;
