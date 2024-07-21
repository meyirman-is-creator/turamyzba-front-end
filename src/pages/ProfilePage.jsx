import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../components/AccountNavigation";
import Header from "../components/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  let { subpage } = useParams();

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setNickName(user.nickName);
      setEmail(user.email);
    }
  }, [user]);

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
    localStorage.removeItem("accessToken");
  }

  async function handleProfileUpdate() {
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(
        "/edit-profile",
        { fullName, nickName, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditProfile(false);
      window.location.reload(); // Перезагрузить страницу
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  async function handlePasswordChange() {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(
        "/edit-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditPassword(false);
      window.location.reload(); // Перезагрузить страницу
    } catch (error) {
      console.error("Error updating password:", error);
    }
  }

  if (!ready) {
    return (
      <>
        <Header />
        <div className="mt-[100px] pb-[50px] flex items-center justify-center">
          <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center ">
              <Skeleton
                circle={true}
                height={100}
                width={100}
                className="mb-4 mx-[auto]"
              />
              <Skeleton height={30} width={200} className="mx-[auto] mb-4" />
              <Skeleton height={20} width={250} className="mb-4 mx-[auto]" />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <Skeleton height={40} width="100%" className="mb-4" />
              <Skeleton height={40} width="100%" className="mb-4" />
            </div>
            <Skeleton height={30} width={200} className="mb-4" />
            <Skeleton height={40} width="100%" className="mb-4" />
            <div className="flex flex-row w-full space-x-4">
              <Skeleton height={40} width="100%" />
              <Skeleton height={40} width="100%" />
            </div>
            <hr className="my-6" />
            <Skeleton height={30} width={200} className="mb-4" />
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <Skeleton height={40} width="100%" className="mb-4" />
              <Skeleton height={40} width="100%" className="mb-4" />
            </div>
            <Skeleton height={40} width="100%" className="mb-4" />
            <div className="flex flex-col w-full space-y-4">
              <Skeleton height={40} width="100%" />
              <Skeleton height={40} width="100%" />
            </div>
          </div>
        </div>
      </>
    );
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
    <div className="pb-[50px]">
      <Header />
      <AccountNavigation />
      {subpage === "profile" && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 my-8">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
            <p className="text-gray-500 mb-4">{user?.email}</p>
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold">Полное имя</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="p-2 border rounded mb-4 w-full"
                  disabled={!editProfile}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold">Никнейм</label>
                <input
                  type="text"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                  className="p-2 border rounded mb-4 w-full"
                  disabled={!editProfile}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-left font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded mb-4 w-full"
                disabled={!editProfile}
              />
            </div>
            {editProfile && (
              <div className="flex flex-row w-full space-x-4">
                <button
                  className="bg-[#FFE500] text-black px-4 py-2 rounded w-full"
                  onClick={handleProfileUpdate}
                >
                  Сохранить
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                  onClick={() => setEditProfile(false)}
                >
                  Отмена
                </button>
              </div>
            )}
            {!editProfile && (
              <button
                className="bg-black text-white px-4 py-2 rounded w-full mt-4"
                onClick={() => setEditProfile(true)}
              >
                Редактировать
              </button>
            )}
          </div>
          <hr className="my-6" />
          <div className="flex flex-col w-full">
            <h3 className="text-xl font-semibold mb-4">Изменить пароль</h3>
            <div className="flex flex-col w-full">
              <label className="text-left font-semibold">Старый пароль</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="p-2 border rounded mb-4 w-full"
                disabled={!editPassword}
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold">Новый пароль</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="p-2 border rounded mb-4 w-full"
                  disabled={!editPassword}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold">
                  Подтвердите пароль
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 border rounded mb-4 w-full"
                  disabled={!editPassword}
                />
              </div>
            </div>
            {editPassword && (
              <div className="flex flex-row w-full space-x-4">
                <button
                  className="bg-[#FFE500] text-black px-4 py-2 rounded w-full"
                  onClick={handlePasswordChange}
                >
                  Сохранить
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                  onClick={() => setEditPassword(false)}
                >
                  Отмена
                </button>
              </div>
            )}
            {!editPassword && (
              <button
                className="bg-black text-white px-4 py-2 rounded w-full mt-4"
                onClick={() => setEditPassword(true)}
              >
                Изменить пароль
              </button>
            )}
          </div>
          <button
            className="bg-red-500 w-full text-white px-4 py-2 rounded mt-4"
            onClick={logout}
          >
            Выйти
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
