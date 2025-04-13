import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt, FaUser, FaFileAlt, FaUpload, FaExternalLinkAlt, FaHome } from 'react-icons/fa';
import LogoFlexi from '../assets/logoNome.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
      <nav
        className={`flex flex-row-reverse w-full md:flex-row h-10 md:h-16 bg-white py-1 px-2 gap-2 justify-between md:items-center 
                ${menuOpen ? 'gap-2' : 'w-full'}`}
        ref={menuRef}
      >
        <button
          className="md:flex w-[auto] mt-0.5 p-0 items-center justify-center md:h-8 rounded-[20px]"
          onClick={() => window.location.href('https://flexi-report-app.vercel.app/')}
        >
          <img src={LogoFlexi} alt="Logo" className="h-6 lg:h-7" />
        </button>
        <div className='flex flex-col'>
        <button
          ref={buttonRef}
          className="flex gap-2 text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          <span className={`text-[12px] ${menuOpen ? 'hidden' : ''}`}>
            Menu de Acesso
          </span>
          <span className={`text-[12px] ${menuOpen ? 'block' : 'hidden'}`}>
            Fechar Menu
          </span>
        </button>
        <div
          className={`flex-col md:flex md:flex-row gap-2 md:gap-4 xl:gap-8 ${menuOpen ? 'flex mt-2' : 'hidden'}`}
        >
          <Link to="/" onClick={handleButtonClick}>
            <button className="flex items-center border border-black w-full md:w-auto h-10 lg:px-4 bg-white text-black md:border-none font-semibold hover:bg-gray-100 hover:text-black text-[11px] lg:text-[16px]">
            <FaHome className="lg:mr-2 mr-1" /> 
            Home
            </button>
          </Link>
          <Link to="/editor" onClick={handleButtonClick}>
            <button className="flex items-center border border-black w-full md:w-auto h-10 bg-white text-black md:border-none font-semibold hover:bg-gray-100 hover:text-black text-[11px] lg:text-[16px]">
            <FaFileAlt className="lg:mr-2 mr-1" />
            Editor de Relatórios
            </button>
          </Link>
          <Link to="/csvUploader" onClick={handleButtonClick}>
            <button className="flex items-center border border-black w-full md:w-auto h-10 bg-white text-black md:border-none font-semibold hover:bg-gray-100 hover:text-black text-[11px] lg:text-[16px]">
            <FaUpload className="lg:mr-2 mr-1" />
            CSV Uploader
            </button>
          </Link>
          <button
            className="flex items-center w-full border border-black md:w-auto h-10 bg-white text-black md:border-none font-semibold hover:bg-gray-100 hover:text-black text-[11px] lg:text-[16px]"
            onClick={() => window.open('https://superclient.com.br/', '_blank')}
          >
            <FaExternalLinkAlt className="lg:mr-2 mr-1" />
            SuperClient
          </button>

          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={handleButtonClick}>
                <button className="flex items-center w-full border border-black md:w-auto h-10 bg-white text-black md:border-none font-semibold hover:bg-gray-100 hover:text-black text-[11px] lg:text-[16px]">
                <FaUser className="lg:mr-2 mr-1" />
                Perfil
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full border border-black md:w-auto h-10 bg-white text-black md:border-none font-semibold hover:bg-gray-100 hover:text-black text-[11px] lg:text-[16px]"
              >
                <FaSignOutAlt size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" onClick={handleButtonClick}>
              <button className="flex items-center w-full border border-black md:w-auto h-10 bg-white text-black md:border-none font-semibold hover:bg-gray-100 hover:text-black text-[11px] lg:text-[16px]">
              <FaUser className="lg:mr-2 mr-1" />
              Login
              </button>
            </Link>
          )}
        </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
