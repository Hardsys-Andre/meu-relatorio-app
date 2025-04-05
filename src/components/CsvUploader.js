"use client";
import { useState } from "react";
import { useCSV } from "../context/CsvContext";
import Papa from "papaparse";
import { Link, useNavigate } from "react-router-dom";
import { FaUpload, FaFileAlt, FaInfoCircle } from "react-icons/fa"
import {useAuth} from "../context/AuthContext"

const CsvUploader = () => {
  const { user } = useAuth();
  console.log("Usuário no TestComponent:", user);
  const { headers, setHeaders, selectedColumns, setSelectedColumns, setCsvData } = useCSV();
  const [rows, setRows] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileSelected, setFileSelected] = useState(false); // Estado para controlar se o arquivo foi selecionado
  const navigate = useNavigate();

  const processFile = (file) => {
    if (!file) return;
    Papa.parse(file, {
      complete: (result) => {
        const [headerRow, ...parsedRows] = result.data;
        setHeaders(headerRow || []);
        setRows(parsedRows);
        setShowPreview(true);
        setFileSelected(true); // Atualiza o estado para esconder a área de upload
      },
      skipEmptyLines: true,
      encoding: "UTF-8",
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files.length > 0) {
      processFile(event.dataTransfer.files[0]);
    }
  };

  const handleSelectionChange = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  const handleCancel = () => {
    setHeaders([]);
    setRows([]);
    setSelectedColumns([]);
    setShowPreview(false);
    setFileSelected(false); // Reseta o estado quando o cancelamento acontece
    localStorage.removeItem("csvData");
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
    setFileSelected(false); // Reseta o estado ao confirmar
    navigate("/editor");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg border">
      {/* Área de Upload (oculta se arquivo for selecionado) */}
      {!fileSelected && (
        <div>
          <h1 className="text-3xl font-semibold text-center mb-4 text-[#3ea8c8]">
        Importar Arquivo CSV
      </h1>
        <div
          className={`flex flex-col border-[2px] h-[350px] border-dashed rounded-lg p-6 text-center justify-center items-center cursor-pointer ${
            dragActive ? "border-[#3ea8c8] bg-blue-100" : "border-gray-300 bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FaUpload className="w-12 h-12 mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg">Arraste e solte o arquivo CSV aqui</p>
          <span className="text-gray-600 text-sm">ou clique para selecionar um arquivo</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="flex flex-row justify-center items-center mt-3 px-6 py-2 bg-[#3ea8c8] hover:bg-[#3488a1] text-white font-semibold rounded-lg cursor-pointer  transition-colors"
          >
            <FaFileAlt className="w-4 h-4 mr-2" />
            Escolher Arquivo
          </label>
          <div className="flex items-center gap-2 mt-6 text-sm text-gray-500 dark:text-gray-400">
                <FaInfoCircle className="w-4 h-4" />
                <span>Formatos suportados: .csv (máximo 10MB)</span>
              </div>
        </div>
        </div>
      )}

      {/* Seleção de Colunas */}
      {headers.length > 0 && fileSelected && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">Selecione os Campos Desejados</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {headers.map((header) => (
              <label key={header} className="flex items-center space-x-2 bg-white p-2 rounded-md shadow">
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(header)}
                  onChange={() => handleSelectionChange(header)}
                  className="h-5 w-5 text-[#3ea8c8] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{header}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-sm">
            <button className="px-4 py-2 border bg-red-800 hover:bg-red-900 rounded-lg text-white transition"
            onClick={handleCancel}>
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-[#3ea8c8] hover:bg-[#3488a1] text-white font-semibold rounded-lg transition"
              onClick={handleConfirmSelection}
            >
              Confirmar Seleção
            </button>
          </div>
        </div>
      )}

      {/* Prévia dos Dados */}
      {showPreview && headers.length > 0 && fileSelected && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Prévia dos Dados</h2>
          <div className="overflow-auto max-h-72 border border-gray-300 mt-2">
            <table className="w-full text-sm border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-300 text-gray-700">
                  {headers.map((header, index) => (
                    <th key={index} className="border-t border-gray-400 p-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 10).map((row, rowIndex) => (
                  <tr key={rowIndex} className="odd:bg-gray-50 hover:bg-white">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border-t border-gray-400 p-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 mt-3 text-center">
            Total de linhas no CSV: <span className="font-semibold">{rows.length}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
