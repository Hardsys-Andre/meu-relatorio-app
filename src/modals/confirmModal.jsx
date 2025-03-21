import React from 'react';
import { toast } from 'sonner';

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p>Tem certeza que deseja limpar o editor?</p>
        <div className="flex gap-2 mt-4 justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => {
              onConfirm();
              toast.success("Editor limpo com sucesso!");
            }}
          >
            Sim
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
            onClick={onCancel}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
