import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useAppDispatch } from "../../../redux/store";
// import { loginUser } from "../../../redux/authSlice";
import style from "./Auth.module.css";

const Auth = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const authentication = async () => {
    console.log({
      login,
      password,
    });

    try {
      await axios.post(
        "http://localhost:3000/auth/login",
        {
          login,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setLogin("");
      setPassword("");

      // Определяем функцию getCookie
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      }

      // Теперь функция getCookie определена и может быть использована
      const accessToken = getCookie("accesstoken");
      if (accessToken) {
        window.location.href = "/Admin"; // Перенаправление на страницу администратора, если есть access token в cookie
      } else {
        window.location.href = "/"; // Перенаправление на страницу учетной записи для обычных пользователей
      }
    } catch (error) {
      console.log("Error:", error);
      // Handle login error
    }
  };

  return (
    <div className={style.Auth}>
      <div className={style.container}>
        <form className={style.Auth_form}>
          <div className={style.Auth_nav}>
            <Link to="/login">Login</Link>
            <Link to="/registration">Create Account</Link>
          </div>
          <div>
            <h2>WELCOME BACK</h2>
            <p>
              Sign into your existing account to earn rewards, check existing
              orders and more
            </p>
          </div>
          <div className={style.Auth_form_input}>
            <input
              type="text"
              value={login}
              placeholder="login"
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={(e) => {
              authentication();
              e.preventDefault();
            }}
          >
            🚀 Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
