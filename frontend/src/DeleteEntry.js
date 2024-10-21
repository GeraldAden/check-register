import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';

const DeleteRecord = () => {
  const [checkNo, setCheckNo] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  const deleteRecord = () => {
    axios.delete(`${apiUrl}/chkreg/${checkNo}`)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Typography variant="h4">Delete Record</Typography>
      <TextField label="CheckNO" value={checkNo} onChange={e => setCheckNo(e.target.value)} />
      <Button variant="contained" onClick={deleteRecord}>Delete Record</Button>
    </Container>
  );
};

export default DeleteRecord;