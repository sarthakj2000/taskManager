import React, { useState, useEffect } from 'react';
import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent
} from '../../context/contact/ContactState';
import {
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  Box,
  Typography
} from '@mui/material';

const initialContact = {
  name: '',
  email: '',
  phone: '',
  type: 'pending'
};

const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();
  const { current } = contactState;
  const [contact, setContact] = useState(initialContact);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contactDispatch, contact).then(() =>
        setContact(initialContact)
      );
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

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
        <Typography variant='h5' component='h2' gutterBottom>
          {current ? 'Edit Task' : 'Add Task'}
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label='Task'
            variant='outlined'
            name='name'
            value={name}
            onChange={onChange}
            margin='normal'
            required
          />
          <TextField
            fullWidth
            label='Assigned To'
            variant='outlined'
            type='text'
            name='email'
            value={email}
            onChange={onChange}
            margin='normal'
            required
          />
          <TextField
            fullWidth
            label='Created By'
            variant='outlined'
            name='phone'
            value={phone}
            onChange={onChange}
            margin='normal'
            required
          />
          <FormLabel component='legend'>Task Status</FormLabel>
          <RadioGroup row name='type' value={type} onChange={onChange}>
            <FormControlLabel
              value='pending'
              control={<Radio />}
              label='Pending'
            />
            <FormControlLabel
              value='completed'
              control={<Radio />}
              label='Completed'
            />
          </RadioGroup>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            {current ? 'Update Task' : 'Add Task'}
          </Button>
          {current && (
            <Button
              variant='outlined'
              color='secondary'
              fullWidth
              sx={{ mt: 2 }}
              onClick={clearAll}
            >
              Clear
            </Button>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default ContactForm;
