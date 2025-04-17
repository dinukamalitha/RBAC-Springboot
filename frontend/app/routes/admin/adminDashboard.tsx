import {useNavigate} from "react-router";
import CustomButton from "@/components/button";
import Navbar from "@/components/navbar";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/home");
    }

    return(
        <>
            <Navbar/>
            <div className="w-full flex flex-col justify-center items-center mt-10">
                <div className="flex flex-col items-center justify-center mt-10">
                    <h1 className="text-3xl text-blue-700 font-bold my-10">
                        Admin Dashboard
                    </h1>
                </div>

                <div className="w-full flex justify-center items-center mt-10">
                    <CustomButton
                        onClick={handleClick}
                        type="submit"
                        buttonLabel="View Users"
                        buttonClassName={`w-1/4 h-10 py-3 text-white bg-blue-500 rounded-lg transition-all duration-300 transform 
                                                  hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-700 hover:scale-102 cursor-pointer }`}
                    />
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;