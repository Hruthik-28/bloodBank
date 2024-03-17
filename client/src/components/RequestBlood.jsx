import { useForm, Controller } from "react-hook-form";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { requestBlood } from "@/store/patientSlice";

function RequestBlood() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm();
    const dispatch = useDispatch();
    const patientId = localStorage.getItem("patientId");

    const bloodRequest = (data) => {
        dispatch(requestBlood({ ...data, patientId }));
        reset();
    };

    return (
        <>
            <section className="w-full max-w-lg rounded-md mx-auto space-y-4 mt-20 p-5 flex flex-col items-center border">
                <Logo />
                <h1 className="font-bold">Request Blood</h1>
                <form
                    onSubmit={handleSubmit(bloodRequest)}
                    className="flex flex-col w-full space-y-5"
                >
                    <Input
                        value={`patient_id: ${patientId}`}
                        readOnly
                        className="font-bold"
                    />
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
                    <Input
                        type="number"
                        placeholder="unitsRequested (ml)"
                        {...register("unitsRequested", {
                            required: "unitsRequested is required",
                        })}
                    />
                    {errors.unitsRequested && (
                        <span className="text-red-500 text-sm">
                            {errors.unitsRequested.message}
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
                    {errors.diseaseStatus && (
                        <span className="text-red-500 text-sm">
                            {errors.diseaseStatus.message}
                        </span>
                    )}
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Request Blood
                    </Button>
                </form>
            </section>
        </>
    );
}

export default RequestBlood;
