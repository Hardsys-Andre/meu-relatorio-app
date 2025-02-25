import React from "react";

const FilterBar = ({ filtro, onFiltroChange, dynamicFields }) => {
  return (
    <div className="flex md:flex-row flex-col gap-2 justify-center items-center mb-10 border-2 border-[#42B091] rounded-lg">
      <div>
        <label className="text-[16px] font-bold">Filtrar por: </label>
      </div>
      <div className="flex flex-col md:flex-row py-3 px-2 items-center justify-center">
        {dynamicFields.map((field) => (
          <input
            key={field.name}
            type="text"
            name={field.name}
            value={filtro[field.name] || ""}
            onChange={onFiltroChange}
            placeholder={field.name}
            className="mr-2.5 mb-2.5 md:mb-0 bg-[#42B091] text-base rounded-md text-white px-2 placeholder-black"
          />
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
