import React, { useState, useContext } from "react";
import bedbg from "../assets/doctor-g54d4d9aa7_1920.jpg";
import uilogo from "../assets/uilogo.png";
import { Navigate } from "react-router-dom";
import { loginContext } from "./context/auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const { login, loggedIn } = useContext(loginContext);
  const submitLogin = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  if (loggedIn) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div
      className="min-h-screen lg:max-h-screen lg:overflow-hidden lg:py-32 flex justify-center items-center lg:flex-row lg:h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.300), rgba(0, 0, 0, 0.300)),url(${bedbg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="backdrop-blur-3xl backdrop-brightness-75 backdrop-opacity-100 flex flex-col lg:flex-row">
        <div className="p-8 lg:p-16">
          <div className="flex flex-col gap-2 justify-center items-center">
            <img src={uilogo} className="w-44" />
            <h2 className="text-base lg:text-2xl lg:px-0 text-white font-bold">
              University Health Services
            </h2>
          </div>
          <div className="pt-8">
            <h1 className="text-base text-white mb-4">Welcome...</h1>
            <form onSubmit={submitLogin}>
              <div className="flex flex-col mb-4">
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  className="py-2 px-2 border border-gray-300 rounded-md focus:border-blue-300 outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="py-2 px-2 border border-gray-300 rounded-md focus:border-blue-300 outline-none"
                  onChange={handleChange}
                />
              </div>

              <button className="bg-indigo-700 px-24 py-2 rounded-lg font-semibold text-white text-md hover:bg-indigo-500">
                {"Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
