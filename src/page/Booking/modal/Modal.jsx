import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../../../constants/constants";
import styles from "./Modal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "#ffffff",
  borderRadius: "15px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  p: 4,

};
export default function BookingModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        roomId: id,
        duration: parseInt(data.duration, 10)
      };
      await axios.post(`${url}/order/create-order`, formattedData, { withCredentials: true });
      toast.success("Заявка успешно отправлена!");
      setOpen(false);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Произошла ошибка при отправке заявки.");
    }
  };

  return (
    <div>
      <button className={styles.bookButton} onClick={() => setOpen(true)}>
        Забронировать
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h5" component="h2" className={styles.modalTitle}>
            Бронирование
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Controller
              name="timeStart"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field, fieldState: { error } }) => (
                <div className={styles.inputGroup}>
                  <label htmlFor="timeStart">Время начала</label>
                  <input {...field} type="datetime-local" id="timeStart" className={styles.input} />
                  {error && <span className={styles.error}>{error.message}</span>}
                </div>
              )}
            />
            <Controller
              name="duration"
              control={control}
              rules={{ required: "Обязательное поле", min: { value: 1, message: "Минимум 1 час" } }}
              render={({ field, fieldState: { error } }) => (
                <div className={styles.inputGroup}>
                  <label htmlFor="duration">Продолжительность (часы)</label>
                  <input {...field} type="number" id="duration" className={styles.input} min="1" />
                  {error && <span className={styles.error}>{error.message}</span>}
                </div>
              )}
            />
            <Controller
              name="summaryEvent"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field, fieldState: { error } }) => (
                <div className={styles.inputGroup}>
                  <label htmlFor="summaryEvent">Описание события</label>
                  <textarea {...field} id="summaryEvent" className={styles.textarea} />
                  {error && <span className={styles.error}>{error.message}</span>}
                </div>
              )}
            />
            <Controller
              name="fio"
              control={control}
              rules={{ required: "Обязательное поле" }}
              render={({ field, fieldState: { error } }) => (
                <div className={styles.inputGroup}>
                  <label htmlFor="fio">ФИО</label>
                  <input {...field} type="text" id="fio" className={styles.input} />
                  {error && <span className={styles.error}>{error.message}</span>}
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: "Обязательное поле", pattern: { value: /^\S+@\S+$/i, message: "Некорректный email" } }}
              render={({ field, fieldState: { error } }) => (
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input {...field} type="email" id="email" className={styles.input} />
                  {error && <span className={styles.error}>{error.message}</span>}
                </div>
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: "Обязательное поле", pattern: { value: /^\+7\d{10}$/, message: "Формат: +7XXXXXXXXXX" } }}
              render={({ field, fieldState: { error } }) => (
                <div className={styles.inputGroup}>
                  <label htmlFor="phoneNumber">Номер телефона</label>
                  <input {...field} type="tel" id="phoneNumber" className={styles.input} placeholder="+7" />
                  {error && <span className={styles.error}>{error.message}</span>}
                </div>
              )}
            />
            <button type="submit" className={styles.submitButton}>
              Отправить заявку
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
