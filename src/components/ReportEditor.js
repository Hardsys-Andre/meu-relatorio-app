import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { saveAs } from 'file-saver'; // Para salvar arquivos no navegador
import pdfMake from 'pdfmake/build/pdfmake'; // Biblioteca para PDF
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Fontes padrão para pdfMake
import mockRelatorios from '../data/mockRelatorios.json'; // Importa o JSON mockado
import htmlToPdfmake from 'html-to-pdfmake';
import htmlDocx from 'html-docx-js/dist/html-docx';

// Registra as fontes
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReportEditor = () => {
  const [reportContent, setReportContent] = useState('');
  const [selectedRelatorio, setSelectedRelatorio] = useState(mockRelatorios.relatorios[0]); // Cliente selecionado
  const editorRef = useRef(null); // Referência para o editor

  // Adicione sua chave de API do TinyMCE
  const tinyMCEApiKey = 'b0tl99mycwhh1o7hptou60a3w11110ox6av062w6limk184s';

  // Função para capturar todos os campos dinâmicos do JSON, incluindo arrays, sem duplicação
const getDynamicFieldsFromRelatorios = () => {
  const relatorio = mockRelatorios.relatorios[0]; // Pegue o primeiro relatório como exemplo para os campos
  const fields = [];
  const fieldSet = new Set(); // Usamos um Set para evitar duplicação

  // Itera sobre as chaves do relatório
  Object.keys(relatorio).forEach((field) => {
    // Verifica se o campo é 'id' e o ignora
    if (field === 'id') return;

    // Se o campo for um array (como "itens"), adicione apenas os campos do primeiro elemento
    if (Array.isArray(relatorio[field])) {
      if (relatorio[field].length > 0) {
        Object.keys(relatorio[field][0]).forEach((subField) => {
          const fieldName = `${field}[].${subField}`; // Nome do campo no array sem o índice
          if (!fieldSet.has(fieldName)) { // Verifica se o campo já foi adicionado
            fields.push({
              name: fieldName,
              placeholder: `{{${fieldName}}}`, // Placeholder com referência ao campo
            });
            fieldSet.add(fieldName); // Marca o campo como adicionado
          }
        });
      }
    } else {
      // Se for um campo simples, verifique se já existe e adicione à lista
      if (!fieldSet.has(field)) {
        fields.push({
          name: field,
          placeholder: `{{${field}}}`,
        });
        fieldSet.add(field); // Marca o campo como adicionado
      }
    }
  });

  return fields;
};


  // Captura os campos dinâmicos
  const [dynamicFields] = useState(getDynamicFieldsFromRelatorios());

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
    let replacedContent = content;

    dynamicFields.forEach((field) => {
      const regex = new RegExp(`{{${field.name}}}`, 'g');

      // Se o campo for um array (verificamos pelo nome), substituímos corretamente
      if (field.name.includes('[')) {
        const [arrayName, rest] = field.name.split('[');
        const index = rest.split(']')[0]; // Extrai o índice do array
        const subField = rest.split('.')[1]; // Extrai o subcampo

        if (relatorio[arrayName] && relatorio[arrayName][index]) {
          replacedContent = replacedContent.replace(
            regex,
            relatorio[arrayName][index][subField]
          );
        }
      } else {
        replacedContent = replacedContent.replace(regex, relatorio[field.name]);
      }
    });

    return replacedContent;
  };

  const exportToPDF = () => {
    mockRelatorios.relatorios.forEach((relatorio) => {
      const content = replaceFieldsWithMockData(reportContent, relatorio);

      // Converte o HTML para formato pdfMake
      const pdfContent = htmlToPdfmake(content);

      // Define o conteúdo do documento PDF
      const docDefinition = {
        content: [pdfContent],
      };

      // Gera o PDF e faz o download
      pdfMake.createPdf(docDefinition).download(`${relatorio.nomeCliente}_relatorio.pdf`);
    });
  };

  const exportAllToDocx = () => {
    mockRelatorios.relatorios.forEach((relatorio) => {
      const content = replaceFieldsWithMockData(reportContent, relatorio);

      const docxContent = htmlDocx.asBlob(content); // Converte HTML para DOCX Blob

      saveAs(docxContent, `${relatorio.nomeCliente}_relatorio.docx`);
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
            'undo redo | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | help | ' +
            'tableinsertcolbefore tableinsertcolafter tabledeletecol',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          table_toolbar:
            'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | ' +
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
