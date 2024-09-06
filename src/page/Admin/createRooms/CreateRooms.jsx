import React from "react";
import style from "./CreateRooms.module.css";
import { useState } from "react";
import SideBar from "../../../components/sideBar/SideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from "../../../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//используемые хуки

const CreateRooms = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [places, setPlaces] = useState(0);
  const [weekDays, setWeekDays] = useState([]);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimesEnd] = useState("");
  const weeks = [
    { day: "Пн" },
    { day: "Вт" },
    { day: "Ср" },
    { day: "Чт" },
    { day: "Пт" },
    { day: "Сб" },
    { day: "Вс" },
  ];

  //функция добавления новой комнаты
  const addNewRoom = async () => {
    console.log({
      address,
      name,
      description,
      places,
      timeStart,
      timeEnd,
      weekDays,
    });

    try {
      await axios.post(
        `${url}/room/add-room`,
        {
          address,
          name,
          description,
          places,
          timeStart,
          timeEnd,
          weekDays, // Отправляем weekDays напрямую
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Комната успешно создана!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log("Error:", error);

      // Показать всплывающее окно об ошибке
      toast.error(
        error.response.data.message ||
          "Произошла ошибка при отправке создании комнаты. Пожалуйста, попробуйте еще раз.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setAddress("");
      setName("");
      setDescription("");
      setPlaces("");
      setWeekDays([]); // Очищаем weekDays после успешной отправки
      setTimeStart("");
      setTimesEnd("");
    }
  };

  //верстка

  return (
    <div className={style.CreateRooms}>
      <div>
        <div className={style.sideNavContainer}>
          <Link to="/CreateRooms">Создание Команты</Link>
          <Link to="/Admin">Список комнат</Link>
          <Link to="/DeleteImage">Удаление изображений</Link>
        </div>
      </div>
      <div className={style.AddRoomsHead}>
        <h1>Создание комнаты</h1>
      </div>
      <div className={style.AddRooms}>
        <div className={style.container}>
          <input
            type="text"
            placeholder="Адресс"
            onChange={(e) => setAddress(e.target.value)}
            className={style.inputAddRooms}
          />
          <input
            type="text"
            placeholder="Название"
            onChange={(e) => setName(e.target.value)}
            className={style.inputAddRooms}
          />
          <textarea
            type="text"
            placeholder="Описание"
            onChange={(e) => setDescription(e.target.value)}
            className={style.textareaAddRooms}
          />
          <input
            type="text"
            placeholder="Количество мест"
            onChange={(e) => setPlaces(+e.target.value)}
            className={style.inputAddRooms}
          />
          <h2 style={{ fontSize: 18 }}>
            Выберите дни недели, которые комната будет работать:
          </h2>
          <div className={style.weekDaysContainer}>
            {weeks.map((item) => (
              <div key={item.day} className={style.weekDaysItem}>
                <input
                  className={style.weekDaysCheckbox}
                  type="checkbox"
                  value={item.day}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setWeekDays((prev) => [...prev, e.target.value]);
                    }
                    if (!e.target.checked) {
                      setWeekDays((prev) =>
                        prev.filter((day) => day !== e.target.value)
                      );
                    }
                    console.log(weekDays);
                  }}
                />
                {item.day}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Начало работы"
            onChange={(e) => setTimeStart(e.target.value)}
            className={style.inputAddRooms}
          />
          <input
            type="text"
            placeholder="Конец работы"
            onChange={(e) => setTimesEnd(e.target.value)}
            className={style.inputAddRooms}
          />
          <button onClick={addNewRoom}>Создать</button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default CreateRooms;
