import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveNavbar from "../../components/MobileNavbar/ResponsiveNavbar";

function NavBarLayout() {
    return (
        <div>
            <ResponsiveNavbar/>
            <Outlet/>
        </div>
    );
}

export default NavBarLayout;
