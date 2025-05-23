
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redireccionar al dashboard directamente
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
