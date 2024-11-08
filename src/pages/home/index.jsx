import React from 'react';
import Logo from '../../assets/logo_scl.png';
import Robo from '../../assets/robo.png';
import Andre_e from '../../assets/andre-e.jpg';
import Andre_a from '../../assets/andre-a.png';
import Jose from '../../assets/jose.png';
import { Link } from 'react-router-dom';



function Home() {
    return (
        <div className="flex flex-col min-h-screen items-center">
            <header className="bg-[#42B091] w-full p-2 border-[1px] border-[#e2e2e2] rounded-xl">
                <nav className="flex justify-between mr-10">
                    <img src={Robo} alt="Robo" className="h-10 ml-10" />
                    <div className='flex gap-10'>
                        <button onClick={() => window.open("https://superclient.com.br/", "_blank")}>SuperClient</button>
                        <Link to="/editor" >
                            <button>Editor de Relatórios</button>
                        </Link> 
                        <button onClick={() => window.location.href="#criadores"}>Criadores</button>
                        <button onClick={() => window.location.href="#contatos"}>Contatos</button>    
                    </div>
                    
                </nav>
            </header>
            <main className="flex flex-grow w-full p-4 justify-center">
                <div className="flex flex-col mt-10 w-[500px] items-center">
                    <img src={Logo} alt="Imagem Grande" className="w-[350px] h-[350px]" />
                    <span className="text-[70px] font-bold text-center text-[#42B091]">SuperClient</span>
                </div>
                <div className="flex flex-col mt-10">
                    <h1 className="text-6xl w-[355px] ml-10 text-[#42B091] text-left font-bold">Integração e Automação de sistemas através de robôs</h1>
                    <p className="mt-8 w-[600px] ml-10 text-xl text-center">
                        Este aplicativo permite a criação de relatórios dinâmicos, onde os campos são preenchidos automaticamente com dados provenientes de um banco de dados. Com uma interface intuitiva, você pode personalizar seus relatórios de acordo com suas necessidades, facilitando a análise e apresentação de informações relevantes.
                    </p>                
                </div>
            </main>
            <section id='criadores' className="mt-10">
                <h2 className="text-4xl font-bold text-center text-[#42B091]">Criadores</h2>
                <div className="flex justify-center mt-6">
                    <div className="flex flex-col items-center mx-4">
                        <img src={Andre_e} alt="Criador 1" className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]" />
                        <span className="mt-2 font-semibold text-center">André Eduardo</span>
                        <span className="text-center text-sm">Aluno UNIVESP em Tecnologia da Informação</span>
                    </div>
                    <div className="flex flex-col items-center mx-4">
                        <img src={Andre_a} alt="Criador 2" className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]" />
                        <span className="mt-2 font-semibold text-center">André Alexssander</span>
                        <span className="text-center text-sm">Aluno UNIVESP em Ciência da Computação</span>
                    </div>
                    <div className="flex flex-col items-center mx-4">
                        <img src={Jose} alt="Criador 3" className="w-32 h-32 rounded-[64px] border-2 border-[#42B091]" />
                        <span className="mt-2 font-semibold text-center">José Ricardo</span>
                        <span className="text-center text-sm">Aluno UNIVESP em Engenharia da Computação</span>
                    </div>
                </div>
            </section>
            <footer id='contatos' className="w-[auto] p-4 mt-20">
                <div className="flex justify-between gap-5 items-center">
                    <div className="flex flex-col items-center">
                        <div className='flex flex-row gap-3'>
                            <img src={Logo} alt="Logo" className="h-20 px-1 border-r-2 border-[#42B091]" />
                            <img src={Robo} alt="Robo" className="h-20" />
                        </div>
                        <span className="ml-2 text-2xl text-[#42B091] font-bold">SuperClient</span>
                    </div>
                    <div className="flex flex-row items-end gap-5">
                        <div className='flex flex-col'>
                            <span className="text-[#42B091]">+55 12 3209-8671</span>
                            <span className="text-[#42B091]">superclient@superclient.com.br</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className="text-[#42B091]">Estrada Doutor Altino, Bondesan, 500</span>
                            <span className="text-[#42B091]">Parque de Inovações Tecnológicas - Sala 208H</span>
                            <span className="text-[#42B091]">São José dos Campos</span>    
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
