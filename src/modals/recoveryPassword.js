import React from 'react';
import LogoFlexi from '../assets/logoFlexiReport.png'

const RecoveryPasswordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 bg-red-800 hover:bg-red-900"
        >
          ✖
        </button>
        <h1 className="text-2xl font-bold text-[#3ea8c8] mb-4 text-center">Recuperação de Senha</h1>
        <div className='flex items-center justify-center'>
            <img
              src={LogoFlexi}
              alt="Logotipo Flexireport"
              className="w-[100px] h-[100px] xl:w-[120px] xl:h-[120px]"
            />
        </div>
        
        <span className="text-sm text-gray-700">
          Para recuperar sua senha, envie um e-mail para: 
          <span className="block font-bold text-[#3ea8c8]">recoverypassword@gmail.com</span>
          <span className='block'>solicitando a troca da senha.</span>
          <span className='block mt-2 font-semibold bg-[#3ea8c8] text-white rounded-xl p-2'>OBS: No corpo da mensagem coloque seu nome completo e seu e-mail.</span>
          <span className='block mt-4 text-[12px]'>No prazo de 24h você receberá uma nova senha</span>
        </span>
      </div>
    </div>
  );
};

export default RecoveryPasswordModal;
