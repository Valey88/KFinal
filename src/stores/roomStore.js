import create from "zustand";
import axios from "axios";
import { url } from "../constants/constants";

const useRoomStore = create((set) => ({
  rooms: [],
  fetchRooms: async () => {
    try {
      const response = await axios.get(`${url}/room/get-all-rooms`, {
        withCredentials: true,
      });
      set({ rooms: response.data });
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  },
  deletePicture: async (roomId, pictureName) => {
    try {
      await axios.delete(`${url}/room/delete-picture/${pictureName}`, {
        withCredentials: true,
      });
      set((state) => ({
        rooms: state.rooms.map((room) => {
          if (room.id === roomId) {
            return {
              ...room,
              picture: room.picture.filter((pic) => pic.name !== pictureName),
            };
          }
          return room;
        }),
      }));
      console.log("Picture deleted successfully! 😊");
    } catch (error) {
      console.error("Error deleting picture:", error);
    }
  },
}));

export default useRoomStore;
