import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleForgotPasswordSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('/request-reset-password', { email, type: 'passwordReset' });
      setMessage('Код для сброса пароля отправлен на вашу почту.');
      setError('');
      navigate('/verify-code', { state: { email, isPasswordReset: true } });
    } catch (error) {
      setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
      setMessage('');
    }
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-[100px]">
        <div className="w-full max-w-md bg-[#212B36] rounded-[5px] shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-white mb-6">
            Забыли пароль
          </h1>
          <form onSubmit={handleForgotPasswordSubmit}>
            <div className="mb-4">
              <label className="block text-white">Email</label>
              <input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Отправить
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
