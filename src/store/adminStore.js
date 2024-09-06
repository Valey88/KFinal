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
      set({ error: error.message });
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
      await axios.post(`${url}/room/upload-picture/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedRoomResponse = await axios.get(`${url}/room/get-room/${id}`, { withCredentials: true });
      set(state => ({
        rooms: state.rooms.map(room => 
          room.id === id ? { ...room, picture: updatedRoomResponse.data.picture } : room
        )
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  fetchOrders: async () => {
    try {
      const response = await axios.get(`${url}/order/get-all-orders`, {
        params: get().queryParams,
        withCredentials: true,
      });
      set({ orders: response.data });
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
    } catch (error) {
      set({ error: error.message });
    }
  },

  setQueryParams: (params) => set({ queryParams: params }),

  
}));

export default useAdminStore;
