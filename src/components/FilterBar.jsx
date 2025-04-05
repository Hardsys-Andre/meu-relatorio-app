import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaFilter } from "react-icons/fa";

const FilterBar = ({ filtro, onFiltroChange, dynamicFields = [] }) => {
  const scrollContainerRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [uniqueValues, setUniqueValues] = useState({});

  // Normaliza os nomes das chaves para evitar problemas com maiúsculas e minúsculas
  useEffect(() => {
    const storedCsvData = localStorage.getItem("csvData");
    const csvData = storedCsvData ? JSON.parse(storedCsvData) : [];

    if (Array.isArray(csvData) && csvData.length > 0 && Array.isArray(dynamicFields)) {
      const uniqueOptions = {};

      dynamicFields.forEach((field) => {
        if (field?.name) {
          const fieldName = Object.keys(csvData[0]).find(
            (key) => key.toLowerCase() === field.name.toLowerCase()
          );

          if (fieldName) {
            uniqueOptions[field.name] = [
              ...new Set(csvData.map((item) => item[fieldName]).filter(Boolean)),
            ];
          }
        }
      });

      setUniqueValues(uniqueOptions);
    }
  }, [dynamicFields]);

  // Controle do scroll horizontal
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 100;
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 100;
    }
  };

  useEffect(() => {
    const checkScrollButtons = () => {
      if (scrollContainerRef.current) {
        const hasOverflow =
          scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth;
        setShowButtons(hasOverflow);
        setIsOverflowing(hasOverflow);
      }
    };

    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, [dynamicFields?.length]);

  return (
    <div className="flex flex-col px-4 mb-2 gap-1 justify-center items-center">
      <div className="flex w-full">
        <label className="flex w-full gap-2 items-center text-left text-[16px] font-bold">
          <FaFilter className="" />
          Filtrar Dados:
        </label>
      </div>
      <div className="flex md:flex-row flex-col md:w-[auto] md:max-w-[95vw] w-[95vw] md:gap-1 justify-center items-center mb-2">
        {showButtons && (
          <button
            onClick={scrollLeft}
            className="bg-[#3ea8c8] hidden md:block text-white md:px-4 md:py-2 rounded-md items-center justify-center"
          >
            <FaArrowLeft />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className={`bg-[#3ea8c8] border-2 border-[#3ea8c8] rounded-lg flex py-2 px-2 items-center ${
            isOverflowing ? "justify-start" : "justify-center"
          } w-full overflow-x-auto scrollbar-hide`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {dynamicFields.map((field) => (
            <div key={field.name} className="snap-center flex-shrink-0 mx-2">
              <label className="block text-left text-black text-sm font-bold mb-1">
                {field.name}:
              </label>
              <input
                list={`list-${field.name}`}
                name={field.name}
                value={filtro[field.name] || ""}
                onChange={onFiltroChange}
                placeholder={`Filtre o campo ${field.name}`}
                className="border-[#3ea8c8] border-[1px] text-base rounded-md text-gray-500 px-2 placeholder-gray-400 placeholder:text-[12px]"
                onFocus={(e) => e.target.setAttribute('list', `list-${field.name}`)}
              />
              <datalist id={`list-${field.name}`}>
                {uniqueValues[field.name] && uniqueValues[field.name].length > 0 ? (
                  uniqueValues[field.name].map((option, index) => (
                    <option key={index} value={option} />
                  ))
                ) : (
                  <option value="Nenhuma opção disponível" disabled />
                )}
              </datalist>
            </div>
          ))}
        </div>
        {showButtons && (
          <button
            onClick={scrollRight}
            className="bg-[#3ea8c8] hidden md:block text-white md:px-4 md:py-2 rounded-md items-center justify-center"
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
