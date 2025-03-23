import React, { useState } from "react";

const AiTextGenerator = ({ handleGenerateContent }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateText = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data && data.report) {
        handleGenerateContent(data.report); // Passa o conteúdo gerado para o editor
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
        className="border rounded p-2 w-full mb-2"
        rows="4"
        placeholder="Digite o prompt aqui..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGenerateText}
        disabled={loading}
      >
        {loading ? "Gerando..." : "Gerar Conteúdo com IA"}
      </button>
    </div>
  );
};

export default AiTextGenerator;
