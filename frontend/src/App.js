import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import AllEntries from './AllEntries';
import SingleEntry from './SingleEntry';
import CreateEntry from './CreateEntry';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Check Registry
          </Typography>
          <Button color="inherit" component={Link} to="/">All Entries</Button>
          <Button color="inherit" component={Link} to="/single">Single Entry</Button>
          <Button color="inherit" component={Link} to="/create">Create Entry</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<AllEntries />} />
          <Route path="/single" element={<SingleEntry />} />
          <Route path="/create" element={<CreateEntry />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;