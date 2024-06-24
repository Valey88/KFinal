import { useEffect, useState } from "react";
import style from "./Admin.module.css";
import axios from "axios";
import SideBar from "../../components/sideBar/SideBar";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../page/Booking/Sliders/styles.css";
import { Link } from "react-router-dom";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

function AddRooms() {
  const [file, setFile] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [data, setData] = useState();
  const [pictures, setPictures] = useState();
  const [orders, setOrders] = useState([]);
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/room/get-all-rooms",
        {
          withCredentials: true,
        }
      );
      setRooms(response.data);
    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/room/delete-room/${id}`, {
        withCredentials: true,
      });
      console.log("Room deleted successfully! 😊");
      // Обновить список комнат после успешного удаления
      fetchRooms();
    } catch (error) {
      console.log("Error:", error);
      // Обработать ошибку удаления комнаты
    }
  };
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/order/delete-order/${id}`, {
        withCredentials: true,
      });
      console.log("Order deleted successfully! 😊");
    } catch (error) {
      console.log("Error:", error);
      // Обработать ошибку удаления комнаты
    }
  };

  const uploadFile = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleFileChanges = (id) => {
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   axios.post(
  //     `http://localhost:3000/room/upload-picture/${id}`,
  //     formData,
  //     {
  //       withCredentials: true,
  //     },
  //     {
  //       method: "POST",
  //       headers: { "Content-type": "multipart/form-data" },
  //     }
  //   );
  // };
  const updatePictureList = () => {
    // Здесь вы можете обновить список картинок
    // Например, если у вас есть состояние `pictures`, вы можете обновить его следующим образом:
    setPictures(data?.picture);
  };

  const handleFileChanges = async (id) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Загрузка картинки
      await axios.post(
        `http://localhost:3000/room/upload-picture/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Получение обновленных данных комнаты
      const [updatedRoom] = await Promise.all([
        axios.get(`http://localhost:3000/room/get-room/${id}`, {
          withCredentials: true,
        }),
      ]);

      // Обновление состояния с новыми данными комнаты
      setData(updatedRoom.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Define the variable

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/order/get-all-orders",
        {
          params: queryParams,
          withCredentials: true,
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleFilterChange = (filter, value) => {
    setQueryParams((prevParams) => {
      const newParams = { ...prevParams };

      if (newParams[filter] === value) {
        // Если значение фильтра уже установлено, удалить его
        delete newParams[filter];
      } else {
        // Иначе, установить новое значение фильтра
        newParams[filter] = value;
      }

      return newParams;
    });
  };

  // const handleFilterReset = () => {
  //   setQueryParams({});
  //   fetchOrders(); // Выполнить GET-запрос без фильтров
  // };

  const handleApplyFilter = () => {
    fetchOrders(); // Выполнить GET-запрос с применением фильтров
  };
  return (
    <div className={style.Admin}>
      <div>
        <div className={style.sideNavContainer}>
          <Link to="/CreateRooms">Создание Команты</Link>
          <Link to="/Admin">Список комнат</Link>
          <Link to="/DeleteImage">Удаление изображений</Link>
        </div>
      </div>
      <div className={style.allRooms}>
        <div className={style.allRoomsContainer}>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "30px",
              paddingBottom: "30px",
            }}
          >
            Список комнат
          </h1>
          {rooms?.map((data) => {
            return (
              <div className={style.Rooms} key={data.id}>
                <div className={style.roomSwiper}>
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
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
                <div className={style.roomInfo}>
                  <div>
                    <p>Код:{data.id}</p>
                    <p>Адрес:</p>
                    <h2>{data.address}</h2>
                  </div>

                  <div>
                    <p>Название:</p>
                    <h2>{data.name}</h2>
                  </div>
                  <div>
                    <p>Описание:</p>
                    <h2>{data.description}</h2>
                  </div>
                  <h2>Количество мест {data.places}</h2>
                  <h2>Цена {data.price}р</h2>
                  <div className={style.uploads}>
                    <h2>Загрузить фото:</h2>
                    <input type="file" onChange={uploadFile} name="inputFile" />
                    <button onClick={(e) => handleFileChanges(data.id)}>
                      Загрузить
                    </button>
                  </div>
                  <div className={style.deleteRoom}>
                    <h2>Удалить комнату</h2>
                    <button onClick={(e) => deleteRoom(data.id)}>
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={style.orders}>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "30px",
                padding: "30px",
              }}
            >
              Список заказов
            </h1>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "30px",
                paddingBottom: "30px",
              }}
            >
              Фильтрация
            </h1>
            <div className={style.filter}>
              <div className={style.filterItem}>
                <label>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    checked={queryParams.time === "DECREASING"}
                    onChange={() => handleFilterChange("time", "DECREASING")}
                  />
                  Время по убыванию
                </label>
                <label>
                  <input
                    className={style.checkbox}
                    type="checkbox"
                    checked={queryParams.time === "INCREASING"}
                    onChange={() => handleFilterChange("time", "INCREASING")}
                  />
                  Время по возрастанию
                </label>
                <input
                  className={style.filterInput}
                  type="text"
                  placeholder="Введите номер комнаты"
                  value={queryParams.roomId || ""}
                  onChange={(e) => handleFilterChange("roomId", e.target.value)}
                />
              </div>
              {/* <button onClick={handleFilterReset}>Сбросить фильтр</button> */}
              <button onClick={handleApplyFilter}>Применить фильтр</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ФИО</th>
                  <th>Номер телефона</th>
                  <th>Email</th>
                  <th>Время начала</th>
                  <th>Время окончания</th>
                  <th>Номер комнаты</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((item) => {
                  const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    const day = date.getDate().toString().padStart(2, "0");
                    const month = (date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0");
                    const year = date.getFullYear();
                    const hours = date.getHours().toString().padStart(2, "0");
                    const minutes = date
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");
                    return `Время окончания : ${hours}:${minutes}`;
                  };

                  const formatDates = (dateString) => {
                    const date = new Date(dateString);
                    const day = date.getDate().toString().padStart(2, "0");
                    const month = (date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0");
                    const year = date.getFullYear();
                    const hours = date.getHours().toString().padStart(2, "0");
                    const minutes = date
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");
                    return `Дата ${day}.${month}.${year}\nВремя начало: ${hours}:${minutes}`;
                  };

                  const formattedTimeEnd = formatDate(item.timeEnd);
                  const formattedStart = formatDates(item.timeStart);

                  return (
                    <tr key={item.id}>
                      <td>{item.fio}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.email}</td>
                      <td>{formattedStart}</td>
                      <td>{formattedTimeEnd}</td>
                      <td>Комната номер : {item.roomId}</td>
                      <td>
                        <button onClick={(e) => deleteOrder(item.id)}>
                          Удалить бронь
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRooms;
