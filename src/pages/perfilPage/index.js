import { useState, useEffect } from "react";
import { toast } from "sonner";
import Info from "../../components/PerfilPage/Info";
import Security from "../../components/PerfilPage/Security";
import Planos from "../../components/PerfilPage/Planos";
import { FaUser, FaKey, FaCrown, FaHistory } from "react-icons/fa";
import Historico from "../../components/PerfilPage/Historico";

// Função para ler cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeComponent, setActiveComponent] = useState("Info");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getCookie("token"); // Aqui buscamos o token do cookie

      // Verifica se o token está presente
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("https://meu-relatorio-backend.vercel.app/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho da requisição
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);  // Se a resposta for OK, setamos os dados do usuário
          setFormData(data);   // Preenchemos o formulário com esses dados
        } else {
          // Se não for uma resposta OK, mostramos a mensagem de erro
          alert(data.message || "Erro ao carregar dados do perfil.");
          if (data.message === "Token inválido") {
            // Caso o backend retorne erro de token inválido, fazemos o logout
            handleLogout();
          }
        }
      } catch (error) {
        toast.error("Erro ao buscar dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Remove o token do cookie
    window.location.href = "/";  // Redireciona para a página inicial após logout
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const token = getCookie("token"); // Aqui buscamos o token do cookie

    if (!token) {
      toast.error("Erro: Não há token disponível.");
      return;
    }

    try {
      const response = await fetch("https://meu-relatorio-backend.vercel.app/profile/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho da requisição
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        setUserData(formData); // Atualiza os dados do usuário
        setIsEditing(false);   // Finaliza o modo de edição
      } else {
        alert(data.message || "Erro ao atualizar perfil.");
      }
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
    }
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Info":
        return (
          <Info
            isEditing={isEditing}
            formData={formData}
            userData={userData}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            setIsEditing={setIsEditing}
            handleLogout={handleLogout}
          />
        );
      case "Security":
        return <Security />;
      case "Planos":
        return <Planos userType={userData.userType} />;
      case "Historico":
        return <Historico />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center bg-gray-100 p-4 mb-8">
      <h2 className="text-2xl font-bold text-center text-[#3ea8c8] mb-6">Perfil do Usuário</h2>

      <div className="flex flex-col md:flex-row w-full bg-white shadow-lg rounded-2xl p-6">
        <div className="flex flex-col items-center md:w-[25vw]">
          <div className="flex flex-col mb-4 mr-4 p-2 items-center md:w-full border rounded-lg">
            <FaUser className="text-8xl mb-2" />
            <span>{userData.firstName} {userData.lastName}</span>
            <span>{userData.email}</span>
            <span className={`flex flex-row border rounded-lg gap-1 justify-center items-center px-1 mt-2 ${userData.userType !== "Premium" ? "text-red-500 px-6 border-red-500" : "text-[#f59e0b] border-[#f59e0b]"}`}>
              {userData.userType === "Premium" && <FaCrown />}
              {userData.userType}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full ml-4">
          <div className="flex flex-col md:flex-row text-[11px] lg:text-[14px] w-full border-b bg-gray-100 justify-center">
            <button onClick={() => setActiveComponent("Info")} className="flex gap-2 justify-center items-center bg-white text-black m-2 border border-black hover:bg-gray-50 hover:text-black hover:border-gray-400 rounded-md">
              <FaUser />
              Informações Pessoais
            </button>
            <button onClick={() => setActiveComponent("Security")} className="flex gap-2 justify-center items-center bg-white text-black m-2 border border-black hover:bg-gray-50 hover:text-black hover:border-gray-400 rounded-md">
              <FaKey />
              Segurança
            </button>
            <button onClick={() => setActiveComponent("Planos")} className="flex gap-2 justify-center items-center bg-white text-black m-2 border border-black hover:bg-gray-50 hover:text-black hover:border-gray-400 rounded-md">
              <FaCrown />
              Plano e Assinatura
            </button>
            <button onClick={() => setActiveComponent("Historico")} className="flex gap-2 justify-center items-center bg-white text-black m-2 border border-black hover:bg-gray-50 hover:text-black hover:border-gray-400 rounded-md">
              <FaHistory />
              Histórico
            </button>
          </div>

          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
}
