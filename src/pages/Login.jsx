import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Header from "../components/Header";
import useResponsive from "../service/useResponsive";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, refreshProfile } = useContext(UserContext);
  
  const breakpoints = [
    { name: "small", width: 480 },
    { name: "medium", width: 768 },
    { name: "large", width: 1130 },
    { name: "xlarge", width: Infinity },
  ];
  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
  const isMedium = activeBreakpoint === "medium";
  const isLarge = activeBreakpoint === "large";
  const isXLarge = activeBreakpoint === "xlarge";

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setUser(response.data.userDoc);
      await refreshProfile();
      setRedirect(true);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Header />
      <div className={`flex items-center justify-center my-[100px] px-[20px] ${(isMedium || isSmall) && 'mt-[30px]'}`}>
        <div className="w-full max-w-md bg-[#212B36] rounded-[5px] shadow-lg p-8">
          <h1 className={`text-2xl sm:text-3xl font-semibold text-center text-white mb-6`}>
            Войти
          </h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-white">Email</label>
              <input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-black border rounded-[5px] focus:outline-none placeholder:text-[#919EAB]"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white">Пароль</label>
              <input
                type="password"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-black border rounded-[5px] focus:outline-none placeholder:text-[#919EAB]"
              />
            </div>
            {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-[5px] hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              disabled={loading}
            >
              {loading ? "Вход..." : "Войти"}
            </button>
            <div className="text-center py-4 text-gray-600">
              <Link
                to="/forgot-password"
                className="text-indigo-500 hover:underline"
              >
                Забыли пароль?
              </Link>
            </div>
            <div className="text-center py-4 text-[#919EAB]">
              Нет аккаунта?{" "}
              <Link to="/register" className="text-indigo-500 hover:underline">
                Зарегистрируйтесь сейчас
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
