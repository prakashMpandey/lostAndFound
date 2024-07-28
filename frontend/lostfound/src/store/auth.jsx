import React, { createContext, useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  
  const storeTokenInLs = (serverToken) => {
    localStorage.setItem('accessToken', serverToken);
    setIsAuthenticated(true)

  };


  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const token = getTokenFromLs();
      setIsAuthenticated(!!token); 
    }, [])
 



  const clearTokenFromLs = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false)
   
  };

 
  const getTokenFromLs = () => {
    return localStorage.getItem('accessToken');
  };

 
const loggedInUser = async () => {
  const accessToken = getTokenFromLs();
  const response = await fetch("http://localhost:3000/api/v1/user/loggedIn", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    const user = await response.json();
    return user.data; 
  }
}
  

 
  return (
    <AuthContext.Provider value={{loggedInUser,isAuthenticated,storeTokenInLs, clearTokenFromLs, getTokenFromLs }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('come in auth jsx');
  }
  return context;
};
