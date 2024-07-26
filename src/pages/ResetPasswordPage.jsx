import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {};

  console.log(`Email: ${email}, Code: ${code}`); // Проверка передачи данных

  async function handleResetPasswordSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают.');
      setMessage('');
      return;
    }
    try {
      await axios.post('/reset-password', { email, code, newPassword });
      setMessage('Пароль успешно сброшен.');
      setError('');
      navigate('/login');
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error.response.data);
      setError('Ошибка при сбросе пароля.');
      setMessage('');
    }
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-[100px]">
        <div className="w-full max-w-md bg-[#212B36] rounded-[5px] shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-white mb-6">
            Сброс пароля
          </h1>
          <form onSubmit={handleResetPasswordSubmit}>
            <div className="mb-4">
              <label className="block text-white">Новый пароль</label>
              <input
                type="password"
                placeholder="Введите новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-black placeholder:text-[#919EAB] border rounded-[5px] focus:outline-none "
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Повторите пароль</label>
              <input
                type="password"
                placeholder="Повторите новый пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-black placeholder:text-[#919EAB] border rounded-[5px] focus:outline-none "
              />
            </div>
            {message && (
              <p className="mb-4 text-green-500 text-center">{message}</p>
            )}
            {error && (
              <p className="mb-4 text-red-500 text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-[5px] hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Сбросить пароль
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
