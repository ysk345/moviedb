import { useState, useEffect } from 'react';

export const useToken = () => {
 const token = useState(() => {
   // Get the token from localStorage when the component mounts
   return localStorage.getItem('token');
 });

 useEffect(() => {
   // Save the token to localStorage whenever it changes
   localStorage.setItem('token', token);
 }, [token]);

 return token;
};
