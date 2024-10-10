import React, { useState } from "react";
import style from "./editRoom.module.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRoomStore from "../../../store/roomStore";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../../constants/constants";

const EditRoom = () => {
  const { id } = useParams();

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
  } = useRoomStore((state) => state);
  const putRoom = async (id) => {
    const updatedRoom = {};

    if (address) updatedRoom.address = address;
    if (name) updatedRoom.name = name;
    if (description) updatedRoom.description = description;
    if (places) updatedRoom.places = places;
    if (weekDays) updatedRoom.weekDays = weekDays;
    if (timeStart) updatedRoom.timeStart = timeStart;
    if (timeEnd) updatedRoom.timeEnd = timeEnd;
    try {
      await axios.put(`${url}/room/update-room/${id}`, updatedRoom, {
        withCredentials: true,
      });
      toast.success("Изменения успешно применены!", {
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
      toast.error(
        error.response.data.message ||
          "Произошла ошибка при редактировании данных комнаты. Пожалуйста, попробуйте еще раз.",
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
    }
  };

  return (
    <div className={style.createRoomsPage}>
      <nav className={style.sideNav}>
        <Link to="/CreateRooms" className={style.navLink}>
          Создание Комнаты
        </Link>
        <Link to="/Admin" className={style.navLink}>
          Основная панель
        </Link>
        <Link to="/DeleteImage" className={style.navLink}>
          Удаление изображений
        </Link>
      </nav>

      <main className={style.mainContent}>
        <h1 className={style.pageTitle}>Редактирование комнаты</h1>

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

          <button
            onClick={(e) => {
              e.preventDefault();
              putRoom(id);
            }}
            className={style.submitButton}
          >
            Сохранить изменения
          </button>
        </form>
      </main>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default EditRoom;
