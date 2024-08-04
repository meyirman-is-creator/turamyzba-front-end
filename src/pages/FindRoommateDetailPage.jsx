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
import useResponsive from "../service/useResponsive";
import "./Detail.css";

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

  const breakpoints = [
    { name: "sSmall", width: 370 },
    { name: "small", width: 480 },
    { name: "medium-res", width: 599 },
    { name: "medium", width: 768 },
    { name: "large-medium", width: 1100 },
    { name: "large", width: 1200 },
    { name: "xlarge", width: Infinity },
  ];

  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
  const isMediumRes = activeBreakpoint === "medium-res";
  const isMedium = activeBreakpoint === "medium";
  const isLarge = activeBreakpoint === "large";
  const isXLarge = activeBreakpoint === "xlarge";
  const isSSmall = activeBreakpoint === "sSmall";
  const isLargeMedium = activeBreakpoint === "large-medium";

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: (
      <div
        style={{ background: "white", borderRadius: "50%" }}
        className="slick-next min-w-[35px] min-h-[35px] bg-white "
      >
        <img
          src={nextIcon}
          className="z-10 bg-black min-w-[45px] min-h-[45px] rounded-[5px] absolute right-[30px] p-[10px]"
          alt="Next"
        />
      </div>
    ),
    prevArrow: (
      <div
        style={{ background: "black", borderRadius: "50%" }}
        className="slick-prev"
      >
        <img
          src={prevIcon}
          className="z-10 bg-black min-w-[45px] min-h-[45px] rounded-[5px] absolute left-[30px] p-[10px]"
          alt="Prev"
        />
      </div>
    ),
  };
  if (showAllPhotos) {
    const settingsShow = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      nextArrow: (
        <div
          style={{ background: "white", borderRadius: "50%" }}
          className="slick-next w-[35px] h-[35px] bg-white"
        >
          <img
            src={nextIcon}
            className="bg-black w-[35px] h-[35px] rounded-[5px]"
            alt="Next"
          />
        </div>
      ),
      prevArrow: (
        <div
          style={{ background: "black", borderRadius: "50%" }}
          className="slick-prev"
        >
          <img
            src={prevIcon}
            className="bg-black w-[35px] h-[35px] rounded-[5px]"
            alt="Prev"
          />
        </div>
      ),
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
          <Slider {...settingsShow}>
            {place?.photos?.length > 0 &&
              place.photos.map((photo, index) => (
                <div key={index}>
                  <img
                    src={photo}
                    alt=""
                    className="w-auto mx-auto h-[calc(100vh-80px)]"
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-[100px]">
      <Header />
      <nav className="nav-text max-w-[1200px] px-[20px] mx-[auto] mt-[40px] mb-[20px] text-[#33FF00] gap-[5px] flex items-end ">
        <Link to="/" className="text-[#33FF00] hover:underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </Link>
      </nav>
      <div
        className={`max-w-[1200px] px-[20px] mx-[auto] ${
          isLarge ? "responsive-container" : ""
        }`}
      >
        {isXLarge
          ? place.photos.length > 0 && (
              <div className="flex justify-between gap-[20px] relative ">
                <div className="responsive-image  w-[570px] w-[570px] rounded-[5px]">
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                    src={place.photos[0]}
                    alt=""
                  />
                </div>
                <div className="space-y-[20px]">
                  <div className="flex gap-[20px]">
                    <div className="responsive-image h-[275px] w-[275px] rounded-[5px]">
                      <img
                        onClick={() => setShowAllPhotos(true)}
                        className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                        src={place.photos[1]}
                        alt=""
                      />
                    </div>
                    <div className="responsive-image h-[275px] w-[275px] rounded-[5px]">
                      <img
                        onClick={() => setShowAllPhotos(true)}
                        className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                        src={place.photos[2]}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex gap-[20px]">
                    <div className="responsive-image h-[275px] w-[275px]  rounded-[5px]">
                      <img
                        onClick={() => setShowAllPhotos.true}
                        className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                        src={place.photos[3]}
                        alt=""
                      />
                    </div>
                    <div className="responsive-image h-[275px] w-[275px] rounded-[5px]">
                      <img
                        onClick={() => setShowAllPhotos(true)}
                        className="aspect-square object-cover cursor-pointer h-full rounded-[5px]"
                        src={place.photos[4]}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {place.photos?.[0] && (
                  <button
                    onClick={() => setShowAllPhotos(true)}
                    className="btn-text flex absolute bottom-[20px] right-[0] bg-[#33FF00] rounded-[5px] max-w-[275px] max-h-[50px] w-[100%] h-[100%] items-center justify-center border-[1px] border-black text-[20px] font-medium"
                  >
                    Показать больше фото
                  </button>
                )}
              </div>
            )
          : place.photos.length > 0 && (
              <Slider {...settings}>
                {place?.photos?.length > 0 &&
                  place.photos.map((photo, index) => (
                    <div key={index} style={{ zIndex: "-1" }}>
                      <img
                        src={photo}
                        alt=""
                        className={`${
                          isMedium
                            ? "h-[600px]"
                            : isMediumRes
                            ? "h-[550px]"
                            : isSmall
                            ? "h-[450px]"
                            : isSSmall
                            ? "h-[350px]"
                            : "h-[800px]"
                        } w-[auto] mx-[auto]`}
                      />
                    </div>
                  ))}
              </Slider>
            )}
        <div
          className={`mt-[50px] ${
            !(isMedium || isMediumRes || isSmall || isSSmall || isLargeMedium)
              ? "flex justify-between items-start"
              : "block"
          }`}
        >
          <div className="max-w-[750px]">
            <div className="mb-[20px]">
              <h3 className="section-title font-bold text-[white]">
                {place?.title}
              </h3>
              <a
                target="_blank"
                href={"https://maps.google.com/?q=" + place?.address.address}
                className="flex text-[#919EAB] font-medium underline"
              >
                <img src={mapIcon} alt="" className="nav-icon" />
                {place?.address.address}
              </a>
            </div>
            {place?.apartmentInfo && (
              <div className="my-[40px]">
                <h5 className="section-title font-semibold text-white">
                  Описание квартиры
                </h5>
                <p className="text-[15px] font-regular text-[#919EAB]">
                  {place?.apartmentInfo}
                </p>
              </div>
            )}
            {place?.ownerInfo && (
              <div className="mb-[40px]">
                <h5 className="section-title font-semibold text-white ">
                  Информация о владельце
                </h5>
                <p className="text-[15px] font-regular text-[#919EAB]">
                  {place?.ownerInfo}
                </p>
              </div>
            )}
            {place?.roomiePreferences && (
              <div className="mb-[40px]">
                <h5 className="section-title font-semibold text-white">
                  Предпочтения к сожителю
                </h5>
                <p className="text-[15px] text-[#919EAB] font-regular">
                  {place?.roomiePreferences}
                </p>
              </div>
            )}
          </div>

          <div
            className={`${
              isMedium || isMediumRes || isSmall || isSSmall || isLargeMedium
                ? "w-full"
                : "w-[380px]"
            } p-[20px] pt-[36px] bg-[#212B36] rounded-[5px]`}
          >
            <p className="monthly-expense font-semibold text-[#FFFFFF]">
              {place?.monthlyExpensePerPerson}тг
            </p>
            <div className="h-[1px] w-full bg-[#fff] my-[14px]"></div>
            {place.moveInStart && (
              <div className="mb-[12px] flex items-end gap-[5px]">
                <span className="section-title font-medium text-white">
                  Старт заселения:
                </span>
                <p className="text-[white] font-medium section-title">
                  {new Date(place.moveInStart).toLocaleDateString()}
                </p>
              </div>
            )}
            {place.deposit && (
              <div className="mb-[12px] flex items-end gap-[5px]">
                <span className="section-title text-white font-medium">
                  Депозит:{" "}
                </span>
                <p className="text-[white] font-medium section-title">
                  {place.deposit} тг
                </p>
              </div>
            )}
            {place.utilityService && (
              <div className="flex items-end gap-[5px]">
                <span className="section-title text-white font-medium">
                  Коммунальная услуга:
                </span>
                <p className="text-[white] font-medium section-title">
                  {place.utilityService}
                </p>
              </div>
            )}
            <div className="mt-[80px] w-full">
              {place.contactNumber && (
                <a
                  href={`tel:${place.contactNumber}`}
                  className="bg-[#33FF00] w-full rounded-[5px] h-[60px] block flex items-center justify-center btn-text font-semibold mb-[10px]"
                >
                  Позвонить
                </a>
              )}
              {place.whatsappNumber && (
                <a
                  href={`https://wa.me/${place.whatsappNumber}`}
                  className="bg-[#33FF00] border-[#33FF00] border-[1px] w-full bg-transparent rounded-[5px] h-[60px] block flex items-center justify-center text-[#33FF00] btn-text font-semibold mb-[10px]"
                >
                  Написать
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
