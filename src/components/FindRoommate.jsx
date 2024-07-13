import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import locationIcon from "../assets/locationIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import descriptionIcon from "../assets/descriptionIcon.svg";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-arrow-next" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-arrow-prev" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

const RoommateCard = ({ roommate }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => <div className="custom-dot"></div>,
    appendDots: (dots) => (
      <div style={{ bottom: "5px" }}>
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <Link
      to={"/findroommate/" + roommate._id}
      className="bg-white rounded-[5px] w-[270px] h-[620px] p-[20px] shadow-md flex flex-col justify-between"
    >
      <div className="flex flex-col items-start">
        {roommate.photos?.length > 0 ? (
          <Slider
            {...sliderSettings}
            className="max-w-[230px] max-h-[230px] relative"
          >
            <div className="w-[230px] h-[230px] flex flex-col justify-between items-center rounded-[5px] bg-[#D9D9D9] p-[20px]">
              <div className="max-w-[100px] mx-[auto] max-h-[100px] mb-[20px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#565656"
                  className="size-[100px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="text-start">
                <p className="text-[10px] text-black">
                  от каждого человека в месяц
                </p>
                <p className="text-black text-[32px] font-bold">
                  {roommate.monthlyExpensePerPerson}тг
                </p>
              </div>
            </div>
            {roommate.photos.map((photo, index) => (
              <div
                key={index}
                className="w-[230px] h-[230px] text-center flex justify-center items-center rounded-[5px]"
              >
                <img
                  className="w-[230px] h-[230px] object-cover rounded-[5px]"
                  src={photo}
                  alt={`Roommate ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="w-[230px] h-[230px] flex flex-col rounded-[5px] bg-[#D9D9D9] p-[20px]">
            <div className="max-w-[100px] mx-[auto] max-h-[100px] mb-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#565656"
                className="size-[100px]"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="text-start">
              <p className="text-[10px] text-black">
                от каждого человека в месяц
              </p>
              <p className="text-black text-[32px] font-bold">
                {roommate.monthlyExpensePerPerson}тг
              </p>
            </div>
          </div>
        )}
        <h3 className="font-bold text-[15px] text-start mt-4">
          {roommate.title}
        </h3>
        {roommate.address.address && (
          <div className="flex items-start mt-[15px] gap-[10px]">
            <img
              src={locationIcon}
              alt=""
              className="max-w-[20px] max-h-[auto]"
            />
            <p className="text-black font-regular text-[15px] text-start underline">
              {roommate.address.address}
            </p>
          </div>
        )}
        {roommate.moveInStart && (
          <div className="flex items-start mt-[20px] gap-[10px]">
            <img
              src={calendarIcon}
              alt=""
              className="max-w-[20px] max-h-[auto]"
            />
            <p className="text-black font-regular text-[15px] text-start">
              Старт заселения:
              <br />
              {new Date(roommate.moveInStart).toLocaleDateString()}
            </p>
          </div>
        )}
        {roommate.roomiePreferences && (
          <div className="flex items-start mt-[20px] gap-[10px]">
            <img
              src={descriptionIcon}
              alt=""
              className="max-w-[20px] max-h-[auto]"
            />
            <p className="text-black font-regular text-[15px] text-start">{roommate.roomiePreferences}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RoommateCard;
