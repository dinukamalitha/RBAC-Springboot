import InputField from "@/components/inputField";
import {useNavigate} from "react-router";
import CustomButton from "@/components/button";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {SignupSchema} from "@/schema/signupschema";
import {userSignUp} from "@/api/authAPI";
import Dropdown from "@/components/dropdown";


interface SignUpFormValues {
    name: string;
    email: string;
    nic: string;
    password: string;
    confirmPassword: string;
}

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<string>("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        defaultValues: {
            name: '',
            email: '',
            nic: '',
            password: '',
            confirmPassword: ''
        },
    });

    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    const handleSignUp = async (data: SignUpFormValues) => {
        console.log(data)
        const validation = SignupSchema.safeParse(data);
        console.log(validation);

        if (!validation.success) {
            setServerError(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);

        try {
            await userSignUp(data);
            console.log("Username: ", data.name, "Password: ", data.password);
            reset();
            setIsChecked(false);
            navigate("/login");

        } catch (error: unknown) {
            console.log(error);
            setServerError("Invalid input");
        } finally {
            setLoading(false);
        }
    }

    const roleOptions = [
        { label: "STAFF", value: "staff" },
        { label: "SALES", value: "sales" }
    ];

    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
        console.log("Selected Role:", role);
    };

    return(
        <div className="w-full flex justify-center items-center m-5">

            <div className="bg-white p-10 rounded-lg shadow-lg w-1/2">
                <div className="flex flex-col items-center justify-center mb-6">
                    <h1 className="text-3xl text-blue-700 font-bold mb-5">
                        Admin Dashboard
                    </h1>

                    <h3 className="text-2xl font-bold">Create User Accounts</h3>
                </div>

                <form onSubmit={handleSubmit(handleSignUp)}>
                    {/* Input Fields */}
                    <div className="my-8">
                        <div className="mb-4 mt-4">
                            <InputField
                                id="name"
                                type="text"
                                placeholder="Name"
                                {...register("name")}
                                icon={undefined}
                                label={false}
                                labelName="name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="mb-4 mt-4">
                            <InputField
                                id="email"
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                icon={undefined}
                                label={false}
                                labelName="email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>


                        <div className="mb-4 mt-4">
                            <Dropdown
                                options={roleOptions}
                                placeholder="Select Role"
                                value={selectedRole}
                                onChange={handleRoleChange}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>


                        <div className="mb-4">
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

                        <div className="mb-4">
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

                    </div>


                    {/* SignUp Button */}
                    <div className="mt-6">
                        <CustomButton
                            type="submit"
                            buttonLabel={loading ? "Account Creating..." : "Create Account"}
                            buttonClassName={`w-full h-10 py-3 text-red-800 bg-red-200 rounded-lg transition-all duration-300 transform 
                                                  hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer 
                                                  ${!isChecked ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={!isChecked || loading}
                        />
                    </div>
                </form>

                {/* Error Message */}
                {serverError && <p className="text-red-500 text-center mt-4">{serverError}</p>}

                <div className="flex justify-center items-center mt-10">
                    <CustomButton
                        type="submit"
                        buttonLabel="View Users"
                        buttonClassName={`w-1/4 h-10 py-3 text-white bg-blue-500 rounded-lg transition-all duration-300 transform 
                                                  hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-700 hover:scale-102 cursor-pointer }`}
                    />
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard;