import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, List, ListItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';

const FindEntry = () => {
  const [checkNo, setCheckNo] = useState('');
  const [entry, setEntry] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchEntry = () => {
    axios.get(`http://127.0.0.1:8000/chkreg/${checkNo}`)
      .then(response => setEntry(response.data))
      .catch(error => {
        console.error(error);
        setSnackbarMessage('Entry not found');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };

  const handleClose = () => {
    setDeleteOpen(false);
    setUpdateOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const deleteEntry = () => {
    axios.delete(`http://127.0.0.1:8000/chkreg/${checkNo}`)
      .then(response => {
        console.log(response.data);
        setEntry(null); // Clear the entry after deletion
        setCheckNo(''); // Clear the checkNo field
        setSnackbarMessage('Entry successfully deleted');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleClose();
      })
      .catch(error => {
        console.error(error);
        setSnackbarMessage('Failed to delete entry');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const updateEntry = () => {
    axios.put(`http://127.0.0.1:8000/chkreg/${checkNo}`, entry)
      .then(response => {
        console.log(response.data);
        setSnackbarMessage('Entry successfully updated');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleClose();
      })
      .catch(error => {
        console.error(error);
        setSnackbarMessage('Failed to update entry');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4">Get Entry by CheckNO</Typography>
      <TextField label="CheckNO" value={checkNo} onChange={e => setCheckNo(e.target.value)} />
      <Button variant="contained" onClick={fetchEntry}>Fetch Entry</Button>
      {entry && (
        <List>
          <ListItem>
            <TextField
              label="Check Date"
              name="checkDate"
              value={entry.checkDate}
              onChange={handleInputChange}
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Check Code"
              name="checkCode"
              value={entry.checkCode}
              onChange={handleInputChange}
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Check Amount"
              name="checkAmount"
              value={entry.checkAmount}
              onChange={handleInputChange}
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Check Description"
              name="checkDescription"
              value={entry.checkDescription}
              onChange={handleInputChange}
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              label="User Defined 1"
              name="checkUserDef1"
              value={entry.checkUserDef1}
              onChange={handleInputChange}
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              label="User Defined 2"
              name="checkUserDef2"
              value={entry.checkUserDef2}
              onChange={handleInputChange}
              fullWidth
            />
          </ListItem>
          <Button variant="contained" color="primary" onClick={handleUpdateClickOpen}>Update Entry</Button>
          <Button variant="contained" color="secondary" onClick={handleDeleteClickOpen}>Delete Entry</Button>
          <Dialog
            open={deleteOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this entry?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={deleteEntry} color="secondary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={updateOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm Update"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to update this entry?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={updateEntry} color="primary" autoFocus>
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </List>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FindEntry;