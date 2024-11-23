import toast from 'react-hot-toast';
import { useAuthContext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error("Failed to log out. Please try again.");
            }

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // Clear local storage and update context
            localStorage.removeItem("clean-campus");
            setAuthUser(null);
            navigate('/login');
            // Show success message
            toast.success("Logged out successfully.");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return { logout };
};

export default useLogout;


