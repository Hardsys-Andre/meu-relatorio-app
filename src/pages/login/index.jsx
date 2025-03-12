import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  // Importando o contexto de autenticação

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();  // Importa a função de login do contexto

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
        alert(`Erro: ${data.message}`);
        return;
      }
  
      // Armazena o token no localStorage
      localStorage.setItem("token", data.token);
      
      // Chama a função de login do contexto para atualizar o estado global
      login(data.token);  
      
      // Redireciona para a rota pretendida ou para a home
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      
      navigate(redirectPath);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente.");
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#42B091] text-white font-bold py-2 rounded-lg hover:bg-[#31a081] transition duration-300"
          >
            Acessar
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-[#42B091] hover:underline">
            Esqueci minha senha
          </a>
          <p className="text-sm text-gray-600 mt-2">
            Não tem conta?{" "}
            <Link to="/registerPage" className="text-[#42B091] hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
