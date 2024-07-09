/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

import { CheckResetPasswordToken } from './components/CheckResetPasswordToken';
import { CheckVerifyEmailToken } from './components/CheckVerifyEmailToken';
import MainPage from './pages/MainPage';
import LandingPage from './pages/LandingPage';
import QuestionDetails from './components/QuestionDetails';
import EditQuestionForm from './components/EditQuestionForm';
import Auth from './components/Auth';
import EditAnswerForm from './components/EditAnswerForm';
import SearchSection from './components/SearchSection';
import ProfileSection, { TabName } from './components/ProfileSection';
import DisplayContent from './components/DisplayContent';
import ProfileEdit from './components/ProfileEdit';
import Settings from './components/Settings';
import ChangePassword from './components/ChangePassword';
import Stylesheet from './components/Stylesheet';
import AdminDashBoard from './pages/AdminDashBoard';
import MainSite from './pages/MainSite';
import AdminLogin from './components/AdminLogin';
import AdminSite from './pages/AdminSite';
import AdminReport from './components/AdminReport';
import EditReport from './components/EditReport';

export function App() {
  return (
    <HashRouter>
      <Stylesheet />
      <Routes>
        <Route path="/admin" element={<AdminSite />}>
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="report" element={<AdminReport />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<MainSite />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reset-password" element={<CheckResetPasswordToken />} />
          <Route path="/verify-email" element={<CheckVerifyEmailToken />} />

          <Route element={<MainPage />} >
            <Route path="/home" element={<DisplayContent />} >
              <Route path="questions/:id" element={<QuestionDetails />} />
              <Route path="questions/:id/highlight" element={<QuestionDetails highlight={true} />} />
              <Route path="questions/:id/answers/:answerId/highlight" element={<QuestionDetails />} />
              <Route path="search" element={<SearchSection />} />
              <Route path="profile/:id" element={<ProfileSection activeTab={TabName.about}/>} /> 
              <Route path="profile/:id/questions" element={<ProfileSection activeTab={TabName.questions} />} />
              <Route path="profile/:id/answers" element={<ProfileSection activeTab={TabName.answers} />} />
              <Route path="profile/:id/notifications" element={<ProfileSection activeTab={TabName.notifications} />} />
              <Route path="profile/:id/no-answer" element={<ProfileSection activeTab={TabName.noAnswer} />} />
              
              <Route element={<Auth />}>
                <Route path="edit-question/:id" element={<EditQuestionForm />} />
                <Route path="edit-answer/:id" element={<EditAnswerForm />} />
              </Route>
            </Route>

            <Route element={<Auth />} >
              <Route element={<Settings />}>
                <Route path="/home/profile/edit" element={<ProfileEdit />} />
                <Route path="/home/profile/password" element={<ChangePassword />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
