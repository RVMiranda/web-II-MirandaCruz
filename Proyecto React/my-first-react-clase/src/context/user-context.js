import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [ user, setUser] = useState({
        name: "Carlos",
        email: "carlos@gmail.com",
        age: 25
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}