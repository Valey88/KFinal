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

const Booking = () => {
  const [rooms, setRooms] = useState([]);

  const getRooms = () => {
    return axios
      .get(`${url}/room/get-all-rooms`, { withCredentials: true })
      .then((response) => {
        const result = response.data;
        if (result) {
          const tags = [
            ...result.map(({ id }) => ({ type: "Rooms", id })),
            "Rooms",
          ];
          return { data: result, tags };
        } else {
          return { data: result, tags: ["Rooms"] };
        }
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        throw error;
      });
  };

  useEffect(() => {
    getRooms()
      .then((result) => setRooms(result.data))
      .catch((error) => console.error("Error setting rooms:", error));
  }, []);

  return (
    <div className={style.Booking}>
      <div className={style.bookingContainer}>
        <div className={style.bookingHeader}>
          <h2>Бронирование</h2>
        </div>

        {rooms.map((data) => (
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
              <div>
                <Modal id={data.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Booking;
