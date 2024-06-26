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
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
// axios.defaults.baseURL = "https://airbnb-clone-back-end-production.up.railway.app";
axios.defaults.baseURL = "https://airbnb-clone-back-end.onrender.com";

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
          <Route path="/account/places" element={<PlacesPage/>}/> */
          <Route path="/account/places/new" element={<PlacesFormPage/>}/> */
          <Route path="/account/places/:id" element={<PlacesFormPage/>}/> */
          <Route path="/place/:id" element={<PlacePage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
