
import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
import { Zoom } from "react-toastify";


export const PostPayment = async (formData) => {

 
  try {
    const response = await fetch("https://api.vancipay.com/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok && data?.message === "Payment initiated successfully") {
      console.log("Payment successful:", data);
      
      console.log(data)
      if(data.message){
        // navigate('/user');
        toast.success("Payment initiated!", {
          position: "top-right",
          autoClose: 3000,
          transition: Zoom,
        });

      }
      return data;

      // Optional: redirect to payment page if provided
      // if (data.redirect_url) {
      //   window.location.href = data.redirect_url;
      // }
    } else {
      throw new Error(data?.message || "Payment failed!");
    }
  } catch (error) {
    console.error("Error:", error.message);
    toast.error(error.message, {
      position: "top-right",
      autoClose: 3000,
      transition: Zoom,
    });
  }
};
// import { toast } from "react-toastify";  // Make sure to import toast from 'react-toastify'
// import { Zoom } from "react-toastify";

// export const PostPayment = async (formData) => {
//   try {
//     const response = await fetch("https://api.vancipay.com/pay", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (response.ok && data?.message === "Payment initiated successfully") {
//       console.log("Payment successful:", data);
//       toast.success("Payment initiated!", {
//         position: "top-right",
//         autoClose: 3000,
//         transition: Zoom,
//       });

//       // Optional: redirect to payment page if provided
//       // if (data.redirect_url) {
//       //   window.location.href = data.redirect_url;
//       // }
//     } else {
//       throw new Error(data?.message || "Payment failed!");
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//     toast.error(error.message, {
//       position: "top-right",
//       autoClose: 3000,
//       transition: Zoom,
//     });
//   }
// };
