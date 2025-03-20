import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FilterBar = ({ filtro, onFiltroChange, dynamicFields }) => {
  const scrollContainerRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

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
        const hasOverflow = scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth;
        setShowButtons(hasOverflow);
        setIsOverflowing(hasOverflow); 
      }
    };

    checkScrollButtons(); 

    window.addEventListener("resize", checkScrollButtons);

    return () => {
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, [dynamicFields]);

  return (
    <div className="flex flex-col mb-4 gap-1 justify-center items-center">
      <div>
        <label className="text-[16px] font-bold">Filtrar Dados: </label>
      </div>
      <div className="flex md:flex-row flex-col md:w-[auto] md:max-w-[95vw] w-[95vw] md:gap-1 justify-center items-center mb-2 border-2 border-[#3ea8c8] rounded-lg">
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
          className={`flex py-2 px-2 items-center ${isOverflowing ? "justify-start" : "justify-center"} w-full overflow-x-auto scrollbar-hide`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {dynamicFields.map((field) => (
            <div key={field.name} className="snap-center flex-shrink-0 mx-2">
              <input
                type="text"
                name={field.name}
                value={filtro[field.name] || ""}
                onChange={onFiltroChange}
                placeholder={field.name}
                className="bg-[#3ea8c8] text-base rounded-md text-white px-2 placeholder-black"
              />
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
