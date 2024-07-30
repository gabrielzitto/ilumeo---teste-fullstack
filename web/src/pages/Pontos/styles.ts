import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #151F2B;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  
  
`;
export const HourContainer = styled.div`
  width: 365px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #151F2B;
  height: 100vh;
  margin: 2rem 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;

  .headerMain {
    display: flex;
    justify-content: space-between;
    width: 100%;
    
    h1 {
      margin: 0;
      font-family: Montserrat;
      font-size: 21.52px;
      font-weight: 400;
      line-height: 26.23px;
      color:#FFFFFF;
    }

    .userInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-end; 
    }

    .userCode {
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 300;
      line-height: 17.07px;
      color:#FFFFFF;
    }

    .userName {
      font-family: Montserrat;
      font-size: 12px;
      font-weight: 300;
      line-height: 14.63px;
      text-align: center;
      color:#CFCFCF;
    }
  }
`;


export const WorkTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 48px;
    font-weight: 700;
    color:#FFFFFF;
  }

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 300;
    line-height: 17.07px;
    color:#FFFFFF;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #ff8c00;
  color: #1E2733;
  font-weight: bold;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.5px;
  text-align: center;

  cursor: pointer;
  width: 100%;
  height: 47px;

  &:hover {
    opacity: 0.8;
  }
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h3 {
    margin: 20px 0 10px 0;
    font-size: 18px;
    font-weight: 400;
    color:#FFFFFF;
    width:100%;
  }

  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    background-color: #2c2c2c;
    margin-bottom: 10px;
    border-radius: 4px;

    span {
      font-size: 16px;
    }
  }

  .dateHistory {
    color: #FFFFFF;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 700;
    line-height: 14.63px;
    text-align: center;

  }


  .timeHistory {
    color: #FFFFFF;
    font-weight: bold;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 700;
    line-height: 14.63px;
    text-align: center;

  }
`;
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
    background: #ff8c00;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const Select = styled.select`
  margin-right: 10px;
  background: #ff8c00;
`;