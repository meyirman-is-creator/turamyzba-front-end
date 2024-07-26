import React, { useEffect, useState } from "react";
import axios from "axios";
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
      <Header setSearchResults={setSearchResults} setView={setView} view={view} mapIcon={mapIcon} listIcon={listIcon}/>
      
      {loading ? (
        <div className="max-w-[1200px] p-[20px] pt-[40px] mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} height={700} width={270} baseColor="#212B36" />
          ))}
        </div>
      ) : view === "list" ? (
        <div className="max-w-[1200px] p-[20px] pt-[40px] mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {roommates.length > 0 &&
            roommates.map((roommate) => (
              <RoommateCard key={roommate._id} roommate={roommate} />
            ))}
        </div>
      ) : (
        <div className="">
          <Map roommates={roommates} view={view} />
        </div>
      )}
      {!loading && (
        <Pagination total={total} limit={limit} page={page} setPage={setPage} />
      )}
    </div>
  );
}
