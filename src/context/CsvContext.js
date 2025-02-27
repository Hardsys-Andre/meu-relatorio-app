// context/CsvContext.js
import { createContext, useContext, useState } from "react";

const CsvContext = createContext();



export const CsvProvider = ({ children }) => {
  const [headers, setHeaders] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [csvData, setCsvData] = useState([]);  // Para armazenar os dados das linhas do CSV

  return (
    <CsvContext.Provider
      value={{
        headers,
        setHeaders,
        selectedColumns,
        setSelectedColumns,
        csvData,  // Expor o csvData
        setCsvData,  // Expor a função para atualizar o csvData
      }}
    >
      {children}
    </CsvContext.Provider>
  );
};
export const useCSV = () => useContext(CsvContext);