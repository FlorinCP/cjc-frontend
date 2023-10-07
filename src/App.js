import React, { useContext, useEffect, useState } from "react";
import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Schedule from "./pages/Schedule/Schedule";
import VideoCall from "./pages/VideoCall";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainPageUser from "./pages/MainPageUser/MainPageUser";
import Login from "./pages/Login/Login";
import UserContext, { MyProvider } from "./context/UserContext";
import MainPage from "./pages/MainPage/MainPage";
import AddQuestion from "./pages/AddQuestion/AddQuestion";
import Test from "./components/Test/Test";
import useScreenSize from "./hooks/useScreenSize";
import WebNavbar from "./components/WebNavbar/WebNavbar";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import SideBarLayout from "./Layouts/SideBarLayout/SideBarLayout";
import WaitingQuestions from "./pages/ViewQuestionsPages/WaitingQuestions";
import NavBarLayout from "./Layouts/NavBarLayout/NavBarLayout";
import RejectedQuestions from "./pages/ViewQuestionsPages/RejectedQuestions";
import AcceptedQuestions from "./pages/ViewQuestionsPages/AcceptedQuestions";
import WorkingQuestions from "./pages/ViewQuestionsPages/WorkingQuestions";
import Calendar from "./components/Calendar/Calendar";
import ViewQuestion from "./components/viewQuestion/ViewQuestion";

function App() {
  return (
    <MyProvider>
      <div className={styles.globalWrapper}>
        <Router>
          <Switch>
            <Route
              exact
              path={["/", "/login", "/add-question", "/test", "/videocall"]}
            >
              <NavBarLayout>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={Login} />
                <Route path="/add-question" component={AddQuestion} />
                <Route path="/test" component={Test} />
                <Route path="/videocall" component={VideoCall} />
              </NavBarLayout>
            </Route>

            <Route
              path={[
                "/admin-dashboard",
                "/user-dashboard",
                "/week-schedule",
                "/edit-schedule",
                "/waiting-questions",
                "/accepted-questions",
                "/rejected-questions",
                "/working-questions",
                "/view-question",
              ]}
            >
              <SideBarLayout>
                <Route path="/admin-dashboard" component={MainPage} />
                <Route path="/user-dashboard" component={MainPageUser} />
                <Route path="/edit-schedule" component={Schedule} />
                <Route path="/waiting-questions" component={WaitingQuestions} />
                <Route path="/view-question" component={ViewQuestion} />

                <Route
                  path="/accepted-questions"
                  component={AcceptedQuestions}
                />
                <Route
                  path="/rejected-questions"
                  component={RejectedQuestions}
                />
                <Route path="/working-questions" component={WorkingQuestions} />
                <Route path="/week-schedule" component={Calendar} />
              </SideBarLayout>
            </Route>
          </Switch>
        </Router>
      </div>
    </MyProvider>
  );
}

export default App;
