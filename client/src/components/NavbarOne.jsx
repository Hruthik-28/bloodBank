import React from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { ModeToggle } from "./mode-toggle";

let menuItems = [];

export function NavbarOne() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const auth = localStorage.getItem("auth");
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        menuItems = [];
        navigate("/login");
    };

    if (auth === "admin") {
        menuItems = [
            {
                name: "DashBoard",
                href: "/admin/dashboard",
            },
            {
                name: "Donors",
                href: "/admin/donors",
            },
            {
                name: "Patients",
                href: "/admin/patients",
            },
            {
                name: "Donations",
                href: "/admin/donations",
            },
            {
                name: "Requests",
                href: "/admin/requests",
            },
        ];
    }
    if (auth === "donor") {
        menuItems = [
            {
                name: "DashBoard",
                href: "/donor/dashboard",
            },
            {
                name: "Donate Blood",
                href: "/donor/donate",
            },
        ];
    }
    if (auth === "patient") {
        menuItems = [
            {
                name: "DashBoard",
                href: "/patient/dashboard",
            },
            {
                name: "Request Blood",
                href: "/patient/request",
            },
        ];
    }

    return (
        <div className="relative w-full border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                <div className="inline-flex items-center space-x-2">
                    <span>
                        <Logo />
                    </span>
                </div>
                <div className="absolute sm:right-28 right-16">
                    <ModeToggle />
                </div>
                <div className="hidden lg:block">
                    <ul className="inline-flex space-x-8">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                        `${
                                            isActive
                                                ? " text-sm font-semibold"
                                                : "text-gray-400 text-sm font-semibold"
                                        } `
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden lg:block ">
                    {auth ? (
                        <Button onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Link to={"/login"}>
                            <Button>Login</Button>
                        </Link>
                    )}
                </div>
                <div className="lg:hidden">
                    <Menu
                        onClick={toggleMenu}
                        className="h-6 w-6 cursor-pointer"
                    />
                </div>
                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                        <div className="divide-y-2 divide-gray-100 rounded-lg dark:bg-black dark:text-white bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pb-6 pt-5">
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center space-x-2">
                                        <Logo />
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <X
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-4">
                                        {menuItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                            >
                                                <span className="ml-3 text-base font-medium text-gray-900">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                                {auth ? (
                                    <Button
                                        onClick={handleLogout}
                                        className="w-full"
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Link to={"/login"}>
                                        <Button className="w-full ">
                                            Login
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
