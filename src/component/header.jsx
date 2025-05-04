import { CiSearch } from "react-icons/ci";
import { selectCartData, selectWishlist } from "../Store/reducer/cardreducer";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { MdAddBox } from "react-icons/md";
import { useState } from "react";
import Popup from "./reusable/Popup";
import LogOut from "./Popups/LogoutPopup";
import { IoReorderThreeSharp } from "react-icons/io5";
import SideBar from "./reusable/SideBar";

const Header = ({ setSearch, totalPrice }) => {
  const card = useSelector(selectCartData);
  const wishList = useSelector(selectWishlist);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [sideBar,setSideBar]=useState(false);
  console.log(card);
  console.log(wishList);
  const handleAddNew = () => {
    navigate("/add-new-item");
  };
  const handleLogout = () => {
    setShowPopup(true);
  };
  const handleSlideBar=()=>{
setSideBar(true);
  }
  return (
    <>
      <div className="flex justify-between items-center  w-[100%] fixed top-0 left-0 bg-white z-50 p-2 shadow-md">
        <div className="flex justify-between items-center  w-[100%] ">
          <div className=" w-[30%] md:w-[10%]">
            <div className="ml-3">
              <img src="images/logo.png" alt="logo" />
            </div>
          </div>
          <div className="w-[60%] flex  ">
            <div className="h-[40px] w-[100%]  mg:w-[80%] flex justify-center items-center">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="p-1.5 rounded-l-lg w-[80%] border "
              />
              <span className="bg-yellow-300 rounded-r-lg ">
                <CiSearch className="m-1" size={30} />
              </span>
            </div>
          </div>
          <div className="md:hidden">
          <IoReorderThreeSharp size={30} onClick={handleSlideBar} className="text-[#3F8CFF] font-bold cursor-pointer" />

          </div>
          <div className="mr-4  hidden  md:flex  justify-between  w-[27%] ">
            <div
              className=" flex items-center cursor-pointer "
              onClick={handleAddNew}
            >
              <MdAddBox size={20} className="text-[#3F8CFF] mr-1" />

              <span className="hidden xl:block">Add New Product</span>
            </div>

            <div className="relative">
              Wishlist
              <span className="absolute top-[-8px] right-[-18px] bg-red-400 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {wishList.length}
              </span>
            </div>

            <div className="relative">
              <Link to="/cardlist">Card</Link>
              <span className="absolute top-[-8px] right-[-18px] bg-red-400 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {card.length}
              </span>
            </div>

            <div className="cursor-pointer" onClick={handleLogout}>
              Logout
              {/* <Link to="/">Logout</Link> */}
            </div>
          </div>
        </div>
      </div>
      <Popup
        propsClass={"-mt-50"}
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      >
        <LogOut onClose={() => setShowPopup(false)} />
      </Popup>
{sideBar&&      <SideBar onClose={()=>setSideBar(false)} />}
    </>
  );
};
export default Header;
