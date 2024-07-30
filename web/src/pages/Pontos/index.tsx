import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { HourContainer, Container, Header, WorkTime, Button, History, Pagination, Select, BankOfHours } from './styles';

interface IWorkTime {
  hours: string;
  minutes: string;
  trabalhando: boolean;
}

interface IHistoryItem {
  id: string;
  date: string;
  hours: number;
  minutes: number;
}

/* interface IBankOfHours {
  balance: string;
} */

const Pontos: React.FC = () => {
  const [workTime, setWorkTime] = useState<IWorkTime | null>(null);
  const [historyItems, setHistoryItems] = useState<IHistoryItem[]>([]);
  const [bankOfHours, setBankOfHours] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const userCode = localStorage.getItem('session');
  const history = useHistory();

  useEffect(() => {
    if (!userCode) {
      history.push('/');
    } else {
      fetchWorkTime();
      fetchHistory(page, itemsPerPage);
      fetchBankOfHours();
    }
  }, [userCode, history, page, itemsPerPage]);

  const fetchWorkTime = async () => {
    if (userCode) {
      try {
        const response = await api.get(`/points/today/${userCode}`);
        setWorkTime(response.data);
      } catch (error) {
        console.error('Erro ao buscar horas de trabalho:', error);
      }
    }
  };

  const fetchHistory = async (page: number, perPage: number) => {
    if (userCode) {
      try {
        const response = await api.get(`/points/history/${userCode}/paginated`, {
          params: { page, per_page: perPage }
        });
        setHistoryItems(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      }
    }
  };

  const fetchBankOfHours = async () => {
    if (userCode) {
      try {
        console.log(`Fetching bank of hours for user_code: ${userCode}`); 
        const response = await api.get('/bancodehoras', {
          params: { user_code: userCode, daily_hours: '06:00' }
        });
        console.log('Bank of hours response:', response.data);  
        setBankOfHours(response.data.balance);
      } catch (error) {
        console.error('Erro ao buscar banco de horas:', error);
      }
    }
  };

  const handleButtonClick = async () => {
    if (userCode) {
      try {
        await api.post('/points', { user_code: userCode });
        await fetchWorkTime();
        await fetchHistory(page, itemsPerPage);
        await fetchBankOfHours();
      } catch (error) {
        console.error('Erro ao registrar a hora:', error);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('session');
    history.push('/');
  };

  return (
    <Container>
      <HourContainer>
        <Header>
          <div className='headerMain'>
            <h1>Relógio de ponto</h1>
            <div className='menu'>
              <div>
                <div className='userCode'>#{userCode}</div>
                <div className='userName'>Usuário</div>
              </div>
              <button className='sair' onClick={handleLogout}>sair</button>
            </div>
          </div>
        </Header>
        <WorkTime>
          <h2>{workTime ? `${workTime.hours}h ${workTime.minutes}m` : '0h 0m'}</h2>
          <p>Horas de hoje</p>
        </WorkTime>
        <Button onClick={handleButtonClick}>
          {workTime?.trabalhando ? 'Hora de saída' : 'Hora de entrada'}
        </Button>
        <BankOfHours>
          <h3>Banco de Horas</h3>
          <p>{bankOfHours || '0h 0m'}</p>
        </BankOfHours>
        <History>
          <h3>Dias anteriores</h3>
          {historyItems.map(item => (
            <div key={item.id}>
              <span className='dateHistory'>{item.date}</span>
              <span className='timeHistory'>{item.hours}h {item.minutes}m</span>
            </div>
          ))}
        </History>
        <Pagination>
          <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Select>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={pageNumber === page}
            >
              {pageNumber}
            </button>
          ))}
        </Pagination>
      </HourContainer>
    </Container>
  );
};

export default Pontos;
