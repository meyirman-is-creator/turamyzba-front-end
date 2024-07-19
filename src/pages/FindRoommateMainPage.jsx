import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Map from "../components/Map";
import RoommateCard from "../components/FindRoommate";
import Pagination from "../components/Pagination";
import listIcon from "../assets/listIcon.svg";
import mapIcon from "../assets/mapIcon.svg";
import Header from "../components/Header";

export default function FindRoommateMainPage() {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [view, setView] = useState("list");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 40;

  const fetchRoommates = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/findroommates", {
        params: { page, limit },
      });
      if (response.data && response.data.data) {
        setRoommates(response.data.data);
        setTotal(response.data.total);
      } else {
        setRoommates([]);
        setTotal(0);
      }
    } catch (error) {
      console.error("Error fetching roommate listings:", error);
      setRoommates([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoommates();
  }, [page]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setRoommates(searchResults);
    }
  }, [searchResults]);

  const points = roommates.map((roommate) => ({
    coordinates: roommate.address.coordinates,
    title: roommate.title,
    id: roommate._id,
    price: roommate.monthlyExpensePerPerson,
  }));

  return (
    <div>
      <Header setSearchResults={setSearchResults} />
      <div className="bg-[#565656]">
        <div className="max-w-[1200px] px-[20px] mx-[auto] h-[100px] flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <button className="bg-[#FFE500] w-[270px] h-[50px] rounded-[5px] text-[20px] font-semibold">
              Ищу сожителя
            </button>
          </div>
          <div className="flex items-center gap-[10px]">
            <button
              className={`w-[50px] h-[50px] flex items-center justify-center rounded-[5px] ${
                view === "list" ? "bg-[#FFE500]" : "bg-[#D9D9D9] opacity-[0.5]"
              }`}
              onClick={() => setView("list")}
            >
              <img src={listIcon} alt="List View" />
            </button>
            <button
              className={`w-[50px] h-[50px] flex items-center justify-center rounded-[5px] ${
                view === "map" ? "bg-[#FFE500]" : "bg-[#D9D9D9] opacity-[0.5]"
              }`}
              onClick={() => setView("map")}
            >
              <img src={mapIcon} alt="Map View" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="max-w-[1200px] p-[20px] mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} height={620} width={270} baseColor="white" />
          ))}
        </div>
      ) : view === "list" ? (
        <div className="max-w-[1200px] p-[20px] mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {roommates.length > 0 &&
            roommates.map((roommate) => (
              <RoommateCard key={roommate._id} roommate={roommate} />
            ))}
        </div>
      ) : (
        <div className="max-w-[1200px] p-[20px] mx-auto flex items-start">
          <div className="max-h-[700px] overflow-scroll w-[400px] space-y-[20px]">
            {roommates.length > 0 &&
              roommates.map((roommate) => (
                <RoommateCard key={roommate._id} roommate={roommate} />
              ))}
          </div>
          <Map points={points} />
        </div>
      )}
      {!loading && (
        <Pagination total={total} limit={limit} page={page} setPage={setPage} />
      )}
    </div>
  );
}
