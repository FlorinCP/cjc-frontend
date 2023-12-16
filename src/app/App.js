import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "../pages/Schedule/Schedule";
import VideoCall from "../pages/VideoCall";
import Login from "../pages/Login/Login";
import SideBarLayout from "../Layouts/SideBarLayout/SideBarLayout";
import NavBarLayout from "../Layouts/NavBarLayout/NavBarLayout";
import Calendar from "../components/Calendar/Calendar";
import {ProtectedRoute} from "../components/Miscellaneous/ProtectedRoute";
import ViewQuestions from "../pages/ViewQuestions/ViewQuestions";
import NotFoundPage from "../pages/404/NotFoundPAge";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SideBarLayout />}>
          <Route path="/edit-schedule" element={<Schedule />} />
          <Route path="/schedule" element={<Calendar />} />
          <Route path="/questions/:questionStatus" end element={
          <ProtectedRoute>
            <ViewQuestions />
          </ProtectedRoute>
          }/>
        </Route>

        <Route element={<NavBarLayout />}>
          <Route  path="/login" element={<Login />} />
          <Route  path="/" element={<Login />} />
          <Route path="/videocall" element={<VideoCall />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
