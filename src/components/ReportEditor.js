import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import mockRelatorios from "../data/mockRelatorios.json";
import htmlToPdfmake from "html-to-pdfmake";
import htmlDocx from "html-docx-js/dist/html-docx";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReportEditor = () => {
  const [reportContent, setReportContent] = useState("");
  const [selectedRelatorio, setSelectedRelatorio] = useState(
    mockRelatorios.relatorios[0]
  );
  const editorRef = useRef(null);
  const [imageDataUrls, setImageDataUrls] = useState({});

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
            ? `<img src="${selectedRelatorio.imagem}" alt="Imagem do relatório" style="max-width: 100%; height: auto;">`
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
          `<img src="${relatorio.imagem}" alt="Imagem do relatório" style="max-width: 100%; height: auto;">`
        );
      } else {
        replacedContent = replacedContent.replace(regex, relatorio[field.name]);
      }
    });

    return replacedContent;
  };

  const exportToPDF = () => {
    let allReportsContent = [];

    mockRelatorios.relatorios.forEach((relatorio, index) => {
      const content = replaceFieldsWithMockData(reportContent, relatorio);
      allReportsContent.push({
        text: `Relatório de ${relatorio.nomeCliente}\n\n`,
        style: "header",
      });
      allReportsContent.push(htmlToPdfmake(content));

      if (index !== mockRelatorios.relatorios.length - 1) {
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

    mockRelatorios.relatorios.forEach((relatorio, index) => {
      const content = replaceFieldsWithMockData(reportContent, relatorio);

      // Substituir a tag de imagem por uma versão base64
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const contentWithBase64Images = content.replace(
        imgRegex,
        (match, src) => {
          const base64Image = imageDataUrls[src];
          return `<img src="${base64Image}" style="max-width: 100%; height: auto;"`;
        }
      );

      allReportsContent += `<h2>Relatório de ${relatorio.nomeCliente}</h2>${contentWithBase64Images}`;

      if (index !== mockRelatorios.relatorios.length - 1) {
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
  };

  return (
    <div>
      <h2>Crie Seu Relatório</h2>
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
          automatic_uploads: false, // Desabilita uploads automáticos
          paste_data_images: true, // Permite colar imagens
        }}
        onEditorChange={handleEditorChange}
      />

      <div style={{ marginTop: "20px" }}>
        <h3>Inserir Campos Dinâmicos:</h3>
        {dynamicFields.map((field) => (
          <button
            key={field.name}
            onClick={() => handleInsertField(field.placeholder)}
            style={{ marginRight: "10px", padding: "10px" }}
          >
            {field.name}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Selecionar Cliente para Pré-visualização:</h3>
        <select onChange={handleRelatorioChange}>
          {mockRelatorios.relatorios.map((relatorio) => (
            <option key={relatorio.nomeCliente} value={relatorio.nomeCliente}>
              {relatorio.nomeCliente}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Pré-visualização:</h3>
        <div
          id="report-preview"
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            minHeight: "200px",
          }}
          dangerouslySetInnerHTML={{
            __html: replaceFieldsWithMockData(reportContent, selectedRelatorio),
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Exportar Relatório</h3>
        <button
          onClick={exportToPDF}
          style={{ marginRight: "10px", padding: "10px" }}
        >
          Exportar para PDF (Todos os Clientes)
        </button>
        <button onClick={exportAllToDocx} style={{ padding: "10px" }}>
          Exportar para DOCX (Todos os Clientes)
        </button>
      </div>
    </div>
  );
};

export default ReportEditor;
