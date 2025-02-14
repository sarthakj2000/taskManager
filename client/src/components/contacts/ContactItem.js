import React from 'react';
import PropTypes from 'prop-types';
import {
  useContacts,
  deleteContact,
  setCurrent,
  clearCurrent
} from '../../context/contact/ContactState';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactItem = ({ contact }) => {
  const contactDispatch = useContacts()[1];
  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>{name}</Typography>
          <Chip
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            color={type === 'professional' ? 'success' : 'primary'}
          />
        </Box>
        <Box mt={2}>
          {email && (
            <Typography variant='body2'>Assiged to: {email}</Typography>
          )}
          {phone && (
            <Typography variant='body2'>Created By: {phone}</Typography>
          )}
        </Box>
        <Box mt={2} display='flex' justifyContent='flex-end'>
          <IconButton
            color='primary'
            onClick={() => setCurrent(contactDispatch, contact)}
          >
            <EditIcon />
          </IconButton>
          <IconButton color='error' onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
