import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@mui/material';
import { fetchCustomers } from '../api/customers';
import CustomerGrid from '../components/Customers/CustomerGrid';
import CustomerDialog from '../components/Customers/CustomerDialog';
import { Customer } from '../api/types';

export default function CustomersPage() {
   
    const emptyCustomer: Customer = {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        streetaddress: '',
        postcode: '',
        city: '',
        _links: {
            self: {href: ''}
        }
    }

    const [selectedCustomer, setSelectedCustomer] = useState(emptyCustomer);

    const handleDelete = (customer: Customer) => {
        console.log("Delete:", customer);
      };
      
    const handleEdit = (customer: Customer) => {
        console.log("Edit:", customer);
    };

    const [open, setOpen] = useState(false);
    const { data, isLoading, error, isSuccess } = useQuery({queryKey: ['customers'], queryFn: fetchCustomers});
    const customers = data?._embedded?.customers ?? [];

    return (
        <>
        <h2>Customers</h2>
        <Button onClick={() => setOpen(true)}>Add Customer</Button>
        <CustomerDialog 
            open={open}
            onClose={() => setOpen(false)}
            customer={selectedCustomer}
        />
        { isLoading && <p>Loading customers...</p> }
        { error && <p>Error loading customers: Error (error as Error)?.message</p> }
        { isSuccess && 
            <CustomerGrid 
                customers={customers}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />}
        </>
    )
}