import{ AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function AppBarNav() {
  return (
    <Box>
      <AppBar position='fixed'>
        <Toolbar
          sx={{
            '& .MuiButton-root': {
              color: 'white',
            },
          }}
        >
          <Typography variant='h5' >
            Persomal Trainer App
          </Typography>
          <Button component={NavLink} to="/">Home</Button>
          <Button component={NavLink} to="/customers">Customers</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  )
}