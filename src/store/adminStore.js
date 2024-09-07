import create from 'zustand';
import axios from 'axios';
import { url } from '../constants/constants';

const useAdminStore = create((set, get) => ({
  rooms: [],
  orders: [],
  pictures: [],
  queryParams: {},
  loading: false,
  error: null,

  fetchRooms: async () => {
    try {
      const response = await axios.get(`${url}/room/get-all-rooms`, { withCredentials: true });
      set({ rooms: response.data });
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  },

  updateRoom: async (id, formData) => {
    try {
      await axios.post(`${url}/room/upload-picture/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedRoomResponse = await axios.get(`${url}/room/get-room/${id}`, {
        withCredentials: true,
      });

      set((state) => ({
        rooms: state.rooms.map((room) =>
          room.id === id ? { ...room, picture: updatedRoomResponse.data.picture } : room
        ),
      }));

      return updatedRoomResponse.data;
    } catch (error) {
      console.error("Error updating room:", error);
    }
  },

  deleteRoom: async (id) => {
    try {
      await axios.delete(`${url}/room/delete-room/${id}`, { withCredentials: true });
      set(state => ({ rooms: state.rooms.filter(room => room.id !== id) }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteOrder: async (id) => {
    try {
      await axios.delete(`${url}/order/delete-order/${id}`, { withCredentials: true });
      set(state => ({ orders: state.orders.filter(order => order.id !== id) }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  uploadPicture: async (id, formData) => {
    try {
      const response = await axios.post(`${url}/room/upload-picture/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Fetch the updated room data immediately after upload
      const updatedRoomResponse = await axios.get(`${url}/room/get-room/${id}`, { withCredentials: true });
      const updatedRoom = updatedRoomResponse.data;

      set(state => ({
        rooms: state.rooms.map(room =>
          room.id === id ? { ...room, ...updatedRoom } : room
        )
      }));

      // Optionally, trigger a full re-fetch to ensure complete synchronization
      await get().fetchRooms();
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateOrder: async (id, timeStart, timeEnd) => {
    try {
      const response = await axios.put(`${url}/order/update-order/${id}`, { timeStart, timeEnd }, { withCredentials: true });
      set(state => ({
        orders: state.orders.map(order => 
          order.id === id ? response.data : order
        )
      }));
      
      // Notify user of successful update
      toast.success("Время успешно изменено!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset input state
      set({ timeStart: "", timeEnd: "" });
    } catch (error) {
      set({ error: error.message });
      
      // Notify user of error
      toast.error("Ошибка при изменении времени", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  },
  queryParams: {},
  setQueryParams: (params) => set({ queryParams: params }),
  fetchOrders: async (params) => {
    try {
      const response = await axios.get(`${url}/order/get-all-orders`, {
        params,
        withCredentials: true,
      });
      set({ orders: response.data });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },
}));
export default useAdminStore;