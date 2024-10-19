import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';

const CreateEntry = () => {
  const [newEntry, setNewEntry] = useState({
    CheckNO: '',
    checkDate: '',
    checkCode: '',
    checkAmount: '',
    checkDescription: '',
    checkUserDef1: '',
    checkUserDef2: ''
  });
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    // Check if the check number already exists
    axios.get(`http://127.0.0.1:8000/chkreg/${newEntry.CheckNO}`)
      .then(response => {
        if (response.data) {
          setSnackbarMessage('Check number already exists');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        } else {
          setOpen(true);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setOpen(true); // Check number does not exist, proceed to open confirmation dialog
        } else {
          console.error(error);
          setSnackbarMessage('Failed to validate check number');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const createEntry = () => {
    axios.post('http://127.0.0.1:8000/chkreg', newEntry)
      .then(response => {
        console.log(response.data);
        setSnackbarMessage('Entry successfully created');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setNewEntry({
          CheckNO: '',
          checkDate: '',
          checkCode: '',
          checkAmount: '',
          checkDescription: '',
          checkUserDef1: '',
          checkUserDef2: ''
        });
        handleClose();
      })
      .catch(error => {
        console.error(error);
        setSnackbarMessage('Failed to create entry');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  return (
    <Container>
      <Typography variant="h4">Create New Entry</Typography>
      {Object.keys(newEntry).map(key => (
        <TextField
          key={key}
          label={key}
          name={key}
          value={newEntry[key]}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      ))}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>Create Entry</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Create"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to create this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createEntry} color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateEntry;