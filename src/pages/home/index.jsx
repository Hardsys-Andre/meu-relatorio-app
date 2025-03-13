import React from "react";
import LogoFlexi from "../../assets/logoFlexiReport.png";
import Robo from "../../assets/robo.png";
import Andre_e from "../../assets/andre-e.jpg";
import Andre_a from "../../assets/andre-a.png";
import Jose from "../../assets/jose.png";
import { FaUser } from 'react-icons/fa';

function Home() {
  return (
    <div className="flex flex-col w-full items-center">
      <main className="flex flex-col w-full p-4 justify-center items-center">
        <div className="flex flex-row w-[60%] mt-2 justify-center items-center">
          <div className="flex flex-col lg:w-[300px] xl:w-[500px] items-center">
            <img
              src={LogoFlexi}
              alt="Imagem Grande"
              className="lg:w-[250px] lg:h-[250px] xl:w-[250px] xl:h-[250px]"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[20px] md:text-[46px] md:w-[410px] ml-10 text-[#42B091] text-left font-bold leading-tight">
              Relatórios Personalizados de Forma Eficiente e Flexível!{" "}
            </h1>
          </div>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-10 space-y-6">
          <p className="text-lg text-left leading-relaxed">
            O <strong>FlexiReport</strong> é uma poderosa aplicação desenvolvida
            para simplificar e aprimorar o processo de criação de relatórios
            personalizados. Com uma interface intuitiva e amigável, o aplicativo
            permite que você importe arquivos CSV e gere campos dinâmicos
            automaticamente, proporcionando total flexibilidade na construção de
            relatórios sob medida para suas necessidades.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#42B091]">
              ✅ Principais Funcionalidades:
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-left">
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

          <p className="text-lg leading-relaxed">
            O <strong>FlexiReport</strong> é a ferramenta ideal para
            profissionais e empresas que buscam automatizar e otimizar a geração
            de relatórios personalizados a partir de dados brutos. Transforme
            dados complexos em informações claras e bem estruturadas em apenas
            alguns cliques!
          </p>
        </div>
      </main>
      <section id="criadores" className="mt-10">
        <h2 className="text-4xl font-bold text-center text-[#42B091]">
          Criadores
        </h2>
        <div className="flex flex-col gap-8 md:flex-row justify-center mt-6">
          <div className="flex flex-col items-center mx-4">
            <img
              src={Andre_e}
              alt="Criador 1"
              className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]"
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
              alt="Criador 2"
              className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]"
            />
            <span className="mt-2 font-semibold text-center">
              André Alexander
            </span>
            <span className="text-center text-sm">
              Aluno UNIVESP em Ciência da Computação
            </span>
          </div>
          <div className="flex flex-col items-center mx-4">
            {/*<img
              src={Felipe}
              alt="Criador 3"
              className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]"
            />*/}
            <FaUser size={128} color="#42B091"/>
            <span className="mt-2 font-semibold text-center">Felipe Augusto</span>
            <span className="text-center text-sm">
              Aluno UNIVESP em Engenharia da Computação
            </span>
          </div>
          <div className="flex flex-col items-center mx-4">
            <img
              src={Jose}
              alt="Criador 3"
              className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]"
            />
            <span className="mt-2 font-semibold text-center">José Ricardo</span>
            <span className="text-center text-sm">
              Aluno UNIVESP em Engenharia da Computação
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-8 md:flex-row justify-center mt-6">
          <div className="flex flex-col items-center mx-4">
            {/*<img
              src={Andre_e}
              alt="Criador 1"
              className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]"
            />*/}
            <FaUser size={128} color="#e4616b"/>
            <span className="mt-2 font-semibold text-center">
              Luciana Maria Rosa
            </span>
            <span className="text-center text-sm">
              Aluna UNIVESP em Tecnologia da Informação
            </span>
          </div>
          <div className="flex flex-col items-center mx-4">
            {/*<img
              src={Andre_a}
              alt="Criador 2"
              className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]"
            />*/}
            <FaUser size={128} color="#e4616b"/>
            <span className="mt-2 font-semibold text-center">
              Mariana Monteiro
            </span>
            <span className="text-center text-sm">
              Aluna UNIVESP em Ciência da Computação
            </span>
          </div>
          <div className="flex flex-col items-center mx-4">
            {/*<img
              src={Jose}
              alt="Criador 3"
              className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]"
            />*/}
            <FaUser size={128} color="#e4616b"/>
            <span className="mt-2 font-semibold text-center">Zenilda dos Santos</span>
            <span className="text-center text-sm">
              Aluna UNIVESP em Engenharia da Computação
            </span>
          </div>
        </div>
      </section>
      <footer id="contatos" className="w-[auto] p-4 mt-20">
        <div className="flex flex-col md-flex-row justify-between gap-5 items-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-3">
              <img
                src={LogoFlexi}
                alt="Logo"
                className="h-20 px-1 border-r-2 border-[#42B091]"
              />
              <img src={Robo} alt="Robo" className="h-20" />
            </div>
            <span className="ml-2 text-2xl text-[#42B091] font-bold">
              Parceiros
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-end gap-5">
            <div className="flex flex-col">
              <span className="text-[#42B091]">+55 12 3209-8671</span>
              <span className="text-[#42B091]">
                superclient@superclient.com.br
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#42B091]">
                Estrada Doutor Altino, Bondesan, 500
              </span>
              <span className="text-[#42B091]">
                Parque de Inovações Tecnológicas - Sala 208H
              </span>
              <span className="text-[#42B091]">São José dos Campos</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
