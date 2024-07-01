import React from "react";
import style from "./Booking.module.css";

import { useGetRoomsQuery } from "../../redux/dataApi";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "./modal/Modal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Sliders/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sliders/Toast.css";

// import required modules
import {
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
  Keyboard,
} from "swiper/modules";

const Booking = () => {
  const { data } = useGetRoomsQuery();
  console.log(data);
  return (
    <div className={style.Booking}>
      <div className={style.bookingContainer}>
        <div className={style.bookingHeader}>
          <h2>Бронирование</h2>
        </div>
        <ToastContainer />
        {data?.map((data) => {
          return (
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
                  {data?.picture?.map((img) => {
                    const imgBlob = new Blob([img.data]);
                    return (
                      <SwiperSlide key={img.id}>
                        <img src={`http://localhost:3000/${img.name}`} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className={style.orderInfo}>
                <div>
                  <h2>{data.address}</h2>
                  <h2>{data.name}</h2>
                </div>
                <p>{data.description}</p>
                <p>Количество мест {data.places}</p>
                <p>Цена {data.price}р</p>
                <div>
                  <Modal id={data.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Booking;
