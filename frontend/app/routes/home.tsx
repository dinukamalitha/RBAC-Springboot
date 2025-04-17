import {useEffect, useState} from "react";
import {getUsers} from "@/api/userAPI";

export default function Home() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getUsers();
            console.log(result)
            setUsers(result)
        };
        fetchUsers();
    }, []);

    return (
        <div className="min-h-[700px] max-w-8xl mx-auto mt-6 p-8 bg-blue-200 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">Current Users</h2>
            <div className="flex justify-center items-center overflow-x-auto mt-8">
                <table className="min-w-3/4 table-auto bg-gray-50">
                    <thead className="w-3/4 text-center bg-gray-200">
                    <tr className="w-3/4">
                        <th className="px-6 py-2 text-center font-medium text-gray-700">Id</th>
                        <th className="px-6 py-2 text-center font-medium text-gray-700">Name</th>
                        <th className="px-6 py-2 text-center font-medium text-gray-700">Email</th>
                        <th className="px-6 py-2 text-center font-medium text-gray-700">Role</th>

                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t text-center">
                            <td className="px-auto py-2">{user.id}</td>
                            <td className="px-auto py-2">{user.username}</td>
                            <td className="px-auto py-2">{user.email}</td>
                            <td className="px-auto py-2">{user.role}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
