import {useNavigate} from "react-router";
import Logo from "public/favicon.ico";
import {useEffect, useState} from "react";
import {getDecodedTokenValue} from "@/util/decodetoken";

const Navbar = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const role = getDecodedTokenValue(token, "role");
            setRole(role);
        } else {
            console.warn("No access token found");
        }
    }, []);

    const handleRedirect = (role:string) =>{
        if (role === "ADMIN"){
            navigate("/adminDashboard");
        }
        else if(role === "STAFF"){
            navigate("/staffDashboard");
        }
        else if (role === "SALES"){
            navigate("/salesDashboard");
        }
        else{
            navigate("/page-not-found");
        }
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");
        navigate("/");
    }


    return (
        <nav
            className="fixed top-0 left-0 w-full px-6 py-2 bg-gradient-to-r from-red-300 via-red-200 to-white from-0% via-10% to-100% shadow-md z-50">
            <div className="flex items-center justify-between w-full">
                {/* Logo Section - Left Corner */}
                <div className="flex items-center justify-start space-x-5">
                    <img className="h-12 w-auto cursor-pointer" src={Logo} alt="Logo" onClick={() => handleRedirect(role)}/>
                </div>

                {/* Navigation Links - Centered */}
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-x-12 font-light text-lg text-red-900">
                    <div
                        className="hover:text-red-600 cursor-pointer"
                        onClick={() => {handleRedirect(role)}}
                    >
                        Home
                    </div>
                    <div
                        className="hover:text-red-600 cursor-pointer"
                        onClick={() => {
                            if(role === "ADMIN"){
                                navigate("/createAccounts");
                            }
                            else{
                                navigate("/profile");
                            }
                        }}
                    >
                        Profile
                    </div>
                    <div
                        className="hover:text-red-600 cursor-pointer"
                        onClick={logout}
                    >
                        Logout
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;