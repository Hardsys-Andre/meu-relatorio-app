import React from "react";
import {
  FaCrown,
  FaCheck,
} from "react-icons/fa";

const Planos = ({ userType }) => {
  return (
    <div>
      <div className="flex flex-col items-start w-full mb-6">
        <p className="text-2xl font-semibold">Plano e Assinatura</p>
        <p className="text-sm text-gray-600">
          Gerencie seu plano atual e veja os benefícios
        </p>
      </div>
      <section>
        <div className="p-4 mb-4 border rounded-md bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaCrown className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold">Plano Premium</h3>
            </div>
            {userType === "Premium" ? (
              <span className="border-green-500 text-green-600">Ativo</span>
            ) : (
              <button className="bg-white hover:text-white hover:bg-green-500 border-green-500 text-green-600">Contratar</button>
            )}
          </div>
          <p className="mb-4 text-sm">
            Seu plano Premium está ativo até <strong>15/12/2023</strong>.
            Aproveite todos os recursos exclusivos!
          </p>
          <div className="grid gap-2 mb-4 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900">
                <FaCheck className="w-3 h-3 text-amber-600" />
              </div>
              <span className="text-sm">Relatórios ilimitados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900">
                <FaCheck className="w-3 h-3 text-amber-600" />
              </div>
              <span className="text-sm">Exportação em múltiplos formatos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900">
                <FaCheck className="w-3 h-3 text-amber-600" />
              </div>
              <span className="text-sm">Suporte prioritário</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900">
                <FaCheck className="w-3 h-3 text-amber-600" />
              </div>
              <span className="text-sm">Modelos exclusivos</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button>Gerenciar Assinatura</button>
            {userType === "Premium" && (
              <button className="text-red-200 bg-red-900 border-red-200 hover:bg-red-800 dark:border-red-800 dark:hover:bg-red-950/20">
                Cancelar Plano
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Planos;
