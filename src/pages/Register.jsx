import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ClipLoader } from "react-spinners";
import useResponsive from "../service/useResponsive";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const breakpoints = [
    { name: "small", width: 480 },
    { name: "medium", width: 768 },
    { name: "large", width: 1130 },
    { name: "xlarge", width: Infinity }, // for widths greater than 1024
  ];
  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
  const isMedium = activeBreakpoint === "medium";
  const isLarge = activeBreakpoint === "large";
  const isXLarge = activeBreakpoint === "xlarge";
  async function registerUser(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/register", {
        fullName,
        nickName,
        email,
        password,
      });
      navigate("/verify-code", {
        state: { email, fullName, nickName, password, isPasswordReset: false },
      });
    } catch (error) {
      console.log(error);
      setError("Ошибка регистрации. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className={`flex items-center justify-center my-[100px] ${(isMedium ||isSmall) && 'mt-[30px]'} px-[20px]`}>
        <div className="w-full max-w-md bg-[#212B36] rounded-[5px] p-8">
          <h1 className="text-3xl font-semibold text-center text-white mb-6">
            Регистрация
          </h1>
          <form onSubmit={registerUser}>
            <div className="mb-4">
              <label className="block text-white">Полное имя</label>
              <input
                type="text"
                placeholder="Введите ваше полное имя"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 text-black border rounded-[5px] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Никнейм</label>
              <input
                type="text"
                placeholder="Введите ваш никнейм"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                required
                className="w-full px-3 py-2 text-black border rounded-[5px] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Email</label>
              <input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-black border rounded-[5px] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Пароль</label>
              <input
                type="password"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-black border rounded-[5px] focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white">Подтвердите пароль</label>
              <input
                type="password"
                placeholder="Подтвердите ваш пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-black border rounded-[5px] focus:outline-none"
              />
            </div>
            {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
            {loading ? (
              <div className="flex justify-center">
                <ClipLoader size={35} color={"#fff"} loading={loading} />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-[5px] hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Зарегистрироваться
              </button>
            )}
            <div className="text-center py-4 text-[#919EAB]">
              Уже зарегистрированы?{" "}
              <Link to="/login" className="text-indigo-500 hover:underline">
                Войти
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
