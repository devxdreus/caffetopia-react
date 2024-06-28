import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const KurangButton = ({ onClick }) => {
    return (
        <button
            className='
                bg-[#F4991A] text-white 
                w-5 h-5 sm:w-8 sm:h-8 md:w-7 md:h-7 
                rounded flex items-center justify-center
                transition duration-300 ease-in-out 
                transform hover:scale-105
            '
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faMinus} />
        </button>
    );
};

export default KurangButton;
