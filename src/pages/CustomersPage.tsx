import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@mui/material';
import { getCustomers, putCustomer, postCustomer, deleteCustomer } from '../api/customers';
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
    const [customer, setCustomer] = useState(emptyCustomer);
    const [selectedCustomer, setSelectedCustomer] = useState(emptyCustomer);

    const handleDelete = (customer: Customer) => {
        deleteCustomer;
      };
      
    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
        setOpen(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedCustomer) return;
        setSelectedCustomer({...selectedCustomer, [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async () => {
        if (selectedCustomer?._links?.self?.href) {
           await putCustomer(selectedCustomer);
        } else {
           await postCustomer(selectedCustomer);
        }
        getCustomers();
        setSelectedCustomer(emptyCustomer);
        setOpen(false);
    };

    const [open, setOpen] = useState(false);
    const { data, isLoading, error, isSuccess } = useQuery({queryKey: ['customers'], queryFn: getCustomers});
    const customers = data?._embedded?.customers ?? [];

    return (
        <>
        <h2>Customers</h2>
        <Button onClick={() => {
            setSelectedCustomer(emptyCustomer),
            setOpen(true)}}
        >Add Customer
        </Button>
        <CustomerDialog 
            open={open}
            onClose={() => setOpen(false)}
            onChange={handleChange}
            onSubmit={handleSubmit}
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