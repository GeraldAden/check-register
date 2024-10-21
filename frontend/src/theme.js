// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green color similar to US paper currency
    },
    secondary: {
      main: '#388E3C', // Darker green for secondary color
    },
  },
});

export default theme;