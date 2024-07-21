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
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      setUser(response.data.userDoc);
      setRedirect(true);
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Login
          </h1>
          <form onSubmit={handleLoginSubmit}>
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
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Sign In
            </button>
            <div className="text-center py-4 text-gray-600">
              <Link to="/forgot-password" className="text-indigo-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center py-4 text-gray-600">
              Don't have an account yet?{" "}
              <Link to="/register" className="text-indigo-500 hover:underline">
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
