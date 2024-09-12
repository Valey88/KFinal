import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { url } from "../../../constants/constants";
import style from "./DeleteImage.module.css";
import useRoomStore from '../../../stores/roomStore';

const DeleteImage = () => {
  const { rooms, fetchRooms, deletePicture } = useRoomStore();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleDeletePicture = (roomId, pictureName) => {
    deletePicture(roomId, pictureName);
  };

  return (
    <div className={style.deleteImagePage}>
      <nav className={style.sideNav}>
        <Link to="/CreateRooms">Создание Комнаты</Link>
        <Link to="/Admin">Список комнат</Link>
        <Link to="/DeleteImage">Удаление изображений</Link>
      </nav>
      <main className={style.mainContent}>
        <h1 className={style.pageTitle}>Удаление изображений комнат</h1>
        <div className={style.roomsGrid}>
          {rooms.map((room) => (
            <div className={style.roomCard} key={room.id}>
              <h2 className={style.roomTitle}>{room.name}</h2>
              <div className={style.imageGrid}>
                {room?.picture?.map((img) => (
                  <div className={style.imageContainer} key={img.name}>
                    <img src={`${url}/${img.name}`} alt={room.name} className={style.roomImage} />
                    <button 
                      className={style.deleteButton}
                      onClick={() => handleDeletePicture(room.id, img.name)}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DeleteImage;