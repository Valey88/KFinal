import React, { useState, useEffect } from "react";
import style from "./Booking.module.css";
import Modal from "./modal/Modal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Sliders/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sliders/Toast.css";
import { url } from "../../constants/constants";
import useRoomStore from "../../store/roomStore";
import RoomCalendar from "../../components/shedulerCalendar/roomCalendar/RoomCalendar";
import { Carousel } from "react-bootstrap"; // Импорт Carousel из react-bootstrap

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";

const Booking = () => {
  const { rooms, fetchRooms } = useRoomStore();
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split("T")[1].slice(0, 5).split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRoomSelect = (roomId) => {
    console.log("Selected Room ID:", roomId); // Логируем roomId
    setSelectedRoomId(roomId);
  };
  useEffect(() => {
    fetchRooms()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, [fetchRooms]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.Booking}>
      <div className={style.bookingContainer}>
        <div className={style.bookingHeader}>
          <h2>Бронирование</h2>
        </div>

        {rooms && rooms.length > 0 ? (
          rooms.map((data) => (
            <div className={style.orderBlock} key={data.id}>
              <div className={style.orderBlockImg}>
                <Carousel>
                  {data?.picture?.length > 0 ? (
                    data.picture.map((img) => (
                      <Carousel.Item
                        style={{
                          width: "100%",
                          height: "60rem",
                        }}
                        key={img.id}
                      >
                        <img
                          className="d-block"
                          src={`${url}/${img.name}`}
                          alt={data.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Carousel.Item>
                    ))
                  ) : (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="default-image.jpg"
                        alt="No image available"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Carousel.Item>
                  )}
                </Carousel>
              </div>
              <div className={style.orderInfo}>
                <div>
                  <h2>{data.address}</h2>
                  <h2>{data.name}</h2>
                </div>
                <p>{data.description}</p>
                <p>Количество мест {data.places}</p>
                <p>Начало работы: {formatTime(data.timeStart)}</p>
                <p>Конец работы: {formatTime(data.timeEnd)}</p>
                <div className={style.orderButton}>
                  <Modal id={data.id} />
                  <RoomCalendar
                    className={style.RoomCalendar}
                    roomId={data.id} // Передаем roomId в RoomCalendar
                    onClick={() => handleRoomSelect(data.id)} // Добавляем обработчик клика
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No rooms available</div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Booking;
