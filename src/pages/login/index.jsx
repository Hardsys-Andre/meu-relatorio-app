import { useState } from "react";
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RecoveryPasswordModal from "../../modals/recoveryPassword";

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.username,
          password: form.password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        toast.error(`Erro: ${data.message}`);
        return;
      }
  
      localStorage.setItem("token", data.token);
      
      login(data.token);  
      
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      
      navigate(redirectPath);
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:#3488a1 outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-#3488a1 outline-none"
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
        <Link to="/registerPage" className="text-[#3ea8c8] hover:underline">
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
