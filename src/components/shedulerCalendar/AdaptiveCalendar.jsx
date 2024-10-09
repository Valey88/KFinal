import React, { useState, useEffect } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Paper, Typography, Modal, Box } from "@material-ui/core";
import axios from "axios";
import { url } from "../../constants/constants";
import { useMediaQuery } from "@material-ui/core";
import moment from "moment";
import "moment/locale/ru";
import "./AdaptiveCalendar.css";

moment.locale("ru");
const russianMonths = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
const CustomDayScaleCell = ({ ...restProps }) => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  return (
    <MonthView.DayScaleCell
      {...restProps}
      style={{
        fontSize: isDesktop ? "3rem" : "1.5rem",
        fontWeight: "bold",
        ...restProps.style,
      }}
    />
  );
};
const CustomTimeTableCell = ({ ...restProps }) => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  return (
    <MonthView.TimeTableCell
      {...restProps}
      style={{
        fontSize: isDesktop ? "3rem" : "1.5rem",
        height: 300,
        ...restProps.style,
      }}
    />
  );
};

const CustomToolbarRoot = ({ ...restProps }) => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  return (
    <Toolbar.Root
      {...restProps}
      style={{
        ...restProps.style,
        fontSize: isDesktop ? "3rem" : "1.5rem",
      }}
    />
  );
};

const CustomDateNavigator = ({ ...restProps }) => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  return (
    <DateNavigator.Root
      {...restProps}
      style={{
        ...restProps.style,
        fontSize: isDesktop ? "3rem" : "1.5rem",
      }}
    />
  );
};

const CustomMonthView = (props) => {
  return (
    <MonthView
      {...props}
      dayScaleCellComponent={CustomDayScaleCell}
      timeTableCellComponent={CustomTimeTableCell}
      dayScaleRowComponent={({ children }) => {
        const orderedChildren = [
          children[1],
          children[2],
          children[3],
          children[4],
          children[5],
          children[6],
          children[0],
        ];
        return <MonthView.DayScaleRow>{orderedChildren}</MonthView.DayScaleRow>;
      }}
    />
  );
};
const AdaptiveCalendar = ({ roomId }) => {
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState([]);

  useEffect(() => {
    if (roomId) {
      fetchBookings();
    }
  }, [roomId]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${url}/order/get-all-orders`, {
        params: { roomId: roomId },
      });
      const formattedBookings = response.data.map((booking) => ({
        startDate: new Date(booking.timeStart),
        endDate: new Date(booking.timeEnd),
        title: (
          <span className="title">
            {moment(booking.timeStart).format("HH:mm")} -
            {moment(booking.timeEnd).format("HH:mm")}
          </span>
        ),
        fio: booking.fio, // Добавляем поле fio
      }));
      setBookings(formattedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleAppointmentClick = (appointmentData) => {
    const clickedDate = moment(appointmentData.startDate).startOf("day");
    const dayBookings = bookings.filter((booking) =>
      moment(booking.startDate).isSame(clickedDate, "day")
    );
    setSelectedBookings(dayBookings);
    setModalOpen(true);
  };

  const CustomAppointment = ({ children, style, data, ...restProps }) => {
    const isDesktop = useMediaQuery("(min-width:768px)");
    const [isHovered, setIsHovered] = useState(false);
    const [showMore, setShowMore] = useState(false);

    let limitedBookings = [];
    let hiddenBookings = [];

    if (Array.isArray(data)) {
      limitedBookings = data.slice(0, 4);
      hiddenBookings = data.slice(4);
    }

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Appointments.Appointment
          {...restProps}
          style={{
            ...style,
            ...restProps.style,
            backgroundColor: "#f59c33",
            borderRadius: "8px",
            cursor: "pointer",
            width: isDesktop ? "100%" : "100%",
            height: isDesktop ? "25px" : "100%",
            marginBottom: "5.5px",
            fontSize: isDesktop ? "3rem" : "1.5rem",
          }}
          onClick={() => handleAppointmentClick(data)}
        >
          {children}
        </Appointments.Appointment>
        {isHovered && (
          <div className="appointment-details">
            {limitedBookings.map((booking, index) => (
              <div key={index}>
                {moment(booking.startDate).format("HH:mm")} -{" "}
                {moment(booking.endDate).format("HH:mm")} {booking.fio}
              </div>
            ))}
            {hiddenBookings.length > 0 && (
              <button onClick={() => setShowMore(true)}>Показать еще</button>
            )}
            {showMore && (
              <div>
                {hiddenBookings.map((booking, index) => (
                  <div key={index}>
                    {moment(booking.startDate).format("HH:mm")} -{" "}
                    {moment(booking.endDate).format("HH:mm")} {booking.fio}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const BookingsModal = () => (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="bookings-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="bookings-modal-title" variant="h6" component="h2">
          Брони на {selectedBookings[0]?.startDate.getDate()}{" "}
          {russianMonths[selectedBookings[0]?.startDate.getMonth()]}{" "}
          {selectedBookings[0]?.startDate.getFullYear()}
        </Typography>
        <div>
          {selectedBookings.map((booking, index) => (
            <div key={index}>
              {moment(booking.startDate).format("HH:mm")} -{" "}
              {moment(booking.endDate).format("HH:mm")} {booking.fio}
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );

  return (
    <Paper>
      <Scheduler
        data={bookings}
        height={650}
        locale="ru-RU"
        className="custom-scheduler"
      >
        <ViewState />
        <CustomMonthView />
        <Toolbar rootComponent={CustomToolbarRoot} />
        <DateNavigator rootComponent={CustomDateNavigator} />
        <Appointments appointmentComponent={CustomAppointment} />
      </Scheduler>
      <BookingsModal />
    </Paper>
  );
};
export default AdaptiveCalendar;
