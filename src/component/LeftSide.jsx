import SignInForm from "./SignIn";

const LeftSide = () => {
  return (
    <>
      <div className="h-[100vh]   flex justify-center items-center p-2">
        <div className="w-[100%] h-[100%]  flex lg:shadow-2xl rounded-3xl ">
          <div className="w-[50%] bg-[#3F8CFF] rounded-l-3xl sm:block hidden ">
            <div className=" mt-12 ml-40 text-[30px] font-nunito-bold  text-left  text-[#FFFFFF] ">
            
            </div>
            <div className="w-[80%] text-wrap   h-[80px] mt-5  ml-16 text-3xl font-nunito-bold text-left text-[#FFFFFF]">
            "Welcome back! Sign in to continue shopping your favorites."


            </div>
            <div>
              {/* image container */}
              <div
                className="   ml-10 mt-10 h-[350px]  bg-contain bg-center bg-no-repeat  "
              //   style={{
              //     backgroundImage: `url("images/online-photo-removebg-preview.png")`,
              //   }}
               >
<img
  src="/images/online-photo-removebg-preview.png"
  alt="online"
  className="w-[400px]  h-[400px]   mt-10"
/>


              </div>
            </div>
          </div>

          <div className="sm:w-[50%] w-[100%] bg-white lg:rounded-r-3xl rounded-3xl">
            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default LeftSide;
