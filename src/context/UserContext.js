
import {createContext, useEffect, useState} from 'react';

const UserContext = createContext(null);


export const MyProvider = ({ children }) => {

    const [currentUser,setCurrentUser] = useState({
        email : null,
        role : null
    })

    const [viewModeON,setViewMode] = useState({
        status: false,
        id:null,
        question:{}
    })

    const updateViewMode = newData =>{
        setViewMode(newData)
    }

    const updateCurrentUser = newData => {
        setCurrentUser(newData);
    };

    useEffect(() => {
        console.log(viewModeON)
    }, [viewModeON]);

    useEffect(() => {
        setCurrentUser({
            email: localStorage.getItem("email"),
            role : localStorage.getItem("role")
        })
    }, []);

    return (
        <UserContext.Provider value={{ currentUser,updateCurrentUser , updateViewMode , viewModeON}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
