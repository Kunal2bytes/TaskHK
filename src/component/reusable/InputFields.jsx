import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import { FaEyeSlash, FaRegCalendar, FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";

const InputField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  isPasswordField = false,
  onClick,
  readOnly=false,
  width,
  maxLength,
  icon,
  defaultValue = "",
  customType
}) => {
  const dateInputRef = useRef(null);

  // Function to trigger the date picker
  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className={`mt-2 mb-2 w-full bg-mint-500 font`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-[#000000] font-poppins-regular text-sm mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {customType==="Year"?
        (

<DatePicker
  selected={value ? new Date(`${value}`) : null}
  onChange={(date) =>
    onChange({ target: { value: date.getFullYear(), name } })
  }
  showYearPicker
  dateFormat="yyyy"
  placeholderText={placeholder}
  className="w-full px-5  py-3 rounded-xl border border-[#D8E0F0] text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#3F8CFF] bg-[#E6F9F1]"
  popperPlacement="bottom-start"
/>

         )
         : customType === "Month" ? (
          <DatePicker
  selected={value ? new Date(`${value}`) : null}
  onChange={(date) =>
    onChange({ target: { value: `${date.getMonth() + 1}`, name } })
  }
  showMonthYearPicker
  scrollableMonthYearDropdown
  dateFormat="MM"
  placeholderText={placeholder}
  className="w-full px-5 py-3 rounded-xl border border-[#D8E0F0] text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#3F8CFF] bg-[#E6F9F1]"
  popperPlacement="bottom-start"
  popperModifiers={[
    {
      name: "preventOverflow",
      options: {
        boundary: "viewport",
      },
    },
    {
      name: "offset",
      options: {
        offset: [0, 10],
      },
    },
  ]}
  // calendarClassName="scrollable-datepicker"
/>

        )
        :
          (<input
            className={`w-full px-5 py-3 rounded-xl font-medium border border-[#D8E0F0] 
              placeholder-[#6B7280] text-sm focus:outline-none  focus:ring-1 focus:ring-[#3F8CFF] 
               text-gray-600 
               ${readOnly?"cursor-not-allowed":""}
               ${isPasswordField ? "pr-12" : "" }`}
            type={type === "password" ? "password" : type}
            placeholder={`${
              placeholder ? placeholder : label ? `Enter your ${label}` : ""
            }`}
            id={name}
            readOnly={readOnly}
            name={name}
            maxLength={maxLength}
            onChange={onChange}
            value={value || defaultValue}
            ref={type === "date" ? dateInputRef : null} // Attach ref only for date input
            min={type === "date" ? new Date().toISOString().split("T")[0] : undefined} // ✅ Restrict past dates
  
          />)
        }

        {/* Show calendar icon only for date input */}
        {type === "date" && (
          <span
            className="absolute inset-y-0 right-3 flex items-center text-[#3F8CFF] cursor-pointer"
            onClick={handleIconClick}
          >
            <FaRegCalendar size={15} />
          </span>
        )}

        {/* Custom icon for other input types */}
        {icon && type !== "date" && (
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
            {icon}
          </span>
        )}

        {isPasswordField && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={onClick}
          >
            {type === "text" ? <IoEyeSharp size={22} className="text-[#6B7280]" />
             :<FaEyeSlash className="text-[#6B7280]" size={22}  />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
