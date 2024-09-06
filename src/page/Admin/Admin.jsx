import { useEffect, useState } from "react";
import style from "./Admin.module.css";
import axios from "axios";
import SideBar from "../../components/sideBar/SideBar";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "./modal/Modal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../page/Booking/Sliders/styles.css";
import { Link } from "react-router-dom";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { url } from "../../constants/constants";

import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import useAdminStore from "../../store/adminStore";

export const useLogoutAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie =
      "accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return handleLogout;
};
function AddRooms() {
  const [file, setFile] = useState(null);
  const [roomsImg, setRoomsImg] = useState([]);
  const [data, setData] = useState();
  const [pictures, setPictures] = useState();
  // const [orders, setOrders] = useState([]);
  const [queryParams, setQueryParams] = useState({});
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [orderId, setOrderId] = useState("");
  const { rooms, orders, fetchRooms, deleteRoom, fetchOrders } =
    useAdminStore();

  useEffect(() => {
    fetchRooms();
    fetchOrders();
  }, []);

  // const fetchRooms = async () => {
  //   try {
  //     const response = await axios.get(`${url}/room/get-all-rooms`, {
  //       withCredentials: true,
  //     });
  //     setRooms(response.data);
  //   } catch (error) {
  //     console.log("Error fetching rooms:", error);
  //   }
  // };

  // const deleteRoom = async (id) => {
  //   try {
  //     await axios.delete(`${url}/room/delete-room/${id}`, {
  //       withCredentials: true,
  //     });
  //     console.log("Room deleted successfully! 😊");
  //     // Обновить список комнат после успешного удаления
  //     fetchRooms();
  //   } catch (error) {
  //     console.log("Error:", error);
  //     // Обработать ошибку удаления комнаты
  //   }
  // };
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${url}/order/delete-order/${id}`, {
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
      await axios.post(`${url}/room/upload-picture/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Получение обновленных данных комнаты
      const updatedRoomResponse = await axios.get(
        `${url}/room/get-room/${id}`,
        {
          withCredentials: true,
        }
      );

      // Обновление состояния с новыми данными комнаты
      setRoomsImg((prevRooms) =>
        prevRooms.map((room) =>
          room.id === id
            ? { ...room, picture: updatedRoomResponse.data.picture }
            : room
        )
      );

      // Сброс состояния файла
      setFile(null);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // Define the variable

  useEffect(() => {
    fetchOrders();
  }, []);

  // const fetchOrders = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`${url}/order/get-all-orders`, {
  //       params: queryParams,
  //       withCredentials: true,
  //     });
  //     setOrders(response.data);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //   }
  // }, [queryParams]);

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 5000); // Fetch orders every 5 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [fetchOrders]);

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

  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${url}/order/update-order/${id}`,
        {
          timeStart,
          timeEnd,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = useLogoutAdmin();

  return (
    <div className={style.Admin}>
      <div>
        <div className={style.sideNavContainer}>
          <Link to="/CreateRooms">Создание Команты</Link>
          <Link to="/Admin">Список комнат</Link>
          <Link to="/DeleteImage">Удаление изображений</Link>
          <button onClick={handleLogout}>Выйти</button>
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
                          <img src={`${url}/${img.name}`} />
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
              Список броней
            </h1>

            <div className={style.filter}>
              <div className={style.filterItem}>
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "30px",
                  }}
                >
                  Фильтрация:
                </h1>
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
                    const formatDate = (dateString) => {
                      const date = new Date(dateString);
                      const options = {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC",
                      };
                      return `Время окончания: ${date.toLocaleTimeString(
                        "ru-RU",
                        options
                      )}`;
                    };
                  };

                  const formatDates = (dateString) => {
                    const date = new Date(dateString);
                    const options = {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    };
                    const formattedDates = date.toLocaleDateString(
                      "ru-RU",
                      options
                    );
                    const formattedTime = date.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    });
                    return `Дата ${formattedDates}\nВремя начала: ${formattedTime}`;
                  };
                  const formattedTimeEnd = formatDates(item.timeEnd);
                  const formattedStart = formatDates(item.timeStart);

                  return (
                    <tr key={item.id}>
                      <td>{item.fio}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.email}</td>
                      <td>{formattedStart}</td>
                      <td>{formattedTimeEnd}</td>
                      <td>Комната номер : {item.roomId}</td>
                      <td style={{ display: "flex", gap: "10px" }}>
                        <button
                          style={{
                            width: "150px",
                            padding: "10px",
                            fontSize: "15px",
                          }}
                          onClick={(e) => deleteOrder(item.id)}
                        >
                          Удалить бронь
                        </button>
                        <Modal id={item.id} />
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
