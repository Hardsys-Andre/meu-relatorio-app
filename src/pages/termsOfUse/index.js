import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import LogoFlexi from '../../assets/logoFlexiReport.png';

const TermsOfUse = () => {
    const navigate = useNavigate();

    const handleAccept = () => {
        localStorage.setItem("termsAccepted", "true");
        navigate("/registerPage");
      };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-6 flex justify-center items-center">
            <div className="bg-white flex flex-col justify-center items-center shadow-md rounded-lg p-8 max-w-3xl w-full">
            <img src={LogoFlexi} alt="Imagem Grande" className="lg:w-[150px] lg:h-[150px]" />
                <header className="bg-[#3ea8c8] text-white text-center py-4 rounded-md mb-6 mt-6 w-full">
                    <h1 className="text-2xl font-bold">Termos de Uso do FlexiReport</h1>
                </header>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Termo de Consentimento e Aceite de Uso do Aplicativo</h2>
                    <p>
                        Pelo presente Termo de Consentimento e Aceite de Uso, o usuário abaixo identificado concorda em utilizar o aplicativo 
                        <strong> FlexiReport</strong>, doravante denominado "App", nos termos e condições aqui estabelecidos. Ao clicar em "Aceitar", 
                        o usuário declara que leu, compreendeu e concorda com todos os pontos deste documento.
                    </p>

                    <div>
                        <h3 className="text-lg font-bold">1. Funcionamento do Aplicativo</h3>
                        <p>
                            O <strong>FlexiReport</strong> é uma ferramenta desenvolvida para criar relatórios personalizados a partir de arquivos CSV, 
                            permitindo que o usuário insira campos dinâmicos e gere relatórios com layout customizável. Os dados processados são apresentados ao usuário de acordo com as funcionalidades disponibilizadas.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">2. Responsabilidade pelas Informações</h3>
                        <p>
                            O usuário declara ser o único responsável pelas informações inseridas no App, especialmente aquelas provenientes de arquivos CSV. 
                            A responsabilidade pela veracidade, precisão e integridade dos dados fornecidos é exclusiva do usuário, não cabendo ao 
                            <strong> FlexiReport</strong> qualquer responsabilidade sobre os dados enviados ou sobre a forma como esses dados são utilizados dentro da plataforma.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">3. Não Responsabilidade do App sobre os Dados</h3>
                        <p>
                            O <strong>FlexiReport</strong> não se responsabiliza pela qualidade, veracidade ou qualquer outro aspecto dos dados inseridos no aplicativo. 
                            O usuário é inteiramente responsável pela gestão e uso das informações, inclusive pela forma como esses dados serão tratados e utilizados.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">4. Armazenamento de Dados</h3>
                        <p>
                            O <strong>FlexiReport</strong> informa que, no momento, as informações enviadas através de arquivos CSV não são armazenadas de forma permanente 
                            nos servidores do App. Após o processamento, os dados ficam disponíveis para o usuário enquanto o App estiver em uso, sendo removidos 
                            automaticamente ao finalizar a sessão ou ao realizar a operação solicitada.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">5. Funcionalidades Futuras</h3>
                        <p>
                            O <strong>FlexiReport</strong> se reserva o direito de implementar novas funcionalidades e/ou alterar o funcionamento do aplicativo a qualquer momento. 
                            Caso isso venha a ocorrer, o usuário será notificado adequadamente e poderá aceitar ou recusar a implementação das novas funcionalidades.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">6. Aceite</h3>
                        <p>
                            Ao utilizar o <strong>FlexiReport</strong>, o usuário declara que leu, compreendeu e aceita todos os termos e condições deste documento.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">7. Alterações no Termo</h3>
                        <p>
                            Este termo poderá ser alterado a qualquer momento, sendo que as alterações entrarão em vigor imediatamente após sua publicação no aplicativo ou em outro meio de comunicação escolhido pelo <strong>FlexiReport</strong>.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">8. Contato</h3>
                        <p>
                            Em caso de dúvidas sobre os termos deste documento ou sobre o funcionamento do aplicativo, o usuário poderá entrar em contato com o suporte através do e-mail [e-mail de contato] ou por meio de [outros canais de contato].
                        </p>
                    </div>
                    
                    <div className="text-center mt-8">
                        <button
                        onClick={handleAccept}
                        className="bg-[#3ea8c8] text-white px-6 py-2 rounded-md hover:bg-[#3488a1] transition">
                            Aceitar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TermsOfUse;
