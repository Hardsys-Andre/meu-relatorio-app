import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Robo from '../assets/robo.png'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex justify-center w-full fixed top-3 z-50">
            <nav className={`flex flex-col md:flex-row w-[97%] h-10 md:h-auto bg-[#42B091] py-1 px-4 border-[1px] border-[#e2e2e2] rounded-xl md:justify-between md:items-center items-start
                ${menuOpen ? 'gap-2' : 'w-[97%] md:w-[97%]'}`}>
                <button className='border-none hover:border-0 hidden md:block' onClick={() => window.open("https://superclient.com.br/", "_blank")}>
                <img src={Robo} alt="Robo" className="md:h-10 hidden md:block" />
                </button>
                <button
                    className="flex gap-2 text-white md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes size={16} />: <FaBars size={16} />}
                    <span className={`text-[12px] ${menuOpen ? 'hidden':''}`}>Menu de Acesso</span>
                    <span className={`text-[12px] ${menuOpen ? 'block':'hidden'}`}>Fechar Menu</span>
                </button>
                <div className={`flex-col md:flex md:flex-row gap-2 md:gap-8 ${menuOpen ? 'flex' : 'hidden'}`}>
                    <Link to="/">
                        <button className='w-full md:w-auto text-[12px] md:text-[16px]'>Home</button>
                    </Link>
                    <Link to="/editor">
                        <button className='w-full md:w-auto text-[12px] md:text-[16px]'>Editor de Relatórios</button>
                    </Link>
                    <Link to="/csvUploader">
                        <button className='w-full md:w-auto text-[12px] md:text-[16px]'>CSV Uploader</button>
                    </Link>
                    <button className='w-full md:w-auto text-[12px] md:text-[16px]' onClick={() => window.open("https://superclient.com.br/", "_blank")}>SuperClient</button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;