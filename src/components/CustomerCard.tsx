import { Card, CardContent, Typography, TextField, Stack } from "@mui/material";
import { Customer } from "../api/types";

export default function CustomerCard({ customer, onChange }: { 
    customer: Customer;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>Customer Information</Typography>
                <Stack spacing={2}>
                <Typography>{customer.firstname} {customer.lastname}, id: {customer.id}</Typography>
                    <TextField
                        label="First Name"
                        name="firstname"
                        value={customer.firstname}
                        onChange={onChange}
                    />
                    <TextField
                        label="Last Name"
                        name="lastname"
                        value={customer.lastname}
                        onChange={onChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={onChange}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        onChange={onChange}
                    />
                    <TextField
                        label="Street Address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={onChange}
                    />
                    <TextField
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={onChange}
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={onChange}
                    />
                    </Stack>
                </CardContent>
            </Card>
    )
}