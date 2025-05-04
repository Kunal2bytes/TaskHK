import { useNavigate } from "react-router"
import Button from "../reusable/Button"

const LogOut=({onClose})=>{
    const navigate=useNavigate();
    const handleLogout=()=>{
navigate('/');
    }
return(
    <>
<div className="w-[40vw] h=[30vh] p-2">
<p className="flex justify-center items-center font-bold text-2xl mt-4 text-[#3F8CFF] ">Are you sure you want to logout</p>
<div className="flex justify-end items-end mt-20">
<Button text={"Cancel"} onClick={onClose}  />
<Button text={"Logout"} propClass={"ml-2"} onClick={handleLogout} />
</div>
</div>
    </>
)
}
export default LogOut