import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className="mt-[90px]">{children}</main>
        </div>
    );
};

export default Layout;
