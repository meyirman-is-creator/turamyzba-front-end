import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../components/AccountNavigation";
import Header from "../components/Header";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  
  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
    localStorage.removeItem('accessToken');
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
    <div className="bg-[#F3F4F6] min-h-screen">
      <Header />
      <AccountNavigation />
      {subpage === "profile" && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500 mb-4">{user.email}</p>
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold">Full name</label>
                <input
                  type="text"
                  value={user.name}
                  className="p-2 border rounded mb-4 w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold">Nick name</label>
                <input
                  type="text"
                  value="meirman_is_creator"
                  className="p-2 border rounded mb-4 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-left font-semibold">Email</label>
              <input
                type="email"
                value={user.email}
                className="p-2 border rounded mb-4 w-full"
              />
            </div>
            <div className="flex flex-row w-full space-x-4">
              <button className="bg-yellow-400 text-black px-4 py-2 rounded w-full">Сохранить</button>
              <button className="bg-black text-white px-4 py-2 rounded w-full">Редактировать</button>
            </div>
          </div>
          <hr className="my-6" />
          <div className="flex flex-col w-full">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold">Old password</label>
                <input
                  type="password"
                  className="p-2 border rounded mb-4 w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold">Confirm password</label>
                <input
                  type="password"
                  className="p-2 border rounded mb-4 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-left font-semibold">New password</label>
              <input
                type="password"
                className="p-2 border rounded mb-4 w-full"
              />
            </div>
            <div className="flex flex-row w-full space-x-4">
              <button className="bg-yellow-400 text-black px-4 py-2 rounded w-full">Сохранить</button>
              <button className="bg-black text-white px-4 py-2 rounded w-full">Изменить пароль</button>
            </div>
          </div>
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
