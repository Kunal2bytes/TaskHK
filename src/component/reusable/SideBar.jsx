import { Link } from "react-router";

// SideBar.js
const SideBar = ({ onClose }) => {
    return (
      <>
        <div className="fixed top-0 right-0 w-[50vw] sm:w-[20vw] h-full bg-white shadow-lg z-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={onClose} className="text-red-500 cursor-pointer font-bold">X</button>
          </div>
          <ul className="space-y-4">
            <li><Link to="/products">Home</Link></li>
            <li><Link to="/cardlist">Cart</Link></li>
            <li><Link to="/add-new-item">Add Product</Link></li>
            <li><Link to="/all-product">All Product List</Link></li>


          </ul>
        </div>
      </>
    );
  };
  
  export default SideBar;
  