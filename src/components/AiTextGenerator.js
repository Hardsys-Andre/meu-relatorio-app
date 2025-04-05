import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const AiTextGenerator = ({ handleGenerateContent }) => {
  const { user, isLoggedIn, loading: authLoading } = useAuth(); // Renomeando 'loading' do AuthContext
  const [userType, setUserType] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      setUserType(user.userType || "Desconhecido");
    }
  }, [authLoading, user]); // Agora ele só roda quando 'loading' for falso e 'user' mudar.


  const handleGenerateText = async () => {
    if (userType !== "Premium") {
      toast.error("Apenas usuários Premium podem usar este recurso.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://meu-relatorio-backend.vercel.app/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data && data.report) {
        handleGenerateContent(data.report);
        console.log(data.report) // Passa o conteúdo gerado para o editor
      } else {
        console.error("Conteúdo gerado não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao gerar o conteúdo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="border border-[#3ea8c8] rounded p-2 w-full mb-2"
        rows="4"
        placeholder="Digite o prompt aqui..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className={`bg-[#3ea8c8] text-white px-4 py-2 rounded-lg ${
            userType !== "Premium"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        onClick={handleGenerateText}
        disabled={loading}
      >
        {loading ? "Gerando..." : "Gerar Conteúdo com IA"}
      </button>
    </div>
  );
};

export default AiTextGenerator;
