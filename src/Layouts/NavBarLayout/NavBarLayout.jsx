import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveNavbarFixed from "../ResponsiveNavbar/ResponsiveNavbarFixed";
import Footer from "../Footer/Footer";

function NavBarLayout() {
    return (
        <div>
            <ResponsiveNavbarFixed/>
            <Outlet/>
            <Footer />
        </div>
    );
}

export default NavBarLayout;
