import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const AllEntries = () => {
  const [allEntries, setAllEntries] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchAllEntries();
  }, []);

  const fetchAllEntries = () => {
    axios.get(`http://127.0.0.1:8000/chkreg`)
      .then(response => setAllEntries(response.data))
      .catch(error => {
        console.error(error);
        setSnackbarMessage('Failed to fetch all entries');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: 'CheckNO', headerName: 'CheckNO', width: 150 },
    { field: 'checkDate', headerName: 'Check Date', width: 150 },
    { field: 'checkCode', headerName: 'Check Code', width: 150 },
    { field: 'checkAmount', headerName: 'Check Amount', width: 150 },
    { field: 'checkDescription', headerName: 'Check Description', width: 200 },
    { field: 'checkUserDef1', headerName: 'User Defined 1', width: 150 },
    { field: 'checkUserDef2', headerName: 'User Defined 2', width: 150 },
  ];

  return (
    <div>
      <Typography variant="h4">All Entries</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
          rows={allEntries} 
          columns={columns} 
          pageSize={5} 
          rowsPerPageOptions={[5]} 
          getRowId={(row) => row.CheckNO} 
        />
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AllEntries;