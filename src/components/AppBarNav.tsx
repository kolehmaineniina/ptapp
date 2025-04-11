import{ AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function AppBarNav() {
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Button component={NavLink} to="/">Home</Button>
          <Button component={NavLink} to="/customers">Customers</Button>
          <Button component={NavLink} to="/trainings">Trainings</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}