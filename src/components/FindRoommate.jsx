import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import locationIcon from "../assets/locationIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import descriptionIcon from "../assets/descriptionIcon.svg";
import withoutPhoto from "../photo/withoutPhoto.png";
import useResponsive from "../service/useResponsive";
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
  const breakpoints = [
    { name: "small", width: 480 },
    { name: "medium-res", width: 599 },
    { name: "medium", width: 768 },
    { name: "large", width: 1130 },
    { name: "xlarge", width: Infinity }, // for widths greater than 1024
  ];
  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
  const isMediumRes = activeBreakpoint === "medium-res";
  const isMedium = activeBreakpoint === "medium";
  const isLarge = activeBreakpoint === "large";
  const isXLarge = activeBreakpoint === "xlarge";
  return (
    <Link
      to={"/findroommate/" + roommate._id}
      className={`bg-[#212B36] rounded-[5px] ${(isMediumRes||isSmall) ? 'w-full h-[auto]':'w-[270px] h-[700px]'}   p-[20px] shadow-md flex flex-col justify-between`}
    >
      <div className="flex flex-col items-start">
        {roommate.photos?.length > 0 ? (
          <div className={`${(isMediumRes||isSmall) ? 'w-full py-[20px]':'w-[230px] p-[20px]'}  h-[230px] flex flex-col rounded-[5px] bg-[#D9D9D9]  justify-center items-center flex`}>
            <img
              className={` ${(isMediumRes||isSmall) ? 'w-full':'w-[230px]'}  h-[230px] object-cover rounded-[5px]`}
              src={roommate.photos[0]}
              alt={``}
            />
          </div>
        ) : (
          <div className={`${(isMediumRes||isSmall) ? 'w-full':'w-[230px]'}  h-[230px] flex flex-col rounded-[5px] bg-[#D9D9D9] p-[20px] justify-center items-center flex`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-[100px] text-[#212B36]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082"
              />
            </svg>
          </div>
        )}
        <div className="text-start mt-[10px] ">
          <p className="text-[10px] text-[#919EAB]">
            от каждого человека в месяц
          </p>
          <p className="text-white text-[32px] font-bold">
            {roommate.monthlyExpensePerPerson}тг
          </p>
        </div>
        <h3 className="font-bold text-[white] text-[15px] text-start mt-4">
          {roommate.title}
        </h3>
        {roommate.address.address && (
          <div className="flex text-[#919EAB] items-start mt-[15px] gap-[10px]">
            <div className="w-[20px] h-[20px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 8.75C12.5 9.41304 12.2366 10.0489 11.7678 10.5178C11.2989 10.9866 10.663 11.25 10 11.25C9.33696 11.25 8.70107 10.9866 8.23223 10.5178C7.76339 10.0489 7.5 9.41304 7.5 8.75C7.5 8.08696 7.76339 7.45107 8.23223 6.98223C8.70107 6.51339 9.33696 6.25 10 6.25C10.663 6.25 11.2989 6.51339 11.7678 6.98223C12.2366 7.45107 12.5 8.08696 12.5 8.75Z"
                  stroke="#919EAB"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.25 8.75C16.25 14.7017 10 18.125 10 18.125C10 18.125 3.75 14.7017 3.75 8.75C3.75 7.0924 4.40848 5.50268 5.58058 4.33058C6.75268 3.15848 8.3424 2.5 10 2.5C11.6576 2.5 13.2473 3.15848 14.4194 4.33058C15.5915 5.50268 16.25 7.0924 16.25 8.75Z"
                  stroke="#919EAB"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <p className="text-[#919EAB] font-regular text-[15px] text-start underline">
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
            <p className="text-[#919EAB] font-regular text-[15px] text-start">
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
            <p className="text-[#919EAB] font-regular text-[15px] text-start">
              {roommate.roomiePreferences}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RoommateCard;
