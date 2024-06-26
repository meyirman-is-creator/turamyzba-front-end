import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../components/AccountNavigation";
export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (subpage === undefined) {
    subpage = "profile";
  }
  
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNavigation/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}
