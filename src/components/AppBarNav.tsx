import{ AppBar, Autocomplete, Button, Stack, TextField, Toolbar, Typography} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Customer } from '../types';
import { HomeFilled } from '@mui/icons-material';
import { CalendarIcon } from '@mui/x-date-pickers';

export default function AppBarNav(
  {customers}: {customers: Customer[]}
) {

  const navigate = useNavigate();
  
  return (
    <AppBar position="static">
    <Toolbar>
      <Stack direction="row" justifyContent='space-between' sx={{height: '8vh',width: '100%', mx: 4}} alignItems="center">
        <Button size="large" startIcon={<HomeFilled/>} color="inherit" component={NavLink} to="/">
          <Typography variant='h6' sx={{ lineHeight: 1, px: 1 }}>PT App</Typography>
        </Button>
        <Stack direction="row">
          <Button size="large" color="inherit" startIcon={<CalendarIcon/>} component={NavLink} to="/calendar" />
          <Autocomplete
            sx={{ width: 250, bgcolor: "white", borderRadius: 2 }}
            options = {customers}
            getOptionLabel={(customer) => `${customer.firstname} ${customer.lastname}`}
            onChange={(_event, value) => {
              if (value?.id) {
                navigate(`/customers/${value.id}`);
              }
            }}
            renderInput={(params) => (
            <TextField {...params} label="Find customer" size='small'/>
            )}
          />
        </Stack>
      </Stack>
    </Toolbar>
  </AppBar>
  )
}