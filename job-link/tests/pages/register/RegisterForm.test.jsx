import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import RegisterForm from '../../../src/pages/register/RegisterForm';
import { MemoryRouter } from 'react-router-dom';

describe('Register functionality', () => {
  it('should render the register form', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading');
    const usernameInput = screen.getByPlaceholderText('Username');
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const signUpButton = screen.getByRole('button', { name: /sign up/i });

    expect(heading).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });
});