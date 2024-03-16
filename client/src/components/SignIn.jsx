import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { adminLogin } from "@/store/adminSlice";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LoginAsAdmin = async (data) => {
        const res = await dispatch(adminLogin(data));
        if (res.type === "adminLogin/fulfilled") {
            navigate("/admin/dashboard");
            localStorage.setItem("auth", "admin");
        }
    };
    return (
        <>
            <div className="w-full flex justify-center mt-20">
                <Tabs defaultValue="admin">
                    <TabsList className="">
                        <TabsTrigger
                            value="admin"
                            className="w-[150px] "
                        >
                            Admin
                        </TabsTrigger>
                        <TabsTrigger
                            value="donor"
                            className="w-[150px]"
                        >
                            Donor
                        </TabsTrigger>
                        <TabsTrigger
                            value="patient"
                            className="w-[150px]"
                        >
                            Patient
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="admin"
                        className="w-[450px]"
                    >
                        <section className="w-full rounded-md mx-auto space-y-4 p-5 flex flex-col items-center border">
                            <Logo />
                            <h1 className="font-bold">Admin Login</h1>
                            <form
                                onSubmit={handleSubmit(LoginAsAdmin)}
                                className="flex flex-col w-full space-y-5"
                            >
                                <Input
                                    type="text"
                                    placeholder="username"
                                    className="w-full"
                                    {...register("username", {
                                        required: "username is required",
                                    })}
                                />
                                {errors.username && (
                                    <span className="text-red-500 text-sm">
                                        {errors.username.message}
                                    </span>
                                )}
                                <Input
                                    type="Password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "password is required",
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
                    </TabsContent>
                    <TabsContent value="donor">
                        Change your donor here.
                    </TabsContent>
                    <TabsContent value="patient">
                        Change your patient here.
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default SignIn;
