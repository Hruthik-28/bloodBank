import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { adminLogin } from "@/store/adminSlice";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientLogin from "./PatientLogin";
import DonorRegister from "./DonorRegister";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const RegisterDonor = async (data) => {
        const res = await dispatch(adminLogin(data));
        if (res.type === "adminLogin/fulfilled") {
            navigate("/admin/dashboard");
            localStorage.setItem("auth", "admin");
        }
    };
    return (
        <>
            <div className="w-full flex justify-center mt-5">
                <Tabs defaultValue="donor">
                    <TabsList>
                        <TabsTrigger
                            value="donor"
                            className="sm:w-[200px] w-[150px]"
                        >
                            Donor
                        </TabsTrigger>
                        <TabsTrigger
                            value="patient"
                            className="sm:w-[200px] w-[150px]"
                        >
                            Patient
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="donor">
                        <DonorRegister />
                    </TabsContent>
                    <TabsContent value="patient">
                        <PatientLogin />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default Register;
