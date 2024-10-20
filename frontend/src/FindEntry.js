import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, List, ListItem, Snackbar, Alert } from '@mui/material';
import AllEntries from './AllEntries';

const FindEntry = () => {
  const [checkNo, setCheckNo] = useState('');
  const [entry, setEntry] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateRangeEntries, setDateRangeEntries] = useState([]);

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

  const searchByDateRange = () => {
    axios.get(`http://127.0.0.1:8000/chkreg/date_range`, {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    })
    .then(response => setDateRangeEntries(response.data))
    .catch(error => {
      console.error(error);
      setSnackbarMessage('Failed to fetch entries');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
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
        </List>
      )}

      <Typography variant="h4">Search Entries by Date Range</Typography>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" onClick={searchByDateRange}>Search</Button>
      {dateRangeEntries.length > 0 && (
        <List>
          {dateRangeEntries.map(entry => (
            <ListItem key={entry.CheckNO}>
              <Typography>{`CheckNO: ${entry.CheckNO}, Date: ${entry.checkDate}, Amount: ${entry.checkAmount}`}</Typography>
            </ListItem>
          ))}
        </List>
      )}

      <AllEntries />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FindEntry;