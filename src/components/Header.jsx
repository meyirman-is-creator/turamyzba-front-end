import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import searchIcon from "../assets/searchIcon.svg";
import axios from "axios";

export default function Header({ setSearchResults }) {
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
    <header className="bg-[#565656] shadow-lg">
      <div className="max-w-[1200px] px-[20px] mx-[auto] h-[100px] flex items-center justify-between">
        <Link
          to="/"
          className="text-[#FFE500] font-medium text-[40px] uppercase"
        >
          TURAMYZBA
        </Link>
        {setSearchResults && (
          <form onSubmit={handleSearch} className="flex items-center h-[50px]">
            <input
              type="text"
              placeholder="Поиск сожителя c помощью ИИ"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-[50px] flex items-center px-[20px] text-[20px] outline-none font-medium w-[520px] rounded-l-[5px]"
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

        <Link
          to={user ? "/account" : "/login"}
          className="flex items-center justify-center bg-black text-white w-[270px] h-[50px] rounded-[5px] text-[20px] "
        >
          Подать объявление
        </Link>
      </div>
    </header>
  );
}
