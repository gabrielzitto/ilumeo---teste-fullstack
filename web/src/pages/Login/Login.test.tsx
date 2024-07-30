import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Login from './index';
import api from '../../services/api';

// Mock do serviço API
jest.mock('../../services/api');

describe('Login Page', () => {
  it('should render login form', () => {
    render(<Login />);
    expect(screen.getByText('Ponto')).toBeInTheDocument();
    expect(screen.getByText('Código do usuário')).toBeInTheDocument();
  });

  it('should display error message if user does not exist', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { exists: false } });
    render(<Login />);
    
    fireEvent.change(screen.getByPlaceholderText(''), { target: { value: 'invalidUser' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }));
    
    expect(await screen.findByText('Esse usuário não está cadastrado no sistema.')).toBeInTheDocument();
  });

  it('should navigate to /pontos if user exists', async () => {
    const history = createMemoryHistory();
    (api.get as jest.Mock).mockResolvedValue({ data: { exists: true } });
    
    render(
      <Router history={history}>
        <Login />
      </Router>
    );
    
    fireEvent.change(screen.getByPlaceholderText(''), { target: { value: 'validUser' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }));
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/pontos');
    });
  });
});
