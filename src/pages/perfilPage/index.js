import { useState, useEffect } from "react";
import { toast } from "sonner";
import Info from "../../components/PerfilPage/Info";
import Security from "../../components/PerfilPage/Security";
import Planos from "../../components/PerfilPage/Planos";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaFileAlt,
  FaUpload,
  FaExternalLinkAlt,
  FaEdit,
  FaKey,
  FaCrown,
  FaCog,
  FaHistory,
  FaCheck,
  FaCrow,
} from "react-icons/fa";
import LogoFlexi from "../../assets/logoFlexiReport.png";
import Historico from "../../components/PerfilPage/Historico";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeComponent, setActiveComponent] = useState("Info");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/pageLogin";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);
          setFormData(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        toast.error("Erro ao buscar dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/profile/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        setUserData(formData);
        setIsEditing(false);
      } else {
        alert(data.message);
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
        return <Planos userType={userData.userType}/>;
        case "Historico":
        return <Historico />;
      // Add more cases for other components if needed
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center bg-gray-100 p-4 mb-8">
      <h2 className="text-2xl font-bold text-center text-[#3ea8c8] mb-6">
        Perfil do Usuário
      </h2>

      <div className="flex flex-col md:flex-row w-full  bg-white shadow-lg rounded-2xl p-6">
        <div className="flex flex-col items-center md:w-[25vw]">
          <div className="flex flex-col mb-4 mr-4 p-2 items-center md:w-full border rounded-lg">
            <FaUser className="text-8xl mb-2" />
            <span>
              {userData.firstName} {userData.lastName}
            </span>
            <span>{userData.email}</span>
            <span
              className={`flex flex-row border rounded-lg gap-1 justify-center items-center px-1 mt-2 ${
                userData.userType !== "Premium"
                  ? "text-red-500 px-6 border-red-500"
                  : "text-[#f59e0b] border-[#f59e0b]"
              }`}
            >
              {userData.userType === "Premium" && <FaCrown />}
              {userData.userType}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-full ml-4">
          <div className="flex flex-col md:flex-row text-[11px] lg:text-[14px] w-full border-b bg-gray-100 justify-center">
            <button
              onClick={() => setActiveComponent("Info")}
              className="flex gap-2 justify-center items-center bg-white text-black m-2 border border-black hover:bg-gray-50 hover:text-black hover:border-gray-400 rounded-md"
            >
              <FaUser />
              Informações Pessoais
            </button>
            <button
              onClick={() => setActiveComponent("Security")}
              className="flex gap-2 justify-center items-center bg-white text-black m-2 border border-black hover:bg-gray-50 hover:text-black hover:border-gray-400 rounded-md"
            >
              <FaKey />
              Segurança
            </button>
            <button
             onClick={() => setActiveComponent("Planos")}
             className="flex gap-2 justify-center items-center bg-white text-black m-2 border border-black hover:bg-gray-50 hover:text-black hover:border-gray-400 rounded-md">
              <FaCrown />
              Plano e Assinatura
            </button>
            <button
            onClick={() => setActiveComponent("Historico")} 
            className="flex gap-2 justify-center items-center bg-white text-black m-2 border border-black hover:bg-gray-50 hover:text-black hover:border-gray-400 rounded-md">
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
