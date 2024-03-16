import { Toaster } from "react-hot-toast";
import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AdminDashboard from "./components/AdminDashboard";
import ListAllDonors from "./components/ListAllDonors";
import ListPatients from "./components/ListPatients";
import ManageDonations from "./components/ManageDonations";
import ManageRequests from "./components/ManageRequests";

function App() {
    return (
        <>
            <Toaster />
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}
                >
                    <Route path="/login" element={<SignIn />}/>
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
                </Route>
                
            </Routes>
        </>
    );
}

export default App;
