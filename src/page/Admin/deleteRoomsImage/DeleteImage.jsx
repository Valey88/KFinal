import React from "react";
import { useGetRoomsQuery } from "../../../redux/dataApi";
import SideBar from "../../../components/sideBar/SideBar";
import style from "./DeleteImage.module.css";
// import { useDeletePictureMutation } from "../../../redux/dataApi";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../../constants/constants";

const DeleteImage = () => {
  const { data } = useGetRoomsQuery();
  // const [deletePicture] = useDeletePictureMutation();
  console.log(data);
  // const deletePictures = async (name) => {
  //   await deletePicture(name).unwrap();
  // };
  const deletePictures = async (name) => {
    try {
      await axios.delete(`${url}/room/delete-picture/${name}`, {
        withCredentials: true,
      });
      console.log("Picture deleted successfully! 😊");
    } catch (error) {
      console.log("Error:", error);
      // Обработать ошибку удаления комнаты
    }
  };
  return (
    <div className={style.DeleteImage}>
      <div>
        <div className={style.sideNavContainer}>
          <Link to="/CreateRooms">Создание Команты</Link>
          <Link to="/Admin">Список комнат</Link>
          <Link to="/DeleteImage">Удаление изображений</Link>
        </div>
      </div>
      <div className={style.delete_image}>
        {data?.map((data) => {
          return (
            <div className={style.delete_container} key={data.id}>
              <div className={style.titleRoom}>
                <h2>Название комнаты:{data.name}</h2>
                <p style={{ fontSize: "30px" }}></p>
              </div>
              {data?.picture?.map((img) => {
                const imgBlob = new Blob([img.data]);
                return (
                  <div className={style.images}>
                    <img src={`${url}/${img.name}`} />
                    <button onClick={() => deletePictures(img.name)}>
                      Удалить
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeleteImage;
