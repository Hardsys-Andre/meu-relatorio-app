import React from "react";
import LogoFlexi from "../../assets/logoFlexiReport.png";
import Andre_e from "../../assets/andre-e.jpg";
import Luciana from "../../assets/luciana.jpg";
import Mariana from "../../assets/mariana.jpg";
import Felipe from "../../assets/felipe.jpg";
import Zenilda from "../../assets/zenilda.jpg";
import Andre_a from "../../assets/andre-a.png";
import Jose from "../../assets/jose.jpg";
import { FaUser } from 'react-icons/fa';

function Home() {
  return (
    <div className="flex flex-col w-full items-center">
      <main className="flex flex-col w-full p-4 justify-center items-center">
        <div className="flex flex-col gap-4 md:gap-10 md:flex-row w-full xl:w-[60%] mt-2 justify-center items-center">
          <div className="flex flex-col lg:w-[300px] xl:w-[500px] items-center">
            <img
              src={LogoFlexi}
              alt="Logotipo Flexireport"
              className="w-[200px] h-[200px] xl:w-[250px] xl:h-[250px]"
            />
          </div>
            <h1 className="text-[24px] md:text-[34px] md:w-[300px] xl:w-[410px] text-[#3ea8c8] md:text-left font-bold leading-tight">
              Relatórios Personalizados de Forma Eficiente e Flexível!{" "}
            </h1>
        </div>
        <div className="bg-white text-gray-800 p-6 max-w-6xl mx-auto mt-10 space-y-6">
        <hr className="border-t-4 border-[#3ea8c8] w-full" />
        <p className="text-lg text-justify leading-relaxed">
            O <strong>FlexiReport</strong> é uma poderosa aplicação desenvolvida
            para simplificar e aprimorar o processo de criação de relatórios
            personalizados. Com uma interface intuitiva e amigável, o aplicativo
            permite que você importe arquivos CSV e gere campos dinâmicos
            automaticamente, proporcionando total flexibilidade na construção de
            relatórios sob medida para suas necessidades.
          </p>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#3ea8c8]">
              ✅ Principais Funcionalidades:
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-justify">
              <li>
                <strong>Importação Inteligente de Dados:</strong> Carregue
                arquivos CSV e transforme os dados em campos dinâmicos que podem
                ser manipulados e personalizados conforme necessário.
              </li>
              <li>
                <strong>Relatórios Personalizáveis:</strong> Crie relatórios
                adaptados às suas exigências, organizando e exibindo as
                informações da maneira mais relevante para o seu propósito.
              </li>
              <li>
                <strong>Interface Intuitiva:</strong> Utilize um ambiente de
                fácil navegação que permite gerar relatórios de forma rápida e
                eficiente, sem complicações.
              </li>
              <li>
                <strong>Exportação Simplificada:</strong> Exporte seus
                relatórios em formato PDF com qualidade profissional, prontos
                para apresentação e compartilhamento.
              </li>
              <li>
                <strong>Flexibilidade e Controle:</strong> Escolha e organize os
                campos que deseja incluir, aplicando filtros e ajustes conforme
                necessário para obter o relatório desejado.
              </li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed text-justify">
            O <strong>FlexiReport</strong> é a ferramenta ideal para
            profissionais e empresas que buscam automatizar e otimizar a geração
            de relatórios personalizados a partir de dados brutos. Transforme
            dados complexos em informações claras e bem estruturadas em apenas
            alguns cliques!
          </p>
          <hr className="border-t-4 border-[#3ea8c8] w-full" />
        </div>  
      </main>
      <section id="criadores" className="mt-10">
        <h2 className="text-4xl font-bold text-center text-[#3ea8c8]">
          Criadores
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
    </div>
  );
}

export default Home;
