import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "../pages/Schedule/Schedule";
import VideoCall from "../pages/VideoCall";
import MainPageUser from "../pages/MainPageUser/MainPageUser";
import Login from "../pages/Login/Login";
import MainPage from "../pages/MainPage/MainPage";
import AddQuestion from "../pages/AddQuestion/AddQuestion";
import SideBarLayout from "../Layouts/SideBarLayout/SideBarLayout";
import NavBarLayout from "../Layouts/NavBarLayout/NavBarLayout";
import Calendar from "../components/Calendar/Calendar";
import ViewQuestion from "../components/viewQuestion/ViewQuestion";
import ProtectedRoute from "../components/Miscellaneous/ProtectedRoute";
import ViewQuestions from "../components/ViewQuestions/ViewQuestions";
import NotFoundPage from "../pages/404/NotFoundPAge";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SideBarLayout />}>
          <Route path="/admin-dashboard" element={<MainPage />} />
          <Route path="/user-dashboard" element={<MainPageUser />} />
          <Route path="/edit-schedule" element={<Schedule />} />
          <Route path="/view-question" element={<ViewQuestion />} />
          <Route path="/week-schedule" element={<Calendar />} />
          <Route path="/questions/:questionStatus" end element={<ViewQuestions />}/>
        </Route>

        <Route element={<NavBarLayout />}>
          <Route  path="/login" element={<Login />} />
          <Route  path="/" element={<Login />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/videocall" element={<VideoCall />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
