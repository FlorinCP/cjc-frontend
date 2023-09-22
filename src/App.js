
import React from 'react';
import MobileNavbar from './components/MobileNavbar/MobileNavbar';
import  styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './pages/Services';
import Products from './pages/Products';
import ContactUs from './pages/ContactUs';
import SignUp from './pages/SignUp';
import Marketing from './pages/Marketing';
import Consulting from './pages/Consulting';
import VideoCall from "./pages/VideoCall";
import useScreenSize from "./hooks/useScreenSize";
import WebNavbar from "./components/WebNavbar/WebNavbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainPage from "./pages/MainPage/MainPage";

function App() {

    return (
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
                <Route path='/services' component={Services} />
                <Route path='/test' component={MainPage} />
                <Route path='/contact-us' component={ContactUs} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/marketing' component={Marketing} />
                <Route path='/consulting' component={Consulting} />
            </Switch>
        </Router>
        </div>
    );
}


export default App;
