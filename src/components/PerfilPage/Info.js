import React from 'react';

const Info = ({ isEditing, formData, userData, handleInputChange, handleSave, setIsEditing, handleLogout }) => {
  return (
    <div className="w-full border rounded-xl p-4">
      <div className="flex flex-col items-start w-full ">
        <p className="text-2xl font-semibold">Informações Pessoais</p>
        <p className="text-sm text-gray-600">
          Atualize suas informações pessoais
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {["firstName", "lastName", "phone", "cityState"].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 text-left text-sm font-semibold mb-2 mt-4">
              {field === "firstName"
                ? "Nome Completo"
                : field === "lastName"
                ? "Sobrenome"
                : field === "phone"
                ? "Telefone"
                : "Cidade/Estado"}
            </label>
            {isEditing ? (
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                onChange={handleInputChange}
                className="w-full text-left px-4 py-2 border rounded-lg text-gray-700"
              />
            ) : (
              <p className="w-full text-left px-4 py-2 border rounded-lg bg-gray-100 text-gray-700">
                {userData[field]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-8 flex gap-1 md:gap-4 justify-between">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-700 text-white text-[14px] font-bold py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300"
            >
              Salvar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white text-[14px] font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-700 text-white text-[14px] font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
          >
            Editar Perfil
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-800 text-white text-[14px] font-bold py-2 px-4 rounded-lg hover:bg-red-900 transition duration-300"
        >
          Deslogar
        </button>
      </div>
    </div>
  );
};

export default Info;