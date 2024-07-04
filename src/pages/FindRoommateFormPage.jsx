import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploads";
import AccountNavigation from "../components/AccountNavigation";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function FindRoommateFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [monthlyExpensePerPerson, setMonthlyExpensePerPerson] = useState("");
  const [utilityService, setUtilityService] = useState("");
  const [deposit, setDeposit] = useState("");
  const [moveInStart, setMoveInStart] = useState("");
  const [maxPeople, setMaxPeople] = useState(1);
  const [apartmentInfo, setApartmentInfo] = useState("");
  const [ownerInfo, setOwnerInfo] = useState("");
  const [roomiePreferences, setRoomiePreferences] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [callPreference, setCallPreference] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const accessToken = localStorage.getItem('accessToken');

    axios.get(`/findroommate/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address.address);
      setMonthlyExpensePerPerson(data.monthlyExpensePerPerson.toString());
      setUtilityService(data.utilityService.toString());
      setDeposit(data.deposit.toString());
      setMoveInStart(data.moveInStart);
      setMaxPeople(data.maxPeople);
      setApartmentInfo(data.apartmentInfo);
      setOwnerInfo(data.ownerInfo);
      setRoomiePreferences(data.roomiePreferences);
      setContactNumber(data.contactNumber);
      setCallPreference(data.callPreference);
      setWhatsappNumber(data.whatsappNumber);
      setAddedPhotos(data.photos);
    }).catch(error => {
      console.error('Error fetching roommate details:', error);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveRoommate(e) {
    e.preventDefault();
    const roommateData = {
      title,
      address,
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
    };
    const accessToken = localStorage.getItem('accessToken');

    try {
      if (id) {
        await axios.put(`/findroommate-update/${id}`, roommateData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
      } else {
        await axios.post("/findroommate-create", roommateData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
      }
      setRedirect(true);
    } catch (error) {
      console.error('Error saving roommate:', error);
    }
  }

  if (redirect) {
    return <Navigate to="/account/roommates" />;
  }

  return (
    <div>
      <AccountNavigation />
      <div className="container mx-auto px-4 bg-[white]" style={{ width: '1200px' }}>
        <form onSubmit={saveRoommate}>
          <h1 className="font-bold text-3xl">Подайте объявление для поиска сожителя</h1>
          {preInput("Заголовок", "Краткое описание вашего поиска сожителя.")}
          <input
            type="text"
            placeholder="Например: Ищу соседа в центр города"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {preInput("Адрес", "Введите адрес жилья")}
          <input
            type="text"
            placeholder="Адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {preInput("Фотографии", "Чем больше, тем лучше")}
          <PhotosUploader onChange={setAddedPhotos} addedPhotos={addedPhotos} />
          {preInput("Ежемесячные расходы на человека", "Включая аренду и коммунальные услуги")}
          <input
            type="text"
            placeholder="Сумма в тенге"
            value={monthlyExpensePerPerson}
            onChange={(e) => setMonthlyExpensePerPerson(e.target.value)}
          />
          {preInput("Дополнительные расходы", "Ежемесячные дополнительные расходы")}
          <input
            type="text"
            placeholder="Сумма в тенге"
            value={utilityService}
            onChange={(e) => setUtilityService(e.target.value)}
          />
          {preInput("Депозит", "Сумма депозита")}
          <input
            type="text"
            placeholder="Сумма в тенге"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
          {preInput("Дата начала заселения", "Предпочитаемая дата начала заселения")}
          <input
            type="date"
            value={moveInStart}
            onChange={(e) => setMoveInStart(e.target.value)}
          />
          {preInput("Максимальное количество людей", "Максимальное количество людей в квартире")}
          <input
            type="number"
            placeholder="Количество"
            value={maxPeople}
            onChange={(e) => setMaxPeople(e.target.value)}
          />
          {preInput("Информация о квартире", "Описание квартиры")}
          <textarea
            placeholder="Опишите квартиру"
            value={apartmentInfo}
            onChange={(e) => setApartmentInfo(e.target.value)}
          />
          {preInput("Информация о вас", "Описание о себе")}
          <textarea
            placeholder="Опишите себя"
            value={ownerInfo}
            onChange={(e) => setOwnerInfo(e.target.value)}
          />
          {preInput("Предпочтения к сожителю", "Предпочтения к будущему сожителю")}
          <textarea
            placeholder="Опишите свои предпочтения к сожителю"
            value={roomiePreferences}
            onChange={(e) => setRoomiePreferences(e.target.value)}
          />
          {preInput("Контактный номер", "Ваш контактный номер")}
          <input
            type="text"
            placeholder="Контактный номер"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          {preInput("Предпочтение к звонкам", "Предпочитаете звонки?")}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={callPreference}
              onChange={(e) => setCallPreference(e.target.checked)}
            />
            <span className="ml-2">Да</span>
          </label>
          {preInput("Номер WhatsApp", "Ваш номер WhatsApp")}
          <input
            type="text"
            placeholder="Номер WhatsApp"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />
          <div>
            <button className="primary my-4">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
}
