import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';  
import { Container, InputContainer, Button } from './styles';

const Login: React.FC = () => {
  const [userCode, setUserCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      // history.push('/pontos');
    }
  }, [history]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCode(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await api.get(`/users/exists/${userCode}`);

      if (response.data.exists) {
        localStorage.setItem('session', userCode);
        history.push('/pontos');
      } else {
        setErrorMessage('Esse usuário não está cadastrado no sistema.');
      }
    } catch (error) {
      setErrorMessage('Erro ao verificar o usuário. Tente novamente mais tarde.');
    }
  };

  return (
    <Container>
      <InputContainer>
        <h1>Ponto</h1>
        <div className='divInput'>
          <span>Código do usuário</span>
          <input
            type="text"
            placeholder=""
            value={userCode}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button onClick={handleSubmit}>Confirmar</Button>
      </InputContainer>
      {errorMessage && <p>{errorMessage}</p>}
    </Container>
  );
};

export default Login;
