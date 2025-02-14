import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, clearErrors, register } from '../../context/auth/AuthState';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register(authDispatch, { name, email, password });
    }
  };

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Account <span style={{ color: '#1976d2' }}>Register</span>
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label='Name'
            variant='outlined'
            name='name'
            value={name}
            onChange={onChange}
            margin='normal'
            required
          />
          <TextField
            fullWidth
            label='Email Address'
            variant='outlined'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            margin='normal'
            required
          />
          <TextField
            fullWidth
            label='Password'
            variant='outlined'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            margin='normal'
            required
            inputProps={{ minLength: 6 }}
          />
          <TextField
            fullWidth
            label='Confirm Password'
            variant='outlined'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            margin='normal'
            required
            inputProps={{ minLength: 6 }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
