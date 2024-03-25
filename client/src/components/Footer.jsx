import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <>
            <section className="relative mt-5 w-full overflow-hidden sm:py-4 py-2 border-t">
                <div className="container relative z-10 mx-auto px-4">
                    <div className="-m-8 flex flex-row items-center justify-between">
                        <div className="sm:block hidden p-8">
                            <div className="">
                                <Logo />
                            </div>
                        </div>
                        <div className=" p-8">
                            <span className="sm:text-base text-sm">
                                © Copyright 2024. All Rights Reserved by
                                Hruthik.
                            </span>
                        </div>
                        <div className="p-8">
                            <div className="-m-1.5 flex ">
                                <div className="w-auto p-1.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                                        <Link
                                            to={
                                                "https://twitter.com/hruthik_28"
                                            }
                                            target="_blank"
                                            className="hover:text-pink-500 cursor-pointer"
                                        >
                                            <FaXTwitter />
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-auto p-1.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                                        <Link
                                            to={
                                                "https://www.linkedin.com/in/hruthik-ks-a90112253/"
                                            }
                                            className="hover:text-pink-500 cursor-pointer"
                                            target="_blank"
                                        >
                                            <FaLinkedinIn />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;
