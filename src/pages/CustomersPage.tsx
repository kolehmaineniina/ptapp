import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Drawer } from '@mui/material';
import { getCustomers, putCustomer, postCustomer, deleteCustomer } from '../api/customers';
import CustomerGrid from '../components/Customers/CustomerGrid';
import CustomerDialog from '../components/Customers/CustomerDialog';
import { Customer } from '../api/types';

export default function CustomersPage() {
    
    const { data, isLoading } = useQuery({queryKey: ['customers'], queryFn: getCustomers});
    const customers = data?._embedded?.customers ?? [];
    const queryClient = useQueryClient();

    const emptyCustomer: Customer = {
        id:"",
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
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const refreshData = async () => {
       await queryClient.invalidateQueries({ queryKey: ['customers'] });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        
        refreshData();
        setSelectedCustomer(emptyCustomer);
        setOpenDialog(false);
    };

    const handleDelete = async (customer: Customer) => {
        if (!customer._links?.self.href) return;

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        setSelectedCustomer(emptyCustomer);
        deleteCustomer(customer._links.self.href);
        setTimeout(() => {
            refreshData();
          }, 0);
    };


    return (
        <>
        <h2>Customers</h2>

        <Button onClick={() => {
            setSelectedCustomer(emptyCustomer),
            setOpenDialog(true)}}
        >Add Customer
        </Button>

        <CustomerDialog 
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            customer={selectedCustomer}
        />

        <Button
            variant="outlined"
            disabled={!selectedCustomer}
            onClick={() => setOpenDialog(true)}
        >
        Edit
        </Button>

        <Button
            variant="outlined"
            color="error"
            disabled={!selectedCustomer}
            onClick={() => selectedCustomer && handleDelete(selectedCustomer)}
        >
        Delete
        </Button>

        <CustomerGrid 
            customers={customers}
            isLoading={isLoading}
            onRowSelected={(customer) => {
                setSelectedCustomer(customer)
                setOpenDrawer(true)
            }}
        />
        <Button onClick={() => setOpenDrawer(true)}>Open Drawer</Button>
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
        >
            <div style={{ width: 400, padding: "1rem" }}>
                <h2>{selectedCustomer?.firstname} {selectedCustomer?.lastname}'s Trainings</h2>
                <ul>
                    <li>Training 1 (placeholder)</li>
                    <li>Training 2 (placeholder)</li>
                    <li>Training 3 (placeholder)</li>
                </ul>
                <Button onClick={() => setOpenDrawer(false)} variant="outlined" style={{ marginTop: "1rem" }}>
                Close
                </Button>
            </div>
        </Drawer>
        </>
    )
}