import { Toaster } from "react-hot-toast";
import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AdminDashboard from "./components/AdminDashboard";
import ListAllDonors from "./components/ListAllDonors";
import ListPatients from "./components/ListPatients";
import ManageDonations from "./components/ManageDonations";
import ManageRequests from "./components/ManageRequests";
import { ThemeProvider } from "@/components/theme-provider";
import DonorDashboard from "./components/DonorDashboard";
import DonateBlood from "./components/DonateBlood";
import PatientDashboard from "./components/PatientDashboard";
import RequestBlood from "./components/RequestBlood";
import Register from "./components/Register";

function App() {
    return (
        <>
            <ThemeProvider
                defaultTheme="dark"
                storageKey="vite-ui-theme"
            >
                <Toaster />
                <Routes>
                    <Route
                        path="/"
                        element={<Layout />}
                    >
                        <Route
                            path="/login"
                            element={<SignIn />}
                        />
                        <Route
                            path="/register"
                            element={<Register />}
                        />
                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/admin/donors"
                            element={<ListAllDonors />}
                        />
                        <Route
                            path="/admin/patients"
                            element={<ListPatients />}
                        />
                        <Route
                            path="/admin/donations"
                            element={<ManageDonations />}
                        />
                        <Route
                            path="/admin/requests"
                            element={<ManageRequests />}
                        />
                        <Route
                            path="/donor/dashboard"
                            element={<DonorDashboard />}
                        />
                        <Route
                            path="/donor/donate"
                            element={<DonateBlood />}
                        />
                        <Route
                            path="/patient/dashboard"
                            element={<PatientDashboard />}
                        />
                        <Route
                            path="/patient/request"
                            element={<RequestBlood />}
                        />
                    </Route>
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
