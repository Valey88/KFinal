import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import useAdminStore from "../../store/adminStore";
import Modal from "./modal/Modal";
import { url } from "../../constants/constants";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../page/Booking/Sliders/styles.css";
import styles from "./Admin.module.css";

function Admin() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState();
  const {
    rooms,
    orders,
    fetchRooms,
    deleteRoom,
    fetchOrders,
    updateRoom,
    queryParams,
    setQueryParams,
    useLogoutAdmin
  } = useAdminStore();

  useEffect(() => {
    fetchRooms();
    fetchOrders(queryParams);
  }, [queryParams]);

  const handleFilterChange = (filter, value) => {
    setQueryParams((prevParams) => {
      const newParams = { ...prevParams };
      if (filter === "time") {
        newParams.time = newParams.time === value ? undefined : value;
      } else {
        newParams[filter] = value === "" ? undefined : value;
      }
      return newParams;
    });
  };

  const handleApplyFilter = () => {
    console.log("Applying filters:", queryParams);
    fetchOrders(queryParams);
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${url}/order/delete-order/${id}`, {
        withCredentials: true,
      });
      console.log("Order deleted successfully! 😊");
      fetchOrders(queryParams);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const uploadFile = (event) => {
    setFile(event.target.files[0]);
  };

  const updatePictureList = () => {
    setPictures(data?.picture);
  };

  const fileInputRef = useRef(null);

  const handleFileChanges = async (id) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await updateRoom(id, formData);

      const updatedRoomResponse = await axios.get(
        `${url}/room/get-room/${id}`,
        {
          withCredentials: true,
        }
      );

      const updatedRooms = rooms.map((room) =>
        room.id === id
          ? { ...room, picture: updatedRoomResponse.data.picture }
          : room
      );
      useAdminStore.setState({ rooms: updatedRooms });

      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  useEffect(() => {
    fetchOrders(queryParams);
    const intervalId = setInterval(() => fetchOrders(queryParams), 5000);

    return () => clearInterval(intervalId);
  }, [fetchOrders, queryParams]);

  const handleLogout = useLogoutAdmin();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: userTimeZone,
    };

    const formattedDate = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: userTimeZone,
    });

    const formattedTime = date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: userTimeZone,
    });

    return `Дата: ${formattedDate}, Время: ${formattedTime}`;
  };

  return (
    <div className={styles.adminContainer}>
      <nav className={styles.sidebar}>
        <Link to="/CreateRooms" className={styles.sidebarLink}>Создание Команты</Link>
        <Link to="/Admin" className={styles.sidebarLink}>Список комнат</Link>
        <Link to="/DeleteImage" className={styles.sidebarLink}>Удаление изображений</Link>
        <button onClick={useLogoutAdmin} className={styles.logoutButton}>Выйти</button>
      </nav>

      <main className={styles.mainContent}>
        <section className={styles.roomsSection}>
          <h1 className={styles.sectionTitle}>Список комнат</h1>
          <div className={styles.roomsGrid}>
            {rooms?.map((room) => (
              <div key={room.id} className={styles.roomCard}>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className={styles.roomSwiper}
                >
                  {room?.picture?.map((img) => (
                    <SwiperSlide key={img.id}>
                      <img src={`${url}/${img.name}`} alt={room.name} className={styles.roomImage} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className={styles.roomInfo}>
                  <p className={styles.roomId}>Код: {room.id}</p>
                  <h2 className={styles.roomName}>{room.name}</h2>
                  <p className={styles.roomAddress}>{room.address}</p>
                  <p className={styles.roomDescription}>{room.description}</p>
                  <div className={styles.roomActions}>
                    <input
                      type="file"
                      onChange={uploadFile}
                      ref={fileInputRef}
                      className={styles.fileInput}
                    />
                    <button onClick={() => handleFileChanges(room.id, file)} className={styles.uploadButton}>
                      Загрузить фото
                    </button>
                    <button onClick={() => deleteRoom(room.id)} className={styles.deleteButton}>
                      Удалить комнату
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ordersSection}>
          <h1 className={styles.sectionTitle}>Список броней</h1>
          <div className={styles.filterContainer}>
            <h2>Фильтрация:</h2>
            <div className={styles.filterOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={queryParams.time === "DECREASING"}
                  onChange={() => handleFilterChange("time", "DECREASING")}
                />
                Время по убыванию
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={queryParams.time === "INCREASING"}
                  onChange={() => handleFilterChange("time", "INCREASING")}
                />
                Время по возрастанию
              </label>
              <input
                type="text"
                placeholder="Введите номер комнаты"
                value={queryParams.roomId || ""}
                onChange={(e) => handleFilterChange("roomId", e.target.value)}
                className={styles.filterInput}
              />
              <button onClick={handleApplyFilter} className={styles.applyFilterButton}>Применить фильтр</button>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.ordersTable}>
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
                {orders?.map((order) => (
                  <tr key={order.id}>
                    <td>{order.fio}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{order.email}</td>
                    <td>{formatDateTime(order.timeStart)}</td>
                    <td>{formatDateTime(order.timeEnd)}</td>
                    <td>Комната номер: {order.roomId}</td>
                    <td className={styles.orderActions}>
                      <button onClick={() => deleteOrder(order.id)} className={styles.deleteOrderButton}>
                        Удалить бронь
                      </button>
                      <Modal id={order.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Admin;