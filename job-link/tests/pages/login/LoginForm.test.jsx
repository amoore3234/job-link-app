import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import LoginForm from '../../../src/pages/login/LoginForm';

describe('Login functionality', () => {
  it('should render the login form', () => {
    render(
      <LoginForm />
    );

    const heading = screen.getByRole('heading');
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(heading).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});