import{ AppBar, Autocomplete, Button, TextField, Toolbar} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Customer } from '../assets/types';
import { HomeFilled } from '@mui/icons-material';

export default function AppBarNav(
  {customers}: {customers: Customer[]}
) {

  const navigate = useNavigate();
  
  return (
    <AppBar position="static">
    <Toolbar sx={{display: 'flex', justifyContent: 'space-between', mx: 2}}>
      <Button size="large" endIcon={<HomeFilled/>} color="inherit" component={NavLink} to="/">PT App</Button>
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
    </Toolbar>
  </AppBar>
  )
}