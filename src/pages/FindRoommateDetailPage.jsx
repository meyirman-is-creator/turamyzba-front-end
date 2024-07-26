import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import mapIcon from "../assets/locationIcon.svg";
import Header from "../components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nextIcon from "../assets/nextIcon.svg";
import prevIcon from "../assets/prevIcon.svg";
export default function FindRoommateDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get(`/findroommate/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return (
      <>
        <Header />
        <div className="max-w-[1200px] px-[20px] pt-[90px] mx-[auto]">
          <div className="flex justify-between gap-[20px] relative">
            <Skeleton height={570} width={570} baseColor="#212B36" />
            <div className="space-y-[20px]">
              <div className="flex space-x-[20px]">
                <Skeleton height={275} width={275} baseColor="#212B36" />
                <Skeleton height={275} width={275} baseColor="#212B36" />
              </div>
              <div className="flex space-x-[20px]">
                <Skeleton height={275} width={275} baseColor="#212B36" />
                <Skeleton height={275} width={275} baseColor="#212B36" />
              </div>
            </div>
          </div>
          <div className="mt-[50px] flex justify-between items-start">
            <div className="max-w-[750px] ">
              <Skeleton height={40} width={"100%"} />
              <Skeleton height={20} width={"100%"} />
              <div className="my-[40px]">
                <Skeleton height={30} width={"100%"} baseColor="#919EAB" />
                <Skeleton height={20} width={"100%"} count={3} />
              </div>
              <div className="mb-[40px]">
                <Skeleton height={30} width={"100%"} />
                <Skeleton height={20} width={"100%"} count={3} />
              </div>
              <div className="mb-[40px]">
                <Skeleton height={30} width={"100%"} />
                <Skeleton height={20} width={"100%"} count={3} />
              </div>
            </div>
            <div className="w-[380px] p-[20px] pt-[36px] bg-[#212B36] rounded-[5px]">
              <Skeleton height={30} width={"100%"} baseColor="#405369" />
              <Skeleton height={1} width={"100%"} baseColor="#405369" />
              <Skeleton height={20} width={"100%"} baseColor="#405369" />
              <Skeleton height={20} width={"100%"} baseColor="#405369" />
              <Skeleton height={20} width={"100%"} baseColor="#405369" />
              <div className="mt-[80px] w-full">
                <Skeleton height={60} width={"100%"} baseColor="#405369" />
                <Skeleton height={60} width={"100%"} baseColor="#405369" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showAllPhotos) {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      nextArrow: <div style={{ background: 'white', borderRadius: '50%' }} className="slick-next w-[35px] h-[35px] bg-white"><img src={nextIcon} className="bg-black w-[35px] h-[35px] rounded-[5px]" alt="Next" /></div>,
      prevArrow: <div style={{ background: 'black', borderRadius: '50%' }} className="slick-prev"><img src={prevIcon} className="bg-black w-[35px] h-[35px] rounded-[5px]" alt="Prev" /></div>
    };

    return (
      <div className="absolute inset-0 bg-black text-white w-full h-full">
        <div className="p-8 bg-[#161C24]">
          <div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed z-10 right-12 top-8 flex gap-1 py-2 px-4 rounded-[5px] flex items-center cursor-pointer text-black bg-[#33FF00]"
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
          <Slider {...settings}>
            {place?.photos?.length > 0 &&
              place.photos.map((photo, index) => (
                <div key={index}>
                  <img src={photo} alt="" className="w-auto mx-auto h-[calc(100vh-80px)]" />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <nav className="text-[20px] max-w-[1200px] px-[20px] mx-[auto] mt-[40px] mb-[20px] text-[#33FF00] gap-[5px] flex items-end ">
        <Link to="/" className="text-[#33FF00] hover:underline">
          Главная страница
        </Link>
        /<div className="text-[#919EAB]">Мои объявления</div>
      </nav>
      <div className="max-w-[1200px] px-[20px] mx-[auto] ">
        {place.photos.length > 0 && (
          <div className="flex justify-between gap-[20px] relative">
            <div className="">
              {place.photos?.[0] ? (
                <div className="h-[570px] w-[570px] rounded-[5px]">
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                    src={place.photos[0]}
                    alt=""
                  />
                </div>
              ) : (
                <div className="h-[570px] w-[570px] bg-[#212B36] rounded-[5px] flex items-center justify-center flex-col  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-[70px] text-[#919EAB]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <span className="font-bold text-[#919EAB] text-[30px]">
                    Здесь нет фотографий =(
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-[20px]">
              <div className="flex gap-[20px]">
                {place.photos?.[1] ? (
                  <div className="h-[275px] w-[275px] rounded-[5px]">
                    <img
                      onClick={() => setShowAllPhotos(true)}
                      className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                      src={place.photos[1]}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="h-[275px] w-[275px] bg-[#212B36] rounded-[5px]"></div>
                )}
                {place.photos?.[2] ? (
                  <div className="h-[275px] w-[275px] rounded-[5px]">
                    <img
                      onClick={() => setShowAllPhotos(true)}
                      className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                      src={place.photos[2]}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="h-[275px] w-[275px] bg-[#212B36] rounded-[5px]"></div>
                )}
              </div>
              <div className="flex gap-[20px]">
                {place.photos?.[3] ? (
                  <div className="h-[275px] w-[275px] rounded-[5px]">
                    <img
                      onClick={() => setShowAllPhotos(true)}
                      className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                      src={place.photos[3]}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="h-[275px] w-[275px] bg-[#212B36] rounded-[5px]"></div>
                )}
                {place.photos?.[4] ? (
                  <div className="h-[275px] w-[275px] rounded-[5px]">
                    <img
                      onClick={() => setShowAllPhotos(true)}
                      className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                      src={place.photos[4]}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="h-[275px] w-[275px] bg-[#212B36] rounded-[5px]"></div>
                )}
              </div>
            </div>

            {place.photos?.[0] && (
              <button
                onClick={() => setShowAllPhotos(true)}
                className="flex absolute bottom-[20px] right-[0] bg-[#33FF00] rounded-[5px] w-[275px] h-[50px] items-center justify-center border-[1px] border-black text-[20px] font-medium"
              >
                Показать больше фото
              </button>
            )}
          </div>
        )}
        <div className="mt-[50px] flex justify-between items-start">
          <div className="max-w-[750px]">
            <div className="mb-[20px]">
              <h3 className="font-bold text-[35px] text-[white]">
                {place?.title}
              </h3>
              <a
                target="_blank"
                href={"https://maps.google.com/?q=" + place?.address.address}
                className="flex text-[20px] gap-[10px] text-[#919EAB] font-medium underline"
              >
                <img src={mapIcon} alt="" className="w-[25px] h-[25px]" />
                {place?.address.address}
              </a>
            </div>
            {place?.apartmentInfo && (
              <div className="my-[40px]">
                <h5 className="font-semibold text-[25px] text-white">
                  Описание квартиры
                </h5>
                <p className="text-[15px] font-regular text-[#919EAB]">
                  {place?.apartmentInfo}
                </p>
              </div>
            )}
            {place?.ownerInfo && (
              <div className="mb-[40px]">
                <h5 className="font-semibold text-[25px] text-white ">
                  Информация о владельце
                </h5>
                <p className="text-[15px] font-regular text-[#919EAB]">
                  {place?.ownerInfo}
                </p>
              </div>
            )}
            {place?.roomiePreferences && (
              <div className="mb-[40px]">
                <h5 className="font-semibold text-[25px] text-white">
                  Предпочтения к сожителю
                </h5>
                <p className="text-[15px] text-[#919EAB] font-regular">
                  {place?.roomiePreferences}
                </p>
              </div>
            )}
          </div>

          <div className="w-[380px] p-[20px] pt-[36px] bg-[#212B36] rounded-[5px]">
            <p className="text-[30px] font-semibold text-[#FFFFFF]">
              {place?.monthlyExpensePerPerson}тг
            </p>
            <div className="h-[1px] w-full bg-[#fff] my-[14px]"></div>
            {place.moveInStart && (
              <div className="mb-[12px] flex items-end gap-[5px]">
                <span className="text-[20px] font-medium text-white">
                  Старт заселения:
                </span>
                <p className="text-[white] font-medium text-[18px]">
                  {new Date(place.moveInStart).toLocaleDateString()}
                </p>
              </div>
            )}
            {place.deposit && (
              <div className="mb-[12px] flex items-end gap-[5px]">
                <span className="text-[20px] text-white font-medium">
                  Депозит:{" "}
                </span>
                <p className="text-[white] font-medium text-[18px]">
                  {place.deposit} тг
                </p>
              </div>
            )}
            {place.utilityService && (
              <div className="flex items-end gap-[5px]">
                <span className="text-[20px] text-white font-medium">
                  Коммунальная услуга:
                </span>
                <p className="text-[white] font-medium text-[18px]">
                  {place.utilityService}
                </p>
              </div>
            )}
            <div className="mt-[80px] w-full">
              {place.contactNumber && (
                <a
                  href={`tel:${place.contactNumber}`}
                  className="bg-[#33FF00] w-full rounded-[5px] h-[60px] block flex items-center justify-center text-[20px] font-semibold mb-[10px]"
                >
                  Позвонить
                </a>
              )}
              {place.whatsappNumber && (
                <a
                  href={`https://wa.me/${place.whatsappNumber}`}
                  className="bg-[#33FF00] border-[#33FF00] border-[1px] w-full bg-transparent rounded-[5px] h-[60px] block flex items-center justify-center text-[#33FF00] text-[20px] font-semibold mb-[10px]"
                >
                  Написать
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
