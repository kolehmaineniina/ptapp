import{ AppBar, Autocomplete, Box, Button, ButtonGroup, Stack, TextField, Toolbar, Typography} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Customer } from '../types';
import { BarChart, HomeFilled } from '@mui/icons-material';
import { CalendarIcon } from '@mui/x-date-pickers';
import { size } from 'lodash';

export default function AppBarNav(
  {customers}: {customers: Customer[]}
) {

  const navigate = useNavigate();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" justifyContent='space-between' sx={{height:60,width: '100%', mx: 4}} alignItems="center">
          <ButtonGroup variant='text' >
            <Button size="large" startIcon={<HomeFilled/>} color="inherit" component={NavLink} to="/" />
            <Button size="large" color="inherit" startIcon={<BarChart/>} component={NavLink} to="/stats" />
            <Button size="large" color="inherit" startIcon={<CalendarIcon/>} component={NavLink} to="/calendar" />
          </ButtonGroup>
          <Stack spacing={2} direction="row" alignItems="center">
          <Typography sx={{ lineHeight: 1, px: 1, fontWeight: 700, fontSize: "1.1em", textTransform: "uppercase"}}>PT App</Typography>
            <Autocomplete
              sx={{ width: 250, bgcolor: "whitesmoke", borderRadius: 2, m: 1 }}
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