"use client";
import { useState } from "react";
import { useCSV } from "../context/CsvContext";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const CsvUploader = () => {
  const { headers, setHeaders, selectedColumns, setSelectedColumns, setCsvData } = useCSV();
  const [rows, setRows] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const [headerRow, ...parsedRows] = result.data;
        setHeaders(headerRow || []);
        setRows(parsedRows);
      },
      skipEmptyLines: true,
      encoding: "UTF-8",
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
    const filteredData = rows.map((row) => {
      const filteredRow = {};
      selectedColumns.forEach((column) => {
        const index = headers.indexOf(column);
        if (index !== -1) {
          filteredRow[column] = row[index];
        }
      });
      return filteredRow;
    });

    setCsvData(filteredData);
    localStorage.setItem("csvData", JSON.stringify(filteredData));

    setHeaders([]);
    setSelectedColumns([]);
    setRows([]);
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

          <button
            className="mt-2 w-full py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            onClick={() => setShowPreview(true)}
          >
            Visualizar Dados
          </button>
        </div>
      )}

      {showPreview && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Prévia dos Dados</h2>
            <div className="overflow-auto max-h-96 border border-gray-300 p-4">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    {headers.map((header, index) => (
                      <th key={index} className="border border-gray-400 p-2">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 10).map((row, rowIndex) => (
                    <tr key={rowIndex} className="odd:bg-gray-100">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-400 p-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mt-3 text-center">
              Total de linhas no CSV: <span className="font-semibold">{rows.length}</span>
            </p>
            <button
              className="mt-4 w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => setShowPreview(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
