import { Link } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import useResponsive from "../service/useResponsive";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [archivedPlaces, setArchivedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("/my-announcements", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }) => {
        setPlaces(data.myAnnounFindRoomate.filter((place) => place.active));
        setArchivedPlaces(
          data.myAnnounFindRoomate.filter((place) => !place.active)
        );
        setLoading(false);
      });
  }, []);

  const archivePlace = async (placeId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.put(`/archive-announcement/${placeId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPlaces(places.filter((place) => place._id !== placeId));
      setArchivedPlaces([
        ...archivedPlaces,
        places.find((place) => place._id === placeId),
      ]);
    } catch (error) {
      console.error("Error archiving place:", error);
    }
  };

  const restorePlace = async (placeId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.put(`/restore-announcement/${placeId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setArchivedPlaces(
        archivedPlaces.filter((place) => place._id !== placeId)
      );
      setPlaces([
        ...places,
        archivedPlaces.find((place) => place._id === placeId),
      ]);
    } catch (error) {
      console.error("Error restoring place:", error);
    }
  };

  const deletePlace = async (placeId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.delete(`/delete-announcement/${placeId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setArchivedPlaces(
        archivedPlaces.filter((place) => place._id !== placeId)
      );
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };
  const breakpoints = [
    { name: "small", width: 480 },
    { name: "small-medium", width: 600 },
    { name: "medium", width: 768 },
    { name: "large", width: 1130 },
    { name: "xlarge", width: Infinity },
  ];
  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
  const isMedium = activeBreakpoint === "medium";
  const isSmallMedium = activeBreakpoint === "small-medium";
  const isLarge = activeBreakpoint === "large";
  const isXLarge = activeBreakpoint === "xlarge";
  return (
    <div className="pb-[100px]">
      <Header />
      <nav className="max-w-[1200px] px-[20px] mx-[auto] mt-[40px] text-[20px] mb-[20px] text-[#33FF00] gap-[5px] flex items-end ">
        <Link to="/" className="text-[#33FF00] hover:underline">
          Главная {(isLarge || isMedium || isXLarge) && "страница"}
        </Link>{" "}
        /<span className="text-[#919EAB]"> {(isLarge || isMedium || isXLarge) ? "Ваши объявления" : "Объявлений"}</span>
      </nav>
      <AccountNavigation />
      <div className="max-w-[1200px] px-[20px] mx-[auto] mt-[30px]">
        <div className={`tabs flex mt-[30px] mb-[20px] ${isMedium ? 'gap-[15px]' : 'gap-[20px]'}`}>
          <button
            className={`border-b-[1px] border-b-[#161C24] ${isMedium ? 'text-[15px]' : isSmall ? 'text-[13px]' : 'text-[20px]'} ${
              activeTab === "active" ? " text-[#33FF00] border-b-[#33FF00]" : "text-[#fff]"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Активные {(isLarge || isXLarge || isMedium) && "объявления"} {places.length > 0 && places.length}
          </button>
          <button
            className={`border-b-[1px] border-b-[#161C24] ${isMedium ? 'text-[15px]' : isSmall ? 'text-[13px]' : 'text-[20px]'} ${
              activeTab === "archived" ? " text-[#33FF00] border-b-[#33FF00]" : "text-[#fff]"
            }`}
            onClick={() => setActiveTab("archived")}
          >
            Архивированные {(isLarge || isXLarge || isMedium) && "объявления"} {archivedPlaces.length > 0 && archivedPlaces.length}
          </button>
        </div>

        {activeTab === "active" && (
          <div className="mt-[30px]">
            {loading ? (
              <div className="flex flex-col gap-[20px] bg-[#212B36] p-[20px] rounded-[5px] mb-4 shadow-lg animate-pulse">
                <div className={`${isSmall ? 'flex flex-col' : "flex"} w-[full] gap-[20px] min-h-[200px] rounded-[5px]`}>
                  <div className={`${isSmall ? 'w-[full]' : "w-[15%]"} min-h-[200px] bg-[#919EAB] rounded-[5px]`}></div>
                  <div className={`${isSmall ? 'w-[full]' : "w-[85%]"}`}>
                    <div className="h-[30px] bg-[#919EAB] rounded w-2/5"></div>
                    <div className="h-[50px] bg-[#919EAB] rounded w-full mt-[10px]"></div>
                    <div className="h-[20px] bg-[#919EAB] rounded w-3/4 mt-[20px]"></div>
                    <div className="h-[20px] bg-[#919EAB] rounded w-2/4 mt-[15px]"></div>
                  </div>
                </div>
                <div className="h-10 bg-[#919EAB] rounded w-full mt-2"></div>
              </div>
            ) : places.length > 0 ? (
              places.map((place) => (
                <div
                  key={place._id}
                  className="flex flex-col gap-[20px] bg-[#212B36] p-[20px] rounded-[5px] mb-4"
                >
                  <Link
                    to={`/account/findroommate/${place._id}`}
                    className={`${isSmall ? 'flex flex-col' : "flex"} w-[full] gap-[20px] min-h-[200px] rounded-[5px]`}
                  >
                    {place.photos.length > 0 && (
                      <img
                        className={`object-cover block ${isSmallMedium ? 'min-w-[150px] h-[150px]' : 'min-w-[200px] h-[200px]'} rounded-[5px]`}
                        src={place.photos[0]}
                        alt={place.title}
                      />
                    )}
                    <div>
                      <h2 className="text-[20px] sm:text-[22px] md:text-[25px] font-bold text-white">
                        {place.title}
                      </h2>

                      <p className="text-[14px] sm:text-[15px] md:text-[16px] mt-[5px] text-[#919EAB]">
                        <span className="font-bold text-white">
                          Информация о квартире:{" "}
                        </span>
                        {place.apartmentInfo}
                      </p>
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] mt-[15px] text-[#919EAB]">
                        <span className="font-bold text-white">Адрес: </span>
                        {place.address.address}
                      </p>
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] mt-[5px] text-[#919EAB]">
                        <span className="font-bold text-white">
                          Ежемесячная оплата:
                        </span>{" "}
                        {place.monthlyExpensePerPerson} тенге
                      </p>
                    </div>
                  </Link>
                  <div className="flex flex-col justify-between">
                    <button
                      className="mt-[5px] font-medium h-[50px] flex items-center justify-center text-[16px] sm:text-[18px] md:text-[20px] bg-[#7635DC] text-white rounded-[5px]"
                      onClick={() => archivePlace(place._id)}
                    >
                      Архивировать
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[16px] sm:text-[18px] md:text-[20px] text-[#919EAB]">
                У вас пока нет активных объявлений.
              </p>
            )}
          </div>
        )}

        {activeTab === "archived" && (
          <div className="mt-[30px]">
            {loading ? (
              <div className="flex flex-col gap-[20px] bg-[#212B36] p-[20px] rounded-[5px] mb-4 shadow-lg animate-pulse">
                <div className={`${isSmall ? 'flex flex-col' : "flex"} w-[full] gap-[20px] min-h-[200px] rounded-[5px]`}>
                  <div className={`${isSmall ? 'w-[full]' : "w-[15%]"} min-h-[200px] bg-[#919EAB] rounded-[5px]`}></div>
                  <div className={`${isSmall ? 'w-[full]' : "w-[85%]"}`}>
                    <div className="h-[30px] bg-[#919EAB] rounded w-2/5"></div>
                    <div className="h-[50px] bg-[#919EAB] rounded w-full mt-[10px]"></div>
                    <div className="h-[20px] bg-[#919EAB] rounded w-3/4 mt-[20px]"></div>
                    <div className="h-[20px] bg-[#919EAB] rounded w-2/4 mt-[15px]"></div>
                  </div>
                </div>
                <div className="h-10 bg-[#919EAB] rounded w-full mt-2"></div>
              </div>
            ) : archivedPlaces.length > 0 ? (
              archivedPlaces.map((place) => (
                <div
                  key={place._id}
                  className="flex flex-col gap-[20px] bg-[#212B36] p-[20px] rounded-[5px] mb-4"
                >
                  <div className={`${isSmall ? 'flex flex-col' : "flex"} w-[full] gap-[20px] min-h-[200px] rounded-[5px]`}>
                    {place.photos.length > 0 && (
                      <img
                        className={`object-cover block ${isSmallMedium ? 'min-w-[150px] h-[150px]' : 'min-w-[200px] h-[200px]'} rounded-[5px]`}
                        src={place.photos[0]}
                        alt={place.title}
                      />
                    )}
                    <div>
                      <h2 className="text-[20px] sm:text-[22px] md:text-[25px] font-bold text-[white]">
                        {place.title}
                      </h2>
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] mt-[5px] text-[#919EAB]">
                        <span className="font-bold text-white">
                          Информация о квартире:{" "}
                        </span>
                        {place.apartmentInfo}
                      </p>
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] mt-[15px] text-[#919EAB]">
                        <span className="font-bold text-white">Адрес: </span>
                        {place.address.address}
                      </p>
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] mt-[5px] text-[#919EAB]">
                        <span className="font-bold text-white">
                          Ежемесячная оплата:
                        </span>{" "}
                        {place.monthlyExpensePerPerson} тенге
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <button
                      className="mt-[5px] font-medium h-[50px] flex items-center justify-center text-[16px] sm:text-[18px] md:text-[20px] bg-[#33FF00] text-black rounded-[5px]"
                      onClick={() => restorePlace(place._id)}
                    >
                      Восстановить
                    </button>
                    <button
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => deletePlace(place._id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[16px] sm:text-[18px] md:text-[20px] text-[#919EAB]">
                У вас пока нет архивированных объявлений.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
