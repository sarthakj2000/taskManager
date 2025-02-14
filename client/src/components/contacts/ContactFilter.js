import React from 'react';
import { TextField, Box } from '@mui/material';
import {
  useContacts,
  filterContacts,
  clearFilter
} from '../../context/contact/ContactState';

const ContactFilter = () => {
  const contactDispatch = useContacts()[1];

  const onChange = (e) => {
    if (e.target.value !== '') {
      filterContacts(contactDispatch, e.target.value);
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label='Filter Tasks'
        variant='outlined'
        onChange={onChange}
      />
    </Box>
  );
};

export default ContactFilter;
