import { Link } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [archivedPlaces, setArchivedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setArchivedPlaces(archivedPlaces.filter((place) => place._id !== placeId));
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

  return (
    <div>
      <Header />
      <AccountNavigation />
      <div className="max-w-[1200px] px-[20px] mx-[auto] mt-[30px]">
        <div className="flex items-center justify-center mb-8">
          <Link
            className="w-[345px] h-[250px] bg-white border-[1px] border-[#D9D9D9] text-[#D9D9D9] block rounded-[5px] flex flex-col items-center justify-center text-[30px] font-regular IduNaPodseleniya"
            to={"/account/findroommate/new"}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="#D9D9D9"
              xmlns="http://www.w3.org/2000/svg"
              className="searchIconIduNa"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.875 7.81249C20.0283 7.81249 18.1997 8.17623 16.4935 8.88294C14.7874 9.58964 13.2371 10.6255 11.9313 11.9313C10.6255 13.2371 9.58965 14.7874 8.88294 16.4935C8.17624 18.1996 7.8125 20.0283 7.8125 21.875C7.8125 23.7217 8.17624 25.5503 8.88294 27.2565C9.58965 28.9626 10.6255 30.5129 11.9313 31.8187C13.2371 33.1245 14.7874 34.1603 16.4935 34.867C18.1997 35.5738 20.0283 35.9375 21.875 35.9375C25.6046 35.9375 29.1815 34.4559 31.8187 31.8187C34.4559 29.1815 35.9375 25.6046 35.9375 21.875C35.9375 18.1454 34.4559 14.5685 31.8187 11.9313C29.1815 9.29407 25.6046 7.81249 21.875 7.81249ZM4.6875 21.875C4.68786 19.1148 5.353 16.3952 6.62664 13.9464C7.90029 11.4976 9.74497 9.39161 12.0047 7.80649C14.2643 6.22137 16.8726 5.20379 19.6087 4.83983C22.3448 4.47588 25.1283 4.77624 27.7238 5.71553C30.3193 6.65481 32.6504 8.20538 34.5199 10.2361C36.3894 12.2668 37.7423 14.7179 38.4642 17.382C39.1862 20.0461 39.2558 22.845 38.6673 25.5417C38.0788 28.2385 36.8495 30.7538 35.0833 32.875L44.8542 42.6458C45.0077 42.7889 45.1308 42.9614 45.2162 43.153C45.3016 43.3447 45.3475 43.5516 45.3512 43.7614C45.3549 43.9712 45.3163 44.1796 45.2378 44.3742C45.1592 44.5687 45.0422 44.7454 44.8938 44.8938C44.7455 45.0422 44.5687 45.1592 44.3742 45.2377C44.1796 45.3163 43.9712 45.3549 43.7614 45.3512C43.5516 45.3475 43.3447 45.3016 43.153 45.2162C42.9614 45.1308 42.7889 45.0077 42.6458 44.8542L32.875 35.0833C30.365 37.1739 27.3113 38.506 24.0715 38.9235C20.8317 39.3409 17.54 38.8265 14.5821 37.4404C11.6242 36.0544 9.12247 33.8541 7.37007 31.0974C5.61767 28.3406 4.68714 25.1416 4.6875 21.875Z"
                fill="#D9D9D9"
                className="searchIconIduNa"
              />
            </svg>
            Ищу сожителя
          </Link>
        </div>

        <div className="mt-[50px]">
          <h2 className="text-[30px] font-bold mb-[20px]">
            Активные объявления
          </h2>
          {loading ? (
            <div className="flex flex-col gap-[20px] bg-gray-100 p-[20px] rounded-[5px] mb-4 shadow-lg animate-pulse">
              <div className="flex justify-between w-full gap-[20px]">
                <div className="flex w-[15%] h-[200px] bg-gray-300 rounded-[5px]"></div>
                <div className="w-[85%]">
                  <div className="h-[30px] bg-gray-300 rounded w-2/5"></div>
                  <div className="h-[50px] bg-gray-300 rounded w-full mt-[10px]"></div>
                  <div className="h-[20px] bg-gray-300 rounded w-3/4 mt-[20px]"></div>
                  <div className="h-[20px] bg-gray-300 rounded w-2/4 mt-[15px]"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-300 rounded w-full mt-2"></div>
            </div>
          ) : places.length > 0 ? (
            places.map((place) => (
              <>
                <div
                  key={place._id}
                  className="flex flex-col gap-[20px] bg-[white] p-[20px] rounded-[5px] mb-4"
                >
                  <Link
                    to={`/account/findroommate/${place._id}`}
                    className="flex w-[full] gap-[20px] h-[200px] rounded-[5px]"
                  >
                    {place.photos.length > 0 && (
                      <img
                        className="object-cover block w-[200px] rounded-[5px] h-[200px]"
                        src={place.photos[1]}
                        alt={place.title}
                      />
                    )}
                    <div>
                      <h2 className="text-[25px] font-bold">{place.title}</h2>
                      <p className="text-[15px] mt-[5px]">
                        {place.apartmentInfo}
                      </p>
                      <p className="text-sm mt-[15px] text-gray-600">
                        <span className="font-bold text-black">Адрес: </span>
                        {place.address.address}
                      </p>
                      <p className="text-sm mt-[5px] text-gray-600">
                        <span className="font-bold text-black">
                          Ежемесячная оплата:
                        </span>{" "}
                        {place.monthlyExpensePerPerson} тенге
                      </p>
                    </div>
                  </Link>
                  
                  <div className="flex flex-col justify-between">
                    <button
                      className="mt-2 px-4 py-2 bg-[#FFE500] text-black rounded-[5px]"
                      onClick={() => archivePlace(place._id)}
                    >
                      Заархивировать
                    </button>
                  </div>
                </div>
                
              </>
            ))
          ) : (
            <p className="text-[18px]">У вас пока нет активных объявлений.</p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-[30px] font-bold mb-[20px]">
            Заархивированные объявления
          </h2>
          {loading ? (
            <div className="flex flex-col gap-[20px] bg-gray-100 p-[20px] rounded-[5px] mb-4 shadow-lg animate-pulse">
              <div className="flex justify-between w-full gap-[20px]">
                <div className="flex w-[15%] h-[200px] bg-gray-300 rounded-[5px]"></div>
                <div className="w-[85%]">
                  <div className="h-[30px] bg-gray-300 rounded w-2/5"></div>
                  <div className="h-[50px] bg-gray-300 rounded w-full mt-[10px]"></div>
                  <div className="h-[20px] bg-gray-300 rounded w-3/4 mt-[20px]"></div>
                  <div className="h-[20px] bg-gray-300 rounded w-2/4 mt-[15px]"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-300 rounded w-full mt-2"></div>
            </div>
          ) : archivedPlaces.length > 0 ? (
            archivedPlaces.map((place) => (
              <>
                <div
                  key={place._id}
                  className="flex flex-col gap-[20px] bg-[white] p-[20px] rounded-[5px] mb-4"
                >
                  <div
                    className="flex w-[full] gap-[20px] h-[200px] rounded-[5px]"
                  >
                    {place.photos.length > 0 && (
                      <img
                        className="object-cover block w-[200px] rounded-[5px] h-[200px]"
                        src={place.photos[1]}
                        alt={place.title}
                      />
                    )}
                    <div>
                      <h2 className="text-[25px] font-bold">{place.title}</h2>
                      <p className="text-[15px] mt-[5px]">
                        {place.apartmentInfo}
                      </p>
                      <p className="text-sm mt-[15px] text-gray-600">
                        <span className="font-bold text-black">Адрес: </span>
                        {place.address.address}
                      </p>
                      <p className="text-sm mt-[5px] text-gray-600">
                        <span className="font-bold text-black">
                          Ежемесячная оплата:
                        </span>{" "}
                        {place.monthlyExpensePerPerson} тенге
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    <button
                      className="mt-2 px-4 py-2 bg-[#FFE500] text-black rounded-[5px]"
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
                
              </>
            ))
          ) : (
            <p className="text-[18px]">У вас пока нет заархивированных объявлений.</p>
          )}
        </div>
      </div>
    </div>
  );
}
