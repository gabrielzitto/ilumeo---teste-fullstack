import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';  
import { Container, InputContainer, Button } from './styles';

const Login: React.FC = () => {
  const [userCode, setUserCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      history.push('/pontos');
    }
  }, [history]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    setState(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (isRegister) {
      if (!userCode || !email || !password) {
        setErrorMessage('Preencha todos os campos.');
        return;
      }

      try {
        const response = await api.post('/users', { code: userCode, email, password });

        if (response.data && response.data.code) {
          localStorage.setItem('session', userCode);
          history.push('/pontos');
        } else {
          setErrorMessage('Erro ao registrar o usuário. Tente novamente mais tarde.');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Erro ao registrar o usuário. Tente novamente mais tarde.');
        }
      }
    } else {
      if (!userCode || !password) {
        setErrorMessage('Preencha todos os campos.');
        return;
      }

      try {
        const response = await api.get('/users');

        const users = response.data;
        const user = users.find((user: { code: string, password: string }) => user.code === userCode && user.password === password);

        if (user) {
          localStorage.setItem('session', userCode);
          history.push('/pontos');
        } else {
          setErrorMessage('Código ou senha incorretos.');
        }
      } catch (error) {
        setErrorMessage('Erro ao verificar o usuário. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <Container>
      <InputContainer>
        <h1 className='logo'>Ponto <span>Ilumeo</span></h1>
        <div className='divInput'>
          <span>Código do usuário</span>
          <input
            type="text"
            placeholder=""
            value={userCode}
            onChange={(e) => handleInputChange(e, setUserCode)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className='divInput'>
          <span>Senha</span>
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            onKeyPress={handleKeyPress}
          />
        </div>
        {isRegister && (
          <div className='divInput'>
            <span>Email</span>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              onKeyPress={handleKeyPress}
            />
          </div>
        )}
        <Button onClick={handleSubmit}>{isRegister ? 'Registrar' : 'Confirmar'}</Button>
        <Button className='registro' onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Voltar ao Login' : 'Registrar'}
        </Button>
      </InputContainer>
      {errorMessage && <p>{errorMessage}</p>}
    </Container>
  );
};

export default Login;
