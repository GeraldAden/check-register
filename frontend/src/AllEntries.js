import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const AllEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/chkreg')
      .then(response => setEntries(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Typography variant="h4">All Entries</Typography>
      <List>
        {entries.map(entry => (
          <ListItem key={entry.CheckNO}>
            <ListItemText primary={entry.CheckNO} secondary={entry.checkDescription} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AllEntries;