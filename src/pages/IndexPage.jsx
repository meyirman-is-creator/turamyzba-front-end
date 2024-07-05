import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Map from '../components/Map';

export default function IndexPage() {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get('/findroommates').then((response) => {
      if (response.data && response.data.data) {
        setRoommates(response.data.data);
      } else {
        setRoommates([]);
      }
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching roommate listings:', error);
      setRoommates([]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchResults.length > 0) {
      setRoommates(searchResults);
    }
  }, [searchResults]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const points = roommates.map(roommate => ({
    coordinates: roommate.address.coordinates,
    title: roommate.title,
  }));

  return (
    <div className="mt-8 px-4">
      <Header setSearchResults={setSearchResults} />
      <Map points={points} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {roommates.length > 0 &&
          roommates.map((roommate) => (
            <Link
              key={roommate._id}
              to={'/findroommate/' + roommate._id}
              className="block p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0">
                  {roommate.photos?.[0] && (
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={roommate.photos[0]}
                      alt="Roommate"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{roommate.title}</h3>
                  <p className="text-gray-500">{roommate.address.address}</p>
                  <p className="text-gray-500">
                    {roommate.monthlyExpensePerPerson} тг
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-700">{roommate.roomiePreferences}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(roommate.moveInStart).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
