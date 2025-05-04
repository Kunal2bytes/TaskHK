import { FormGroup, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import InputField from "../reusable/InputFields";
import Button from "../reusable/Button";
import Select from "react-select";
import { PostPayment } from "../../action/paymntForm";
import PaymentHeader from "./PaymentHeader";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../Store/reducer/cardreducer";
import { toast, ToastContainer } from "react-toastify";

const ChooseForm = () => {
  const location = useLocation();
  const totalPrice = location.state?.amount;
  console.log(totalPrice)
  const dispatch=useDispatch();
const navigate=useNavigate()
  const UserList=useSelector(getUserList);
  console.log(UserList);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
    control,
    watch,
  } = useForm();
  
  useEffect(() => {
    if (totalPrice) {
      setValue("amount", totalPrice.toString());
    }
  
    const storedData = localStorage.getItem("paymentFormData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      for (const key in parsed) {
        if (parsed.hasOwnProperty(key)) {
          setValue(key, parsed[key]);
        }
      }
    }
  }, [totalPrice, setValue]);
  


  const handleFormSubmit = async (data) => {
    const orderId = "" + Math.floor(10 + Math.random() * 900000); // Random 6-digit ID
    const finalData = {
      orderId,
      cardHolderName: data.cardHolderName,
      cardNumber: data.cardNumber,
      expiryMonth: data.expiryMonth,
      // expiryYear: data.expiryYear,
      expiryYear: data.expiryYear.toString(),

      cardCVC: data.cardCVC,
      amount: parseFloat(data.amount),
      currency: data.currency,
    };

    console.log("Form submitted with data:", finalData);

    const response= await PostPayment(finalData);
console.log(response,"67");
if (response.message) {
  toast.success(response.message, {
    autoClose: 1600,
    className: 'zoom-toast',
  });

  // Navigate after 1.6 seconds
  setTimeout(() => {
    navigate('/user');
  }, 1600);
}
  // Get existing array or initialize
    let existingData = [];
    try {
      const stored = JSON.parse(localStorage.getItem("paymentFormData"));
      if (Array.isArray(stored)) {
        existingData = stored;
      }
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
    }

    existingData.push(finalData);

    localStorage.setItem("paymentFormData", JSON.stringify(existingData));

    dispatch({
      type: "ALL_USER_LIST",
      payload: finalData,
    });
  };


  const handleInputChange = (fieldName, value) => {
    setValue(fieldName, value);

    const selling =
      parseFloat(
        fieldName === "sellingPrice" ? value : watch("sellingPrice")
      ) || 0;
    const purchase =
      parseFloat(
        fieldName === "purchaseAmount" ? value : watch("purchaseAmount")
      ) || 0;

    // जब भी selling या purchase बदले, margin भी update करें
    if (fieldName === "sellingPrice" || fieldName === "purchaseAmount") {
      const margin = selling - purchase;
      setValue("marginAmount", margin.toFixed(2));
    }
  };

  return (
    <>
      <PaymentHeader />
<p className="mt-20 text-2xl font-bold text-blue-400">Shop Smart, Pay Securely</p>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mt-4">
          {/* Input Fields */}
          <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
            <div style={{ marginTop: "-10px" }}>
              <InputField
                name="cardHolderName"
                label="Name"
                value={watch("cardHolderName")}
                placeholder="Enter Name"
                defaultValue={""}
                {...register("cardHolderName", {
                  required: "Name is required",
                })}
                onChange={(e) =>
                  handleInputChange("cardHolderName", e.target.value)
                }
              />
              {errors.cardHolderName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cardHolderName.message}
                </p>
              )}
            </div>

            <div style={{ marginTop: "-10px" }}>
              <InputField
                readOnly={true}
                name="amount"
                label="Amount"
                value={watch("amount")}
                placeholder="Enter Amount"
                {...register("amount", {
                  required: "Amount is required",
                })}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
            <div style={{ marginTop: "-10px" }}>
              <InputField
                name="cardNumber"
                label="Card Number"
                placeholder="Enter Card Number"
                value={watch("cardNumber")}
                {...register("cardNumber", {
                  required: "Card Number is required",
                })}
                onChange={(e) =>
                  handleInputChange("cardNumber", e.target.value)
                }
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div style={{ marginTop: "-10px" }}>
              <InputField
                name="cardCVC"
                label="CardCVC"
                value={watch("cardCVC")}
                placeholder="Enter CardCVC"
                {...register("cardCVC", {
                  required: "CardCVC is required",
                })}
                onChange={(e) => handleInputChange("cardCVC", e.target.value)}
              />
              {errors.cardCVC && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cardCVC.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
            <div style={{ marginTop: "-10px" }}>
              {/* <InputField
                name="expiryYear"
                label="Expiry Year"
                value={watch("expiryYear")}
                placeholder="Enter Expiry Year"
                {...register("expiryYear", {
                  required: "Expiry Year is required",
                })}
                onChange={(e) =>
                  handleInputChange("expiryYear", e.target.value)
                }
              />
              {errors.expiryYear && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expiryYear.message}
                </p>
              )} */}
              <InputField
  name="expiryYear"
  label="Expiry Year"
  customType={"Year"}
  value={watch("expiryYear")}
  placeholder="Enter Expiry Year"
  min="1900"
  max="2099"
  {...register("expiryYear", {
    required: "Expiry Year is required",
    pattern: {
      value: /^[0-9]{4}$/,
      message: "Enter a valid year",
    },
  })}
  onChange={(e) => handleInputChange("expiryYear", e.target.value)}
/>

            </div>

            <div style={{ marginTop: "-10px" }}>
              <InputField
                name="expiryMonth"
                customType={"Month"}
                label="Expiry Month"
                value={watch("expiryMonth")}
                placeholder="Enter Expiry Month"
                {...register("expiryMonth", {
                  required: "Expiry Month is required",
                })}
                onChange={(e) =>
                  handleInputChange("expiryMonth", e.target.value)
                }
              />
              {errors.expiryMonth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expiryMonth.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
            <div style={{ marginTop: "-10px" }}>
              <InputField
                name="currency"
                label="Currency"
                value={watch("currency")}
                placeholder="Enter Currency "
                {...register("currency", {
                  required: "Expiry Month is required",
                })}
                onChange={(e) => handleInputChange("currency", e.target.value)}
              />
              {errors.currency && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currency.message}
                </p>
              )}
            </div>
          </div>

          {/* <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
                <FormGroup>
                  <Label className="block text-[#000000] font-poppins-regular text-sm mb-2">
                    Unit<span className="text-danger">*</span>
                  </Label>
                  <Controller
                    name="currency"
                    control={control}
                    rules={{ required: "Currency selection is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: "USD", label: "USD" },
                          { value: "INR", label: "INR" },

                        ]}
                        placeholder="Select Unit"
                        isClearable
                        onChange={(selectedOption) =>
                          field.onChange(selectedOption)
                        }
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderRadius: "12px", // Adjust border radius
                            padding: "4px 2px",
                            // borderColor:" "
                            borderColor: "#D8E0F0",
                          }),
                          placeholder: (provided) => ({
                            ...provided,
                            color: "#6B7280", 
                            fontSize: "14px", 
                            fontFamily: "'Poppins'", 
                            fontWeight:20,
                            padding:"4px 8px"
                          }),
                        }}
                      />
                    )}
                  />
                  {errors.currency && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currency.message}
                    </p>
                  )}
                </FormGroup>
              </div> */}

          {/* Submit Button */}
          <div className="flex justify-end items-end mt-10 mb-10">
            <Button
              text="Save"
              textPos="px-8 py-2 font-inter-regular"
              variant="primary"
              type="submit"
              // onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
      <ToastContainer /> 

    </>
  );
};
export default ChooseForm;
