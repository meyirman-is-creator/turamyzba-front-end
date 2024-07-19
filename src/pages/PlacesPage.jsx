import { Link, useParams } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("/user-places", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }) => {
        setPlaces(data);
      });
  }, []);
  return (
    <div>
      <Header />
      <AccountNavigation />
      <div className="max-w-[1200px] px-[20px] mx-[auto]">
        <div className="flex items-center justify-center">
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
        
        <div className="mt-4 space-y-4">
        <br />
          List of all added places
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/findrooommate/" + place._id}
                className="flex gap-4 bg-gray-100 p-4 rounded-2xl"
              >
                <div className="flex w-32 h-32 bg-gray-300 rounded-2xl grow shrink-0 rounded-md">
                  {place.photos.length > 0 && (
                    <img
                      className="object-cover"
                      src={place.photos[0]}
                      alt=""
                    />
                  )}
                </div>
                <div className="shrink grow-0">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
