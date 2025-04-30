import{ AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function AppBarNav() {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        PT App
      </Typography>
      <Button color="inherit" component={NavLink} to="/">Home</Button>
          <Button color="inherit" component={NavLink} to="/customers">Customers</Button>
    </Toolbar>
  </AppBar>
  )
}