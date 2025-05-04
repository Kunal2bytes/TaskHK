import React, { useState } from "react";
import { CgArrowRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import InputField from "./reusable/InputFields";
import { useDispatch, useSelector } from "react-redux";
import { AuthUser } from "../action/Login";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./Popups/Indicator";

const SignInForm = ({ openForgotPassword }) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  // {openForgotPassword,}
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? "" : "Invalid email address";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "email") {
      errorMessage = validateEmail(value);
    } else if (name === "password") {
      errorMessage = validatePassword(value);
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    console.log(data);
    setIsLoading(true);
    const resposnse = await AuthUser({ data });
    console.log(resposnse);
    setIsLoading(false);

    if (resposnse.error) {
      toast.error(resposnse.error, {
        autoClose: 1600,
        className: "zoom-toast",
      });
      return;
    } else {
      toast.success("User logged in successfully!", {
        autoClose: 1600,
        className: "zoom-toast",
      });
      handleLogin();
      setIsLoading(false);
    }
    //  setInterval(()=>{
    //  },2000)
  };

  const handleLogin = () => {
    navigate("/products");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email" || name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  return (
    <>
      <div>
        <div className="sm:w-[100%]   w-[100%] flex justify-center items-center h-full mt-10 sm:mt-0 p-6 sm:p-12">
          <div className=" flex  flex-col  w-[100%] p-2  rounded-2xl items-center  h-full">
            <div className="text-center">
              <h3 className="sm:w-58  h-8 mt-12 sm:text-2xl text-[22px]  font-nunito-bold text-[#0A1629] ">
                Sign In
              </h3>
            </div>
            <div className="w-full  flex-1 mt-8 h-full">
              <div className="mx-auto max-w-sm flex flex-col gap-4">
                <form onSubmit={handleSubmit}>
                  <InputField
                    name={"email"}
                    label={"Email Address"}
                    placeholder={"youremail@gmail.com"}
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                    onBlur={handleBlur}
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}

                  <InputField
                    name={"password"}
                    label={"Password"}
                    onBlur={handleBlur}
                    isPasswordField={true}
                    onClick={togglePasswordVisibility}
                    type={`${isPasswordVisible ? "text" : "password"}`}
                    value={data.password}
                    onChange={handleChange}
                    placeholder={"••••••••"}
                  />
                  {errors.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <label className="flex items-center text-sm text-gray-400">
                      <input
                        type="checkbox"
                        className="mr-2 w-3 h-3 text-base font-nunito-regular text-[#7D8592] border-gray-300 rounded focus:ring-blue-400 focus:ring-2"
                      />
                      Remember me
                    </label>
                    <a
                      href="#"
                      className="text-[14px] font-nunito-regular text-[#7D8592]  hover:text-gray-900"
                      onClick={openForgotPassword}
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <div className="flex  justify-center mt-2">
                    <button
                      // onClick={handleLogin}
                      type="submit"
                      // disabled={!data.email || !data.password}
                      className={`mt-4 cursor-pointer tracking-wide shadow-md font-nunito-bold text-base bg-[#3F8CFF] text-gray-100 px-4 py-2 rounded-xl hover:bg-indigo-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none `}
                    >
                      {isLoading ? (
                        <span className="mr-2 text-base font-semibold text-[ #FFFFFF] ">
                          Lodding...
                        </span>
                      ) : (
                        <span className="mr-2 text-base font-semibold text-[ #FFFFFF] ">
                          Sign In
                        </span>
                      )}

                      <CgArrowRight size={27} />
                    </button>
                  </div>
                </form>
                <p
                  // onClick={() => navigate('/signup')}
                  className="mt-2  text-base font-nunito-semibold sm:h-5  text-[#3F8CFF] text-center"
                >
                  Don't have an account?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignInForm;
