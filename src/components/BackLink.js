import { useNavigate } from 'react-router-dom';
import { FaArrowLeft  } from 'react-icons/fa';

const BackLink = ({ to = '/', label = 'Voltar para a Home' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="group inline-flex items-center text-sm font-medium text-[#3ea8c8] bg-white hover:bg-white hover:text-[#2d97b7] hover:border-0 border-0 transition-colors duration-200 mb-4"
    >
      <FaArrowLeft  className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1 duration-200" />
      {label}
    </button>
  );
};

export default BackLink;
