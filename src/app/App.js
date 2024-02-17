import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from "../pages/Schedule/Schedule";
import VideoCall from "../pages/VideoCall";
import Login from "../pages/Login/Login";
import NavBarLayout from "../Layouts/NavBarLayout/NavBarLayout";
import Calendar from "../components/Calendar/Calendar";
import { ProtectedRoute } from "../components/Miscellaneous/ProtectedRoute";
import ViewQuestions from "../pages/ViewQuestions/ViewQuestions";
import NotFoundPage from "../pages/404/NotFoundPAge";
import QuestionDetails from "../components/QuestionDetails/QuestionDetails";
import RegisterWithToken from "../pages/Login/RegisterWithToken";
import Test from "../pages/Test/Test";
import MultiLayout from "../Layouts/MultiLayout/MultiLayout";
import LandingPage from "../pages/LandingPage/LandingPage";
import GenerateLinks from "../pages/Stripe/GenerateLinks";
import ViewLinks from "../pages/Stripe/ViewLinks";
import DetailedSChedule from "../pages/DetailedSchedule/DetailedSChedule";
import { useDispatch } from 'react-redux';
import { setOnline, setOffline } from '../features/networkSlice';
import {useEffect} from "react";



function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        const handleOnline = () => dispatch(setOnline());
        const handleOffline = () => dispatch(setOffline());

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<MultiLayout />}>
          <Route
            path="/videocall"
            end
            element={
              <ProtectedRoute>
                <VideoCall />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            end
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule/edit"
            end
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule/view"
            end
            element={
              <ProtectedRoute>
                <DetailedSChedule/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/status/:questionStatus"
            end
            element={
              <ProtectedRoute>
                <ViewQuestions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/id/:questionId"
            end
            element={
              <ProtectedRoute>
                <QuestionDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stripe/payment-links"
            end
            element={
              <ProtectedRoute>
                <ViewLinks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stripe/generate-payment-link"
            end
            element={
              <ProtectedRoute>
                <GenerateLinks />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route element={<NavBarLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/register" element={<RegisterWithToken />} />
          <Route path="/test" end element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
