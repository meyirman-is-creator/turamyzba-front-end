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
import useResponsive from "../service/useResponsive";

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

  const breakpoints = [
    { name: "small", width: 480 },
    { name: "medium-res", width: 599 },
    { name: "medium", width: 768 },
    { name: "large", width: 1130 },
    { name: "xlarge", width: Infinity }, // for widths greater than 1130
  ];
  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
  const isMediumRes = activeBreakpoint === "medium-res";
  const isMedium = activeBreakpoint === "medium";
  const isLarge = activeBreakpoint === "large";
  const isXLarge = activeBreakpoint === "xlarge";

  return (
    <div className={`${(isMedium || isSmall) && "pb-[80px]"}`}>
      <Header
        setSearchResults={setSearchResults}
        setView={setView}
        view={view}
        mapIcon={mapIcon}
        listIcon={listIcon}
      />

      {loading ? (
        <div className="max-w-[1200px] p-[20px] pt-[40px] mx-auto flex flex-wrap gap-[20px] justify-start">
          {(isSmall || isMediumRes)
            ? Array.from({ length: 12 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={600}
                  width={window.innerWidth-40}
                  baseColor="#212B36"
                />
              ))
            : Array.from({ length: 12 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={700}
                  width={270}
                  baseColor="#212B36"
                />
              ))}
        </div>
      ) : view === "list" ? (
        <div className="max-w-[1200px] p-[20px] pt-[40px] mx-auto flex flex-wrap gap-[20px] justify-start">
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
      {!isLarge && !isXLarge && (
        <button
          className="fixed bottom-[80px] bg-[#33FF00] right-[10px] px-[10px] h-[50px] rounded-[5px]"
          onClick={() =>
            setView((view) => (view === "map" ? "list" : "map"))
          }
        >
          {view !== "map" ? (
            <span className="flex items-center justify-center gap-[5px]">
              <svg
                width="30"
                height="26"
                viewBox="0 0 30 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.09385 0.267056C9.49458 0.0914351 9.93652 0 10.3846 0C10.8327 0 11.2746 0.0914351 11.6754 0.267056L19.3569 3.6331C19.52 3.70317 19.7108 3.70317 19.8738 3.6331L25.8262 1.0257C26.2659 0.833262 26.7545 0.742454 27.2456 0.76189C27.7367 0.781326 28.2139 0.910362 28.6321 1.13675C29.0502 1.36314 29.3954 1.67937 29.6348 2.05542C29.8742 2.43148 29.9999 2.85488 30 3.28545V20.1089C30 21.0657 29.3831 21.9415 28.4046 22.3687L20.9046 25.6525C20.5043 25.8277 20.0629 25.9189 19.6154 25.9189C19.1679 25.9189 18.7265 25.8277 18.3262 25.6525L10.6431 22.2878C10.5629 22.2526 10.4744 22.2343 10.3846 22.2343C10.2949 22.2343 10.2064 22.2526 10.1262 22.2878L4.17539 24.8953C3.73557 25.088 3.2468 25.1791 2.7555 25.1598C2.26419 25.1405 1.78668 25.0115 1.36831 24.7851C0.949939 24.5587 0.604609 24.2423 0.365124 23.8661C0.125639 23.4899 -4.88662e-05 23.0663 1.42519e-08 22.6355V5.812C1.42519e-08 4.85528 0.616923 3.97941 1.59385 3.55225L9.09385 0.268403V0.267056ZM10.3846 4.87549C10.6906 4.87549 10.9841 4.98197 11.2005 5.1715C11.4169 5.36103 11.5385 5.61808 11.5385 5.88612V17.003C11.5385 17.271 11.4169 17.5281 11.2005 17.7176C10.9841 17.9071 10.6906 18.0136 10.3846 18.0136C10.0786 18.0136 9.78511 17.9071 9.56872 17.7176C9.35234 17.5281 9.23077 17.271 9.23077 17.003V5.88612C9.23077 5.61808 9.35234 5.36103 9.56872 5.1715C9.78511 4.98197 10.0786 4.87549 10.3846 4.87549ZM20.7692 8.91798C20.7692 8.64995 20.6477 8.3929 20.4313 8.20337C20.2149 8.01384 19.9214 7.90736 19.6154 7.90736C19.3094 7.90736 19.0159 8.01384 18.7995 8.20337C18.5831 8.3929 18.4615 8.64995 18.4615 8.91798V20.0348C18.4615 20.3029 18.5831 20.5599 18.7995 20.7495C19.0159 20.939 19.3094 21.0455 19.6154 21.0455C19.9214 21.0455 20.2149 20.939 20.4313 20.7495C20.6477 20.5599 20.7692 20.3029 20.7692 20.0348V8.91798Z"
                  fill="black"
                />
              </svg>
              Карта
            </span>
          ) : (
            <span className="flex items-center justify-center gap-[5px]">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9404 8.75H21.3354C22.6395 8.75193 23.8896 9.27134 24.811 10.1942C25.7325 11.117 26.25 12.3678 26.25 13.6719V27.3438C27.4103 27.3438 28.5231 26.8828 29.3436 26.0623C30.1641 25.2419 30.625 24.1291 30.625 22.9688V8.9075C30.625 6.71271 28.9844 4.80813 26.74 4.62C26.413 4.59344 26.0859 4.56913 25.7586 4.54708C25.3894 3.83584 24.832 3.23964 24.1472 2.82354C23.4623 2.40744 22.6764 2.18743 21.875 2.1875H19.6875C18.8862 2.18743 18.1002 2.40744 17.4154 2.82354C16.7305 3.23964 16.1731 3.83584 15.804 4.54708C15.4758 4.56896 15.1477 4.59375 14.8225 4.62C12.6321 4.80521 11.0163 6.62375 10.9404 8.75ZM19.6875 4.375C19.1074 4.375 18.551 4.60547 18.1407 5.0157C17.7305 5.42594 17.5 5.98234 17.5 6.5625H24.0625C24.0625 5.98234 23.832 5.42594 23.4218 5.0157C23.0116 4.60547 22.4552 4.375 21.875 4.375H19.6875Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.375 13.6719C4.375 12.161 5.6 10.9375 7.10938 10.9375H21.3281C22.839 10.9375 24.0625 12.1625 24.0625 13.6719V30.0781C24.0625 31.5875 22.8375 32.8125 21.3281 32.8125H7.10938C6.38417 32.8125 5.68867 32.5244 5.17588 32.0116C4.66309 31.4988 4.375 30.8033 4.375 30.0781V13.6719ZM8.75 17.5C8.75 17.2099 8.86523 16.9317 9.07035 16.7266C9.27547 16.5215 9.55367 16.4063 9.84375 16.4063H9.85542C10.1455 16.4063 10.4237 16.5215 10.6288 16.7266C10.8339 16.9317 10.9492 17.2099 10.9492 17.5V17.5117C10.9492 17.8017 10.8339 18.0799 10.6288 18.2851C10.4237 18.4902 10.1455 18.6054 9.85542 18.6054H9.84375C9.55367 18.6054 9.27547 18.4902 9.07035 18.2851C8.86523 18.0799 8.75 17.8017 8.75 17.5117V17.5ZM12.0313 17.5C12.0313 17.2099 12.1465 16.9317 12.3516 16.7266C12.5567 16.5215 12.8349 16.4063 13.125 16.4063H18.5938C18.8838 16.4063 19.162 16.5215 19.3671 16.7266C19.5723 16.9317 19.6875 17.2099 19.6875 17.5C19.6875 17.7901 19.5723 18.0683 19.3671 18.2734C19.162 18.4785 18.8838 18.5938 18.5938 18.5938H13.125C12.8349 18.5938 12.5567 18.4785 12.3516 18.2734C12.1465 18.0683 12.0313 17.7901 12.0313 17.5ZM8.75 21.875C8.75 21.5849 8.86523 21.3067 9.07035 21.1016C9.27547 20.8965 9.55367 20.7813 9.84375 20.7813H9.85542C10.1455 20.7813 10.4237 20.8965 10.6288 21.1016C10.8339 21.3067 10.9492 21.5849 10.9492 21.875V21.8867C10.9492 22.1767 10.8339 22.4549 10.6288 22.6601C10.4237 22.8652 10.1455 22.9804 9.85542 22.9804H9.84375C9.55367 22.9804 9.27547 22.8652 9.07035 22.6601C8.86523 22.4549 8.75 22.1767 8.75 21.8867V21.875ZM12.0313 21.875C12.0313 21.5849 12.1465 21.3067 12.3516 21.1016C12.5567 20.8965 12.8349 20.7813 13.125 20.7813H18.5938C18.8838 20.7813 19.162 20.8965 19.3671 21.1016C19.5723 21.3067 19.6875 21.5849 19.6875 21.875C19.6875 22.1651 19.5723 22.4433 19.3671 22.6484C19.162 22.8535 18.8838 22.9688 18.5938 22.9688H13.125C12.8349 22.9688 12.5567 22.8535 12.3516 22.6484C12.1465 22.4433 12.0313 22.1651 12.0313 21.875ZM8.75 26.25C8.75 25.9599 8.86523 25.6817 9.07035 25.4766C9.27547 25.2715 9.55367 25.1563 9.84375 25.1563H9.85542C10.1455 25.1563 10.4237 25.2715 10.6288 25.4766C10.8339 25.6817 10.9492 25.9599 10.9492 26.25V26.2617C10.9492 26.5517 10.8339 26.8299 10.6288 27.0351C10.4237 27.2402 10.1455 27.3554 9.85542 27.3554H9.84375C9.55367 27.3554 9.27547 27.2402 9.07035 27.0351C8.86523 26.8299 8.75 26.5517 8.75 26.2617V26.25ZM12.0313 26.25C12.0313 25.9599 12.1465 25.6817 12.3516 25.4766C12.5567 25.2715 12.8349 25.1563 13.125 25.1563H18.5938C18.8838 25.1563 19.162 25.2715 19.3671 25.4766C19.5723 25.6817 19.6875 25.9599 19.6875 26.25C19.6875 26.5401 19.5723 26.8183 19.3671 27.0234C19.162 27.2285 18.8838 27.3438 18.5938 27.3438H13.125C12.8349 27.3438 12.5567 27.2285 12.3516 27.0234C12.1465 26.8183 12.0313 26.5401 12.0313 26.25Z"
                  fill="black"
                />
              </svg>{" "}
              Список
            </span>
          )}
        </button>
      )}
    </div>
  );
}
