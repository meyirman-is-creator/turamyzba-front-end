import { Route, Routes } from "react-router-dom";
import "./App.css";
import FindRoommateMainPage from "./pages/FindRoommateMainPage";
import LoginPage from "./pages/Login";
import Layout from "./Layout";
import RegisterPage from "./pages/Register";
import AccountPage from "./pages/ProfilePage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import PlacesPage from "./pages/PlacesPage";
import FindRoommateDetailPage from "./pages/FindRoommateDetailPage";
import FindRoommateFormPage from "./pages/FindRoommateFormPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
// axios.defaults.baseURL = "https://turamyzba-back-end-production.up.railway.app";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FindRoommateMainPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/findroommate" element={<PlacesPage/>}/>
          <Route path="/account/findroommate/new" element={<FindRoommateFormPage/>}/>
          <Route path="/account/findroommate/:id" element={<FindRoommateFormPage/>}/>
          <Route path="/findroommate/:id" element={<FindRoommateDetailPage/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
