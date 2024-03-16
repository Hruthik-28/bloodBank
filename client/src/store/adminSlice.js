import axiosInstance from "@/helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
    admin: null,
    dashboard: null,
    donorsList: null,
    patientsList: null,
    donations: null,
    requests: null,
};

export const adminLogin = createAsyncThunk("adminLogin", async (data) => {
    try {
        const response = await axiosInstance.post("/admin/login", data);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const adminDashBoard = createAsyncThunk("adminDashBoard", async () => {
    try {
        const response = await axiosInstance.get("/admin/dashboard");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const listAllDonors = createAsyncThunk("listAllDonors", async () => {
    try {
        const response = await axiosInstance.get("/admin/listDonors");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const deleteDonor = createAsyncThunk("deleteDonor", async (donorId) => {
    try {
        const response = await axiosInstance.delete(
            `/admin/deleteDonor/${donorId}`
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const editDonor = createAsyncThunk("editDonor", async (data) => {
    const dataToSubmit = {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        blood_group: data.blood_group,
        disease_status: data.disease_status,
    };
    try {
        const response = await axiosInstance.patch(
            `/admin/editDonor/${data?.donor_id}`,
            dataToSubmit
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const listPatients = createAsyncThunk("listPatients", async () => {
    try {
        const response = await axiosInstance.get(`/admin/listPatients`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const deletePatient = createAsyncThunk(
    "deletePatient",
    async (patientId) => {
        try {
            const response = await axiosInstance.delete(
                `/admin/deletePatient/${patientId}`
            );
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
);
export const editPatient = createAsyncThunk("editPatient", async (data) => {
    const dataToSubmit = {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        blood_group: data.blood_group,
    };
    try {
        const response = await axiosInstance.patch(
            `/admin/editPatient/${data?.patient_id}`,
            dataToSubmit
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const listDonations = createAsyncThunk("listDonations", async () => {
    try {
        const response = await axiosInstance.get(`/admin/listDonations`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const listRequests = createAsyncThunk("listRequests", async () => {
    try {
        const response = await axiosInstance.get(`/admin/listRequests`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});
export const manageDonation = createAsyncThunk(
    "manageDonation",
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/manageDonation/${data.donationId}/${data.response}`
            );
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
);
export const manageRequests = createAsyncThunk(
    "manageRequests",
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/manageRequests/${data.requestId}/${data.response}`
            );
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
);

const adminSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.admin = action.payload;
        });
        builder.addCase(adminDashBoard.fulfilled, (state, action) => {
            state.dashboard = action.payload;
        });
        builder.addCase(listAllDonors.fulfilled, (state, action) => {
            state.donorsList = action.payload;
        });
        builder.addCase(listPatients.fulfilled, (state, action) => {
            state.patientsList = action.payload;
        });
        builder.addCase(listDonations.fulfilled, (state, action) => {
            state.donations = action.payload;
        });
        builder.addCase(listRequests.fulfilled, (state, action) => {
            state.requests = action.payload;
        });
    },
});

export default adminSlice.reducer;
