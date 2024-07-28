import React, { useEffect } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const { clearTokenFromLs, getTokenFromLs } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const accessToken = getTokenFromLs();

      if (!accessToken) {
        console.log("No accessToken found");
        navigate("/login");  // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/v1/user/logout", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          clearTokenFromLs();  // Clear token from localStorage
          
          toast.success('user logged out successfully')
          navigate("/signin");  // Redirect to the login page
        } else {
          console.error('Failed to log out:', response.statusText);
          toast.error("failed to log out")
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    logoutUser();
  }, [clearTokenFromLs, getTokenFromLs, navigate]);

  return null
};

export default Logout;
