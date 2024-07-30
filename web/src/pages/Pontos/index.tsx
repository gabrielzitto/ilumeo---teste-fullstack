import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { HourContainer, Container, Header, WorkTime, Button, History, Pagination, Select } from './styles';

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

const Pontos: React.FC = () => {
  const [workTime, setWorkTime] = useState<IWorkTime | null>(null);
  const [historyItems, setHistoryItems] = useState<IHistoryItem[]>([]);
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
    }
  }, [userCode, history, page, itemsPerPage]);

  const fetchWorkTime = async () => {
    if (userCode) {
      const response = await api.get(`/points/today/${userCode}`);
      setWorkTime(response.data);
    }
  };

  const fetchHistory = async (page: number, perPage: number) => {
    if (userCode) {
      const response = await api.get(`/points/history/${userCode}/paginated`, {
        params: { page, per_page: perPage }
      });
      setHistoryItems(response.data.data);
      setTotalPages(response.data.total_pages);
    }
  };

  const handleButtonClick = async () => {
    if (userCode) {
      try {
        await api.post('/points', { user_code: userCode });
        await fetchWorkTime();
        await fetchHistory(page, itemsPerPage);
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

  return (
    <Container>
      <HourContainer>
        <Header>
          <div className='headerMain'>
            <h1>Relógio de ponto</h1>
            <div>
              <div className='userCode'>#{userCode}</div>
              <div className='userName'>Usuário</div>
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
