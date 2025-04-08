import { createContext, useContext, useState } from "react";

const CsvContext = createContext();

export const CsvProvider = ({ children }) => {
  const [headers, setHeaders] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [csvData, setCsvData] = useState([]);

  return (
    <CsvContext.Provider
      value={{
        headers,
        setHeaders,
        selectedColumns,
        setSelectedColumns,
        csvData,
        setCsvData,
      }}
    >
      {children}
    </CsvContext.Provider>
  );
};
export const useCSV = () => useContext(CsvContext);