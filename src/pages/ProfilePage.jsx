import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import Header from "../components/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import userRegIcon from '../photo/userRegProfileIcon.svg'
import useResponsive from "../service/useResponsive";
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
  const breakpoints = [
    { name: "small", width: 480 },
    { name: "medium", width: 768 },
    { name: "large", width: 1130 },
    { name: "xlarge", width: Infinity }, // for widths greater than 1024
  ];
  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
  const isMedium = activeBreakpoint === "medium";
  const isLarge = activeBreakpoint === "large";
  const isXLarge = activeBreakpoint === "xlarge";
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

        <div className="my-[100px] pb-[50px] flex items-center justify-center px-[20px]">
          <div className="max-w-3xl  w-full bg-[#212B36] rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center ">
              <Skeleton
                circle={true}
                height={100}
                width={100}
                className="mb-4 mx-[auto]"
                baseColor="#919EAB"
              />
              <Skeleton height={30} width={200} className="mx-[auto] mb-4" baseColor="#919EAB"/>
              <Skeleton height={20} width={210} className="mb-4 mx-[auto]" baseColor="#919EAB"/>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <Skeleton height={40} width="100%" className="mb-4" baseColor="#919EAB"/>
              <Skeleton height={40} width="100%" className="mb-4" baseColor="#919EAB"/>
            </div>
            <Skeleton height={30} width={200} className="mb-4" baseColor="#919EAB"/>
            <Skeleton height={40} width="100%" className="mb-4" baseColor="#919EAB" />
            <div className="flex flex-row w-full space-x-4">
              <Skeleton height={40} width="100%" baseColor="#919EAB" />
              <Skeleton height={40} width="100%" baseColor="#919EAB"/>
            </div>
            <hr className="my-6" />
            <Skeleton height={30} width={200} className="mb-4" baseColor="#919EAB"/>
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <Skeleton height={40} width="100%" className="mb-4" baseColor="#919EAB"/>
              <Skeleton height={40} width="100%" className="mb-4" baseColor="#919EAB"/>
            </div>
            <Skeleton height={40} width="100%" className="mb-4" baseColor="#919EAB"/>
            <div className="flex flex-col w-full space-y-4">
              <Skeleton height={40} width="100%" baseColor="#919EAB"/>
              <Skeleton height={40} width="100%" baseColor="#919EAB"/>
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
      <nav className={`max-w-[1200px] px-[20px] mx-[auto]  mb-[20px] text-[#33FF00] gap-[5px] flex items-end overflow-x-scroll ${isSmall ? 'mt-[20px] text-[15px]' : 'mt-[40px] text-[20px]'}`}>
        <Link to="/" className="text-[#33FF00] hover:underline">
          Главная страница
        </Link>{" "}
        /<span className="text-[#919EAB]">Мой профиль</span>
      </nav>

      {subpage === "profile" && (
        <div className={`max-w-3xl  my-[40px]  ${(isSmall || isMedium) ? 'mx-[20px] mb-[100px]' : 'mx-[auto]'}  bg-[#212B36] rounded-lg shadow-md p-8 px-[20px]  `}>
          <div className="flex flex-col items-center">
            <div className="w-24 flex items-center justify-center h-24 rounded-full ">
              <img
                src={userRegIcon}
                alt="Profile"
                className="w-[100px] h-[100px] rounded-full mb-4"
              />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              {user?.fullName}
            </h2>
            <p className={`text-gray-500 mb-4 text-white ${(isSmall || isMedium) ? 'text-[12px]' : ''} `}>{user?.email}</p>
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold text-[white]">Полное имя</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`p-2 outline-none placeholder:text-[#5D656C] rounded mb-4 w-full ${editProfile ? 'bg-white' : 'bg-gray-500'}`}
                  disabled={!editProfile}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold text-[white]">Никнейм</label>
                <input
                  type="text"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                  className={`p-2 outline-none placeholder:text-[#5D656C] rounded mb-4 w-full ${editProfile ? 'bg-white' : 'bg-gray-500'}`}
                  disabled={!editProfile}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-left font-semibold text-[white]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`p-2 text-black outline-none placeholder:text-[#5D656C] rounded mb-4 w-full  ${editProfile ? 'bg-white' : 'bg-gray-500'}`}
                disabled={!editProfile}
              />
            </div>
            {editProfile && (
              <div className="flex flex-row w-full space-x-4">
                <button
                  className="bg-[#33FF00] text-black px-4 py-2 rounded w-full"
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
                className="bg-indigo-500 text-white px-4 py-2 rounded w-full"
                onClick={() => setEditProfile(true)}
              >
                Редактировать
              </button>
            )}
          </div>
          <hr className="my-6" />
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <label className="text-left font-semibold text-[white]">Старый пароль</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`p-2 outline-none placeholder:text-[#5D656C] rounded mb-4 w-full ${editPassword ? 'bg-white' : 'bg-gray-500'}`}
                disabled={!editPassword}
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold text-[white]">Новый пароль</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`p-2 outline-none placeholder:text-[#5D656C] rounded mb-4 w-full ${editPassword ? 'bg-white' : 'bg-gray-500'}`}
                  disabled={!editPassword}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-left font-semibold text-[white]">
                  Подтвердите пароль
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`p-2 outline-none placeholder:text-[#5D656C] rounded mb-4 w-full ${editPassword ? 'bg-white' : 'bg-gray-500'}`}
                  disabled={!editPassword}
                />
              </div>
            </div>
            {editPassword && (
              <div className="flex flex-row w-full space-x-4">
                <button
                  className="bg-[#33FF00] text-black px-4 py-2 rounded w-full"
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
                className="bg-indigo-500 text-white px-4 py-2 rounded w-full"
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
