import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
// import { usePostOrdersMutation } from "../../../redux/dataApi";
import styles from "./Modal.module.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../../../constants/constants";
import useAdminStore from "../../../store/adminStore";
import { ToastContainer, toast } from "react-toastify";


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
      width: "650px",
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [orderId, setOrderId] = useState(id);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const { updateOrder } = useAdminStore();


  const handleUpdateOrder = async () => {
    try {
      // Format the dates to ISO string format
      const formattedTimeStart = new Date(timeStart).toISOString();
      const formattedTimeEnd = new Date(timeEnd).toISOString();

      await updateOrder(orderId, formattedTimeStart, formattedTimeEnd);

      toast.success("Время успешно изменено!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      handleClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Ошибка при изменении времени", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <button
        style={{
          width: "150px",
          padding: "10px",
          fontSize: "15px",
        }}
        className={styles.modalButton}
        onClick={handleOpen}
      >
        Редактировать
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
              className={styles.modalContainer}
            >
              <h2>Редактирование</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <h3>Начало</h3>
                <input
                  style={{
                    width: "100%",
                    border: "1px solid black",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                  type="datetime-local"
                  placeholder="Time Start"
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <h3>Конец</h3>
                <input
                  style={{
                    width: "100%",
                    border: "1px solid black",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                  type="datetime-local"
                  placeholder="Time End"
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                />
              </div>
              <button onClick={(e) => handleUpdateOrder()}>Сохранить</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
