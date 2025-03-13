import React, { useState, useEffect, useRef } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import mockRelatorios from "../../data/mockRelatorios.json";
import FilterBar from "../../components/FilterBar";
import TextEditor from "../../components/TextEditor";
import { useCSV } from "../../context/CsvContext";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReportEditor = () => {
  const [reportContent, setReportContent] = useState(
    localStorage.getItem("reportContent") || ""
  );
  const [selectedRelatorio, setSelectedRelatorio] = useState(
    mockRelatorios.relatorios[0]
  );
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
    if (!storedData) return [];

    try {
      const parsedData = JSON.parse(storedData);
      if (!Array.isArray(parsedData) || parsedData.length === 0) return [];
      const relatorio = parsedData[0];
      return Object.keys(relatorio)
        .filter((field) => field !== "id")
        .map((field) => ({
          name: field,
          placeholder: `{{${field}}}`,
        }));
    } catch (error) {
      console.error("Erro ao processar os dados do localStorage:", error);
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

    // Verificando se o dynamicFields está definido e tem itens
    if (Array.isArray(dynamicFields) && dynamicFields.length > 0) {
      dynamicFields.forEach((field) => {
        // Verificando se o campo está no relatorio antes de tentar substituir
        if (relatorio && relatorio.hasOwnProperty(field.name)) {
          const regex = new RegExp(`{{${field.name}}}`, "g");
          const fieldValue =
            relatorio[field.name] !== undefined ? relatorio[field.name] : "";
          replacedContent = replacedContent.replace(regex, fieldValue);
        }
      });
    } else {
      console.warn(
        "dynamicFields não está definido corretamente ou está vazio."
      );
    }

    return replacedContent;
  };

  const exportToPDF = () => {
    // Recuperando os dados do localStorage
    const storedCsvData = localStorage.getItem("csvData");

    // Se não houver dados no localStorage, retorna um alerta ou mensagem de erro
    if (!storedCsvData) {
      alert("Nenhum dado disponível para exportar.");
      return;
    }

    // Converting the stored CSV data from JSON format
    const relatorios = JSON.parse(storedCsvData);

    // Filtrando os relatórios de acordo com o filtro
    const relatoriosFiltrados = relatorios.filter((relatorio) =>
      Object.keys(filtro).every((key) =>
        relatorio[key]?.toLowerCase().includes(filtro[key]?.toLowerCase())
      )
    );

    // Gerando o conteúdo do relatório para cada relatório filtrado
    const allReportsContent = relatoriosFiltrados
      .map((relatorio, index) => {
        // Substituindo os placeholders pelos dados do CSV
        const reportContentWithData = replaceFieldsWithMockData(
          reportContent,
          relatorio
        );

        return [
          {
            text: `Relatório de ${relatorio.nomeCliente}\n\n`,
            style: "header",
          },
          htmlToPdfmake(reportContentWithData), // Usando o conteúdo já substituído
          index !== relatoriosFiltrados.length - 1
            ? { text: "", pageBreak: "after" }
            : null,
        ];
      })
      .flat();

    // Definindo a estrutura do documento PDF
    const docDefinition = {
      content: allReportsContent,
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 10, 0, 10] },
      },
    };

    // Gerando e baixando o arquivo PDF
    pdfMake.createPdf(docDefinition).download("todos_relatorios.pdf");
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

  const handleLimparEditor = () => {
    if (window.confirm("Tem certeza que deseja limpar o editor?")) {
      setReportContent("");
      localStorage.removeItem("reportContent");
    }
  };

  return (
    <div className="mb-20">
      <header className="mb-6">
        <h1 className="text-[22px] md:text-[28px] font-semibold">
          Crie seu relatório e adicione os campos dinâmicos do seu arquivo CSV.
        </h1>
      </header>
      <FilterBar
        filtro={filtro}
        onFiltroChange={handleFiltroChange}
        dynamicFields={dynamicFields}
      />
      <div className="my-4">
        <button onClick={handleLimparEditor} className="text-sm">
          Limpar Editor
        </button>
      </div>

      <TextEditor
        value={reportContent}
        onChange={handleEditorChange}
        apiKey={tinyMCEApiKey}
        handleInsertField={handleInsertField}
      />

      <div className="mt-10">
        <h3 className="my-4 font-semibold text-lg">
          Selecionar Cliente para Visualização:
        </h3>

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
        {/* Botão de Exportar para PDF */}
        <button
          onClick={exportToPDF}
          className="mx-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Exportar para PDF
        </button>
      </div>

      {showPreview && (
        <div
          className="mt-5 border border-gray-300 p-2.5 overflow-auto"
          dangerouslySetInnerHTML={{
            __html: replaceFieldsWithMockData(reportContent, selectedRelatorio),
          }}
        />
      )}
    </div>
  );
};

export default ReportEditor;
