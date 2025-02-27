import { useState, useEffect } from "react";

const usePersistedCsvData = () => {
  const [csvData, setCsvData] = useState(() => {
    const savedData = localStorage.getItem("csvData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    if (csvData.length > 0) {
      localStorage.setItem("csvData", JSON.stringify(csvData));
    }
  }, [csvData]);

  return [csvData, setCsvData];
};
