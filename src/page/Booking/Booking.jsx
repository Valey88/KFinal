import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Booking.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "./modal/Modal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Sliders/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sliders/Toast.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { url } from "../../constants/constants";
import useRoomStore from "../../store/roomStore";
import RoomCalendar from "../../components/shedulerCalendar/roomCalendar/RoomCalendar";

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

  useEffect(() => {
    fetchRooms()
      .then(() => {
        console.log("Rooms fetched:", rooms);
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
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={false}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="mySwiper"
                >
                  {data?.picture?.map((img) => (
                    <SwiperSlide key={img.id}>
                      <img src={`${url}/${img.name}`} alt={data.name} />
                    </SwiperSlide>
                  ))}
                </Swiper>
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
                <div>
                  <Modal id={data.id} />
                  <RoomCalendar roomId={selectedRoomId} />
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
