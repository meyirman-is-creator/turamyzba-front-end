import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email, isPasswordReset } = location.state || {};

  async function handleVerifyCodeSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/verify-code', { email, code });

      if (isPasswordReset) {
        setMessage('Код подтвержден. Пожалуйста, сбросьте ваш пароль.');
        navigate('/reset-password', { state: { email, code } });
      } else {
        setMessage('Код подтвержден.');
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/')

        window.location.reload();
      }
    } catch (error) {
      setError('Неверный или истекший код.');
      setMessage('');
    }
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-[100px]">
        <div className="w-full max-w-md bg-[#212B36] rounded-[5px] shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-white mb-6">
            Верификация кода
          </h1>
          <form onSubmit={handleVerifyCodeSubmit}>
            <div className="mb-4">
              <label className="block text-white">Код</label>
              <input
                type="text"
                placeholder="Введите код"
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
              Подтвердить
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
