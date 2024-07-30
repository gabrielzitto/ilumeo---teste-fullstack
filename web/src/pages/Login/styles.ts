import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1c1c1c;
  color: #fff;

  .logo {
    margin-bottom: 20px;
    font-family: Montserrat;
    font-size: 21.52px;
    font-weight: 400;
    line-height: 26.23px;
    color: #CFCFCF;
  }

  .logo span {
    font-family: Montserrat;
    font-size: 21.52px;
    font-weight: 800;
    line-height: 26.23px;

  }

  p {
    margin-top: 20px;
    color: #ff4b5b;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    width:100%;
    text-align: left;
    margin-bottom: 2rem;
  }

  .divInput {
    position: relative;

    span {
      position: absolute;
      top: 7px;
      left: 10px;
      font-family: Montserrat;
      font-size: 12px;
      font-weight: 300;
      line-height: 14.63px;
      text-align: center;

    }
  }

  input {
    padding: 25px 10px 10px 10px;
    color: #FFFFFF;
    font-weight: bold; 
    margin-bottom: 20px;
    border: none;
    border-radius: 4px;
    width: 365px;
    height: 60px;
    font-size: 16px;
    background: #1E2733;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #ff8c00;
  color: black;
  font-weight: bold; 
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  height: 45px;
  margin-bottom: 10px;

  &:hover {
    opacity: 0.8;
  }
`;
