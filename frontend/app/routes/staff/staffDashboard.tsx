import CustomButton from "@/components/button";

const StaffDashboard = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center m-5">

            <div className="bg-white p-10 rounded-lg shadow-lg w-1/2">
                <div className="flex flex-col items-center justify-center mb-6">
                    <h1 className="text-3xl text-blue-700 font-bold mb-5">
                        Staff Dashboard
                    </h1>

                    <h3 className="text-2xl font-bold">Reset Password</h3>
                </div>
            </div>

            <div className="w-full flex justify-center items-center mt-10">
                <CustomButton
                    type="submit"
                    buttonLabel="View Users"
                    buttonClassName={`w-1/4 h-10 py-3 text-white bg-blue-500 rounded-lg transition-all duration-300 transform 
                                                  hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-700 hover:scale-102 cursor-pointer }`}
                />
            </div>
        </div>
    )
}

export default StaffDashboard;