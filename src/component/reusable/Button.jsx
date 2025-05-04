import React from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa6";

function Button({
  text,
  icon,
  iconDirection = "left",
  type = "button",
  variant = "normal",
  width,
  onClick,
  color,
  textPos,
  propClass,
  iconclass,
  loading=false,
}) {
  const baseStyles = "flex items-center   px-5 py-1 rounded-[5px] shadow text-lg";
  const variantStyles = {
    normal: "bg-white text-[#3F8CFF]  border border-[#3F8CFF]  hover:bg-gray-100 ",
    primary: "bg-[#3F8CFF] text-white hover:bg-blue-600",
    secondary: "bg-[#EAEAEA] text-[#7D8592]   hover:bg-gray-100 ",

    // secondary: "shadow-none border"
    // secondary:"bg-green-500 text-white hover:bg-green-600"
  };

  const iconPosition =
    iconDirection === "left" ? "flex-row" : "flex-row-reverse";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} cursor-pointer ${variantStyles[variant]} ${iconPosition} gap-2 ${width} ${textPos} 
        ${color} ${propClass}`}>
    
      {/* {icon && <span className={`text-[18px] ${iconclass}`}>{icon}</span>}
     
      {text} */}
      {icon && !loading && <span className={`text-[18px] ${iconclass}`}>{icon}</span>}

      {loading && (
        <span className="animate-spin">
          <FaSpinner />
        </span>
      )}
 {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
  iconDirection: PropTypes.oneOf(["left", "right"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["normal", "primary", "secondary"]),
  width: PropTypes.oneOf(["w-full", ""]),
  onClick: PropTypes.func,
  color: PropTypes.color,
  textPos: PropTypes.string,
};

Button.defaultProps = {
  iconDirection: "left",
  type: "button",
  variant: "normal",
  width: "",
  textPos: "text-left",
};

export default Button;
