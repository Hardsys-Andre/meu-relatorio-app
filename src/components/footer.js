import { Link, useNavigate } from "react-router-dom";
import LogoFlexi from "../assets/logoFlexiReport.png";
import Robo from "../assets/robo.png";
import Univesp from "../assets/logo-univesp.png";

const Footer = () => {
  return (
    <footer className="w-full p-4 mt-12 bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row justify-between gap-8 items-center">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-row gap-1 items-center ">
            <div className="flex justify-center items-center bg-white h-[80px] rounded-xl px-2">
              <Link to="https://univesp.br/" target="blank">
                <img src={Univesp} alt="Logo" className="h-6" />
              </Link>
            </div>
            <Link to="https://superclient.com.br" target="blank">
              <img
                src={Robo}
                alt="Robo"
                className="h-20 border-l-2 border-[#42B091] px-1"
              />
            </Link>
          </div>
          <span className="mt-2 text-2xl text-[#42B091] font-bold">
            Parceiros
          </span>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="font-bold mb-2">Links Importantes</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-[#42B091]">
                Home
              </a>
            </li>
            <li>
              <a href="/editor" className="hover:text-[#42B091]">
                Editor de Relatórios
              </a>
            </li>
            <li>
              <a href="/csvUploader" className="hover:text-[#42B091]">
                CSV Uploader
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-[#42B091]">
                Perfil do Usuário
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Hardsys-Andre/meu-relatorio-app"
                target="blank"
                className="hover:text-[#42B091]"
              >
                GitHub do Projeto
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col text-sm">
          <h3 className="font-bold mb-2">Contato</h3>
          <span>+55 12 99191-2571</span>
          <span>andrexsilva.dev@gmail.com</span>
          <span>
            Linkedin
            <Link
              to="https://www.linkedin.com/in/andre-eduardo-xavier-silva-40b475217/"
              target="blank"
              className="hover:text-[#42B091]"
            >
                : Andre E. X. Silva
            </Link>
          </span>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
        <span>
          © 2025 - Projeto Flexi Report. Todos os direitos reservados.
        </span>
        <img src={LogoFlexi} alt="Logo" className="h-14" />
        <span>
          Desenvolvido por: <strong>Alunos da UNIVESP</strong>.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
