import { useState } from "react";
import CsvUploader from "../../components/CsvUploader";

export default function CsvPage() {
  const [selectedFields, setSelectedFields] = useState([]);

  return (
    <div className="container mx-auto p-6">
      <CsvUploader onColumnsSelected={setSelectedFields} />
      
      {selectedFields.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl text-[#3ea8c8]">Campos Selecionados:</h2>
          <ul>
            {selectedFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
