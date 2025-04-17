import Navbar from "@/components/navbar";
import InputField from "@/components/inputField";
import CustomButton from "@/components/button";
import Dropdown from "@/components/dropdown";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {SignupSchema} from "@/schema/signupschema";
import {createUser} from "@/api/userAPI";

interface UserFormValues {
    name: string;
    email: string;
    role: string;
    password: string;
    confirmPassword: string;
}
const CreateAccount = () => {
    const [selectedRole, setSelectedRole] = useState<string>("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormValues>({
        defaultValues: {
            name: '',
            email: '',
            role: '',
            password: '',
            confirmPassword: ''
        },
    });

    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (data: UserFormValues) => {
        const formData = { ...data, role: selectedRole };
        const validation = SignupSchema.safeParse(formData);
        console.log(validation);

        if (!validation.success) {
            setServerError(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);

        try {
            await createUser(formData);
            console.log("Username: ", data.name, "Password: ", data.password);
            reset();
        } catch (error: unknown) {
            console.log(error);
            setServerError("Invalid input");
        } finally {
            setLoading(false);
            setSelectedRole("")
        }
    }

    const roleOptions = [
        { label: "STAFF", value: "STAFF" },
        { label: "SALES", value: "SALES" }
    ];

    const handleRoleChange = (role: string) => {
        setSelectedRole(role);
        console.log("Selected Role:", role);
    };

    return(
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
                    <div className="flex flex-col items-center justify-center">
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

                        <div className="mt-6">
                            <CustomButton
                                type="submit"
                                buttonLabel={loading ? "Account Creating..." : "Create Account"}
                                buttonClassName={`w-full h-10 py-3 text-red-800 bg-red-200 rounded-lg transition-all duration-300 transform 
                                                  hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer`}
                            />
                        </div>

                        {/* Error Message */}
                        {serverError && <p className="text-red-500 text-center mt-4">{serverError}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateAccount;