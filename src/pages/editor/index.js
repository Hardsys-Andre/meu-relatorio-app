import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import mockRelatorios from "../../data/mockRelatorios.json";
import htmlToPdfmake from "html-to-pdfmake";
import htmlDocx from "html-docx-js/dist/html-docx";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReportEditor = () => {
  const [reportContent, setReportContent] = useState("");
  const [selectedRelatorio, setSelectedRelatorio] = useState(
    mockRelatorios.relatorios[0]
  );
  const [filtro, setFiltro] = useState({}); // Criado um estado para armazenar o filtro
  const editorRef = useRef(null);
  const [imageDataUrls, setImageDataUrls] = useState({});
  const [showPreview, setShowPreview] = useState(false); // Estado para controlar a visibilidade da pré-visualização
  const [showCloseButton, setShowCloseButton] = useState(false); // Estado para controlar a visibilidade do botão fechar visualização

  const tinyMCEApiKey = "b0tl99mycwhh1o7hptou60a3w11110ox6av062w6limk184s";

  useEffect(() => {
    const loadImages = async () => {
      const urls = {};
      for (const relatorio of mockRelatorios.relatorios) {
        if (relatorio.imagem) {
          try {
            const response = await fetch(relatorio.imagem);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
              urls[relatorio.imagem] = reader.result;
              setImageDataUrls((prevUrls) => ({
                ...prevUrls,
                [relatorio.imagem]: reader.result,
              }));
            };
            reader.readAsDataURL(blob);
          } catch (error) {
            console.error("Erro ao carregar imagem:", error);
          }
        }
      }
    };

    loadImages();
  }, []);

  const getDynamicFieldsFromRelatorios = () => {
    const relatorio = mockRelatorios.relatorios[0];
    const fields = Object.keys(relatorio)
      .filter((field) => field !== "id")
      .map((field) => ({
        name: field,
        placeholder:
          field === "imagem"
            ? `<img src="${selectedRelatorio.imagem}" alt="Imagem do relatório" class="max-w-full h-auto">`
            : `{{${field}}}`,
      }));

    return fields;
  };

  const [dynamicFields] = useState(getDynamicFieldsFromRelatorios());

  const handleEditorChange = (content) => {
    setReportContent(content);
  };

  const handleInsertField = (placeholder) => {
    if (editorRef.current) {
      editorRef.current.execCommand("mceInsertContent", false, placeholder);
    }
  };

  const replaceFieldsWithMockData = (content, relatorio) => {
    let replacedContent = content;

    dynamicFields.forEach((field) => {
      const regex = new RegExp(`{{${field.name}}}`, "g");
      if (field.name === "imagem") {
        replacedContent = replacedContent.replace(
          regex,
          `<img src="${relatorio.imagem}" alt="Imagem do relatório" class="max-w-full h-auto">`
        );
      } else {
        replacedContent = replacedContent.replace(regex, relatorio[field.name]);
      }
    });

    return replacedContent;
  };

  const exportToPDF = () => {
    let allReportsContent = [];

    const relatoriosFiltrados = mockRelatorios.relatorios.filter(
      (relatorio) => {
        let passFilter = true;
        Object.keys(filtro).forEach((key) => {
          if (!relatorio[key].toLowerCase().includes(filtro[key].toLowerCase())) {
            passFilter = false;
          }
        });
        return passFilter;
      }
    );

    relatoriosFiltrados.forEach((relatorio, index) => {
      const content = replaceFieldsWithMockData(reportContent, relatorio);
      allReportsContent.push({
        text: `Relatório de ${relatorio.nomeCliente}\n\n`,
        style: "header", // Substituir por tailwindcss
      });
      allReportsContent.push(htmlToPdfmake(content));

      if (index !== relatoriosFiltrados.length - 1) {
        allReportsContent.push({ text: "", pageBreak: "after" });
      }
    });

    const docDefinition = {
      content: allReportsContent,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10],
        },
      },
      images: imageDataUrls,
    };

    pdfMake.createPdf(docDefinition).download("todos_relatorios.pdf");
  };

  const exportAllToDocx = () => {
    let allReportsContent = "";

    const relatoriosFiltrados = mockRelatorios.relatorios.filter(
      (relatorio) => {
        let passFilter = true;
        Object.keys(filtro).forEach((key) => {
          if (!relatorio[key].toLowerCase().includes(filtro[key].toLowerCase())) {
            passFilter = false;
          }
        });
        return passFilter;
      }
    );

    relatoriosFiltrados.forEach((relatorio, index) => {
      const content = replaceFieldsWithMockData(reportContent, relatorio);

      // Substituir a tag de imagem por uma versão base64
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const contentWithBase64Images = content.replace(
        imgRegex,
        (match, src) => {
          const base64Image = imageDataUrls[src];
          return `<img src="${base64Image}" class="max-w-full h-auto">`;
        }
      );

      allReportsContent += `<h2>Relatório de ${relatorio.nomeCliente}</h2>${contentWithBase64Images}`;

      if (index !== relatoriosFiltrados.length - 1) {
        allReportsContent += '<w:br w:type="page"/>';
      }
    });

    const docxContent = htmlDocx.asBlob(allReportsContent);

    saveAs(docxContent, "todos_relatorios.docx");
  };

  const handleRelatorioChange = (event) => {
    const relatorio = mockRelatorios.relatorios.find(
      (r) => r.nomeCliente === event.target.value
    );
    setSelectedRelatorio(relatorio);
    setShowPreview(true); // Exibir a pré-visualização após a seleção do relatório
    setShowCloseButton(true); // Exibir o botão fechar visualização após a seleção do relatório
  };

  const handleFiltroChange = (event) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      [event.target.name]: event.target.value,
    }));
  };

  const relatoriosFiltrados = mockRelatorios.relatorios.filter(
    (relatorio) => {
      let passFilter = true;
      Object.keys(filtro).forEach((key) => {
        if (!relatorio[key].toLowerCase().includes(filtro[key].toLowerCase())) {
          passFilter = false;
        }
      });
      return passFilter;
    }
  );

  const handleVisualizar = () => {
    setShowPreview(true);
    setShowCloseButton(true); // Exibir o botão fechar visualização ao clicar em visualizar
  };

  const handleFecharVisualizacao = () => {
    setShowPreview(false);
    setShowCloseButton(false); // Ocultar o botão fechar visualização ao fechar a visualização
  };

  return (
    <div>
      <header className="App-header">
        <h1 className="text-[36px]">Gerador de Relatórios Dinâmicos</h1>
      </header>
      <h2 className="my-6 text-[30px]">Crie Seu Relatório</h2>
      <div className="mb-10">
        <label>Filtrar por: </label>
        {dynamicFields.map((field) => (
          <input
            key={field.name}
            type="text"
            name={field.name}
            value={filtro[field.name]}
            onChange={handleFiltroChange}
            placeholder={field.name}
            className="mr-2.5 bg-[#42B091] text-base rounded-md text-white px-2 placeholder-black"
          />
        ))}
      </div>
      <Editor
        apiKey={tinyMCEApiKey}
        value={reportContent}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          height: 500,
          language: 'pt_BR',
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
            "table" +
            "undo redo | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | image | help | " +
            "tableinsertcolbefore tableinsertcolafter tabledeletecol",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          table_toolbar:
            "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | " +
            "tableinsertcolbefore tableinsertcolafter tabledeletecol",
          imagetools_toolbar:
            "rotateleft rotateright | flipv fliph | editimage imageoptions",
          image_advtab: true,
          automatic_uploads: true, // Desabilita uploads automáticos
          paste_data_images: true, // Permite colar imagens
        }}
        onEditorChange={handleEditorChange}
      />

      <div className="mt-10">
        <h3 className="my-4 font-semibold text-lg">Inserir Campos Dinâmicos:</h3>
        {dynamicFields.map((field) => (
          <button
            key={field.name}
            onClick={() => handleInsertField(field.placeholder)}
            className="mr-4 px-4 py-2"
          >
            {field.name}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="my-4 font-semibold text-lg">Selecionar Cliente para Visualização:</h3>
        <select onChange={handleRelatorioChange} className="border-2 border-[#42B091]">
          {relatoriosFiltrados.map((relatorio) => (
            <option key={relatorio.nomeCliente} value={relatorio.nomeCliente}>
              {relatorio.nomeCliente}
            </option>
          ))}
        </select>
        <button onClick={handleVisualizar} className="mx-6">
          Visualizar
        </button>
        {showCloseButton && <button onClick={handleFecharVisualizacao}>
          Fechar Visualização
        </button>}
      </div>

      {showPreview && (
        <div
          className="mt-5 border border-gray-300 p-2.5 overflow-auto"
          dangerouslySetInnerHTML={{
            __html: replaceFieldsWithMockData(reportContent, selectedRelatorio),
          }}
        />
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={exportToPDF} className="mr-2.5">
          Exportar para PDF
        </button>
        <button onClick={exportAllToDocx}>
          Exportar para DOCX
        </button>
      </div>
    </div>
  );
};

export default ReportEditor;