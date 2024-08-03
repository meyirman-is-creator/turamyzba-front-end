import { useEffect, useState, useRef } from "react";
import PhotosUploader from "../PhotosUploads";
import AccountNavigation from "../components/AccountNavigation";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import checkIcon from "../assets/checkIcon.svg";
import upIcon from "../assets/upIcon.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import downIcon from "../assets/downIcon.svg";
import Regions from "../data/Regions.json";
import useResponsive from "../service/useResponsive";

export default function FindRoommateFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [monthlyExpensePerPerson, setMonthlyExpensePerPerson] = useState("");
  const [utilityService, setUtilityService] = useState("");
  const [deposit, setDeposit] = useState("");
  const [haveDeposit, setHaveDeposit] = useState(false);
  const [moveInStart, setMoveInStart] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [maxPeople, setMaxPeople] = useState(1);
  const [apartmentInfo, setApartmentInfo] = useState("");
  const [ownerInfo, setOwnerInfo] = useState("");
  const [roomiePreferences, setRoomiePreferences] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [callPreference, setCallPreference] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappNumberPreference, setWhatsappNumberPreference] =
    useState(true);
  const [redirect, setRedirect] = useState(false);
  const [selectedGender, setSelectedGender] = useState("female");
  const [communalServices, setCommunalServices] = useState(false);

  const [showRegionError, setShowRegionError] = useState(false);
  const [showDistrictError, setShowDistrictError] = useState(false);

  const apartmentInfoRef = useRef(null);
  const ownerInfoRef = useRef(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    axios
      .get(`/findroommate/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        const [regionPart, districtPart, addressPart] =
          data.address.address.split(", ");
        setRegion(regionPart);
        setDistrict(districtPart);
        setAddress(addressPart);
        setMonthlyExpensePerPerson(data.monthlyExpensePerPerson.toString());
        setUtilityService(
          data.utilityService ? data.utilityService.toString() : ""
        );
        setDeposit(data.deposit ? data.deposit.toString() : "");
        setMoveInStart(data.moveInStart.split("T")[0]);
        setMaxPeople(data.maxPeople);
        setApartmentInfo(data.apartmentInfo);
        setOwnerInfo(data.ownerInfo);
        setRoomiePreferences(data.roomiePreferences);
        setContactNumber(data.contactNumber);
        setCallPreference(data.callPreference);
        setWhatsappNumber(data.whatsappNumber);
        setAddedPhotos(data.photos);
        setSelectedGender(data.selectedGender);
        setCommunalServices(data.communalServices);
      })
      .catch((error) => {
        console.error("Error fetching roommate details:", error);
      });
  }, [id]);

  useEffect(() => {
    if (selectedGender === "female") {
      if (maxPeople === 0) {
        setTitle(`Количество людей не может быть равно 0`);
      } else if (maxPeople === 1) {
        setTitle(`Ищем 1 девушку`);
      } else {
        setTitle(`Ищем ${maxPeople} девушек`);
      }
    } else if (selectedGender === "male") {
      if (maxPeople === 0) {
        setTitle(`Количество людей не может быть равно 0`);
      } else if (maxPeople === 1) {
        setTitle(`Ищем 1 парня`);
      } else {
        setTitle(`Ищем ${maxPeople} парней`);
      }
    }
  }, [maxPeople, selectedGender]);

  function inputHeader(text) {
    return (
      <h2 className="text-[30px] text-white font-bold mb-[10px]">{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
      <p className="text-[#919EAB] text-[20px] font-medium mb-[20px]">{text}</p>
    );
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const textareaRef = useRef(null);
  const adjustTextareaHeight = (textareaRef) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "inherit";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  const handleInputChange = (event) => {
    setRoomiePreferences(event.target.value);
    adjustTextareaHeight(textareaRef);
  };

  const handleApartmentInfoChange = (event) => {
    setApartmentInfo(event.target.value);
    adjustTextareaHeight(apartmentInfoRef);
  };

  const handleOwnerInfoChange = (event) => {
    setOwnerInfo(event.target.value);
    adjustTextareaHeight(ownerInfoRef);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setDistrict(""); // Сбросить район при изменении региона
    setShowRegionError(false);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
    setShowDistrictError(false);
  };

  useEffect(() => {
    adjustTextareaHeight(apartmentInfoRef);
    adjustTextareaHeight(ownerInfoRef);
    adjustTextareaHeight(textareaRef);
  }, []);

  const validateForm = () => {
    let valid = true;
    if (!region) {
      setShowRegionError(true);
      valid = false;
    }
    if (!district) {
      setShowDistrictError(true);
      valid = false;
    }
    return valid;
  };

  async function saveRoommate(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const roommateData = {
      title,
      address: `${region}, ${district}, ${address}`,
      addedPhotos,
      monthlyExpensePerPerson,
      utilityService,
      deposit,
      moveInStart,
      maxPeople,
      apartmentInfo,
      ownerInfo,
      roomiePreferences,
      contactNumber,
      callPreference,
      whatsappNumber,
      whatsappNumberPreference,
      selectedGender,
      communalServices,
    };
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (id) {
        await axios.put(`/findroommate-update/${id}`, roommateData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        await axios.post("/findroommate-create", roommateData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving roommate:", error);
    }
  }

  if (redirect) {
    return <Navigate to="/account/findroommate" />;
  }

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };
  const breakpoints = [
    { name: "sSmall", width: 370 },
    { name: "small", width: 480 },
    { name: "medium-res", width: 599 },
    { name: "medium", width: 768 },
    { name: "large", width: 1130 },
    { name: "xlarge", width: Infinity }, // for widths greater than 1130
  ];
  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
  const isMediumRes = activeBreakpoint === "medium-res";
  const isMedium = activeBreakpoint === "medium";
  const isLarge = activeBreakpoint === "large";
  const isXLarge = activeBreakpoint === "xlarge";
  const isSSmall = activeBreakpoint === "sSmall";
  return (
    <div>
      <Header />

      <div className="max-w-[1200px] px-[20px] mx-auto pb-[50px] mt-[40px]">
        <nav className={`${isSSmall?'text-[12px]':isSmall?'text-[15px]':'text-[20px]'} mb-[20px] text-[#33FF00] gap-[5px] flex items-end `}>
          <Link to="/" className="text-[#33FF00] hover:underline">
            Главная  {isLarge || isXLarge && "страница"}
          </Link>{" "}
          /
          <Link
            to="/account/findroommate"
            className="text-[#33FF00] hover:underline"
          >
            {(isLarge||isXLarge)?'Ваши объявления':'Объявлений'}
            
          </Link>{" "}
          /
          <span className="text-[#919EAB]">
            {id ? " Редактировать" : " Создать"}{(isLarge||isXLarge)&&' объявление'}
          </span>
        </nav>
        
        <h1 className="text-[40px] font-bold mb-[30px] text-white">
          Ищу соседа по комнате
        </h1>

        <form onSubmit={saveRoommate}>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px] ">
            {preInput("Кого ищете?*", "Мужчину или женщину?")}
            <div className="flex items-start gap-[50px]">
              <label className={`cursor-pointer gap-[5px] flex items-center `}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={selectedGender === "male"}
                  onChange={() => handleGenderSelection("male")}
                  className="hidden"
                />
                <span role="img" aria-label="male " className="text-[40px]">
                  🧔🏻‍♂️
                </span>
                <div
                  className={`w-[40px] h-[40px] flex items-center justify-center rounded-[5px] ${
                    selectedGender === "male" ? "bg-[#33FF00]" : "bg-[#919EAB]"
                  }`}
                >
                  {selectedGender === "male" && (
                    <img src={checkIcon} alt="check" />
                  )}
                </div>
              </label>
              <label className={`cursor-pointer gap-[5px] flex items-center $`}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={selectedGender === "female"}
                  onChange={() => handleGenderSelection("female")}
                  className="hidden"
                />
                <span role="img" aria-label="female" className="text-[40px]">
                  👩🏻
                </span>
                <div
                  className={`w-[40px] h-[40px] rounded-[5px] flex items-center justify-center ${
                    selectedGender === "female"
                      ? "bg-[#33FF00]"
                      : "bg-[#919EAB]"
                  }`}
                >
                  {selectedGender === "female" && (
                    <img src={checkIcon} alt="check" />
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Сколько людей ищете?*", "")}
            <div className=" flex items-start gap-[20px]">
              <input
                type="number"
                placeholder="Количество людей"
                value={maxPeople}
                onChange={(e) => setMaxPeople(e.target.value)}
                className={`w-[80px] h-[40px] text-[30px] font-bold bg-[#919EAB] placeholder:text-[#5D656C] text-black border-[1px] border-[#919EAB] rounded-[5px] text-center ${
                  maxPeople <= 0 ? "border-[red]" : ""
                }`}
              />
              <div className="flex items-start gap-[10px]">
                <button
                  type="button"
                  className="bg-[#33FF00]  w-[40px] h-[40px] rounded-[5px]  flex items-center justify-center"
                  onClick={() => setMaxPeople((prev) => prev + 1)}
                >
                  <img
                    src={upIcon}
                    alt=""
                    className="w-[40px] h-[40px] rounded-[5px]"
                  />
                </button>
                <button
                  type="button"
                  className={`bg-[#33FF00] w-[40px] h-[40px] rounded-[5px]  flex items-center justify-center `}
                  disabled={maxPeople <= 0}
                  onClick={() => setMaxPeople((prev) => prev - 1)}
                >
                  <img
                    src={downIcon}
                    alt=""
                    className="w-[40px] h-[40px] rounded-[5px]"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Заголовок*", "Краткое описание вашего поиска сожителя.")}
            <input
              type="text"
              placeholder={`Например: Ищу соседа в центр города`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#919EAB] rounded-[5px] placeholder:text-[#5D656C] text-[black] font-medium text-[20px] h-[50px] px-[15px]"
            />
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Адрес*", "Введите адрес жилья")}
            <div className="w-[100%] flex justify-between">
              <div className="w-[48%] flex justify-between">
                <div className="w-[48%]">
                  <select
                    value={region}
                    onChange={handleRegionChange}
                    className={`w-[100%] bg-[#919EAB] border-[#919EAB] rounded-[5px] text-[black] font-medium text-[20px] h-[50px] px-[15px] border-[1px] ${
                      showRegionError ? "border-[red]" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Выберите регион
                    </option>
                    {Regions.regions.map((region) => (
                      <option key={region.name} value={region.name}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                  {showRegionError && (
                    <span className="text-[red]">
                      Необходимо выбрать область
                    </span>
                  )}
                </div>
                <div className="w-[48%]">
                  {region && (
                    <select
                      value={district}
                      onChange={handleDistrictChange}
                      className={`w-[100%] bg-[#919EAB] border-[#919EAB] rounded-[5px]  text-[black] border-[1px] font-medium text-[20px] h-[50px] px-[15px] ${
                        showDistrictError ? "border-[red]" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Выберите район
                      </option>
                      {Regions.regions
                        .find((r) => r.name === region)
                        .districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                    </select>
                  )}
                  {showDistrictError && (
                    <span className="text-[red]">Необходимо выбрать район</span>
                  )}
                </div>
              </div>
              <input
                type="text"
                placeholder="Адрес"
                value={address}
                onClick={() => {
                  console.log("asdfasd");
                  if (!region) setShowRegionError(true);
                  else if (region && !district) setShowDistrictError(true);
                }}
                onChange={(e) => setAddress(e.target.value)}
                className="w-[50%] bg-[#919EAB] rounded-[5px] border-[#919EAB] text-black font-medium text-[20px] h-[50px] placeholder:text-[#5D656C] px-[15px]"
              />
            </div>
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Фотографии*", "Чем больше, тем лучше")}
            <PhotosUploader
              onChange={setAddedPhotos}
              addedPhotos={addedPhotos}
            />
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput(
              "Дата начала заселения*",
              "Предпочитаемая дата начала заселения"
            )}
            <label htmlFor="date-picker">
              <input
                id="date-picker"
                type="date"
                value={moveInStart}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setMoveInStart(e.target.value)}
                className="w-[150px] h-[50px] text-center px-2 rounded-[5px] bg-[#919EAB] placeholder:text-[#5D656C]"
              />
            </label>
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Предпочитаете звонки?*", "")}
            <label className="inline-flex cursor-pointer items-center gap-[15px]">
              <input
                type="checkbox"
                checked={callPreference}
                onChange={(e) => setCallPreference(e.target.checked)}
                className="hidden "
              />
              <div
                className={`w-[40px] h-[40px] rounded-[5px] flex items-center justify-center ${
                  callPreference ? "bg-[#33FF00]" : "bg-[#919EAB]"
                }`}
              >
                {callPreference && <img alt="" src={checkIcon} />}
              </div>
              <span className=" text-[25px] text-white font-medium">Да</span>
            </label>
            {callPreference && (
              <>
                {preInput("", "Ваш контактный номер")}

                <PhoneInput
                  defaultCountry="KZ"
                  placeholder="8 (777) 777 77 77"
                  value={contactNumber}
                  className="w-full bg-[#919EAB] rounded-[5px] text-[black] placeholder:text-[#5D656C] font-medium text-[20px] h-[50px] px-[15px]"
                  onChange={setContactNumber}
                />
              </>
            )}
          </div>

          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Предпочитаете сообщения в WhatsApp?*", "")}
            <label className="inline-flex items-center  cursor-pointer gap-[15px]">
              <input
                type="checkbox"
                checked={whatsappNumberPreference}
                onChange={(e) => setWhatsappNumberPreference(e.target.checked)}
                className="hidden"
              />
              <div
                className={`w-[40px] h-[40px] rounded-[5px] flex items-center justify-center ${
                  whatsappNumberPreference ? "bg-[#33FF00]" : "bg-[#919EAB]"
                }`}
              >
                {whatsappNumberPreference && <img alt="" src={checkIcon} />}
              </div>
              <span className=" text-[25px] font-medium text-white">Да</span>
            </label>
            {whatsappNumberPreference && (
              <>
                {preInput("", "Ваш WhatsApp номер")}

                <PhoneInput
                  defaultCountry="KZ"
                  placeholder="8 (777) 777 77 77"
                  value={whatsappNumber}
                  className="w-full bg-[#919EAB] rounded-[5px] text-[black] placeholder:text-[#5D656C] font-medium text-[20px] h-[50px] px-[15px]"
                  onChange={setWhatsappNumber}
                />
              </>
            )}
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Предпочтения к сожителю*", "")}
            <textarea
              ref={textareaRef}
              placeholder="Опишите свои предпочтения к сожителю"
              value={roomiePreferences}
              className="w-full bg-[#919EAB] rounded-[5px] placeholder:text-[#5D656C] text-[black] font-medium текст-[20px] p-[15px]"
              style={{ overflow: "hidden", resize: "none" }}
              onChange={handleInputChange}
              onInput={handleInputChange}
            />
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput(
              "Ежемесячный платеж за аренду квартиры от каждого человека*",
              "депозит или коммунальные услуги укажите отдельно."
            )}
            <input
              type="text"
              placeholder="Только цифры укажите"
              value={monthlyExpensePerPerson}
              onChange={(e) => setMonthlyExpensePerPerson(e.target.value)}
              className="w-full bg-[#919EAB] rounded-[5px] placeholder:text-[#5D656C] text-[black] font-medium text-[20px] h-[50px] px-[15px]"
            />
          </div>
          <h3 className="text-[30px] text-white font-medium mb-[30px]">
            Следующие данные необязательны, но, заполнив их, вы поможете вашему
            будущему соседу по комнате избежать лишних вопросов
          </h3>

          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Есть депозит?", "")}
            <label className="inline-flex items-center gap-[15px]">
              <input
                type="checkbox"
                checked={haveDeposit}
                onChange={(e) => setHaveDeposit(e.target.checked)}
                className="hidden"
              />
              <div
                className={`w-[40px] h-[40px] rounded-[5px] flex items-center justify-center ${
                  haveDeposit ? "bg-[#33FF00]" : "bg-[#919EAB]"
                }`}
              >
                {haveDeposit && <img alt="" src={checkIcon} />}
              </div>
              <span className=" text-[25px] font-medium text-white">Да</span>
            </label>
            {haveDeposit && (
              <>
                {preInput("", "Только цифры пишите")}

                <input
                  type="text"
                  placeholder="Сумма в тенге"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full bg-[#919EAB] rounded-[5px] placeholder:text-[#5D656C] text-[black] font-medium text-[20px] h-[50px] px-[15px]"
                />
              </>
            )}
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Есть коммунальные услуги?", "")}
            <label className="inline-flex items-center gap-[15px]">
              <input
                type="checkbox"
                checked={communalServices}
                onChange={(e) => setCommunalServices(e.target.checked)}
                className="hidden"
              />
              <div
                className={`w-[40px] h-[40px] rounded-[5px] flex items-center justify-center ${
                  communalServices ? "bg-[#33FF00]" : "bg-[#919EAB]"
                }`}
              >
                {communalServices && <img alt="" src={checkIcon} />}
              </div>
              <span className=" text-[25px] font-medium text-white">Да</span>
            </label>
            {communalServices && (
              <>
                {preInput("", "Только цифры пишите")}
                <input
                  type="text"
                  placeholder="Сумма в тенге"
                  value={utilityService}
                  onChange={(e) => setUtilityService(e.target.value)}
                  className="w-full bg-[#919EAB] rounded-[5px] placeholder:text-[#5D656C] text-[black] font-medium text-[20px] h-[50px] px-[15px]"
                />
              </>
            )}
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Информация о квартире", "Описание квартиры")}
            <textarea
              ref={apartmentInfoRef}
              placeholder="Опишите квартиру"
              value={apartmentInfo}
              onChange={handleApartmentInfoChange}
              className="w-full bg-[#919EAB] rounded-[5px] placeholder:text-[#5D656C] text-[black] font-medium text-[20px] p-[15px]"
              style={{ overflow: "hidden", resize: "none" }}
            />
          </div>
          <div className="w-full bg-[#212B36] rounded-[5px] p-[20px] mb-[20px]">
            {preInput("Информация о вас", "Опишите себя")}
            <textarea
              ref={ownerInfoRef}
              placeholder="Опишите себя"
              value={ownerInfo}
              onChange={handleOwnerInfoChange}
              className="w-full bg-[#919EAB] rounded-[5px] placeholder:text-[#5D656C] text-[black] font-medium text-[20px] p-[15px]"
              style={{ overflow: "hidden", resize: "none" }}
            />
          </div>

          <div className="flex gap-[30px]">
            <button
              type="submit"
              className="w-[270px] bg-[#33FF00] rounded-[5px] text-[20px] font-medium h-[50px] text-black"
            >
              {id ? "Сохранить изменения" : "Подать объявление"}
            </button>
            <Link
              to={"/account/findroommate"}
              className="w-[270px] flex justify-center items-center bg-transparent border-[white] border-[2px] rounded-[5px] text-[20px] font-medium h-[50px] text-white"
            >
              Отмена
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
