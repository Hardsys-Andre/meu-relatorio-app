import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Editor WYSIWYG
import 'react-quill/dist/quill.snow.css'; // Estilos do editor
import jsPDF from 'jspdf'; // Biblioteca para exportar PDF
import html2canvas from 'html2canvas'; // Biblioteca para capturar o HTML como imagem
import { saveAs } from 'file-saver'; // Para salvar arquivos no navegador
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx'; // Biblioteca para exportar DOCX
import mockRelatorios from '../data/mockRelatorios.json'; // Importa o JSON mockado

const ReportEditor = () => {
  const [reportContent, setReportContent] = useState('');

  // Campos dinâmicos disponíveis
  const [dynamicFields] = useState([
    { name: 'Nome do Cliente', placeholder: '{{Nome do Cliente}}' },
    { name: 'Data de Entrega', placeholder: '{{Data de Entrega}}' },
    { name: 'Endereço', placeholder: '{{Endereço}}' },
  ]);

  // Função para inserir campos dinâmicos no texto
  const handleInsertField = (placeholder) => {
    setReportContent(reportContent + placeholder);
  };

  // Função para substituir campos dinâmicos pelos dados mockados
  const replaceFieldsWithMockData = (content, relatorio) => {
    return content
      .replace(/{{Nome do Cliente}}/g, relatorio.nomeCliente)
      .replace(/{{Data de Entrega}}/g, relatorio.dataEntrega)
      .replace(/{{Endereço}}/g, relatorio.endereco);
  };

  // Função para exportar PDF
  const exportToPDF = () => {
    mockRelatorios.relatorios.forEach(relatorio => {
      const contentWithMockData = replaceFieldsWithMockData(reportContent, relatorio);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = contentWithMockData;
      document.body.appendChild(tempDiv);

      html2canvas(tempDiv).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`relatorio_${relatorio.nomeCliente}.pdf`);
        document.body.removeChild(tempDiv);
      });
    });
  };

  // Função para remover tags HTML
  const removeHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Função para exportar DOCX
  const exportToDocx = () => {
    mockRelatorios.relatorios.forEach(relatorio => {
      const sanitizedContent = removeHtmlTags(reportContent);
      const finalContent = replaceFieldsWithMockData(sanitizedContent, relatorio);

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Relatório de ${relatorio.nomeCliente}`,
                    bold: true,
                    size: 28,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              ...finalContent.split('\n').map((line) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: line,
                      size: 24,
                    }),
                  ],
                })
              ),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `relatorio_${relatorio.nomeCliente}.docx`);
      });
    });
  };

  return (
    <div>
      <h2>Crie Seu Relatório</h2>
      <ReactQuill value={reportContent} onChange={setReportContent} />

      <div style={{ marginTop: '20px' }}>
        <h3>Inserir Campos Dinâmicos:</h3>
        {dynamicFields.map(field => (
          <button 
            key={field.name} 
            onClick={() => handleInsertField(field.placeholder)}
            style={{ marginRight: '10px', padding: '10px' }}
          >
            {field.name}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Pré-visualização:</h3>
        <div 
          id="report-preview" 
          style={{ border: '1px solid #ddd', padding: '10px', minHeight: '200px' }}
          dangerouslySetInnerHTML={{ __html: reportContent }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Exportar Relatório</h3>
        <button onClick={exportToPDF} style={{ marginRight: '10px', padding: '10px' }}>
          Exportar para PDF
        </button>
        <button onClick={exportToDocx} style={{ padding: '10px' }}>
          Exportar para DOCX
        </button>
      </div>
    </div>
  );
};

export default ReportEditor;
