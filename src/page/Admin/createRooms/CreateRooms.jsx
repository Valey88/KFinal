import React from "react";
import style from "./CreateRooms.module.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRoomStore from "../../../store/roomStore";
//используемые хуки

const CreateRooms = () => {
  const {
    address,
    name,
    description,
    places,
    weekDays,
    timeStart,
    timeEnd,
    weeks,
    setAddress,
    setName,
    setDescription,
    setPlaces,
    setWeekDays,
    setTimeStart,
    setTimeEnd,
    addNewRoom,
  } = useRoomStore();

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
            {weeks.map(({ day }) => (
              <div key={day} className={style.weekDaysItem}>
                <input
                  className={style.inputCheckbox}
                  type="checkbox"
                  checked={weekDays.includes(day)}
                  onChange={() => setWeekDays(day)}
                />
                {day}
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
            onChange={(e) => setTimeEnd(e.target.value)}
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
