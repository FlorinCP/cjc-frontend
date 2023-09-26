
import {createContext, useEffect, useState} from 'react';

const UserContext = createContext(null);


export const MyProvider = ({ children }) => {

    const [currentUser,setCurrentUser] = useState({
        email : null,
        role : null
    })
    const updateCurrentUser = newData => {
        setCurrentUser(newData);
    };

    useEffect(() => {
        setCurrentUser({
            email: localStorage.getItem("email"),
            role : localStorage.getItem("role")
        })
    }, []);

    return (
        <UserContext.Provider value={{ currentUser,updateCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
