import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';

const UpdateRecord = () => {
  const [checkNo, setCheckNo] = useState('');
  const [updatedRecord, setUpdatedRecord] = useState({
    CheckNO: '',
    checkDate: '',
    checkCode: '',
    checkAmount: '',
    checkDescription: '',
    checkUserDef1: '',
    checkUserDef2: ''
  });

  const handleChange = (e) => {
    setUpdatedRecord({ ...updatedRecord, [e.target.name]: e.target.value });
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const updateRecord = () => {
    axios.put(`${apiUrl}/chkreg/${checkNo}`, updatedRecord)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Typography variant="h4">Update Record</Typography>
      <TextField label="CheckNO" value={checkNo} onChange={e => setCheckNo(e.target.value)} />
      {Object.keys(updatedRecord).map(key => (
        <TextField
          key={key}
          label={key}
          name={key}
          value={updatedRecord[key]}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      ))}
      <Button variant="contained" onClick={updateRecord}>Update Record</Button>
    </Container>
  );
};

export default UpdateRecord;