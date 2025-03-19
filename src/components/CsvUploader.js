"use client";
import { useState, useEffect } from "react";
import { useCSV } from "../context/CsvContext";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom"; // Para navegação com React Router

const CsvUploader = () => {
  const { headers, setHeaders, selectedColumns, setSelectedColumns, setCsvData } = useCSV();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate(); // Hook de navegação

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const [headerRow, ...parsedRows] = result.data;
        setHeaders(headerRow || []); // Salva os cabeçalhos
        setRows(parsedRows); // Armazena os dados das linhas
      },
      skipEmptyLines: true,
    });
  };

  const handleSelectionChange = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleConfirmSelection = () => {
    // Filtra os dados com base nas colunas selecionadas
    const filteredData = rows.map((row) => {
      const filteredRow = {};
      selectedColumns.forEach((column) => {
        const index = headers.indexOf(column); // encontra o índice da coluna
        if (index !== -1) {
          filteredRow[column] = row[index]; // mantém apenas as colunas selecionadas
        }
      });
      return filteredRow;
    });

    // Atualiza o estado e armazena no localStorage
    setCsvData(filteredData);
    localStorage.setItem("csvData", JSON.stringify(filteredData));

    console.log("Dados filtrados salvos:", filteredData);

    // Limpar os estados (remover os dados do CSV carregados)
    setHeaders([]);
    setSelectedColumns([]);
    setRows([]);

    // Redireciona para a página /editor
    navigate("/editor");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg border">
      <h1 className="text-3xl font-semibold text-center mb-4 text-[#3ea8c8]">Carregue seu arquivo CSV</h1>
      <p className="text-center text-lg mb-6 text-gray-600">
        Escolha um arquivo CSV para convertê-lo em campos dinâmicos. Após o upload, você poderá selecionar as colunas desejadas para continuar.
      </p>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="block w-full p-2 border border-gray-300 rounded-lg mb-4"
      />

      {headers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-2xl font-medium text-gray-700 mb-3">Selecione os campos desejados:</h3>
          <div className="space-y-3">
            {headers.map((header) => (
              <label key={header} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(header)}
                  onChange={() => handleSelectionChange(header)}
                  className="h-5 w-5 text-blue-500 border-gray-300 rounded"
                />
                <span className="text-lg text-gray-600">{header}</span>
              </label>
            ))}
          </div>

          <button
            className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleConfirmSelection}
          >
            Confirmar Seleção
          </button>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
