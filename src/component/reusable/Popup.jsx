
import { createPortal } from "react-dom";

const Popup = ({ isOpen, onClose, children, propsClass = "" }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50  backdrop-blur"
      onClick={onClose} // Close on background click
    >
      <div
        className={`relative bg-white rounded-md p-4 shadow-lg ${propsClass}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing on popup click
      >
        <button
          onClick={onClose}
          className="absolute top-2 cursor-pointer right-2 text-gray-700 hover:text-red-500"
        >
          ❌
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
