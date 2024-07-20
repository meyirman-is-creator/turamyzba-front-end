import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    if (type === "profile") {
    }
    const isActive = pathname === "/account" && type === "profile";
    let classes =
      "w-[340px] h-[50px] flex items-center justify-center rounded-[5px] font-bold text-[20px]";
    if (type === subpage) {
      classes += " bg-[#FFE500]";
    } else {
      classes += " opacity-[0.5] bg-white border-[5px] border-[#FFE500]";
    }
    return classes;
  }
  return (
    <nav className="w-[1200px] px-[20px] mx-[auto] flex justify-center mt-8 gap-2 mb-[60px]">
      <Link className={linkClasses("profile")} to={"/account"}>
        Профиль
      </Link>
      <Link
        className={linkClasses("findroommate")}
        to={"/account/findroommate"}
      >
        Подать объявление
      </Link>
    </nav>
  );
}
