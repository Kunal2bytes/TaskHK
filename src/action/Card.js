import axios from "axios";
import { useEffect } from "react";

 
const Axios = axios.create({
     baseURL: "http://localhost:5173/",
   // baseURL: "http://ec2-13-201-228-110.ap-south-1.compute.amazonaws.com:8080/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});
const EndPoind={method:"GET",url:"https://fakestoreapi.com/products"}
export const fetchApi=async()=>{
    response= await Axios({
...EndPoind
    });
    console.log(response)
}

useEffect(()=>{
    fetchApi()

},[]);