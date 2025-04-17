import Navbar from "@/components/navbar";
import InputField from "@/components/inputField";
import CustomButton from "@/components/button";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {SignupSchema} from "@/schema/signupschema";
import {resetPassword} from "@/api/authAPI";
import {getDecodedTokenValue} from "@/util/decodetoken";

interface ResetFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const Profile = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<ResetFormValues>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
    });

    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState("");

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        setEmail(userEmail ? (userEmail) : "");

        const token = localStorage.getItem("accessToken");
        if (token) {
            const role = getDecodedTokenValue(token, "role");
            setRole(role);
        } else {
            console.warn("No access token found");
        }
    }, []);


    const handleSignUp = async (data: ResetFormValues) => {
        console.log(data)
        const validation = SignupSchema.safeParse(data);
        console.log(validation);

        if (!validation.success) {
            setServerError(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);

        try {
            await resetPassword(data, email);
            reset();
            setIsChecked(false);
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

        } catch (error: unknown) {
            console.log(error);
            setServerError("Invalid input");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold">Reset Password</h3>
                    </div>

                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="mb-5 mt-8">
                            <InputField
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                icon={undefined}
                                label={false}
                                labelName="password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="mb-5">
                            <InputField
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                                icon={undefined}
                                label={false}
                                labelName="confirmPassword"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* SignUp Button */}
                        <div className="mt-6">
                            <CustomButton
                                type="submit"
                                buttonLabel={loading ? "Account Creating..." : "Create Account"}
                                buttonClassName={`w-full h-10 py-3 text-red-800 bg-red-200 rounded-lg transition-all duration-300 transform 
                                          hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer`}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
}

export default Profile;