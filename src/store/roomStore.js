import create from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../constants/constants";

const useRoomStore = create((set) => ({
  address: "",
  name: "",
  description: "",
  places: 0,
  weekDays: [],
  timeStart: "",
  timeEnd: "",
  weeks: [
    { day: "Пн" },
    { day: "Вт" },
    { day: "Ср" },
    { day: "Чт" },
    { day: "Пт" },
    { day: "Сб" },
    { day: "Вс" },
  ],

  setAddress: (address) => set({ address }),
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setPlaces: (places) => set({ places }),
  setWeekDays: (day) =>
    set((state) => {
      const updatedWeekDays = state.weekDays.includes(day)
        ? state.weekDays.filter((d) => d !== day)
        : [...state.weekDays, day];
      return { weekDays: updatedWeekDays };
    }),
  setTimeStart: (timeStart) => set({ timeStart }),
  setTimeEnd: (timeEnd) => set({ timeEnd }),

  resetForm: () =>
    set({
      address: "",
      name: "",
      description: "",
      places: 0,
      weekDays: [],
      timeStart: "",
      timeEnd: "",
    }),

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

  addNewRoom: async () => {
    const { address, name, description, places, timeStart, timeEnd, weekDays } =
      useRoomStore.getState();

    if (weekDays.length === 0) {
      toast.error("Please select at least one day of the week", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      await axios.post(
        `${url}/room/add-room`,
        {
          address,
          name,
          description,
          places,
          timeStart,
          timeEnd,
          weekDays,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Комната успешно создана!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      useRoomStore.getState().resetForm();
    } catch (error) {
      console.log("Error:", error);

      toast.error(
        error.response.data.message ||
          "Произошла ошибка при отправке создании комнаты. Пожалуйста, попробуйте еще раз.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  },
}));

export default useRoomStore;
