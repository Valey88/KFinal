import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
// import { usePostOrdersMutation } from "../../../redux/dataApi";
import styles from "./Modal.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../../../constants/constants";

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
    "@media (max-width: 2000px)": {
      width: "450px",
    },
    "@media (max-width: 500px)": {
      width: "320px",
    },
  },
  height: {
    "@media (max-width: 500px)": {
      height: "800px",
    },
    "@media (max-width: 500px)": {
      height: "620px",
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

  const addNewOrder = async () => {
    console.log({
      roomId,
      timeStart,
      duration,
      summaryEvent,
      fio,
      email,
      phoneNumber,
    });

    try {
      await axios.post(
        `${url}/order/create-order`,
        {
          roomId,
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

      // Показать всплывающее окно об успешной отправке
      toast.success("Заявка успешно отправлена!", {
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
          "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.",
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
              <h2 className={styles.letter}>Продолжительность события</h2>
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
              <button
                className={styles.modalButton}
                onClick={async () => {
                  await addNewOrder();
                  handleClose(); // Закрываем модальное окно после отправки
                }}
              >
                Отправить
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
