import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../constants/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: `${url}/`,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
export const dataApi = createApi({
  reducerPath: "dataApi/api",
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
  tagTypes: ["Rooms", "Pictures"],
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => "room/get-all-rooms",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Rooms", id })), "Rooms"]
          : ["Rooms"],
    }),
    getPicturesName: builder.query({
      query: (name) => ({
        url: `room/get-names-picture-by-name/${name}`,
      }),
    }),

    addRooms: builder.mutation({
      query: (body) => ({
        url: "room/add-room",
        method: "POST",
        body: {
          address: body.address,
          name: body.name,
          description: body.description,
          price: body.price,
          places: body.places,
          weekDays: body.weeks,
          timeStart: body.timeStart,
          timeEnd: body.timeEnd,
        },
      }),
      invalidatesTags: ["Rooms"],
    }),

    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `room/delete-room/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),
    deletePicture: builder.mutation({
      query: (name) => ({
        url: `room/delete-picture/${name}`,
        method: "DELETE",
      }),
    }),
    postOrders: builder.mutation({
      query: (body) => ({
        url: "order/create-order",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: {
          roomId: body.roomId,
          timeStart: body.timeStart,
          durationHours: body.durationHours,
          durationMinuts: body.durationMinuts,
          summaryEvent: body.summaryEvent,
          fio: body.fio,
          email: body.email,
          phoneNumber: body.phoneNumber,
        },
      }),
    }),
    getOrders: builder.query({
      query: () => "order/get-all-orders",
      withCredentials: true,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useAddRoomsMutation,
  useGetRoomsQuery,
  useDeleteRoomMutation,
  useGetPicturesQuery,
  useGetPicturesNameQuery,
  useDeletePictureMutation,
  usePostOrdersMutation,
  useGetOrdersQuery,
} = dataApi;
