import create from "zustand";
import axios from "axios";
import { url } from "../constants/constants";

const useBookingStore = create((set) => ({
  bookings: [],
  fetchBookings: async (roomId) => {
    console.log("Fetching bookings for roomId:", roomId);
    try {
      const response = await axios.get(`${url}/order/get-all-orders`, {
        params: { roomId: roomId },
      });
      console.log("Bookings received:", response.data);
      set({ bookings: response.data });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  },
}));

export default useBookingStore;
