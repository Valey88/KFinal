import { Link } from "react-scroll";
import "./Header.css";
import { useState } from "react";
import adminStore from "../../store/adminStore";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const userRole = adminStore((state) => state.userRole);

  return (
    <>
      <header className="header">
        <div className="headerLogo">
          <a href="/">ОРГМУ</a>
        </div>
        <div className="headerMenu">
          <button onClick={() => setOpen(!isOpen)} className="burgerButton">
            <img src="/public/Category.svg" width={40} height={40} alt="Menu" />
          </button>
        </div>
        <nav className={`headerNav ${isOpen ? "active" : ""}`}>
          <ul className="headerNavList">
            <li className="headerNavItem">
              <Link
                style={{ color: "#3b90fb" }}
                to="onas"
                smooth={true}
                onClick={() => setOpen(false)}
              >
                О нас
              </Link>
            </li>
            <li className="headerNavItem">
              <Link
                to="prem"
                style={{ color: "#3b90fb" }}
                smooth={true}
                onClick={() => setOpen(false)}
              >
                Преимущества
              </Link>
            </li>
            <li className="headerNavItem">
              <a href="/Booking" onClick={() => setOpen(false)}>
                Бронирование
              </a>
            </li>
            <li className="headerNavItem">
              <a
                href="https://t.me/coworking_orgmu"
                onClick={() => setOpen(false)}
              >
                Контакты
              </a>
            </li>
            {userRole === "Admin" && (
              <li className="headerNavItem">
                <a href="/admin" onClick={() => setOpen(false)}>
                  Администратор
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
