import React from "react";
import LogoFlexi from '../../assets/logoFlexiReport.png'

const Security = () =>{
    return(
        <div className="flex flex-col w-full justify-center border rounded-xl p-4">
        <h1 className="md:text-2xl font-bold text-[#3ea8c8] mb-4 text-center">Recuperação de Senha</h1>
        <div className='flex items-center justify-center'>
            <img
              src={LogoFlexi}
              alt="Logotipo Flexireport"
              className="w-[100px] h-[100px] xl:w-[120px] xl:h-[120px]"
            />
        </div>
        
          <span>Para recuperar sua senha, envie um e-mail para:</span> 
          <span className=" font-bold text-[#3ea8c8]">recoverypassword@gmail.com</span>
          <span className=''>solicitando a troca da senha.</span>
          <span className='mt-2 font-semibold italic'>OBS: No corpo da mensagem coloque seu nome completo e seu e-mail.</span>
          <span className=' mt-4 text-[12px]'>No prazo de 24h você receberá uma nova senha</span>
      </div>
    )
}

export default Security;