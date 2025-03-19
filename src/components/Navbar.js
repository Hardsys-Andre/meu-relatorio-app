import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
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
    <header className="flex justify-center w-full fixed top-2 z-50">
      <nav
        className={`flex flex-row-reverse md:flex-row w-[97%] h-10 md:h-10 bg-[#3ea8c8] py-1 px-2 gap-2 border-[1px] border-[#e2e2e2] rounded-xl justify-between md:items-center 
                ${menuOpen ? 'gap-2' : 'w-[97%] md:w-[97%]'}`}
        ref={menuRef}
      >
        <Link to="/" onClick={handleButtonClick}>
        <button
          className="md:flex w-[auto] mt-0.5 p-0 items-center justify-center md:h-8 rounded-[20px]"
        >
          <img src={LogoFlexi} alt="Logo" className="h-6 md:h-7" />
        </button>
        </Link>
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
            <button className="flex items-center w-full md:w-auto h-7 text-[12px] lg:text-[16px]">Home</button>
          </Link>
          <Link to="/editor" onClick={handleButtonClick}>
            <button className="flex items-center w-full md:w-auto h-7 text-[12px] lg:text-[16px]">
              Editor de Relatórios
            </button>
          </Link>
          <Link to="/csvUploader" onClick={handleButtonClick}>
            <button className="flex items-center w-full md:w-auto h-7 text-[12px] lg:text-[16px]">
              CSV Uploader
            </button>
          </Link>
          <button
            className="flex items-center w-full md:w-auto h-7 text-[12px] lg:text-[16px]"
            onClick={() => window.open('https://superclient.com.br/', '_blank')}
          >
            SuperClient
          </button>

          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={handleButtonClick}>
                <button className="flex items-center w-full md:w-auto h-7 text-[12px] lg:text-[16px]">
                  Perfil
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center h-7 w-full md:w-auto"
              >
                <FaSignOutAlt size={20} />
              </button>
            </>
          ) : (
            <Link to="/pageLogin" onClick={handleButtonClick}>
              <button className="flex items-center w-full md:w-auto h-7 text-[12px] lg:text-[16px]">
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
