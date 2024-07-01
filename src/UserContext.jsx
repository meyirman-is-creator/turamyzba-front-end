import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('accessToken');
      axios
        .get("/profile", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        });
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
