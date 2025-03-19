import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ value, onChange, apiKey, handleInsertField }) => {
  const editorRef = useRef(null);
  const [dynamicFieldsSelected, setDynamicFieldsSelected] = useState([]);
  const [reportContent, setReportContent] = useState(
    localStorage.getItem("reportContent") || ""
  );

  // Recuperar os nomes das colunas do localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("csvData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      // Verifica se há dados e pega os nomes das colunas do primeiro item
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        const columnNames = Object.keys(parsedData[0]); // Obtém apenas os nomes das colunas
        setDynamicFieldsSelected(columnNames);
      }
    }
  }, []);

  const handleEditorChange = (content) => {
    onChange(content);
  };

  const handleLimparEditor = () => {
    if (window.confirm("Tem certeza que deseja limpar o editor?")) {
      setReportContent("");
      localStorage.removeItem("reportContent");
      onChange(""); // Atualiza o conteúdo do editor para vazio
      if (editorRef.current) {
        editorRef.current.setContent(""); // Limpa o conteúdo do editor visualmente
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row p-1 md:p-4 w-[95vw] border-2 rounded-lg border-[#42B091]">
      <div className="flex justify-center w-full md:w-[70vw]">
        <div className="w-full md:w-[90vw] xl:w-[47vw]">
          <Editor
            apiKey={apiKey}
            value={value}
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            init={{
              height: 700,
              language: "pt_BR",
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
              automatic_uploads: true,
              paste_data_images: true,
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </div>
      <div className="w- full md:w-[20vw] xl:w-[30vw] border-2 rounded-lg border-[#42B091]">
        <div className="my-4 w-full">
          <button
            onClick={handleLimparEditor}
            className="text-md w-[95%] bg-red-600 hover:bg-red-700"
          >
            Limpar Editor
          </button>
        </div>
        <h3 className="my-4 font-semibold text-lg">
          Inserir Campos Dinâmicos:
        </h3>
        <div className="flex md:flex-row flex-wrap px-2 py-2 gap-2 justify-center items-center">
          {dynamicFieldsSelected.length > 0 ? (
            dynamicFieldsSelected.map((field, index) => (
              <button
                key={index}
                onClick={() => {
                  if (editorRef.current) {
                    const fieldContent = `{{${field}}}`; // Insere o nome do campo no editor
                    editorRef.current.insertContent(fieldContent);
                    handleInsertField(field); // Chama a função para armazenar os campos inseridos
                  }
                }}
                className="md:mr-4 md:px-4 py-2 w-[138px]"
              >
                {field}
              </button>
            ))
          ) : (
            <p className="text-gray-500">Nenhum campo disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
