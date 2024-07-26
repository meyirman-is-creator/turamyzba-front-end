import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Header from "../components/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const { setUser, refreshProfile } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setUser(response.data.userDoc);
      await refreshProfile();
      setRedirect(true);
    } catch (error) {
      setError("Неверный email или пароль. Попробуйте снова.");
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-[100px]">
        <div className="w-full max-w-md bg-[#212B36] rounded-[5px] shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-[white] mb-6">
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
            {error && (
              <p className="mb-4 text-red-500 text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-[5px] hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Войти
            </button>
            <div className="text-center py-4 text-gray-600">
              <Link to="/forgot-password" className="text-indigo-500 hover:underline">
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
