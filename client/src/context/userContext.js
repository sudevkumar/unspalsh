import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [logout, setLogOut] = useState(false);
  const navigate = useNavigate();

  const getUser = () => {
    const logUser = JSON.parse(localStorage.getItem("token")) || null;

    setUser(logUser);
   
  };

  useEffect(() => {
    getUser()
  }, [logout])

  return (
    <UserContext.Provider value={{user, setUser, logout, setLogOut}}>
        {children}
    </UserContext.Provider>
  )
}
