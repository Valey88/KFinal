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
  const [price, setPrice] = useState(0);
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
  const addNewRoom = async () => {
    console.log({
      address,
      name,
      description,
      price,
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
          price,
          places,
          timeStart,
          timeEnd,
          weekDays,
        },
        {
          withCredentials: true,
        }
      );
      setAddress("");
      setName("");
      setDescription("");
      setPrice("");
      setPlaces("");
      setWeekDays([]);
      setTimeStart("");
      setTimesEnd("");
    } catch (error) {
      console.log("Error:", error);
      // Handle login error
    }
  };

  const handleWeekDaysChange = (e) => {
    const value = e.target.value;
    const weekDays = value.split(",").map((day) => day.trim());
    setWeekDays(weekDays);
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
          <input
            type="text"
            placeholder="Цена"
            onChange={(e) => setPrice(+e.target.value)}
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
          <input
            type="text"
            placeholder="Дни недели работы"
            value={weekDays.join(", ")}
            onChange={handleWeekDaysChange}
            className={style.inputAddRooms}
          />

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
