import { FormGroup, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
// import InputField from "../reusable/InputFields";
// import Button from "../reusable/Button";
import Select from "react-select";
// import { PostPayment } from "../../action/paymntForm";
// import PaymentHeader from "./PaymentHeader";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../Store/reducer/cardreducer";
import { toast, ToastContainer } from "react-toastify";
import InputField from "../reusable/InputFields";
import Button from "../reusable/Button";

const ChooseForm = () => {
  const location = useLocation();
  const totalPrice = location.state?.amount;
  // console.log(totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserList = useSelector(getUserList);
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

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
  const handleFormSubmit = async (data) => {
    const orderId = "" + Math.floor(10 + Math.random() * 900000); // Random 6-digit ID
    const base64Image = await convertToBase64(data.image);

    const finalData = {
      orderId,
      productName: data.productName,
      currencies: data.currencies,
      marginAmount: data.marginAmount,
      image:base64Image,
      // expiryYear: data.expiryYear,
      sellingPrice: data.sellingPrice.toString(),
      purchaseAmount: data.purchaseAmount,
      // amount: parseFloat(data.amount),
      description: data.description,
    };

    console.log("Form submitted with data:", finalData);

    let existingData = [];
    try {
      const stored = JSON.parse(localStorage.getItem("paymentFormData"));
      if (Array.isArray(stored)) {
        existingData = stored;
      }
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
    }
    const isDuplicate = existingData.some((item) => {
      return (
        item.productName.trim().toLowerCase() === productName || item.image === base64Image
      );
    });
  
    if (isDuplicate) {
      toast.error("Same product name or image already exists!", {
        autoClose: 2000,
      });
      return;
    }

    existingData.push(finalData);

    localStorage.setItem("paymentFormData", JSON.stringify(existingData));
 
    // navigate('/admin');
    dispatch({
      type: "ALL_USER_LIST",
      payload: finalData,
    });
      toast.success("Product saved successfully!", {
        autoClose: 1600,
        className: 'zoom-toast',
      });
    
    setTimeout(() => {
      navigate('/all-product');
    }, 1000);
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
      {/* <PaymentHeader /> */}
      <div className="p-2">
        <p className="p-2 text-2xl font-bold text-blue-400">Add Product</p>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-5">
            <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
              {/* Type Selection */}

              <div style={{ marginTop: "-10px" }}>
                <InputField
                  name="productName"
                  label="Name"
                  value={watch("productName")}
                  placeholder="Enter Name"
                  defaultValue={""}
                  {...register("productName", {
                    required: "Name is required",
                  })}
                  onChange={(e) =>
                    handleInputChange("productName", e.target.value)
                  }
                />
                {errors.productName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.productName.message}
                  </p>
                )}
              </div>
              {/* Unit Selection */}
              <div>
                <FormGroup>
                  <Label className="block text-[#000000] font-poppins-regular text-sm mb-2">
                    Currencies<span className="text-danger">*</span>
                  </Label>
                  <Controller
                    name="currencies"
                    control={control}
                    rules={{ required: "Currencies selection is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: "IND", label: "IND" },
                          { value: "USD", label: "USD" },
                        ]}
                        placeholder="Select Currencies"
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
                            fontWeight: 20,
                            padding: "4px 8px",
                          }),
                        }}
                      />
                    )}
                  />
                  {errors.currencies && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currencies.message}
                    </p>
                  )}
                </FormGroup>
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
              <div style={{ marginTop: "-10px" }}>
                <InputField
                  readOnly={true}
                  name="marginAmount"
                  label="Margin Amount"
                  value={watch("marginAmount")}
                  placeholder="Enter Margin Amount"
                  {...register("marginAmount", {
                    required: "Amount is required",
                  })}
                  onChange={(e) =>
                    handleInputChange("marginAmount", e.target.value)
                  }
                />
                {errors.marginAmount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.marginAmount.message}
                  </p>
                )}
              </div>
              <div className="grid lg:grid-cols-2 lg:gap-14 px-2 mt-4">
                <div>
                  <Label
                    for="image"
                    className="block text-[#000000] font-poppins-regular text-sm mb-2"
                  >
                    Upload Image<span className="text-danger">*</span>
                  </Label>
                  <Controller
                    name="image"
                    control={control}
                    rules={{ required: "Image is required" }}
                    render={({ field }) => (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files[0])}
                        className="w-full p-2 border border-[#D8E0F0] rounded-md text-sm text-[#6B7280]"
                      />
                    )}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
              <div style={{ marginTop: "-10px" }}>
                <InputField
                  name="sellingPrice"
                  label="Selling Price"
                  placeholder="Enter Selling Price"
                  value={watch("sellingPrice")}
                  {...register("sellingPrice", {
                    required: "Selling price is required",
                  })}
                  onChange={(e) =>
                    handleInputChange("sellingPrice", e.target.value)
                  }
                />
                {errors.sellingPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.sellingPrice.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
              <div style={{ marginTop: "-10px" }}>
                <InputField
                  name="purchaseAmount"
                  label="Purchase Price"
                  value={watch("purchaseAmount")}
                  placeholder="Enter Purchase Price"
                  {...register("purchaseAmount", {
                    required: "Purchase Price is required",
                  })}
                  onChange={(e) =>
                    handleInputChange("purchaseAmount", e.target.value)
                  }
                />
                {errors.purchaseAmount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.purchaseAmount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="grid lg:grid-cols-2 lg:gap-14 px-2">
              <div>
                <Label
                  for="description"
                  className="block text-[#000000] font-poppins-regular text-sm mb-2"
                >
                  Description
                </Label>
                <textarea
                  name="description"
                  placeholder="Enter your Description here"
                  // className="w-full p-2 border rounded-md"
                  className="w-full p-2 border border-[#D8E0F0] 
                  rounded-md text-[#6B7280] text-sm font-poppins placeholder-gray-500 
                  focus:outline-none focus:ring-1 focus:ring-[#3F8CFF]"
                  value={watch("description")}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end items-end mt-9">
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
      </div>
    </>
  );
};
export default ChooseForm;
