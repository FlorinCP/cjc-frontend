
import React, {useEffect, useState} from 'react';
import MobileNavbar from './components/MobileNavbar/MobileNavbar';
import  styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Schedule from "./pages/Schedule/Schedule";
import VideoCall from "./pages/VideoCall";
import useScreenSize from "./hooks/useScreenSize";
import WebNavbar from "./components/WebNavbar/WebNavbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainPage from "./pages/MainPage/MainPage";
import Login from "./pages/Login/Login";
import UserContext from "./context/UserContext";

function App() {

    const [currentUser,setCurrentUser] = useState({
        email : null,
        role : null
    })

    useEffect(() => {
        setCurrentUser({
            email: localStorage.getItem("email"),
            role : localStorage.getItem("role")
        })
    }, []);

    return (
       <UserContext.Provider value={currentUser}>
           <div className={styles.globalWrapper}>
               <Router>
                   {
                       useScreenSize().width > 450 ? (
                           <WebNavbar/>
                       ) : (
                           <MobileNavbar />
                       )
                   }
                   <Switch>
                       <Route path='/' exact component={LandingPage} />
                       <Route path='/test' component={MainPage} />
                       <Route path='/videoCall' component={VideoCall} />
                       <Route path='/program' component={Schedule} />
                       <Route path='/login' component={Login} />
                   </Switch>
               </Router>
           </div>
       </UserContext.Provider>
    );
}


export default App;
