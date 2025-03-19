import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    cityState: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  useEffect(() => {
    const termsAccepted = localStorage.getItem("termsAccepted") === "true";
    if (termsAccepted) {
      setForm(prevForm => ({ ...prevForm, termsAccepted: true }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.termsAccepted) {
      alert("Você deve aceitar os termos para continuar!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          cityState: form.cityState,
          email: form.email,
          password: form.password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(`Erro: ${data.message}`);
        return;
      }
  
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
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
              onChange={handleChange}
              className="h-5 w-5 text-[#3ea8c8] focus:ring-[#3ea8c8] rounded"
              disabled={!form.termsAccepted}
            />
            <label className="text-sm text-gray-700">
              Eu aceito os{" "}
              <Link to="/termsOfUse" className="text-[#3ea8c8] hover:underline">
                Termos de Uso
              </Link>
            </label>
          </div>
          <button
            type="submit"
            disabled={!form.termsAccepted}
            className={`w-full text-white font-bold py-2 rounded-lg transition duration-300 ${
              form.termsAccepted ? "bg-[#3ea8c8] hover:bg-[#3488a1]" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
