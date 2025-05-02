import { Dialog, DialogContent, DialogActions, Button, TextField} from '@mui/material';
import { Customer } from '../assets/types';

export default function CustomerDialog(props: {
    open: boolean;
    onClose: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (customer: Customer) => void;
    customer: Customer;
}) {

    return (
        <div>
            <Dialog 
                open={props.open} 
                onClose={props.onClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            props.onSubmit(props.customer);
                        }
                        
                    }
                }}
            >
                <DialogContent>
                <TextField
                    autoFocus
                    required
                    label="First Name"
                    name="firstname"
                    type="text"
                    value={props.customer.firstname}
                    onChange={props.onChange}
                    margin="dense"
                />
                <TextField
                    required
                    label="Last Name"
                    name="lastname"
                    type="text"
                    value={props.customer.lastname}
                    onChange={props.onChange}
                    margin="dense"
                />
                <TextField
                    required
                    label="Phone"
                    name="phone"
                    type="text"
                    value={props.customer.phone}
                    onChange={props.onChange}
                    margin="dense"
                />
                <TextField
                    required
                    label="Email"
                    name="email"
                    type="text"
                    value={props.customer.email}
                    onChange={props.onChange}
                    margin="dense"
                />
                <TextField
                    required
                    label="Street Address"
                    name="streetaddress"
                    type="text"
                    value={props.customer.streetaddress}
                    onChange={props.onChange}
                    margin="dense"
                />
                <TextField
                    required
                    label="Zip Code"
                    name="postcode"
                    type="text"
                    value={props.customer.postcode}
                    onChange={props.onChange}
                    margin="dense"
                />
                <TextField
                    required
                    label="City"
                    name="city"
                    type="text"
                    value={props.customer.city}
                    onChange={props.onChange}
                    margin="dense"
                />                   
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained">Save</Button>
                    <Button onClick={props.onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
        
    );
};