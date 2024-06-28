import { useNavigate } from 'react-router-dom';
import BackgroundAbout from '../components/background/BackgroundAbout';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <BackgroundAbout>
      <div style={{ textAlign: 'center', marginTop: '250px' }}>
        <h1 style={{ fontSize: '60px', fontWeight: 'bold' }}>404 - Page Not Found</h1>
        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>Sorry, the page you are looking for does not exist.</p>
        <button
          onClick={goHome}
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
            marginTop: '50px',
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#F4991A',
            color: 'brown',
            border: 'none',
            borderRadius: '15px' 
          }}
        >
          Go Home
        </button>
      </div>
    </BackgroundAbout>
  );
};

export default NotFound;