import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import useResponsive from "../service/useResponsive";

export default function VerifyCodePage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120); // 2 minutes
  const [resendEnabled, setResendEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, fullName, nickName, password, isPasswordReset } =
    location.state || {};
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
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  async function handleVerifyCodeSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/verify-code", { email, code });

      if (isPasswordReset) {
        setMessage("Код подтвержден. Пожалуйста, сбросьте ваш пароль.");
        navigate("/reset-password", { state: { email, code } });
      } else {
        setMessage("Код подтвержден.");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setError("Неверный или истекший код.");
      setMessage("");
    }
  }

  async function handleResendCode() {
    try {
      await axios.post("/request-reset-password", {
        email,
        type: isPasswordReset ? "passwordReset" : "register",
      });
      setMessage("Код для подтверждения отправлен повторно.");
      setTimer(120); // reset timer to 2 minutes
      setResendEnabled(false);
    } catch (error) {
      setError("Ошибка при повторной отправке кода.");
    }
  }

  return (
    <>
      <Header />
      <div
        className={`flex items-center justify-center my-[100px] ${
          (isMedium || isSmall) && "mt-[30px]"
        } px-[20px]`}
      >
        <div className="w-full max-w-md bg-[#212B36] rounded-lg  p-8">
          <h1 className="text-3xl font-semibold text-center text-white mb-6">
            Верификация кода
          </h1>
          <form onSubmit={handleVerifyCodeSubmit}>
            <div className="mb-4 text-center">
              <label className="block text-white">Код</label>
              <input
                type="text"
                placeholder="Введите код"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-3 py-2 text-black placeholder-gray-400 border rounded-[5px] focus:outline-none "
              />
            </div>
            {message && (
              <p className="mb-4 text-green-500 text-center">{message}</p>
            )}
            {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-[5px] hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Подтвердить
            </button>
          </form>
          <div className="text-center mt-4 text-gray-600">
            {timer > 0 ? (
              <p>
                Код истекает через {Math.floor(timer / 60)}:
                {("0" + (timer % 60)).slice(-2)}
              </p>
            ) : (
              <button
                onClick={handleResendCode}
                className="text-indigo-500 hover:underline"
                disabled={!resendEnabled}
              >
                Отправить код снова
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
