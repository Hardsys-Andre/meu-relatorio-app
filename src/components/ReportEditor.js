import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import jsPDF from 'jspdf'; // Biblioteca para exportar PDF
import { saveAs } from 'file-saver'; // Para salvar arquivos no navegador
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx'; // Biblioteca para exportar DOCX
import mockRelatorios from '../data/mockRelatorios.json'; // Importa o JSON mockado

const ReportEditor = () => {
  const [reportContent, setReportContent] = useState('');
  const [selectedRelatorio, setSelectedRelatorio] = useState(mockRelatorios.relatorios[0]); // Cliente selecionado
  const editorRef = useRef(null); // Referência para o editor

  // Adicione sua chave de API do TinyMCE
  const tinyMCEApiKey = 'b0tl99mycwhh1o7hptou60a3w11110ox6av062w6limk184s';

  // Campos dinâmicos disponíveis
  const [dynamicFields] = useState([
    { name: 'Nome do Cliente', placeholder: '{{Nome do Cliente}}' },
    { name: 'Data de Entrega', placeholder: '{{Data de Entrega}}' },
    { name: 'Endereço', placeholder: '{{Endereco}}' },
  ]);

  const handleEditorChange = (content) => {
    setReportContent(content);
  };

  // Função para inserir campos dinâmicos no texto
  const handleInsertField = (placeholder) => {
    if (editorRef.current) {
      editorRef.current.execCommand('mceInsertContent', false, placeholder);
    }
  };

  // Função para substituir campos dinâmicos pelos dados mockados
  const replaceFieldsWithMockData = (content, relatorio) => {
    return content
      .replace(/{{Nome do Cliente}}/g, relatorio.nomeCliente)
      .replace(/{{Data de Entrega}}/g, relatorio.dataEntrega)
      .replace(/{{Endereco}}/g, relatorio.endereco);
  };

  const exportToPDF = () => {
    mockRelatorios.relatorios.forEach((relatorio) => {
      const content = replaceFieldsWithMockData(reportContent, relatorio);
      
      // Conversão de HTML para texto simples
      const plainText = content
        .replace(/<\/?[^>]+(>|$)/g, "") // Remove todas as tags HTML
        .replace(/&eacute;/g, 'é')
        .replace(/&ccedil;/g, 'ç')
        .replace(/&atilde;/g, 'ã')
        .replace(/&aacute;/g, 'á')
        .replace(/&iacute;/g, 'í')
        .replace(/&oacute;/g, 'ó')
        .replace(/&uacute;/g, 'ú')
        .replace(/&auml;/g, 'ä')
        .replace(/&egrave;/g, 'è')
        .replace(/&igrave;/g, 'ì')
        .replace(/&ugrave;/g, 'ù')
        .replace(/&ntilde;/g, 'ñ')
        .replace(/&otilde;/g, 'õ')
  
      const pdf = new jsPDF();
      
      // Adicionando o texto ao PDF
      const splitContent = pdf.splitTextToSize(plainText, 190); // Quebrar o texto em várias linhas
      pdf.setFontSize(12); // Tamanho da fonte
      pdf.text(splitContent, 10, 10); // Adiciona texto ao PDF
      
      pdf.save(`${relatorio.nomeCliente}_relatorio.pdf`);
    });
  };
  
  const exportAllToDocx = () => {
    mockRelatorios.relatorios.forEach((relatorio) => {
      const content = replaceFieldsWithMockData(reportContent, relatorio);
      
      // Conversão de HTML para texto simples
      const plainText = content
        .replace(/<\/?[^>]+(>|$)/g, "") // Remove todas as tags HTML
        .replace(/&eacute;/g, 'é')
        .replace(/&ccedil;/g, 'ç')
        .replace(/&atilde;/g, 'ã')
        .replace(/&aacute;/g, 'á')
        .replace(/&iacute;/g, 'í')
        .replace(/&oacute;/g, 'ó')
        .replace(/&uacute;/g, 'ú')
        .replace(/&auml;/g, 'ä')
        .replace(/&egrave;/g, 'è')
        .replace(/&igrave;/g, 'ì')
        .replace(/&ugrave;/g, 'ù')
        .replace(/&ntilde;/g, 'ñ')
        .replace(/lim&otilde;es/g, 'limões'); // Exemplo específico
  
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: plainText,
                alignment: AlignmentType.LEFT,
              }),
            ],
          },
        ],
      });
  
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${relatorio.nomeCliente}_relatorio.docx`);
      });
    });
  };

  // Atualiza o cliente selecionado para pré-visualização
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
        apiKey={tinyMCEApiKey} // Configura a chave de API
        value={reportContent}
        onInit={(evt, editor) => {
          editorRef.current = editor; // Armazena a instância do editor
        }}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'table',
          ],
          toolbar: 
            'table' +
            'undo redo | formatselect | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | help | ' +
            'tableinsertcolbefore tableinsertcolafter tabledeletecol',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | ' +
            'tableinsertcolbefore tableinsertcolafter tabledeletecol',
        }}
        onEditorChange={handleEditorChange}
      />

      <div style={{ marginTop: '20px' }}>
        <h3>Inserir Campos Dinâmicos:</h3>
        {dynamicFields.map((field) => (
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
        <h3>Selecionar Cliente para Pré-visualização:</h3>
        <select onChange={handleRelatorioChange}>
          {mockRelatorios.relatorios.map((relatorio) => (
            <option key={relatorio.nomeCliente} value={relatorio.nomeCliente}>
              {relatorio.nomeCliente}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Pré-visualização:</h3>
        <div
          id="report-preview"
          style={{ border: '1px solid #ddd', padding: '10px', minHeight: '200px' }}
          dangerouslySetInnerHTML={{
            __html: replaceFieldsWithMockData(reportContent, selectedRelatorio),
          }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Exportar Relatório</h3>
        <button onClick={exportToPDF} style={{ marginRight: '10px', padding: '10px' }}>
          Exportar para PDF (Todos os Clientes)
        </button>
        <button onClick={exportAllToDocx} style={{ padding: '10px' }}>
          Exportar para DOCX (Todos os Clientes)
        </button>
      </div>
    </div>
  );
};

export default ReportEditor;
