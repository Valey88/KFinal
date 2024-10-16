import React, { memo } from "react";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../components/slider/styles.module.css";

// Import images
import frame1 from "/public/Frame 1.svg";
import roomImg from "/public/4eb86257-5851-4f13-9ae0-b24fd64cae6b.jpg";
import { Carousel } from "react-bootstrap"; // Импорт Carousel из react-bootstrap

import homeInfo from "/public/home-info.json";

import "bootstrap/dist/css/bootstrap.min.css";

import { YMaps, Map, Placemark } from "react-yandex-maps";

const Home = () => {
  // const []

  return (
    <div className={style.Home}>
      <div className={style.CmpOne}>
        <div className={style.contentOne} id="onas">
          <div>
            <img src={frame1} alt="" loading="lazy" />
          </div>
          <h2>{homeInfo.about_us.title}</h2>
          <Link to="/Booking" className={style.Link}>
            {homeInfo.about_us.button_text}
          </Link>
        </div>
        <div className={style.contentOne2}>
          <img src={homeInfo.about_us.image} alt="" loading="lazy" />
        </div>
      </div>
      <div className={style.component}>
        <div className={style.content_component2}>
          <img
            src={homeInfo.about_us_description.image}
            alt=""
            loading="lazy"
          />
        </div>
        <div className={style.content_component}>
          <h2>{homeInfo.about_us_description.title}</h2>
          <p>{homeInfo.about_us_description.description}</p>
        </div>
      </div>
      <div className={style.component2}>
        {homeInfo.description.items.map((date) => (
          <>
            <div className={style.content_component3}>
              <div>
                <p>Описание</p>
              </div>
              <h2>{date.title}</h2>
              <p>{date.description}</p>
            </div>
            <div className={style.content_component4}>
              <Carousel>
                {homeInfo.description.items[0].slider.images.map(
                  (image, index) => (
                    <Carousel.Item
                      style={{
                        width: "100%",
                        height: "60rem",
                        maxHeight: "60vh", // Добавлено для мобильных устройств
                      }}
                      key="maskGroup1"
                    >
                      <img
                        className="d-block"
                        src={image} // Use the imported image
                        alt="Mask Group 1"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Carousel.Item>
                  )
                )}
              </Carousel>
            </div>
          </>
        ))}
      </div>
      <div className={style.component3}>
        <div className={style.content_component5} id="prem">
          <p>Преимущества</p>
          <h2>{homeInfo.advantages.title}</h2>
          <div className={style.content_components}>
            {homeInfo.advantages.items.map((data) => (
              <div className={style.contents}>
                <div>
                  <img src={data.image} alt="" loading="lazy" />
                </div>
                <h3> {data.title}</h3>
                <p>{data.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.component4}>
        <h2>Помещения</h2>
        <div className={style.content_component6}>
          <img src={homeInfo.rooms.image} alt="" loading="lazy" />
        </div>
        <div className={style.content_component7}>
          <div>
            <p>Описание</p>
          </div>
          <h2>{homeInfo.rooms.title}</h2>
          <p>{homeInfo.rooms.description}</p>
          <Link to="/Booking" className={style.Link}>
            {homeInfo.rooms.button_text}
          </Link>
        </div>
      </div>
      <div className={style.component5}>
        <div className={style.content_component8}>
          <div>
            <h3>{homeInfo.map.title}</h3>
            <p>{homeInfo.map.address}</p>
          </div>
          <div className={style.mapContainer}>
            <YMaps>
              <Map
                defaultState={{ center: [51.756253, 55.10584], zoom: 15 }}
                width="100%"
                height="100vh" // или height="50vh" для более компактной карты
                options={{
                  autoFitToViewport: true,
                  suppressMapOpenBlock: true,
                }}
              >
                <Placemark geometry={[51.756253, 55.10584]} />
              </Map>
            </YMaps>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
