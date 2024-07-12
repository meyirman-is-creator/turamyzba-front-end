import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import Header from "../components/Header";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get(`/findroommate/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-w-full min-h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <h2 className="text-3xl mr-48">Фотографии {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black text-black bg-white"
            >
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Закрыть фото
            </button>
          </div>

          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <img src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
        <h1 className="text-2xl">{place?.title}</h1>
        <a
          target="_blank"
          href={"https://maps.google.com/?q=" + place?.address.address}
          className="flex gap-1 block font-semibold underline my-3"
        >
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
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {place?.address.address}
        </a>
        <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
              {place.photos?.[0] && (
                <div className="h-full">
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square object-cover cursor-pointer h-full"
                    src={place.photos[0]}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="grid gap-2">
              {place.photos?.[1] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={place.photos[1]}
                  alt=""
                />
              )}
              <div className="overflow-hidden">
                {place.photos?.[2] && (
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square object-cover cursor-pointer relative"
                    src={place.photos[2]}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
          >
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
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159M17.25 10.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0L24 12"
              />
            </svg>
            Показать больше фото
          </button>
        </div>

        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Описание квартиры</h2>
              <p>{place?.apartmentInfo}</p>
            </div>
            <div>
              <b>Заезд:</b> {new Date(place.moveInStart).toLocaleDateString()}{" "}
              <br />
              <b>Количество людей:</b> {place.maxPeople} <br />
              <b>Дополнительная информация:</b> {place.utilityService}
            </div>
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="bg-white -mx-8 px-8 pt-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Информация о владельце</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.ownerInfo}
          </div>
          <div>
            <h2 className="font-semibold text-2xl">Предпочтения к сожителю</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.roomiePreferences}
          </div>
        </div>
      </div>
    </>
  );
}
