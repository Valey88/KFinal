import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ru";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useBookingStore from "../../store/bookingStore";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

moment.locale("ru");
const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Весь день",
  previous: "Назад",
  next: "Вперед",
  today: "Сегодня",
  month: "Месяц",
  week: "Неделя",
  day: "День",
  agenda: "Повестка",
  date: "Дата",
  time: "Время",
  event: "Событие",
  noEventsInRange: "Нет событий в этом диапазоне.",
};

const formats = {

  monthHeaderFormat: (date) => {
    const months = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  },
  weekdayFormat: (date) =>
    ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][date.getDay()],
  dayFormat: "D",

};
const RoomCalendar = ({ roomId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { bookings, fetchBookings } = useBookingStore();

  useEffect(() => {
    if (roomId) {
      fetchBookings(roomId);
    }
  }, [roomId, fetchBookings]);

  const events = bookings.map((booking) => ({
    start: new Date(booking.date),
    end: new Date(booking.date),
    title: "Забронировано",
  }));

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpenModal} className="open-calendar-btn">
        Открыть календарь
      </button>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="calendar-modal"
        className="calendar-modal"
      >
        <Box className="modal-content">
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            className="close-btn"
          >
            <CloseIcon />
          </IconButton>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%" }}
            views={["month"]}
            messages={messages}
            formats={formats}
            className="custom-calendar"
          />
        </Box>
      </Modal>
    </>
  );
};
export default RoomCalendar;
