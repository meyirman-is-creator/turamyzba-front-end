import { Link, useParams } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNavigation />
      <div className="text-center">
        List of all added places
        <br />
        <Link
          className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-1"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 space-y-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/'+place._id} className="flex gap-4 bg-gray-100 p-4 rounded-2xl">
              <div className="flex w-32 h-32 bg-gray-300 rounded-2xl grow shrink-0 rounded-md">
                {place.photos.length > 0 && (
                  <img className="object-cover" src={place.photos[0]} alt="" />
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
  );
}
