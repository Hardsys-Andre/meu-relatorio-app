import { useState } from "react";
import CsvUploader from "../../components/CsvUploader";


export default function CsvPage() {

  const [selectedFields, setSelectedFields] = useState([]);

  return (
    <div className="container mx-auto p-6">
      <CsvUploader onColumnsSelected={setSelectedFields} />  
    </div>
  );
}
