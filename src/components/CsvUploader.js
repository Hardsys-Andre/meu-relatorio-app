"use client";
import { useState, useEffect } from "react";
import { useCSV } from "../context/CsvContext";
import Papa from "papaparse";

const CsvUploader = () => {
  const { headers, setHeaders, selectedColumns, setSelectedColumns, setCsvData } = useCSV();
  const [rows, setRows] = useState([]); 

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
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {headers.length > 0 && (
        <div className="mt-4">
          <h3>Selecione os campos desejados:</h3>
          {headers.map((header) => (
            <label key={header} className="block">
              <input
                type="checkbox"
                checked={selectedColumns.includes(header)}
                onChange={() => handleSelectionChange(header)}
              />
              {header}
            </label>
          ))}
          <button
            className="mt-2 p-2 bg-blue-500 text-white"
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
