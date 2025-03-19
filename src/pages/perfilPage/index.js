import { useState, useEffect } from "react";
import LogoFlexi from "../../assets/logoFlexiReport.png";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirecionar para o login caso não tenha token
        window.location.href = "/pageLogin";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          alert(data.message); // Mostrar mensagem de erro
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        alert("Erro ao buscar dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Apagar o token do localStorage
    localStorage.removeItem("token");

    // Redirecionar para a página home
    window.location.href = "/";
  };

  if (!userData) {
    return <div>Carregando...</div>; // Ou coloque um spinner
  }

  return (
    <div className="flex flex-col gap-3 items-center min-h-screen bg-gray-100 p-4">
      <img
              src={LogoFlexi}
              alt="Logo"
              className="h-28"
            />
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Perfil do Usuário
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Nome Completo
            </label>
            <p className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700">
              {userData.firstName} {userData.lastName}
            </p>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              E-mail
            </label>
            <p className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700">
              {userData.email}
            </p>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Telefone
            </label>
            <p className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700">
              {userData.phone}
            </p>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Cidade/Estado
            </label>
            <p className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700">
              {userData.cityState}
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-400 transition duration-300"
          >
            Deslogar
          </button>
        </div>
      </div>
    </div>
  );
}
