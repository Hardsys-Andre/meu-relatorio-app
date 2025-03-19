import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className="mt-[65px]">{children}</main>
        </div>
    );
};

export default Layout;
