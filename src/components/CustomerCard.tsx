import { Card, CardContent, Typography, TextField, CardActions, CardHeader, Avatar, Stack } from "@mui/material";
import Grid from '@mui/material/Grid';

import { Customer } from "../types";
import { ReactNode } from "react";

export default function CustomerCard({ customer, onChange, editable, actions }: { 
    customer: Customer;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    editable: boolean;
    actions: ReactNode;
    /*CardContent: ReactNode*/
}) {

    const variant: 'outlined' | 'filled' = editable ? 'outlined' : 'filled';

    const fieldProps = {
        fullWidth: true,
        variant: variant,
        onChange: onChange,
        slotProps: {
            input: {
                readOnly: !editable,
            },
        }
    };

    return (
        <Card>
            <Stack direction="row" justifyContent="space-between">
            <CardHeader
                avatar={
                    <Avatar sx={{ width: 80, height: 80, bgcolor: "crimson" }}>
                    {customer.firstname.charAt(0)}{customer.lastname.charAt(0)}
                    </Avatar>
                }
                title={
                    <Typography textTransform="uppercase" variant="h6">
                    {customer.firstname} {customer.lastname}
                    </Typography>
                }
                subheader={
                    <Typography textTransform="uppercase" variant="caption">
                    ID: {customer.id}
                    </Typography>
                }
                />
            <CardActions>
                {actions}
            </CardActions>
            </Stack>

            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField label="First Name" name="firstname" value={customer.firstname} {...fieldProps} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField label="Last Name" name="lastname" value={customer.lastname} {...fieldProps} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField label="Email" name="email" value={customer.email} {...fieldProps} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField label="Phone" name="phone" value={customer.phone} {...fieldProps} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 8 }}>
                        <TextField label="Street Address" name="streetaddress" value={customer.streetaddress} {...fieldProps} />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 2 }}>
                        <TextField label="Postcode" name="postcode" value={customer.postcode} {...fieldProps} />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 2 }}>
                        <TextField label="City" name="city" value={customer.city} {...fieldProps} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}