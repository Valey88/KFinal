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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [orderId, setOrderId] = useState(id);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const handleUpdateOrder = async (e) => {
    try {
      const response = await axios.put(
        `${url}/order/update-order/${orderId}`,
        {
          timeStart,
          timeEnd,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
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
