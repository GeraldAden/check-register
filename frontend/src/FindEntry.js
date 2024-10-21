import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, List, ListItem, Snackbar, Alert, Divider, Paper, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
  const [view, setView] = useState('get'); // State to manage which form is displayed

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchEntry = () => {
    axios.get(`${apiUrl}/chkreg/${checkNo}`)
      .then(response => setEntry(response.data))
      .catch(error => {
        console.error(error);
        setSnackbarMessage('Entry not found');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const searchByDateRange = () => {
    axios.get(`${apiUrl}/chkreg/date_range`, {
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
    axios.delete(`${apiUrl}/chkreg/${checkNo}`)
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
    axios.put(`${apiUrl}/chkreg/${checkNo}`, entry)
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

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Container>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        aria-label="view selection"
        sx={{ marginBottom: 4 }}
      >
        <ToggleButton value="get" aria-label="get entry">
          Get Entry
        </ToggleButton>
        <ToggleButton value="search" aria-label="search entries">
          Search Entries
        </ToggleButton>
      </ToggleButtonGroup>

      {view === 'get' && (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
          <Typography variant="h4" gutterBottom>Get Entry by CheckNO</Typography>
          <TextField label="CheckNO" value={checkNo} onChange={e => setCheckNo(e.target.value)} fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={fetchEntry} fullWidth>Fetch Entry</Button>
          {entry && (
            <List>
              <ListItem>
                <TextField
                  label="Check Date"
                  name="checkDate"
                  value={entry.checkDate}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Check Code"
                  name="checkCode"
                  value={entry.checkCode}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Check Amount"
                  name="checkAmount"
                  value={entry.checkAmount}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Check Description"
                  name="checkDescription"
                  value={entry.checkDescription}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="User Defined 1"
                  name="checkUserDef1"
                  value={entry.checkUserDef1}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="User Defined 2"
                  name="checkUserDef2"
                  value={entry.checkUserDef2}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </ListItem>
            </List>
          )}
        </Paper>
      )}

      {view === 'search' && (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
          <Typography variant="h4" gutterBottom>Search Entries by Date Range</Typography>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Box>
          <Button variant="contained" color="primary" onClick={searchByDateRange} fullWidth>Search</Button>
          {dateRangeEntries.length > 0 && (
            <List>
              {dateRangeEntries.map(entry => (
                <ListItem key={entry.CheckNO}>
                  <Typography>{`CheckNO: ${entry.CheckNO}, Date: ${entry.checkDate}, Amount: ${entry.checkAmount}`}</Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
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