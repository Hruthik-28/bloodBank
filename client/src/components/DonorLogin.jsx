import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { donorLogin } from "@/store/donorSlice";

function DonorLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LoginAsDonor = async (data) => {
        const res = await dispatch(donorLogin(data));
        if (res.type === "donorLogin/fulfilled") {
            navigate("/donor/dashboard");
            localStorage.setItem("auth", "donor");
        }
    };

    return (
        <>
            <section className="w-full rounded-md mx-auto space-y-4 p-5 flex flex-col items-center border">
                <Logo />
                <h1 className="font-bold">Donor Login</h1>
                <form
                    onSubmit={handleSubmit(LoginAsDonor)}
                    className="flex flex-col w-full space-y-5"
                >
                    <Input
                        type="text"
                        placeholder="Email"
                        className="w-full"
                        {...register("email", {
                            required: "Email is required",
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
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        SignIn
                    </Button>
                </form>
            </section>
        </>
    );
}

export default DonorLogin;
