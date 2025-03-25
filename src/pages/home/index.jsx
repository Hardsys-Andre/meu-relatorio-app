import React from "react";
import LogoFlexi from "../../assets/logoFlexiReport.png";
import Andre_e from "../../assets/andre-e.jpg";
import Luciana from "../../assets/luciana.jpg";
import Mariana from "../../assets/mariana.jpg";
import Felipe from "../../assets/felipe.jpg";
import Zenilda from "../../assets/zenilda.jpg";
import Andre_a from "../../assets/andre-a.png";
import Jose from "../../assets/jose.jpg";
import { Link } from 'react-router-dom';
import { FaFileAlt, FaUpload, FaLightbulb, FaDownload, FaSlidersH } from "react-icons/fa"

function Home() {
  return (
    <div className="flex flex-col w-full items-center ">
      <section className="flex flex-row w-full justify-between py-10 text-center bg-gradient-to-b from-white to-sky-100 dark:from-gray-950 dark:to-gray-900">
        <div className="flex flex-col justify-center w-[30%] items-end">
            <img
              src={LogoFlexi}
              alt="Logotipo Flexireport"
              className="w-[200px] xl:w-[250px] hover:scale-110"
            />
        </div>
        <div className="container px-4 mx-auto w-[70%]">
          <h1 className="max-w-3xl mx-auto mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Relatórios Personalizados de Forma Eficiente e Flexível!
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600 dark:text-gray-300">
            Importe seus dados CSV, crie relatórios personalizados e exporte-os com facilidade. Uma solução completa
            para suas necessidades de relatórios.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#3ea8c8] font-semibold hover:bg-[#2d97b7]">
              <Link to="/editor">Começar Agora</Link>
            </button>
            <button className="bg-white text-black font-semibold border-[1px] border-gray-400 hover:bg-gray-100 hover:text-black hover:border-gray-500">
              <Link to="/csvUploader">Importar CSV</Link>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 w-full bg-white dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Recursos Principais</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="transition-all duration-300 hover:shadow-lg border-[1px] border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-center  w-12 h-12 mb-4 rounded-full bg-sky-100 text-[#3ea8c8] dark:bg-sky-900">
                  <FaUpload className="w-5 h-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Importação Inteligente de Dados</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Importe facilmente seus arquivos CSV com nossa interface de arrastar e soltar. Visualize e selecione
                  as colunas que deseja incluir em seus relatórios.
                </p>
            </div>
            <div className="transition-all duration-300 hover:shadow-lg border-[1px] border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-sky-100 text-[#3ea8c8] dark:bg-sky-900">
                  <FaFileAlt className="w-5 h-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Relatórios Personalizáveis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Crie relatórios totalmente personalizados com nosso editor intuitivo. Adicione campos dinâmicos,
                  formate o texto e organize as informações como desejar.
                </p>
            </div>
            <div className="transition-all duration-300 hover:shadow-lg border-[1px] border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-sky-100 text-[#3ea8c8] dark:bg-sky-900">
                  <FaLightbulb className="w-5 h-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Interface Intuitiva</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Nossa interface foi projetada para ser fácil de usar, mesmo para usuários sem experiência técnica.
                  Navegue facilmente entre as diferentes funcionalidades.
                </p>
            </div>
            <div className="transition-all duration-300 hover:shadow-lg border-[1px] border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-sky-100 text-[#3ea8c8] dark:bg-sky-900">
                  <FaDownload className="w-5 h-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Exportação Simplificada</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Exporte seus relatórios em PDF com apenas um clique. Compartilhe facilmente com sua equipe ou
                  clientes.
                </p>
            </div>
            <div className="transition-all duration-300 hover:shadow-lg border-[1px] border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-sky-100 text-[#3ea8c8] dark:bg-sky-900">
                  <FaSlidersH className="w-5 h-5" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Flexibilidade e Controle</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tenha controle total sobre seus dados e relatórios. Filtre, ordene e agrupe as informações de acordo
                  com suas necessidades.
                </p>
            </div>
          </div>
          <div className="bg-white w-full text-gray-800 mt-6 space-y-6">
            <hr className="border-t-1 border-gray-200 w-full" />
          <p className="text-lg leading-relaxed text-justify">
            O <strong>FlexiReport</strong> é a ferramenta ideal para
            profissionais e empresas que buscam automatizar e otimizar a geração
            de relatórios personalizados a partir de dados brutos. Transforme
            dados complexos em informações claras e bem estruturadas em apenas
            alguns cliques!
          </p>
          <hr className="border-t-1 border-gray-200 w-full" />
        </div>  
        </div>
      </section>
      <section id="criadores" className="py-16 bg-sky-50 dark:bg-gray-900 w-full">
        <h2 className="text-4xl font-bold text-center">
          Nossa Equipe
        </h2>
        <div className="flex flex-col gap-8 md:flex-row justify-center mt-6">
          <div className="flex flex-col items-center mx-4">
            <img
              src={Andre_e}
              alt="Aluno André Eduardo"
              className="w-32 h-32 rounded-[64px] border-2 border-[#3ea8c8]"
            />
            <span className="mt-2 font-semibold text-center">
              André Eduardo
            </span>
            <span className="text-center text-sm">
              Aluno UNIVESP em Tecnologia da Informação
            </span>
          </div>
          <div className="flex flex-col items-center mx-4">
            <img
              src={Andre_a}
              alt="Aluno Andre Alexander"
              className="w-32 h-32 rounded-[64px] border-2 border-[#3ea8c8]"
            />
            <span className="mt-2 font-semibold text-center">
              André Alexander
            </span>
            <span className="text-center text-sm">
              Aluno UNIVESP em Ciência de Dados
            </span>
          </div>
          <div className="flex flex-col items-center mx-4">
            <img
              src={Felipe}
              alt="Aluno Felipe"
              className="w-32 h-32 rounded-[64px] border-2 border-[#3ea8c8]"
            />
            <span className="mt-2 font-semibold text-center">Felipe Augusto</span>
            <span className="text-center text-sm">
              Aluno UNIVESP em Ciência de Dados
            </span>
          </div>
          <div className="flex flex-col items-center mx-4">
            <img
              src={Jose}
              alt="Aluno José"
              className="w-32 h-32 rounded-[64px] border-2 border-[#3ea8c8]"
            />
            <span className="mt-2 font-semibold text-center">José Ricardo</span>
            <span className="text-center text-sm">
              Aluno UNIVESP em Engenharia da Computação
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-8 md:flex-row justify-center mt-6">
          <div className="flex flex-col items-center mx-4">
            <img
              src={Luciana}
              alt="Aluna Luciana"
              className="w-32 h-32 rounded-[64px] border-2 border-[#3ea8c8]"
            />
            <span className="mt-2 font-semibold text-center">
              Luciana Maria Rosa
            </span>
            <span className="text-center text-sm">
              Aluna UNIVESP em Tecnologia da Informação
            </span>
          </div>
          <div className="flex flex-col items-center mx-4">
            <img
              src={Mariana}
              alt="Aluna Mariana"
              className="w-32 h-32 rounded-[64px] border-2 border-[#3ea8c8]"
            />
            <span className="mt-2 font-semibold text-center">
              Mariana Monteiro
            </span>
            <span className="text-center text-sm">
              Aluna UNIVESP em Ciência de Dados
            </span>
          </div>
          <div className="flex flex-col items-center mx-4">
            <img
              src={Zenilda}
              alt="Aluna Zenilda"
              className="w-32 h-32 rounded-[64px] border-2 border-[#3ea8c8]"
            />
            <span className="mt-2 font-semibold text-center">Zenilda dos Santos</span>
            <span className="text-center text-sm">
              Aluna UNIVESP em Tecnologia da Informação
            </span>
          </div>
        </div>
      </section>
      <section className="py-16 w-full text-center bg-[#3ea8c8] text-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-6 text-3xl font-bold">Pronto para começar?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Crie relatórios personalizados de forma eficiente e flexível com o FlexiReport. Experimente agora mesmo!
          </p>
          <button className="">
            <Link href="/editor">Começar Agora</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
