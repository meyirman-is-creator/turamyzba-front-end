import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/Login";
import Layout from "./Layout";
import RegisterPage from "./pages/Register";
import AccountPage from "./pages/ProfilePage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import PlacesPage from "./pages/PlacesPage";
import PlacePage from "./pages/PlacePage";
import FindRoommateFormPage from "./pages/FindRoommateFormPage";
axios.defaults.baseURL = "https://turamyzba-back-end-production.up.railway.app";
// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/findroommate" element={<PlacesPage/>}/>
          <Route path="/account/findroommate/new" element={<FindRoommateFormPage/>}/>
          <Route path="/account/findroommate/:id" element={<FindRoommateFormPage/>}/>
          <Route path="/findroommate/:id" element={<PlacePage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
