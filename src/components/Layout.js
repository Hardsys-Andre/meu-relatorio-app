import React from 'react';
import { Toaster } from 'sonner'
import Navbar from './Navbar';
import Footer from './footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Toaster position="top-right" richColors />
            <Navbar />
            <main className="mt-[65px]">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
