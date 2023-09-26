
import React, {useEffect, useState} from 'react';
import MobileNavbar from './components/MobileNavbar/MobileNavbar';
import  styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Schedule from "./pages/Schedule/Schedule";
import VideoCall from "./pages/VideoCall";
import useScreenSize from "./hooks/useScreenSize";
import WebNavbar from "./components/WebNavbar/WebNavbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainPageUser from "./pages/MainPageUser/MainPageUser";
import Login from "./pages/Login/Login";
import {MyProvider} from "./context/UserContext";
import MainPage from "./pages/MainPage/MainPage";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import AddQuestion from "./pages/AddQuestion/AddQuestion";

function App() {


    return (
       <MyProvider>
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
                       <Route path='/admin-dashboard' component={MainPage} />
                       <Route path='/user-dashboard' component={MainPageUser} />
                       <Route path='/videoCall' component={VideoCall} />
                       <Route path='/program' component={Schedule} />
                       <Route path='/login' component={Login} />
                       <Route path='/add-question' component={AddQuestion} />
                   </Switch>
               </Router>
           </div>
       </MyProvider>
    );
}


export default App;
