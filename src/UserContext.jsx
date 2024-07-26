import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const { data } = await axios.get('/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setUser(null);
      } finally {
        setReady(true);
      }
    };

    fetchProfile();

    const handleStorageChange = () => {
      if (localStorage.getItem('accessToken')) {
        fetchProfile();
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
