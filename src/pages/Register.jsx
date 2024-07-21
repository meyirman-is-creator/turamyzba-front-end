import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      const response = await axios.post("/register", {
        fullName,
        nickName,
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setRedirect(true);
    } catch (error) {
      console.log(error);
      setError("Ошибка регистрации. Попробуйте еще раз.");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Регистрация
          </h1>
          <form onSubmit={registerUser}>
            <div className="mb-4">
              <label className="block text-gray-700">Полное имя</label>
              <input
                type="text"
                placeholder="Введите ваше полное имя"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Никнейм</label>
              <input
                type="text"
                placeholder="Введите ваш никнейм"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Пароль</label>
              <input
                type="password"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Подтвердите пароль</label>
              <input
                type="password"
                placeholder="Подтвердите ваш пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            {error && (
              <p className="mb-4 text-red-500 text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Зарегистрироваться
            </button>
            <div className="text-center py-4 text-gray-600">
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
