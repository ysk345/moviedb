import { useState, useEffect } from "react";

export const useToken = () => {
  const [token, setToken] = useState(() => {
    // Get the token from localStorage when the component mounts
    //return localStorage.getItem('token');
    const token = localStorage.getItem("token");
    if (token && typeof token === 'string') {
      return token;
    } else {
      return null;
    }
  });

  useEffect(() => {
    // Save the token to localStorage whenever it changes
    //   localStorage.setItem("token", token);
    // }, [token]);
    if (token && typeof token === 'string') {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return [token, setToken]; // Return token and the setter function
};
