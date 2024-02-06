'use client'


import {createContext, useContext, useEffect, useState} from "react" ;
interface User {
    name: string;
    password: string;
    token?: string;
    avatar?: string;
    email?: string;
    _id?: string;
  }
interface AuthContextProps {
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
export const AuthContext= createContext<AuthContextProps>({
    auth: false,
    setAuth: ()=>{},
    user: undefined,
  setUser: () => {},
    
});



export const AuthProvider=({children})=>{
    const [auth, setAuth]= useState(false)
    const [user, setUser] = useState<User | undefined>(undefined);
    

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

    
        // if (!userInfo) history.push("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth, user, setUser}}>{children}</AuthContext.Provider>
    )
}

// export const useAuth= ():AuthContextProps=>useContext(AuthContext)