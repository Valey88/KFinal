import React from "react";
import style from "./CreateRooms.module.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRoomStore from "../../../store/roomStore";

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

  return (
    <div className={style.createRoomsPage}>
      <nav className={style.sideNav}>
        <Link to="/CreateRooms" className={style.navLink}>Создание Комнаты</Link>
        <Link to="/Admin" className={style.navLink}>Список комнат</Link>
        <Link to="/DeleteImage" className={style.navLink}>Удаление изображений</Link>
      </nav>
      
      <main className={style.mainContent}>
        <h1 className={style.pageTitle}>Создание комнаты</h1>
        
        <form className={style.roomForm}>
          <input
            type="text"
            placeholder="Адрес"
            onChange={(e) => setAddress(e.target.value)}
            className={style.formInput}
          />
          <input
            type="text"
            placeholder="Название"
            onChange={(e) => setName(e.target.value)}
            className={style.formInput}
          />
          <textarea
            placeholder="Описание"
            onChange={(e) => setDescription(e.target.value)}
            className={style.formTextarea}
          />
          <input
            type="number"
            placeholder="Количество мест"
            onChange={(e) => setPlaces(+e.target.value)}
            className={style.formInput}
          />
          
          <h2 className={style.sectionTitle}>Выберите дни работы комнаты:</h2>
          <div className={style.weekDaysGrid}>
            {weeks.map(({ day }) => (
              <label key={day} className={style.weekDayLabel}>
                <input
                  type="checkbox"
                  checked={weekDays.includes(day)}
                  onChange={() => setWeekDays(day)}
                  className={style.weekDayCheckbox}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
          
          <div className={style.timeInputs}>
            <input
              type="time"
              placeholder="Начало работы"
              onChange={(e) => setTimeStart(e.target.value)}
              className={style.formInput}
            />
            <input
              type="time"
              placeholder="Конец работы"
              onChange={(e) => setTimeEnd(e.target.value)}
              className={style.formInput}
            />
          </div>
          
          <button onClick={addNewRoom} className={style.submitButton}>Создать комнату</button>
        </form>
      </main>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CreateRooms;