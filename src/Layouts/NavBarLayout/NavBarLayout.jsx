import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveNavbar from "../ResponsiveNavbar/ResponsiveNavbar";
import ResponsiveNavbarFixed from "../ResponsiveNavbar/ResponsiveNavbarFixed";

function NavBarLayout() {
    return (
        <div>
            <ResponsiveNavbarFixed/>
            <Outlet/>
        </div>
    );
}

export default NavBarLayout;
