import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Robo from '../assets/robo.png';
import { useAuth } from '../context/AuthContext'; // Importando o contexto de autenticação

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // Acessando o estado de login
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referência para o menu
  const buttonRef = useRef(null); // Referência para o botão de abrir/fechar menu
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false); // Chama a função de logout do contexto
    navigate("/"); // Redireciona para a home após o logout
  };

  // Fechar o menu ao clicar fora dele
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

    // Cleanup no momento em que o componente for desmontado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fechar o menu ao clicar em qualquer botão
  const handleButtonClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="flex justify-center w-full fixed top-3 z-50">
      <nav
        className={`flex flex-col md:flex-row w-[97%] h-10 md:h-auto bg-[#42B091] py-1 px-4 border-[1px] border-[#e2e2e2] rounded-xl md:justify-between md:items-center items-start
                ${menuOpen ? 'gap-2' : 'w-[97%] md:w-[97%]'}`}
        ref={menuRef} // Associando o menu à referência
      >
        <button
          className="border-none hover:border-0 hidden md:block"
          onClick={() => window.open('https://superclient.com.br/', '_blank')}
        >
          <img src={Robo} alt="Robo" className="md:h-10 hidden md:block" />
        </button>
        <button
          ref={buttonRef} // Associando o botão à referência
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
          className={`flex-col md:flex md:flex-row gap-2 md:gap-8 ${menuOpen ? 'flex' : 'hidden'}`}
        >
          <Link to="/" onClick={handleButtonClick}>
            <button className="w-full md:w-auto text-[12px] md:text-[16px]">Home</button>
          </Link>
          <Link to="/editor" onClick={handleButtonClick}>
            <button className="w-full md:w-auto text-[12px] md:text-[16px]">
              Editor de Relatórios
            </button>
          </Link>
          <Link to="/csvUploader" onClick={handleButtonClick}>
            <button className="w-full md:w-auto text-[12px] md:text-[16px]">
              CSV Uploader
            </button>
          </Link>
          <button
            className="w-full md:w-auto text-[12px] md:text-[16px]"
            onClick={() => window.open('https://superclient.com.br/', '_blank')}
          >
            SuperClient
          </button>

          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={handleButtonClick}>
                <button className="w-full md:w-auto text-[12px] md:text-[16px]">
                  Perfil
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex justify-center w-full md:w-auto"
              >
                <FaSignOutAlt size={20} />
              </button>
            </>
          ) : (
            <Link to="/pageLogin" onClick={handleButtonClick}>
              <button className="w-full md:w-auto text-[12px] md:text-[16px]">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
