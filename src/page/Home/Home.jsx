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
import img1 from "/public/91a921c4084d1fd7cf2fd71448204ba0.png";
import img2 from "/public/52b21197-05f6-4054-b9f4-95d5d760b078.jpg";
import maskGroup1 from "/public/adc6b44f-97e2-4997-8d10-cb11db5e4fa6.jpg";
import maskGroup2 from "/public/a24a3dd0-a79f-4f25-b36c-3f47491987ef.jpg";
import eventImg from "/public/event.png";
import wifiImg from "/public/wifi (1).png";
import internetImg from "/public/internet.png";
import armchairImg from "/public/armchair.png";
import locationImg from "/public/Group 119 (1).png";
import roomImg from "/public/4eb86257-5851-4f13-9ae0-b24fd64cae6b.jpg";
import { Carousel } from "react-bootstrap"; // Импорт Carousel из react-bootstrap

// Import Bootstrap CSS and JS
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
          <h2>Выбирай лучшее места коворкинга в городе</h2>
          <Link to="/Booking" className={style.Link}>
            Забронировать
          </Link>
        </div>
        <div className={style.contentOne2}>
          <img src={img1} alt="" loading="lazy" />
        </div>
      </div>
      <div className={style.component}>
        <div className={style.content_component2}>
          <img src={img2} alt="" loading="lazy" />
        </div>
        <div className={style.content_component}>
          <h2>Самые удобные пространства</h2>
          <p>
            Коворкинг — это соглашение, при котором сотрудники разных компаний
            делят одно офисное помещение, что обеспечивает экономию средств и
            удобство за счет использования общей инфраструктуры, такой как
            оборудование, коммунальные услуги, услуги администратора и хранения,
            а в некоторых случаях услуги по прохладительным напиткам и приему
            посылок.
          </p>
        </div>
      </div>
      <div className={style.component2}>
        <div className={style.content_component3}>
          <div>
            <p>Описание</p>
          </div>
          <h2>Представление всего опыт технологии</h2>
          <p>
            Коворкинг — это соглашение, при котором сотрудники разных компаний
            делят одно офисное помещение, что обеспечивает экономию средств и
            удобство за счет использования общей инфраструктуры, такой как
            оборудование, коммунальные услуги, услуги администратора и хранения,
            а в некоторых случаях услуги по прохладительным напиткам и приему
            посылок.
          </p>
        </div>
        <div className={style.content_component4}>
          <Carousel>
            {/* ... existing Carousel code ... */}
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
                src={maskGroup1} // Use the imported image
                alt="Mask Group 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Carousel.Item>
            <Carousel.Item
              style={{
                width: "100%",
                height: "60rem",
                maxHeight: "60vh", // Добавлено для мобильных устройств
              }}
              key="maskGroup2"
            >
              <img
                className="d-block"
                src={maskGroup2} // Use the imported image
                alt="Mask Group 2"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
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
          </Carousel>
        </div>
      </div>
      <div className={style.component3}>
        <div className={style.content_component5} id="prem">
          <p>Преимущества</p>
          <h2>Выбирай наш комфорт</h2>
          <div className={style.content_components}>
            <div className={style.contents}>
              <div>
                <img src={eventImg} alt="" loading="lazy" />
              </div>
              <h3> Мероприятия</h3>
              <p>
                Обеспечение экономии средств и удобства за счет использования
                общей инфраструктуры.
              </p>
            </div>
            <div className={style.contents}>
              <div>
                <img src={wifiImg} alt="" loading="lazy" />
              </div>
              <h3>Быстрый интернет</h3>
              <p>
                Обеспечение экономии средств и удобства за счет использования
                общей инфраструктуры.
              </p>
            </div>
            <div className={style.contents}>
              <div>
                <img src={internetImg} alt="" loading="lazy" />
              </div>
              <h3>Доступность</h3>
              <p>
                Обеспечение экономии средств и удобства за счет использования
                общей инфраструктуры.
              </p>
            </div>
            <div className={style.contents}>
              <div>
                <img src={armchairImg} alt="" loading="lazy" />
              </div>
              <h3>Лаундж</h3>
              <p>
                Обеспечение экономии средств и удобства за счет использования
                общей инфраструктуры.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.component4}>
        <h2>Помещения</h2>
        <div className={style.content_component6}>
          <img src={roomImg} alt="" loading="lazy" />
        </div>
        <div className={style.content_component7}>
          <div>
            <p>Описание</p>
          </div>
          <h2>Представление всего опыт технологии</h2>
          <p>
            Коворкинг — это соглашение, при котором сотрудники разных компаний
            делят одно офисное помещение, что обеспечивает экономию средств и
            удобство за счет использования общей инфраструктуры, такой как
            оборудование, коммунальные услуги, услуги администратора и хранения,
            а в некоторых случаях услуги по прохладительным напиткам и приему
            посылок.
          </p>
          <Link to="/Booking" className={style.Link}>
            Подробнее
          </Link>
        </div>
      </div>
      <div className={style.component5}>
        <div className={style.content_component8}>
          <div>
            <h3>Местоположение</h3>
            <p>Оренбург, Советская улица, 6</p>
          </div>
          <div className={style.mapContainer}>
            <YMaps>
              <Map
                defaultState={{ center: [51.756253, 55.10584], zoom: 15 }}
                width="100%"
                height="400px"
                options={{ 
                  autoFitToViewport: true, // Добавлено для адаптивности
                  suppressMapOpenBlock: true // Скрыть блок открытия карты
                }}
              >
                <Placemark geometry={[51.756253, 55.10584]} />
              </Map>
            </YMaps>
          </div>
        </div>
      </div>

      {/* {data?.map((data) => {
        return (
          <div key={data.id}>
            <h2>{data.address}</h2>
            <h2>Забронировать</h2>
            <input type="text" placeholder="" />
            <input type="text" placeholder=""/>
            <input type="text" placeholder=""/>
            <input type="text" placeholder=""/>
            <input type="text" placeholder=""/>
            <input type="text" placeholder=""/>
          </div>
        );
      })} */}
    </div>
  );
};

export default memo(Home);
