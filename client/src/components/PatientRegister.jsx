import { Input } from "./ui/input";
import { useForm, Controller } from "react-hook-form";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { patientRegister } from "@/store/patientSlice";

function PatientRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const RegisterAsPatient = async (data) => {
        const res = await dispatch(patientRegister(data));
        if (res.type === "patientRegister/fulfilled") {
            navigate("/login");
        }
    };
    return (
        <>
            <section className="w-full rounded-md mx-auto space-y-4 p-5 flex flex-col items-center border">
                <Logo />
                <h1 className="font-bold">Patient Registration</h1>
                <form
                    onSubmit={handleSubmit(RegisterAsPatient)}
                    className="flex flex-col w-full space-y-5"
                >
                    <Input
                        type="text"
                        placeholder="name"
                        className="w-full"
                        {...register("name", {
                            required: "name is required",
                        })}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">
                            {errors.name.message}
                        </span>
                    )}
                    <Input
                        type="text"
                        placeholder="email"
                        {...register("email", {
                            required: "email is required",
                        })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            {errors.email.message}
                        </span>
                    )}
                    <Input
                        type="Password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )}
                    <Input
                        type="text"
                        placeholder="mobile"
                        {...register("mobile", {
                            required: "mobile is required",
                        })}
                    />
                    {errors.mobile && (
                        <span className="text-red-500 text-sm">
                            {errors.mobile.message}
                        </span>
                    )}
                    <Controller
                        name="bloodGroup"
                        defaultValue=""
                        control={control}
                        rules={{ required: "please select your blood group" }} // Add any validation rules here
                        render={({ field: { onChange } }) => (
                            <Select onValueChange={onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Blood Group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.bloodGroup && (
                        <span className="text-red-500 text-sm">
                            {errors.bloodGroup.message}
                        </span>
                    )}
                    <Controller
                        name="diseaseStatus"
                        control={control}
                        defaultValue=""
                        rules={{ required: "select diseaseStatus" }}
                        render={({ field: { onChange } }) => (
                            <Select onValueChange={onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="diseaseStatus" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="no disease">
                                        No disease
                                    </SelectItem>
                                    <SelectItem value="hypertension">
                                        Hypertension
                                    </SelectItem>
                                    <SelectItem value="diabetes">
                                        Diabetes
                                    </SelectItem>
                                    <SelectItem value="heart_disease">
                                        Heart disease
                                    </SelectItem>
                                    <SelectItem value="asthma">
                                        Asthma
                                    </SelectItem>
                                    <SelectItem value="cancer">
                                        Cancer
                                    </SelectItem>
                                    <SelectItem value="hiv_aids">
                                        HIV/AIDS
                                    </SelectItem>
                                    <SelectItem value="hepatitis">
                                        Hepatitis
                                    </SelectItem>
                                    <SelectItem value="arthritis">
                                        Arthritis
                                    </SelectItem>
                                    <SelectItem value="thyroid_disorders">
                                        Thyroid disorders
                                    </SelectItem>
                                    <SelectItem value="copd">
                                        Chronic obstructive pulmonary disease
                                        (COPD)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Register
                    </Button>
                </form>
            </section>
        </>
    );
}

export default PatientRegister;
