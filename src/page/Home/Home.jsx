import React from "react";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import { useGetOrdersQuery, useGetRoomsQuery } from "../../redux/dataApi";
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

const Home = () => {
  // const []
  
  return (
    <div className={style.Home}>
      <div className={style.CmpOne}>
        <div className={style.contentOne} id="onas">
          
          <div>
            <img src="/public/Frame 1.svg" alt="" />
          </div>
          <h2>Выбирай лучшее места коворкинга в городе</h2>
          <Link to="/Booking" className={style.Link}>
            Забронировать
          </Link>
        </div>
        <div className={style.contentOne2}>
          <img src="/public/91a921c4084d1fd7cf2fd71448204ba0.png" alt="" />
        </div>
      </div>
      <div className={style.component}>
        <div className={style.content_component2}>
          <img src="/public/334da5cbc12dd2240ba010c4baaad71a.png" alt="" />
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
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="/public/Mask Group.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/public/Mask Group (1).png" alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className={style.component3}>
        <div className={style.content_component5} id="prem">
          <p>Преимущества</p>
          <h2>Выбирай наш комфорт</h2>
          <div className={style.content_components}>
            <div className={style.contents}>
              <div>
                <img src="/public/event.png" alt="" />
              </div>
              <h3> Мероприятия</h3>
              <p>
                Обеспечение экономии средств и удобства за счет использования
                общей инфраструктуры.
              </p>
            </div>
            <div className={style.contents}>
              <div>
                <img src="/public/wifi (1).png" alt="" />
              </div>
              <h3>Быстрый интернет</h3>
              <p>
                Обеспечение экономии средств и удобства за счет использования
                общей инфраструктуры.
              </p>
            </div>
            <div className={style.contents}>
              <div>
                <img src="/public/internet.png" alt="" />
              </div>
              <h3>Доступность</h3>
              <p>
                Обеспечение экономии средств и удобства за счет использования
                общей инфраструктуры.
              </p>
            </div>
            <div className={style.contents}>
              <div>
                <img src="/public/armchair.png" alt="" />
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
          <img src="/public/5dbe0854c979505c52a7d4440969ab4e.png" alt="" />
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
          <div>
            <img src="/public/Group 119 (1).png" alt="" />
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

export default Home;
