import React, { createContext, useState, useContext } from "react";

// Create the AdminAuthContext
export const AdminAuthContext = createContext();

// Create the AdminAuthContextProvider
export const AdminAuthContextProvider = ({ children }) => {
    const [adminUser, setAdminUser] = useState(JSON.parse(localStorage.getItem("clean-campus")) || null);

    return (
        <AdminAuthContext.Provider value={{ adminUser, setAdminUser }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

// Custom hook for using the AdminAuthContext
export const useAdminAuthContext = () => {
    return useContext(AdminAuthContext);
};
