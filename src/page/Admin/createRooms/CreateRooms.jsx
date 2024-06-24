import React from "react";
import style from "./CreateRooms.module.css";
// import { useAddRoomsMutation } from "../../../redux/dataApi";
import { useState } from "react";
import SideBar from "../../../components/sideBar/SideBar";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateRooms = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [places, setPlaces] = useState(0);
  // const [addRooms, { isError }] = useAddRoomsMutation();
  const [weekDays, setWeekDays] = useState([]);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimesEnd] = useState("");

  // const addNewRoom = async () => {
  //   console.log({
  //     address,
  //     name,
  //     description,
  //     price,
  //     places,
  //     timeStart,
  //     timeEnd,
  //     weeks,
  //   });
  //   if (
  //     address &&
  //     name &&
  //     description &&
  //     price &&
  //     places &&
  //     timeStart &&
  //     timeEnd &&
  //     weeks
  //   ) {
  //     await addRooms({
  //       address,
  //       name,
  //       description,
  //       price,
  //       places,
  //       timeStart,
  //       timeEnd,
  //       weeks,
  //     }).unwrap();
  //     setAddress("");
  //     setName("");
  //     setDescription("");
  //     setPrice("");
  //     setPlaces("");
  //     setWeeks([]);
  //     setTimeStart("");
  //     setTimesEnd("");
  //   }
  // };

  const weeks = [
    { day: "Пн" },
    { day: "Вт" },
    { day: "Ср" },
    { day: "Чт" },
    { day: "Пт" },
    { day: "Сб" },
    { day: "Вс" },
  ];
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
        "http://localhost:3000/room/add-room",
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

      setAddress("");
      setName("");
      setDescription("");
      setPlaces("");
      setWeekDays([]); // Очищаем weekDays после успешной отправки
      setTimeStart("");
      setTimesEnd("");
    } catch (error) {
      console.log("Error:", error);
      // Handle login error
    }
  };

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
        </div>
      </div>
    </div>
  );
};

export default CreateRooms;
