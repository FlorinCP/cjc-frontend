import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveNavbar from "../ResponsiveNavbar/ResponsiveNavbar";

function NavBarLayout() {
    return (
        <div>
            <ResponsiveNavbar/>
            <Outlet/>
        </div>
    );
}

export default NavBarLayout;
