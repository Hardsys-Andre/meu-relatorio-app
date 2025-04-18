import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ConfirmModal from "../modals/confirmModal";
import AiTextGenerator from "./AiTextGenerator";
import { FaTrash } from "react-icons/fa"

const TextEditor = ({ value, onChange, apiKey, handleInsertField }) => {
  const editorRef = useRef(null);
  const [dynamicFieldsSelected, setDynamicFieldsSelected] = useState([]);
  const [reportContent, setReportContent] = useState(
    localStorage.getItem("reportContent") || ""
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Para controlar o estado de carregamento

  useEffect(() => {
    const storedData = localStorage.getItem("csvData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (Array.isArray(parsedData) && parsedData.length > 0) {
        const columnNames = Object.keys(parsedData[0]);
        setDynamicFieldsSelected(columnNames);
      }
    }
  }, []);

  const handleEditorChange = (content) => {
    onChange(content);
  };

  const handleLimparEditor = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setReportContent("");
    localStorage.removeItem("reportContent");
    onChange("");
    if (editorRef.current) {
      editorRef.current.setContent("");
    }
  };

  // Atualizado para lidar com a geração de conteúdo e passar ao editor
  const handleGenerateContent = (generatedContent) => {
    if (editorRef.current) {
      editorRef.current.setContent(generatedContent);  // Insere o conteúdo gerado no editor
    }
    onChange(generatedContent);  // Atualiza o valor do editor
  };

  // Função para converter centímetros para pixels com base na densidade da tela
const cmToPixels = (cm) => {
  const dpi = window.devicePixelRatio * 96; // Considera a densidade da tela
  return (cm / 2.54) * dpi;
};

  const A4Width = cmToPixels(21);      // Largura da folha A4
  const A4Height = cmToPixels(25);
  const marginAll =  cmToPixels(2.4);

  return (
    <div className="flex flex-col gap-2 lg:flex-row p-1 lg:p-4 w-[95vw] border-[1px] rounded-lg border-[#3ea8c8]">
      <div className="flex justify-center w-full lg:w-[70vw]">
        <div className="flex w-full justify-center">
        <Editor
  apiKey={apiKey}
  value={value}
  onInit={(evt, editor) => {
    editorRef.current = editor;

// Função para converter centímetros para pixels com base na densidade da tela
const cmToPixels = (cm) => {
  const dpi = window.devicePixelRatio * 96; // Considera a densidade da tela
  return (cm / 2.54) * dpi;
};

// Função para adicionar quebras de página automaticamente
const addPageBreaks = () => {
  if (editorRef.current) {
    const contentArea = editorRef.current.getBody();
    const pageHeight = cmToPixels(24); // Altura da folha A4 em centímetros

    // Remove quebras de página anteriores
    const existingBreaks = contentArea.querySelectorAll(".auto-page-break");
    existingBreaks.forEach((breakEl) => breakEl.remove());

    let children = Array.from(contentArea.children);
    let accumulatedHeight = 0;

    children.forEach((child) => {
      accumulatedHeight += child.offsetHeight;

      if (accumulatedHeight > pageHeight) {
        const pageBreak = document.createElement("div");
        pageBreak.className = "auto-page-break";
        pageBreak.innerHTML = '<div>--- Quebra de Página ---</div>';
        child.parentNode.insertBefore(pageBreak, child);
        accumulatedHeight = child.offsetHeight; // Reinicia a contagem após a quebra
      }
    });
  }
};
// Executa a função quando o conteúdo muda
editor.on("keyup change", () => addPageBreaks());

  }}
  init={{
    height: A4Height,
    width: A4Width,
    language: "pt_BR",
    encoding: "UTF-8",
    menubar: true,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
      "table",
      "image",
      "imagetools",
      "paste",
      "code",
    ],
    toolbar:
      "table | undo redo | bold italic backcolor | " +
      "alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | removeformat | image | help",
    content_style: `
      body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding: 0; margin: 10px; }
      @media (min-width: 768px) {
        body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding: 0; margin: ${marginAll}px; }
      }
      .auto-page-break {
        width: 100%;
        text-align: center;
        margin: 20px 0;
        border-top: 2px dashed #999;
        color: #999;
      }
    `,
    automatic_uploads: true,
    paste_data_images: true,
    file_picker_types: "image",
    file_picker_callback: (cb, value, meta) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
  
      input.onchange = function () {
        const file = this.files[0];
        const reader = new FileReader();
        
        reader.onload = function () {
          const base64 = reader.result;
          cb(base64, { title: file.name });
        };
        
        reader.readAsDataURL(file);
      };
      
      input.click();
    },
  }}
  onEditorChange={handleEditorChange}
/>
        </div>
      </div>
      <div className="w-full lg:w-[20vw] xl:w-[30vw] border-[1px] rounded-lg border-[#3ea8c8]">
        <div className="flex flex-row justify-center my-4 w-full">
          <button
            onClick={handleLimparEditor}
            className="flex flex-row items-center gap-2 justify-center text-md w-[95%] bg-red-800 hover:bg-red-900"
          >
            <FaTrash className="w-4 h-4" />
            Limpar Editor
          </button>
        </div>
        <h3 className="my-4 font-semibold text-lg">
          Campos Dinâmicos:
        </h3>
        <div className="flex border border-[#3ea8c8] rounded-md mx-4 text-sm md:flex-row flex-wrap px-1 py-2 gap-2 justify-center items-center">
          {dynamicFieldsSelected.length > 0 ? (
            dynamicFieldsSelected.map((field, index) => (
              <button
                key={index}
                onClick={() => {
                  if (editorRef.current) {
                    const fieldContent = `{{${field}}}`;
                    editorRef.current.insertContent(fieldContent);
                    handleInsertField(field);
                  }
                }}
                className="md:px-4 py-1 bg-white border-[1px] border-[#3ea8c8] text-[#3ea8c8]"
              >
                {field}
              </button>
            ))
          ) : (
            <p className="text-gray-500">Nenhum campo disponível.</p>
          )}
        </div>
        {/* Botão para gerar conteúdo com IA */}
        <div className="mt-4">
          <AiTextGenerator handleGenerateContent={handleGenerateContent} />
        </div>
        <div className="mt-6 mx-6">
              <h3 className="mb-4 text-lg font-semibold">Ajuda Rápida</h3>
              <div className="p-3 text-sm bg-gray-100 rounded-md dark:bg-gray-800">
                <p className="mb-2 p-4">
                  <strong>Dicas:</strong> 
                  <ul className="list-disc text-justify">
                  <li className="mt-4">Posicione o cursor e clique nos botões dinâmicos para inseri-los no local desejado dentro do relatório.</li>
                  <li className="mt-4">Digite que tipo de Relatório deseja no prompt acima e será gerado um modelo criado por uma IA ou cole um modelo já pronto no editor.</li>
                  </ul>
                </p>
                <p>
                  Para mais informações, consulte nossa{" "}
                  <a href="#" className="text-[#3ea8c8] hover:underline">
                    documentação
                  </a>
                  .
                </p>
              </div>
            </div>
      </div>
      {showModal && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TextEditor;
