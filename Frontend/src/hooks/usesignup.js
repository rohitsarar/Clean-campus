
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/Authcontext';
import { useAdminAuthContext } from '../context/AdminAuthContext';

const useSignup = () => {
    const { setAuthUser } = useAuthContext(); // Use for regular users
    const { setAdminUser } = useAdminAuthContext(); // Use for admin users

    const signup = async ({ name, classname, email, password }) => {
        const success = handleInputErrors({ name, classname, email, password });
        if (!success) return false;

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, classname, email, password }),
            });

            const data = await res.json();
            if (!res.ok || data.error) {
                throw new Error(data.error || "Signup failed. Please try again.");
            }

            // If signup was successful, save to localStorage and set in context
            localStorage.setItem("clean-campus", JSON.stringify(data));
            toast.success("Signup successful!");

            // Check role and update the appropriate context
            if (data.role === "admin") {
                setAdminUser(data);
            } else {
                setAuthUser(data);
            }

            return true;

        } catch (error) {
            console.error("Error during signup:", error.message);
            toast.error(error.message || "An unexpected error occurred. Please try again.");
            return false;
        }
    };

    return { signup };
};

export default useSignup;

// Helper function to handle input validation
function handleInputErrors({ name, classname, email, password }) {
    if (!name || !classname || !email || !password) {
        toast.error('Please fill in all fields');
        return false;
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }

    return true;
}
