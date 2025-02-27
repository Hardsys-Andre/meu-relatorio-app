import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Robo from '../assets/robo.png'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex justify-center w-full  fixed top-3 z-50">
            <nav className="flex w-[97%] bg-[#42B091] p-1 px-4 border-[1px] border-[#e2e2e2] rounded-xl md:justify-between justify-center items-center">
                <button className='border-none hover:border-0' onClick={() => window.open("https://superclient.com.br/", "_blank")}>
                <img src={Robo} alt="Robo" className="md:h-10 hidden md:block" />
                </button>
                <button
                    className="text-white md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                <div className={`flex-col md:flex md:flex-row gap-2 md:gap-10 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                    <Link to="/editor">
                        <button>Editor de Relatórios</button>
                    </Link>
                    <Link to="/csvUploader">
                        <button>CSV Uploader</button>
                    </Link>
                    <button onClick={() => window.open("https://superclient.com.br/", "_blank")}>SuperClient</button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;