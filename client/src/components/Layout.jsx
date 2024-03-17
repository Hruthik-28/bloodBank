import React from "react";
import { NavbarOne } from "./NavbarOne";
import { Outlet } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

function Layout() {
    return (
        <>
            <NavbarOne />
            <Outlet />
        </>
    );
}

export default Layout;
