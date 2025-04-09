import { useState, useEffect } from "react";
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../server/api"; // Importando o arquivo api.js
import TermsOfUse from '../../modals/TermsOfUse';
import { FaTimes } from "react-icons/fa";
import BackLink from "../../components/BackLink";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    cityState: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("termsAccepted") === "true";
    setIsAccepted(accepted);
    setForm(prevForm => ({ ...prevForm, termsAccepted: accepted }));

    const handleTermsAccepted = () => {
      setIsAccepted(true);
      setForm(prevForm => ({ ...prevForm, termsAccepted: true }));
    };

    window.addEventListener("termsAccepted", handleTermsAccepted);

    return () => {
      window.removeEventListener("termsAccepted", handleTermsAccepted);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.termsAccepted) {
      toast.warning("Você deve aceitar os termos para continuar!");
      return;
    }

    try {
      const response = await api.post("register", form); // Utilizando api.js

      if (response.error) {
        toast.error(`Erro: ${response.message || "Falha ao cadastrar"}`);
        return;
      }

      toast.success("Cadastro realizado com sucesso!");
      localStorage.removeItem("termsAccepted");
      
      // Redirecionar para a página de login após cadastro bem-sucedido
      navigate('/login');
      
    } catch (error) {
      toast.error("Erro ao cadastrar. Tente novamente.");
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 relative">
        <div className="flex">
          <BackLink to="/login" label="Já tem conta? Fazer login" />
        </div>
        <button 
          onClick={handleCancel}
          className="absolute top-4 right-4 bg-white hover:bg-white text-red-600 hover:text-red-800 border-0"
          aria-label="Cancelar cadastro"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center text-[#3ea8c8] mb-6">
          Crie sua conta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3ea8c8] outline-none"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Sobrenome</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3ea8c8] outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3ea8c8] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Cidade/Estado</label>
            <input
              type="text"
              name="cityState"
              value={form.cityState}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3ea8c8] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3ea8c8] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#3ea8c8] outline-none"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={form.termsAccepted}
              onChange={(e) => {
                const accepted = e.target.checked;
                setIsAccepted(accepted);
                setForm({ ...form, termsAccepted: accepted });
              }}
              disabled={!form.termsAccepted}
              className="h-5 w-5 text-[#3ea8c8] focus:ring-[#3ea8c8] rounded"
            />
            <label className="text-sm text-gray-700">
              Eu aceito os{" "}
              <Link className="text-[#3ea8c8] font-semibold" onClick={() => setIsTermsModalOpen(true)}>
                Termos de Uso
              </Link>
            </label>
          </div>
          <button
            type="submit"
            disabled={!form.termsAccepted}
            className={`w-full text-white font-bold py-2 rounded-lg transition duration-300 ${
              form.termsAccepted
                ? "bg-[#3ea8c8] hover:bg-[#3488a1]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Cadastrar
          </button>
        </form>
      </div>
      {isTermsModalOpen && <TermsOfUse onClose={() => setIsTermsModalOpen(false)} />}
    </div>
  );
}
