import axios from 'axios';
import { useState } from 'react';
import Header from '../components/Header';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleForgotPasswordSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/request-reset-password', { email });
      setMessage('Токен для сброса пароля отправлен на вашу почту.');
      setError('');
    } catch (error) {
      setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
      setMessage('');
    }
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Forgot Password
          </h1>
          <form onSubmit={handleForgotPasswordSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
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
              className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
