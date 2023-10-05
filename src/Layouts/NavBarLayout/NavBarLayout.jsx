import React from 'react';
import WebNavbar from "../../components/WebNavbar/WebNavbar";

function NavBarLayout({children}) {
    return (
        <div>
            <WebNavbar/>
            <div>
                {children}
            </div>
        </div>
    );
}

export default NavBarLayout;