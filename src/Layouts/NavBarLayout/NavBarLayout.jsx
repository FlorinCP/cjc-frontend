import React from 'react';
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

function NavBarLayout({children}) {
    return (
        <div>
            <MobileNavbar/>
            <div>
                {children}
            </div>
        </div>
    );
}

export default NavBarLayout;