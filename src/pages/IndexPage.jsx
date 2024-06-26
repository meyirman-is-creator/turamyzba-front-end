import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([
        ...response.data,
      ]);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={'/place/'+place._id} >
            <div className="bg-gray-500 mb-2 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h3 className="font-bold leading-4">{place.address}</h3>
            <h2 className="text-sm leading-4 text-gray-500">{place.title}</h2>
            <div className="mt-2">
              <span className="font-bold">${place.price}</span> per nights
            </div>
          </Link>
        ))}
    </div>
  );
}
