import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "../pages/Schedule/Schedule";
import VideoCall from "../pages/VideoCall";
import Login from "../pages/Login/Login";
import NavBarLayout from "../Layouts/NavBarLayout/NavBarLayout";
import Calendar from "../components/Calendar/Calendar";
import {ProtectedRoute} from "../components/Miscellaneous/ProtectedRoute";
import ViewQuestions from "../pages/ViewQuestions/ViewQuestions";
import NotFoundPage from "../pages/404/NotFoundPAge";
import QuestionDetails from "../components/QuestionDetails/QuestionDetails";
import RegisterWithToken from "../pages/Login/RegisterWithToken";
import Test from "../pages/Test/Test";
import MultiLayout from "../Layouts/MultiLayout/MultiLayout";
import LandingPage from "../pages/LandingPage/LandingPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MultiLayout />}>
          <Route path="/schedule/edit" element={<Schedule />} />
          <Route path="/schedule" element={<Calendar />} />
          <Route path="/videocall" element={<VideoCall />} />
          <Route path="/questions/status/:questionStatus" end element={
          <ProtectedRoute>
            <ViewQuestions />
          </ProtectedRoute>
          }/>
          <Route path="/questions/id/:questionId" end element={
            <ProtectedRoute>
              <QuestionDetails />
            </ProtectedRoute>
          }/>
        </Route>

        <Route element={<NavBarLayout />}>
          <Route  path="/login" element={<Login />} />
          <Route  path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/register" element={<RegisterWithToken />} />
          <Route path="test" end element={ <Test />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
