import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Login from './index';
import api from '../../services/api';

jest.mock('../../services/api');

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form', () => {
    render(<Login />);
    expect(screen.getByText('Ponto')).toBeInTheDocument();
    expect(screen.getByText('Código do usuário')).toBeInTheDocument();
  });

  it('should display error message if user does not exist', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [] });
    render(<Login />);
    
    fireEvent.change(screen.getAllByPlaceholderText('')[0], { target: { value: 'invalidUser' } });
    fireEvent.change(screen.getAllByPlaceholderText('')[1], { target: { value: 'invalidPassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }));
    
    expect(await screen.findByText('Código ou senha incorretos.')).toBeInTheDocument();
  });

  it('should navigate to /pontos if user exists', async () => {
    const history = createMemoryHistory();
    (api.get as jest.Mock).mockResolvedValue({
      data: [
        { code: 'validUser', password: 'validPassword' }
      ]
    });
    
    render(
      <Router history={history}>
        <Login />
      </Router>
    );
    
    fireEvent.change(screen.getAllByPlaceholderText('')[0], { target: { value: 'validUser' } });
    fireEvent.change(screen.getAllByPlaceholderText('')[1], { target: { value: 'validPassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }));
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/pontos');
    });
  });
});
