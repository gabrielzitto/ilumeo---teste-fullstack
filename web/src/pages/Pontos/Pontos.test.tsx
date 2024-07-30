import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Pontos from './index';
import api from '../../services/api';

// Mock do serviço API
jest.mock('../../services/api');

describe('Pontos Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Pontos component with title and user information', async () => {
    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/points/today/')) {
        return Promise.resolve({ data: { hours: '8', minutes: '30', trabalhando: true } });
      }
      if (url.includes('/points/history/')) {
        return Promise.resolve({ data: [{ id: '1', date: '2023-07-29', hours: 8, minutes: 30 }] });
      }
      return Promise.reject(new Error('not found'));
    });

    const history = createMemoryHistory();
    localStorage.setItem('session', '1234');

    await act(async () => {
      render(
        <Router history={history}>
          <Pontos />
        </Router>
      );
    });

    expect(screen.getByText('Relógio de ponto')).toBeInTheDocument();
    expect(screen.getByText('#1234')).toBeInTheDocument();
    expect(screen.getByText('Usuário')).toBeInTheDocument();
  });

  it('should render today\'s work time correctly', async () => {
    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/points/today/')) {
        return Promise.resolve({ data: { hours: '8', minutes: '30', trabalhando: true } });
      }
      if (url.includes('/points/history/')) {
        return Promise.resolve({ data: [{ id: '1', date: '2023-07-29', hours: 8, minutes: 30 }] });
      }
      return Promise.reject(new Error('not found'));
    });

    const history = createMemoryHistory();
    localStorage.setItem('session', '1234');

    await act(async () => {
      render(
        <Router history={history}>
          <Pontos />
        </Router>
      );
    });

    await waitFor(() => {
      const workTimeElements = screen.getAllByText('8h 30m');
      expect(workTimeElements.length).toBeGreaterThan(0);
      expect(screen.getByText('Horas de hoje')).toBeInTheDocument();
    });
  });

  it('should render history correctly', async () => {
    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/points/today/')) {
        return Promise.resolve({ data: { hours: '8', minutes: '30', trabalhando: true } });
      }
      if (url.includes('/points/history/')) {
        return Promise.resolve({ data: [{ id: '1', date: '2023-07-29', hours: 8, minutes: 30 }] });
      }
      return Promise.reject(new Error('not found'));
    });

    const history = createMemoryHistory();
    localStorage.setItem('session', '1234');

    await act(async () => {
      render(
        <Router history={history}>
          <Pontos />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Dias anteriores')).toBeInTheDocument();
      expect(screen.getByText('2023-07-29')).toBeInTheDocument();
      const historyTimeElements = screen.getAllByText('8h 30m');
      expect(historyTimeElements.length).toBeGreaterThan(0);
    });
  });

  it('should handle button click to register time', async () => {
    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/points/today/')) {
        return Promise.resolve({ data: { hours: '8', minutes: '30', trabalhando: false } });
      }
      if (url.includes('/points/history/')) {
        return Promise.resolve({ data: [{ id: '1', date: '2023-07-29', hours: 8, minutes: 30 }] });
      }
      return Promise.reject(new Error('not found'));
    });

    (api.post as jest.Mock).mockResolvedValue({});

    const history = createMemoryHistory();
    localStorage.setItem('session', '1234');

    await act(async () => {
      render(
        <Router history={history}>
          <Pontos />
        </Router>
      );
    });

    const button = screen.getByText('Hora de entrada');
    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/points', { user_code: '1234' });
    });
  });
});
