import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import FilterBar from "../../components/FilterBar";
import TextEditor from "../../components/TextEditor";
import { useCSV } from "../../context/CsvContext";
import { FaFileZipper } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaFilePdf, FaTrash } from "react-icons/fa";


const ReportEditor = () => {
  const { user, isLoggedIn, loading: authLoading } = useAuth(); // Renomeando 'loading' do AuthContext
  const [userType, setUserType] = useState(null);
  
  const [reportContent, setReportContent] = useState(localStorage.getItem("reportContent") || "");
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
    if (!authLoading && user) {
      setUserType(user.userType || "Desconhecido");
    }
  }, [authLoading, user]); // Agora ele só roda quando 'loading' for falso e 'user' mudar.

  const getDynamicFieldsFromRelatorios = () => {
    const storedData = localStorage.getItem("csvData");
    if (!storedData) {
      toast.error("Nenhum dado encontrado no localStorage.");
      return [];
    }
    try {
      const parsedData = JSON.parse(storedData);
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
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
      toast.warning("dynamicFields não está definido corretamente ou está vazio.");
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
        const relatorioContent = replaceFieldsWithMockData(reportContent, relatorio);
        if (index > 0)
          return `<div style="page-break-before:always;">${relatorioContent}</div>`;
        return relatorioContent;
      })
      .join("");

    const element = document.createElement("div");
    element.innerHTML = content;

    // Esconder as quebras de página antes da exportação
    const pageBreaks = element.querySelectorAll(".auto-page-break");
    pageBreaks.forEach((breakEl) => {
      breakEl.style.display = "none"; // Esconde a div com a quebra de página
    });

    // Adicionando CSS direto na exportação para garantir a formatação
    const styles = `
      <style>
            h1 { font-size: 24px; font-weight: bold; line-height: 1; margin-top: 6px; }
            h2 { font-size: 20px; font-weight: bold; line-height: 1; margin-top: 6px; }
            p { font-size: 14px; line-height: 1.5; margin-top: 8px; }
          </style>
    `;
    element.innerHTML = styles + element.innerHTML; // Adicionando o CSS ao conteúdo HTML

    // Gerar o PDF usando html2pdf
    html2pdf()
      .from(element)
      .set({
        margin: [24, 24, 24, 24],
        filename: "relatorios.pdf",
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();

    // Restaurar a visibilidade das quebras de página após o PDF ser gerado
    pageBreaks.forEach((breakEl) => {
      breakEl.style.display = ""; // Restaura a visibilidade da div com a quebra de página
    });
  };

  const exportToZip = async () => {
    if (userType !== "Premium") {
      toast.error("Apenas usuários Premium podem exportar para ZIP.");
      return;
    }

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

    if (relatoriosFiltrados.length === 0) {
      toast.warning("Nenhum relatório encontrado para exportação.");
      return;
    }

    const zip = new JSZip();

    const generatePdfBlob = async (content) => {
      return new Promise((resolve) => {
        const element = document.createElement("div");
        element.innerHTML = `
          <style>
            h1 { font-size: 24px; font-weight: bold; line-height: 1; margin-top: 6px; }
            h2 { font-size: 20px; font-weight: bold; line-height: 1; margin-top: 6px; }
            p { font-size: 14px; line-height: 1.5; margin-top: 8px; }
          </style>
          ${content}
        `;

        html2pdf()
          .from(element)
          .set({
            margin: [24, 24, 24, 24], // Margens do PDF
            filename: "relatorios.pdf",
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          })
          .outputPdf("blob")
          .then(resolve);
      });
    };

    const pdfPromises = relatoriosFiltrados.map(async (relatorio, index) => {
      const content = replaceFieldsWithMockData(reportContent, relatorio);
      const pdfBlob = await generatePdfBlob(content);
      zip.file(`relatorio_${index + 1}.pdf`, pdfBlob);
    });

    await Promise.all(pdfPromises);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "relatorios.zip");
      toast.success("ZIP com os relatórios exportado com sucesso!");
    });
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

  
  
  if (authLoading) {
    return <div>Carregando...</div>; // Isso evita que o componente tente acessar 'userType' antes da hora.
  }

  
  

  return (
    <div className="flex flex-col justify-center items-center">
      <header className="mb-2 mt-2">
        <h1 className="text-[22px] md:text-[24px] font-semibold">Editor de Relatórios</h1>
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
        userData={user}
      />

      <div className="flex flex-col md:flex-row justify-start w-[95vw] md:w-[auto] my-8 py-2 border-[1px] border-[#3ea8c8] rounded-lg">
        {showVisualizarButton && (
          <button onClick={handleVisualizar} className="mx-6 px-4 flex flex-row justify-center items-center">
            <FaEye className="w-4 h-4 mr-2" />
            Visualizar Modelo
          </button>
        )}
        {showCloseButton && (
          <button onClick={handleFecharVisualizacao} className="mx-6 px-4 flex flex-row justify-center items-center">
            <FaEye className="w-4 h-4 mr-2" />
            Fechar Visualização
          </button>
        )}
        <button
          onClick={exportToPDF}
          className="flex flex-row justify-center items-center gap-2 mx-6 py-2 px-4"
        >
          <FaFilePdf className="w-4 h-4" />
          Exportar para PDF
        </button>
        <button
          onClick={exportToZip}
          className={`flex flex-row justify-center items-center gap-2 mx-6 py-2 px-4 ${
            userType !== "Premium"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
         
        >
          <FaFileZipper  className="w-4 h-4" />
          Exportar relatórios zip
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
