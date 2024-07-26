import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import searchIcon from "../assets/searchIcon.svg";
import axios from "axios";
import Logo from "../photo/logo.svg";
import userIcon from "../photo/userIcon.svg";
import userRegIcon from "../photo/userRegIcon.svg";
export default function Header({
  setSearchResults,
  view,
  setView,
  listIcon,
  mapIcon,
}) {
  const { user } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("/findroommates-search", {
        params: { query },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data && response.data.suitable_announcements) {
        setSearchResults(response.data.suitable_announcements);
      } else {
        setSearchResults([]);
      }
      navigate("/");
    } catch (err) {
      console.error("Error fetching search results:", err);
      setSearchResults([]);
    }
  };

  return (
    <header className="bg-[#161C24] shadow-custom">
      <div className="max-w-[1200px] px-[20px] mx-[auto] h-[100px] flex items-center justify-between">
        <Link
          to="/"
          className="text-[white] font-medium text-[25px] flex items-center gap-[10px] uppercase"
        >
          <img src={Logo} alt="" className="max-w-[45px] max-h-[45px]" />
          TURAMYZBA
        </Link>
        {setSearchResults && (
          <form onSubmit={handleSearch} className="flex items-center h-[50px]">
            <input
              type="text"
              placeholder="Поиск сожителя c помощью ИИ"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-[50px] flex items-center px-[20px] bg-[#212B36] text-[20px] text-white placeholder:text-[#445A73] outline-none font-medium w-[450px] rounded-l-[5px]"
            />
            <button className="bg-black h-[50px] w-[50px] flex items-center justify-center rounded-r-[5px]">
              <img
                src={searchIcon}
                alt=""
                className="max-w-[24px] max-h-[24px]"
              />
            </button>
          </form>
        )}
        <div className="flex gap-[10px]">
          {user && (
            <Link
              to={"/account/findroommate"}
              className="flex items-center justify-center bg-[black] text-white w-[270px] h-[50px] rounded-[5px] text-[20px] "
            >
              Подать объявление
            </Link>
          )}
          <Link
            to={user ? "/account" : "/login"}
            className="h-[50px] w-[50px] flex items-center justify-center rounded-[5px] bg-black"
          >
            <img
              src={user ? userRegIcon : userIcon}
              alt=""
              className="h-[30px] w-[30px] rounded-[5px]"
            />
          </Link>
        </div>
      </div>
      {setSearchResults && (
        <div className="bg-[#161C24] ">
          <div className="max-w-[1200px] px-[20px] mx-[auto] h-[100px] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <button className="bg-[#33FF00] w-[270px] h-[50px] rounded-[5px] text-[20px] font-semibold">
                Ищу сожителя
              </button>
            </div>
            <div className="flex items-center gap-[10px]">
              <button
                className={`w-[50px] h-[50px] flex items-center justify-center rounded-[5px] ${
                  view === "list"
                    ? "bg-[#33FF00]"
                    : "bg-[#D9D9D9] opacity-[0.5]"
                }`}
                onClick={() => setView("list")}
              >
                <img
                  src={listIcon}
                  alt="List View"
                  className="w-[30px] h-[30px]"
                />
              </button>
              <button
                className={`w-[50px] h-[50px] flex items-center justify-center rounded-[5px] ${
                  view === "map" ? "bg-[#33FF00]" : "bg-[#D9D9D9] opacity-[0.5]"
                }`}
                onClick={() => setView("map")}
              >
                <img
                  src={mapIcon}
                  alt="Map View"
                  className="w-[30px] h-[30px]"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
