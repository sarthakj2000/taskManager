import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, clearErrors, login } from '../../context/auth/AuthState';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, authDispatch, setAlert]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login(authDispatch, { email, password });
    }
  };

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Account <span style={{ color: '#3f51b5' }}>Login</span>
        </Typography>
        <form onSubmit={onSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label='Email Address'
              variant='outlined'
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label='Password'
              variant='outlined'
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </Box>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
