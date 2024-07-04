export default function BookingWidget({ place }) {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        <b>Цена:</b> {place.monthlyExpensePerPerson} тг / месяц
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="py-3 px-4 border-b">
          <label>Старт заселения:</label>
          <p>{new Date(place.moveInStart).toLocaleDateString()}</p>
        </div>
        <div className="py-3 px-4 border-b">
          <label>Депозит:</label>
          <p>{place.deposit} тг</p>
        </div>
        <div className="py-3 px-4">
          <label>Коммунальная услуга:</label>
          <p>{place.utilityService}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <a href={`tel:${place.contactNumber}`} className="primary block w-full text-center py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition duration-200">
          Позвонить
        </a>
        <a href={`https://wa.me/${place.whatsappNumber}`} className="primary block w-full text-center py-2 rounded-xl text-white bg-green-500 hover:bg-green-600 transition duration-200">
          Написать
        </a>
      </div>
    </div>
  );
}
