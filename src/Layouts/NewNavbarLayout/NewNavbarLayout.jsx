import React from "react";
import NestedNavbar from "../../components/NestedNavbar/NestedNavbar.tsx";
function NewNavbarLayout({children}) {
    return (
        <div>
            <NestedNavbar/>
            <div>
                {children}
            </div>
        </div>
    );
}

export default NewNavbarLayout;
