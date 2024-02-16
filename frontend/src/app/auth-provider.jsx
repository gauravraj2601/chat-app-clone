'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react";




// Create the AuthContext
export const AuthContext = createContext();

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat]= useState();
  const [chats, setChats]= useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    setUser(userInfo);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// export const useAuth= ():AuthContextProps=>useContext(AuthContext)