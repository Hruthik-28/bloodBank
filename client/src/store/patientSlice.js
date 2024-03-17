import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    patientId: null,
    requestHistory: null,
};

export const patientLogin = createAsyncThunk("patientLogin", async (data) => {
    try {
        const response = await axiosInstance.post("/patient/login", data);
        localStorage.setItem("patientId", `${response.data.patientId}`);
        toast.success(response.data.message);
        return response.data.patienId;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const requestHistory = createAsyncThunk(
    "requestHistory",
    async (patienId) => {
        try {
            const response = await axiosInstance.get(
                `/patient/requestHistory/${patienId}`
            );
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
);

export const requestBlood = createAsyncThunk("requestBlood", async (data) => {
    try {
        const response = await axiosInstance.post(
            `/patient/requestBlood`,
            data
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(patientLogin.fulfilled, (state, action) => {
            state.patientId = action.payload;
        });
        builder.addCase(requestHistory.fulfilled, (state, action) => {
            state.requestHistory = action.payload;
        });
    },
});

export default patientSlice.reducer;
