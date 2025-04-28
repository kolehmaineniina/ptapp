import { Card, CardContent, Typography, TextField, Stack, CardActions } from "@mui/material";
import { Customer } from "../api/types";
import { ReactNode } from "react";

export default function CustomerCard({ customer, onChange, editable, actions }: { 
    customer: Customer;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    editable: boolean;
    actions: ReactNode;
    /*CardContent: ReactNode*/
}) {

    const fieldProps = {
        onChange: onChange,
        slotProps: {
            input: {
                readOnly: !editable,
            },
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>Customer Information</Typography>
                <Stack spacing={2}>
                <Typography>{customer.firstname} {customer.lastname}, id: {customer.id}</Typography>
                    <>
                        <TextField
                            label="First Name"
                            name="firstname"
                            value={customer.firstname}
                            onChange={onChange}
                            inputProps={{readOnly: !editable}}
                        />
                        <TextField
                            label="Last Name"
                            name="lastname"
                            value={customer.lastname}
                            {...fieldProps}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={customer.email}
                            {...fieldProps}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={customer.phone}
                            {...fieldProps}
                        />
                        <TextField
                            label="Street Address"
                            name="streetaddress"
                            value={customer.streetaddress}
                            {...fieldProps}
                        />
                        <TextField
                            label="Postcode"
                            name="postcode"
                            value={customer.postcode}
                            {...fieldProps}
                        />
                        <TextField
                            label="City"
                            name="city"
                            value={customer.city}
                            {...fieldProps}
                        />                 
                    </>
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                    {actions}
                </CardActions>
            </Card>
    )
}