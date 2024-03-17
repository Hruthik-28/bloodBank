import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
    donorId: null,
    donationHistory: null,
};

export const registerDonor = createAsyncThunk("registerDonor", async (data) => {
    try {
        const response = await axiosInstance.post("/donor/register", data);
        toast.success(response.data.message);
        return response.data.donorId;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

export const donorLogin = createAsyncThunk("donorLogin", async (data) => {
    try {
        const response = await axiosInstance.post("/donor/login", data);
        localStorage.setItem("donorId", `${response.data.donorId}`);
        toast.success(response.data.message);
        return response.data.donorId;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const donationHistory = createAsyncThunk(
    "donationHistory",
    async (donorId) => {
        try {
            const response = await axiosInstance.get(
                `/donor/viewDonationHistory/${donorId}`
            );
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
);

export const donateBlood = createAsyncThunk("donateBlood", async (data) => {
    try {
        const response = await axiosInstance.post(`/donor/donateBlood`, data);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

const donorSlice = createSlice({
    name: "donor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(donorLogin.fulfilled, (state, action) => {
            state.donorId = action.payload;
        });
        builder.addCase(donationHistory.fulfilled, (state, action) => {
            state.donationHistory = action.payload;
        });
    },
});

export default donorSlice.reducer;
