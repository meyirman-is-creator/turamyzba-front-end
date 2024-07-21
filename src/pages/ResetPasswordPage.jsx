import axios from 'axios';
import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../components/Header';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function handleResetPasswordSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    try {
      await axios.post('/reset-password', { token, newPassword });
      setMessage('Пароль успешно сброшен');
      setError('');
      setRedirect(true);
    } catch (error) {
      setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
      setMessage('');
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Reset Password
          </h1>
          <form onSubmit={handleResetPasswordSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
