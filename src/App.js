
import React, {useContext, useEffect, useState} from 'react';
import  styles from './App.module.css';
import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom';
import Schedule from "./pages/Schedule/Schedule";
import VideoCall from "./pages/VideoCall";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainPageUser from "./pages/MainPageUser/MainPageUser";
import Login from "./pages/Login/Login";
import UserContext, {MyProvider} from "./context/UserContext";
import MainPage from "./pages/MainPage/MainPage";
import AddQuestion from "./pages/AddQuestion/AddQuestion";
import Test from "./components/Test/Test";
import useScreenSize from "./hooks/useScreenSize";
import WebNavbar from "./components/WebNavbar/WebNavbar";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";

function App() {

    return (
       <MyProvider>
           <div className={styles.globalWrapper}>
               <Router>
                   {useScreenSize().width > 450 ? <WebNavbar /> : <MobileNavbar />}
                   <Switch>
                       <Route path='/' exact component={LandingPage} />
                       <Route path='/admin-dashboard' component={MainPage} />
                       <Route path='/user-dashboard' component={MainPageUser} />
                       <Route path='/videocall' component={VideoCall} />
                       <Route path='/program' component={Schedule} />
                       <Route path='/login' component={Login} />
                       <Route path='/add-question' component={AddQuestion} />
                       <Route path='/test' component={Test} />

                   </Switch>
               </Router>
           </div>
       </MyProvider>
    );
}


export default App;
