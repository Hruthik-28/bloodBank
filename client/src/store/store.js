import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";
import donorSlice from "./donorSlice";
import patientSlice from "./patientSlice";

const store = configureStore({
    reducer: {
        admin: adminSlice,
        donor: donorSlice,
        patient: patientSlice,
    },
});

export default store;
