import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import logo from '../assets/logo.png';
import axios from "axios";

export default function Header({ setSearchResults }) {
  const { user } = useContext(UserContext);
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/findroommates-search', {
        params: { query },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response)
      console.log(response.data)

      if (response.data && response.data.suitable_announcements) {
        
        setSearchResults(response.data.suitable_announcements);
        
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
      setSearchResults([]);
    }
  };

  return (
    <header className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
      <Link to='/' className="flex items-center gap-1">
        <img src={logo} alt="" className="w-[200px] h-[auto]" />
      </Link>
      <form onSubmit={handleSearch} className="flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-300">
        <input 
          type="text" 
          placeholder="Поиск..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none"
        />
        <button type="submit" className="bg-primary text-white p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 color-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
      <div className="items-center flex border border-gray-300 rounded-full py-2 px-4 gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <Link to={user ? "/account" : "/login"} className="flex items-center gap-2">
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!!user && <div>{user.name}</div>}
        </Link>
      </div>
    </header>
  );
}
