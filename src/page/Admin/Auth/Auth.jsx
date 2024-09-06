import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./Auth.module.css";
import { url } from "../../../constants/constants";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const checkUserAuth = () => {
  const accessToken = getCookie("accesstoken");

  if (accessToken) {
    window.location.href = "/admin";
    return true;
  } else {
    window.location.href = "/";
    return false;
  }
};

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
        `${url}/auth/login`,
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
      checkUserAuth();
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className={style.Auth}>
      <div className={style.container}>
        <form className={style.Auth_form}>
          <div className={style.Auth_form_title}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "50px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              Авторизация
            </h1>
          </div>
          <div className={style.Auth_nav}></div>
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
export default Auth;
