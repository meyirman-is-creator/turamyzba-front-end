import { Link } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import Header from "../components/Header";

export default function AboutRoommatePage() {
  return (
    <div>
      <Header />
      <nav className="max-w-[1200px] px-[20px] mx-[auto] mt-[40px] text-[20px] mb-[20px] text-[#33FF00] gap-[5px] flex items-end ">
        <Link to="/" className="text-[#33FF00] hover:underline">
          Главная страница
        </Link>{" "}
        /<span className="text-[#919EAB]">Моя анкета</span>
      </nav>
      <AccountNavigation />
    </div>
  );
}
