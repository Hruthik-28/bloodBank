import React from "react";
import { NavbarOne } from "./NavbarOne";
import {Outlet} from "react-router-dom"

function Layout() {
    return (
        <>
            <NavbarOne />
            <Outlet />
        </>
    );
}

export default Layout;
