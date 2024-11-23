import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Authcontext";
import { useAdminAuthContext } from "../context/AdminAuthContext";
import toast from 'react-hot-toast';

const useLogin = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const { setAdminUser } = useAdminAuthContext();

  const login = async (email, password) => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      // Store token and role in context and localStorage
      const userData = { name :data.name,email:data.email,classname:data.classname,token: data.token, role: data.role };
      localStorage.setItem("clean-campus", JSON.stringify(userData));
      if (data.role === "admin") {
        setAdminUser(userData); 
        console.log("Admin user set: ", userData);// Set admin user in AdminAuthContext
        navigate("/admin");
      } else if (data.role === "peon") {
        setAuthUser(userData); // Set peon user in AuthContext
        navigate("/peonhome");
      } else {
        setAuthUser(userData); // Set regular user in AuthContext
        navigate("/home");
      }

      toast.success("Login successful!");

    } catch (error) {
      toast.error(error.message || "An error occurred during login.");
    }
  };

  return { login };
};

export default useLogin;
