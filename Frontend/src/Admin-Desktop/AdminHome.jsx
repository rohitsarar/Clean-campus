import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useLogout from "../hooks/uselogout";
import { useNavigate } from "react-router-dom";
import { useAdminAuthContext } from "../context/AdminAuthContext";

const AdminHome = () => {
  const { logout } = useLogout();
  const [users, setUsers] = useState([]);
  const [newPeonData, setNewPeonData] = useState({ email: "", password: "", name: "" });
  const { adminUser } = useAdminAuthContext(); // Use the context for adminUser
  const navigate = useNavigate();

  // Check if the admin is logged in when the component is mounted
  useEffect(() => {
    if (!adminUser) {
      navigate("/login"); // Redirect to login if admin is not logged in
    }
  }, [adminUser, navigate]);

  const fetchUsers = async () => {
    const userData = JSON.parse(localStorage.getItem("clean-campus"));
    const token = userData?.token;

    if (!token) {
      console.error("No token found");
      toast.error("Please log in again.");
      return;
    }

    try {
      const res = await axios.get("/api/admin/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Error fetching users.");
    }
  };

  const handleDeleteUser = async (id) => {
    const userData = JSON.parse(localStorage.getItem("clean-campus"));
    const token = userData?.token;

    try {
      const res = await axios.post(`/api/admin/deleteuser/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      fetchUsers();
    } catch (error) {
      toast.error("Error deleting user.");
    }
  };

  const handleAddPeon = async () => {
    const userData = JSON.parse(localStorage.getItem("clean-campus"));
    const token = userData?.token;

    try {
      const res = await axios.post("/api/admin/addpeon", newPeonData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      toast.error("Error adding peon.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Display users */}
      <div>
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user._id}>
            <span>{user.name} ({user.role})</span>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Add Peon */}
      <div>
        <h2>Add Peon</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPeonData.name}
          onChange={(e) => setNewPeonData({ ...newPeonData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newPeonData.email}
          onChange={(e) => setNewPeonData({ ...newPeonData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newPeonData.password}
          onChange={(e) => setNewPeonData({ ...newPeonData, password: e.target.value })}
        />
        <button onClick={handleAddPeon}>Add Peon</button>
      </div>

      <button className='text-white bg-green-500 rounded-lg m-2 p-2' onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminHome;
