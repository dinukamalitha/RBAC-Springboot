import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});


export const getUsers = async () => {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await api.get("/api/v1/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data)

        if (response.status === 200) {
            return response.data;
        }

        return [];

    } catch (error) {
        console.log("Failed to fetch data", error);
        return [];
    }
};


export const createUser = async (formData: {
                                     name: string;
                                     email: string;
                                     role: string;
                                     password: string;
                                     confirmPassword: string;
                                 }
) => {
    const token = localStorage.getItem('accessToken');
    console.log(formData)

    try {
        const response = await api.post("/api/v1/admin/create", {
            name: formData.name,
            role: formData.role,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("SignUp Successful:");
        }
    } catch (error) {
        console.error("SignUp failed:", error);
    }
}
