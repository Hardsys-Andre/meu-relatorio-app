import { useState, useEffect } from "react";
import { toast } from 'sonner';
import LogoFlexi from "../../assets/logoFlexiReport.png";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

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
            "Authorization": `Bearer ${token}`,
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
          "Authorization": `Bearer ${token}`,
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

  return (
    <div className="flex flex-col gap-3 items-center min-h-screen bg-gray-100 p-4">
      <img src={LogoFlexi} alt="Logo" className="h-28" />
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-[#3ea8c8] mb-6">Perfil do Usuário</h2>

        <div className="space-y-4">
          {["firstName", "lastName", "phone", "cityState"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {field === "firstName" ? "Nome Completo" : field === "lastName" ? "Sobrenome" : field === "phone" ? "Telefone" : "Cidade/Estado"}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg text-gray-700"
                />
              ) : (
                <p className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700">{userData[field]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-6 flex gap-1 md:gap-4 justify-center">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-700 text-white text-[14px] font-bold py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white text-[14px] font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-700 text-white text-[14px] font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              Editar Perfil
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-800 text-white text-[14px] font-bold py-2 px-4 rounded-lg hover:bg-red-900 transition duration-300"
          >
            Deslogar
          </button>
        </div>
      </div>
    </div>
  );
}
