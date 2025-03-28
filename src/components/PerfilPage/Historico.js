import React from "react";
import {
  FaCrown,
} from "react-icons/fa";

const Historico = () => {
  return (
    <div>
      <div className="flex flex-col items-start w-full mb-6">
        <p className="text-2xl font-semibold">Histórico de Relatórios</p>
        <p className="text-sm text-gray-600">
          Veja e acesse seus relatórios gerados anteriormente
        </p>
      </div>
      <section>
        <div className="p-4 mb-4 border rounded-md bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">Nenhum relatório disponível no momento!</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Historico;