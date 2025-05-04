// export const AuthUser=async({data})=>{
//     console.log(data)
// const response= await fetch("https://reqres.in/api/login",{
//     method:"POST",
//     headers:{
//         "Content-Type":"application/json",
//         "x-api-key":"reqres-free-v1"
//     },
//     body: JSON.stringify({
//         email: "eve.holt@reqres.in",
//         password: "cityslicka"
//       })
//  });

//  console.log(response);
//  return response;


// } 
export const AuthUser = async ({ data }) => {
    console.log("Input Data:", data);
  
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
  
      const result = await response.json();
      console.log("Response:", result);
  
      if (!response.ok) {
        throw new Error(result.error || "Login failed");
      }
  
      return result;
    } catch (error) {
      console.error("Error during login:", error.message);
       return { error: error.message };;
    }
  };
  