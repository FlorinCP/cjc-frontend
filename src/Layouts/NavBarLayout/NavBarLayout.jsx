import React from 'react';
import ResponsiveNavbar from "../../components/MobileNavbar/ResponsiveNavbar";

function NavBarLayout({children}) {
    return (
        <div>
            <ResponsiveNavbar/>
            <div>
                {children}
            </div>
        </div>
    );
}

export default NavBarLayout;
