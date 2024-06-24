import React from "react";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerContent}>
        <Link to="/" className={style.logo}>
          ОРГМУ
        </Link>
      </div>
      {/* <div className={style.footerContent}>
        <h2>Компания</h2>
        <p>Места</p>
        <p>Интересы</p>
      </div> */}
      <div className={style.footerContent}>
        <Link to="https://t.me/coworking_orgmu">
          <h2>Контакты</h2>
          <img src="/public/Artboard.png" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
