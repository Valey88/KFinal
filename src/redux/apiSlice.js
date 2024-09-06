import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { url } from '../constants/constants';

// Async thunks
export const fetchRooms = createAsyncThunk('admin/fetchRooms', async () => {
  const response = await axios.get(`${url}/room/get-all-rooms`, { withCredentials: true });
  return response.data;
});

export const deleteRoom = createAsyncThunk('admin/deleteRoom', async (id) => {
  await axios.delete(`${url}/room/delete-room/${id}`, { withCredentials: true });
  return id;
});

export const deleteOrder = createAsyncThunk('admin/deleteOrder', async (id) => {
  await axios.delete(`${url}/order/delete-order/${id}`, { withCredentials: true });
  return id;
});

export const uploadPicture = createAsyncThunk('admin/uploadPicture', async ({ id, formData }) => {
  await axios.post(`${url}/room/upload-picture/${id}`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
  const updatedRoomResponse = await axios.get(`${url}/room/get-room/${id}`, { withCredentials: true });
  return { id, picture: updatedRoomResponse.data.picture };
});

export const fetchOrders = createAsyncThunk('admin/fetchOrders', async (queryParams) => {
  const response = await axios.get(`${url}/order/get-all-orders`, {
    params: queryParams,
    withCredentials: true,
  });
  return response.data;
});

export const updateOrder = createAsyncThunk('admin/updateOrder', async ({ id, timeStart, timeEnd }) => {
  const response = await axios.put(`${url}/order/update-order/${id}`, { timeStart, timeEnd }, { withCredentials: true });
  return response.data;
});

// Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    rooms: [],
    orders: [],
    pictures: [],
    queryParams: {},
    loading: false,
    error: null,
  },
  reducers: {
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter(room => room.id !== action.payload);
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.id !== action.payload);
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        const { id, picture } = action.payload;
        const roomIndex = state.rooms.findIndex(room => room.id === id);
        if (roomIndex !== -1) {
          state.rooms[roomIndex].picture = picture;
        }
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export const { setQueryParams } = adminSlice.actions;

export default adminSlice.reducer;
