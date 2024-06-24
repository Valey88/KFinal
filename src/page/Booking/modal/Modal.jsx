import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
// import { usePostOrdersMutation } from "../../../redux/dataApi";
import styles from "./Modal.module.css";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "600px",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  width: {
    "@media (max-width: 500px)": {
      width: "350px",
    },
    "@media (max-width: 2000px)": {
      width: "450px",
    },
  },
  height: {
    "@media (max-width: 500px)": {
      height: "800px",
    },
  },
};

export default function BasicModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [roomId, setRoomId] = useState(id);
  const [timeStart, setTimeStart] = useState();
  const [duration, setDuration] = useState();
  const [summaryEvent, setSummaryEvent] = useState();
  const [fio, setFio] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  // const [postOrders, { isLoading, isSuccess, isError }] =
  //   usePostOrdersMutation();

  console.log(roomId);

  // const addNewOrder = async () => {
  //   console.log({
  //     roomId,
  //     timeStart,
  //     durationHours,
  //     durationMinuts,
  //     summaryEvent,
  //     fio,
  //     email,
  //     phoneNumber,
  //   });
  //   if (
  //     roomId &&
  //     timeStart &&
  //     durationHours &&
  //     durationMinuts &&
  //     summaryEvent &&
  //     summaryEvent &&
  //     fio &&
  //     email &&
  //     phoneNumber
  //   ) {
  //     await postOrders({
  //       roomId,
  //       timeStart,
  //       durationHours,
  //       durationMinuts,
  //       summaryEvent,
  //       fio,
  //       email,
  //       phoneNumber,
  //     }).unwrap();
  //     setRoomId("");
  //     setTimeStart("");
  //     setDurationHours("");
  //     setDurationMinuts("");
  //     setSummaryEvent("");
  //     setFio("");
  //     setEmail("");
  //     setPhoneNumber("");
  //   }
  // };
  const addNewOrder = async () => {
    console.log({
      roomId,
      // Преобразуем объект Date в строку с помощью toLocaleString()
      timeStart,
      duration,
      summaryEvent,
      fio,
      email,
      phoneNumber,
    });

    try {
      await axios.post(
        "http://localhost:3000/order/create-order",
        {
          roomId,
          // Отправляем timeStart как строку в нужном формате
          timeStart,
          duration,
          summaryEvent,
          fio,
          email,
          phoneNumber,
        },
        {
          withCredentials: true,
        }
      );
      // ... остальной код
    } catch (error) {
      console.log("Error:", error);
      // Handle login error
    }
  };

  return (
    <div>
      <button className={styles.modalButton} onClick={handleOpen}>
        Забронировать
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.modalContainer}>
              <input
                className={styles.modalInput}
                type="datetime-local"
                onChange={(e) => setTimeStart(e.target.value)}
              />
              <h2>Продолжительность события</h2>
              <input
                className={styles.modalInput}
                placeholder="Пример ввода 1 "
                type="text"
                onChange={(e) => setDuration(+e.target.value)}
              />
              <textarea
                className={styles.modalTextarea}
                placeholder="Краткое описание события"
                onChange={(e) => setSummaryEvent(e.target.value)}
              />
              <input
                className={styles.modalInput}
                type="text"
                placeholder="ФИО"
                onChange={(e) => setFio(e.target.value)}
              />
              <input
                className={styles.modalInput}
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={styles.modalInput}
                type="text"
                placeholder="Номер телефона"
                defaultValue="+7"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button className={styles.modalButton} onClick={addNewOrder}>
                Отправить
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
