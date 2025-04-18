import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RecoveryPasswordModal from "../../modals/recoveryPassword";
import Cookies from "js-cookie";
import api from "../../server/api";
import { FaTimes } from "react-icons/fa";
import BackLink from "../../components/BackLink";

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await api.post("login", { 
        email: form.username, 
        password: form.password 
      });

      console.log("Resposta da API:", data);

      if (data.token) {
        console.log("Token recebido:", data.token);

        Cookies.set("token", data.token, { 
          expires: 7, 
          secure: process.env.NODE_ENV === "production" 
        });

        login(data.token, data.user);
        toast.success("Login realizado com sucesso!");
        navigate("/"); // Ajuste para a página correta após login
      } else {
        toast.error(data.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      toast.error("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 relative">
        <div className="flex">
          <BackLink to="/" label="Voltar para a Home" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Acesse sua conta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Usuário
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder={"Digite seu Email"}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3488a1] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={"Digite sua senha"}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3488a1] outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3ea8c8] text-white font-bold py-2 rounded-lg hover:bg-[#3488a1] transition duration-300"
          >
            Acessar
          </button>
        </form>
        <div className="text-center mt-4">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            className="text-sm text-[#3ea8c8] hover:underline"
          >
            Esqueci minha senha
          </a>
          <p className="text-sm text-gray-600 mt-2">
            Não tem conta?{" "}
            <Link 
              to="/register" 
              className="text-[#3ea8c8] hover:underline"
              onClick={() => localStorage.removeItem("termsAccepted")}
            >
              Cadastre-se
            </Link>
          </p>
          <RecoveryPasswordModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        </div>
      </div>
    </div>
  );
}
