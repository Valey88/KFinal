import { Link } from "react-scroll";
import "./Header.css";
import { useState } from "react";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="headerLogo">
          <a href="/">ОРГМУ</a>
        </div>
        <nav
          className={`headerNav ${isOpen ? "active" : ""}`}
          onClick={() => setOpen(false)}
        >
          <ul className="headerNavList">
            <li className="headerNavItem">
              <Link to="onas" smooth={true}>
                О нас{" "}
              </Link>
            </li>
            <li className="headerNavItem">
              <Link to="prem" smooth={true}>
                Преимущества
              </Link>
            </li>
            <li className="headerNavItem">
              <a href="/Booking">Бронирование</a>
            </li>
            <li className="headerNavItem">
              <a href="https://t.me/coworking_orgmu">Контакты</a>
            </li>
          </ul>
        </nav>
        <div className="headerMenu">
          <button onClick={() => setOpen(!isOpen)}>
            <img src="/public/Category.svg" width={40} height={40} alt="" />
          </button>
        </div>
      </header>
    </>
  );
}
