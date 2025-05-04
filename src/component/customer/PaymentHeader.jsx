import { CiSearch } from "react-icons/ci";
// import { selectCartData, selectWishlist } from "../Store/reducer/cardreducer";
// import { useSelector } from "react-redux";
import { Link } from "react-router";

const PaymentHeader = () => {
//   const card = useSelector(selectCartData);
//   const wishList = useSelector(selectWishlist);
//   console.log(card);
//   console.log(wishList);

  return (
    <>
      <div className="flex justify-between items-center  w-[100%] fixed top-0 left-0 bg-white z-50 p-2 shadow-md">
        <div className="flex justify-between items-center  w-[100%] ">
          <div className="w-[10%]">
            <div className="ml-3">
              <img src="images/logo.png" alt="logo" />
            </div>
          </div>
          <div className="w-[60%] flex  ">
            {/* <div className="h-[40px]  w-[80%] flex justify-center items-center">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="p-1.5 rounded-l-lg w-[80%] border "
              />
              <span className="bg-yellow-300 rounded-r-lg ">
                <CiSearch className="m-1" size={30} />
              </span>
            </div> */}

          </div>
          <div className=" mr-2 flex  justify-between   ">
            

            <div className="relative">
              <Link to='/'>Home</Link>
              {/* <span className="absolute top-[-8px] right-[-18px] bg-red-400 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {card.length}
              </span> */}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentHeader;
