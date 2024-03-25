import Footer from "./Footer";
import { NavbarOne } from "./NavbarOne";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <NavbarOne />
            <div className="h-[81vh] overflow-hidden">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default Layout;
