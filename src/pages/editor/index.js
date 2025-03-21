import React, { useState, useEffect, useRef } from "react";
import { toast } from 'sonner';
import html2pdf from "html2pdf.js";
import FilterBar from "../../components/FilterBar";
import TextEditor from "../../components/TextEditor";
import { useCSV } from "../../context/CsvContext";

const ReportEditor = () => {
  const [reportContent, setReportContent] = useState(
    localStorage.getItem("reportContent") || ""
  );
  const [selectedRelatorio, setSelectedRelatorio] = useState();
  const [filtro, setFiltro] = useState({});
  const editorRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [showVisualizarButton, setShowVisualizarButton] = useState(true);
  const { selectedColumns } = useCSV();

  const tinyMCEApiKey = "b0tl99mycwhh1o7hptou60a3w11110ox6av062w6limk184s";

  const [dynamicFieldsSelected, setDynamicFieldsSelected] = useState([]);

  useEffect(() => {
    const storedColumns = localStorage.getItem("csvData");
    if (storedColumns) {
      setDynamicFieldsSelected(
        JSON.parse(storedColumns).map((column) => ({
          name: column,
          placeholder: `{{${column}}}`,
        }))
      );
    }
  }, [selectedColumns]);

  const getDynamicFieldsFromRelatorios = () => {
    const storedData = localStorage.getItem("csvData");
    if (!storedData) {
      toast.error("Nenhum dado encontrado no localStorage.");
      return [];
  }
    try {
      const parsedData = JSON.parse(storedData);
      if (!Array.isArray(parsedData) || parsedData.length === 0){
        toast.warning("Nenhum relatório encontrado.");
       return [];
      }
      const relatorio = parsedData[0];
      return Object.keys(relatorio)
        .filter((field) => field !== "id")
        .map((field) => ({
          name: field,
          placeholder: `{{${field}}}`,
        }));
    } catch (error) {
      toast.error("Erro ao processar os dados do localStorage:", error);
      return [];
    }
  };

  const [dynamicFields] = useState(getDynamicFieldsFromRelatorios());

  const handleEditorChange = (content) => {
    setReportContent(content);
    localStorage.setItem("reportContent", content);
  };

  const handleInsertField = (fieldPlaceholder) => {
    const editor = editorRef.current;
    if (editor) {
      editor.insertContent(`{{${fieldPlaceholder}}}`);
    }
  };

  const replaceFieldsWithMockData = (content, relatorio) => {
    let replacedContent = content;

    if (Array.isArray(dynamicFields) && dynamicFields.length > 0) {
      dynamicFields.forEach((field) => {
        if (relatorio && relatorio.hasOwnProperty(field.name)) {
          const regex = new RegExp(`{{${field.name}}}`, "g");
          const fieldValue =
            relatorio[field.name] !== undefined ? relatorio[field.name] : "";
          replacedContent = replacedContent.replace(regex, fieldValue);
        }
      });
    } else {
      toast.warning(
        "dynamicFields não está definido corretamente ou está vazio."
      );
    }

    return replacedContent;
  };

  const exportToPDF = () => {
    const storedCsvData = localStorage.getItem("csvData");

    if (!storedCsvData) {
      toast.warning("Nenhum dado disponível para exportar.");
      return;
    }

    const relatorios = JSON.parse(storedCsvData);

    const relatoriosFiltrados = relatorios.filter((relatorio) =>
      Object.keys(filtro).every((key) =>
        relatorio[key]?.toLowerCase().includes(filtro[key]?.toLowerCase())
      )
    );

    const content = relatoriosFiltrados
      .map((relatorio, index) => {
        const relatorioContent = replaceFieldsWithMockData(
          reportContent,
          relatorio
        );

        if (index > 0) {
          return `<div style="page-break-before:always;">${relatorioContent}</div>`;
        }

        return relatorioContent;
      })
      .join("");

    const element = document.createElement("div");
    element.innerHTML = content;

    const margin = [20, 25, 20, 25];

    html2pdf()
      .from(element)
      .set({
        margin: margin,
        filename: "relatorios.pdf",
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  const handleFiltroChange = (event) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      [event.target.name]: event.target.value,
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleVisualizar = () => {
    setLoading(true);

    const storedCsvData = localStorage.getItem("csvData");

    if (!storedCsvData) {
      toast.warning("Nenhum dado disponível para visualizar.");
      setLoading(false);
      return;
    }

    const relatorios = JSON.parse(storedCsvData);

    const relatoriosFiltrados = relatorios.filter((relatorio) =>
      Object.keys(filtro).every((key) =>
        relatorio[key]?.toLowerCase().includes(filtro[key]?.toLowerCase())
      )
    );

    if (relatoriosFiltrados.length > 0) {
      setSelectedRelatorio(relatoriosFiltrados[0]);
    } else {
      toast.warning("Nenhum relatório encontrado com os filtros aplicados.");
    }

    setTimeout(() => {
      setShowPreview(true);
      setShowCloseButton(true);
      setShowVisualizarButton(false);
      setLoading(false);
    }, 1000);
  };

  const handleFecharVisualizacao = () => {
    setShowPreview(false);
    setShowVisualizarButton(true);
    setShowCloseButton(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <header className="mb-2">
        <h1 className="text-[22px] md:text-[24px] font-semibold">
          Crie seu relatório e adicione os campos dinâmicos do seu arquivo CSV.
        </h1>
      </header>
      <FilterBar
        filtro={filtro}
        onFiltroChange={handleFiltroChange}
        dynamicFields={dynamicFields}
      />

      <TextEditor
        value={reportContent}
        onChange={handleEditorChange}
        apiKey={tinyMCEApiKey}
        handleInsertField={handleInsertField}
      />

      <div className="flex justify-center w-[95vw] md:w-[720px] my-8 py-2 border-2 border-[#3ea8c8] rounded-lg">
        {showVisualizarButton && (
          <button onClick={handleVisualizar} className="mx-6">
            Visualizar Modelo
          </button>
        )}
        {showCloseButton && (
          <button onClick={handleFecharVisualizacao} className="mx-6">
            Fechar Visualização
          </button>
        )}
        <button
          onClick={exportToPDF}
          className="mx-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Exportar para PDF
        </button>
      </div>

      {showPreview && (
        <div
          className="w-full md:w-[750px] mt-5 px-10 border border-gray-300 p-2.5 overflow-auto"
          dangerouslySetInnerHTML={{
            __html: replaceFieldsWithMockData(reportContent, selectedRelatorio),
          }}
        />
      )}
    </div>
  );
};

export default ReportEditor;
