import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@mui/material';
import { getCustomers, putCustomer, postCustomer, deleteCustomer } from '../api/customers';
import CustomerGrid from '../components/CustomerGrid';
import CustomerDialog from '../components/CustomerDialog';
import { Customer } from '../api/types';
import { getTrainings } from '../api/trainings';
import CustomerDrawer from '../components/CustomerDrawer';

export default function CustomersPage() {
    
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
            self: {href: ''},
            trainings: {href: ''}
        }
    }

    const [selectedCustomer, setSelectedCustomer] = useState(emptyCustomer);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const { data: customerData, isLoading: customersLoading } = useQuery({queryKey: ['customers'], queryFn: getCustomers});
    const customers = customerData?._embedded?.customers ?? [];
    const queryClient = useQueryClient();

    const { data: trainingsData, isLoading: trainingsLoading, error: trainingsError } = useQuery({
        queryKey: ['trainings', selectedCustomer?._links.trainings.href], 
        queryFn: () => {
            if (!selectedCustomer?._links.trainings.href) {
                return;
            }

            return getTrainings(selectedCustomer._links.trainings.href);
        }, enabled: !!selectedCustomer?._links.trainings.href && openDrawer
    });
    const trainings = trainingsData?._embedded?.trainings ?? [];

    const refreshCustomers = async () => {
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
        
        refreshCustomers();
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
            refreshCustomers();
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
            isLoading={customersLoading}
            onRowClicked={(customer) => {
                setSelectedCustomer(customer)
                setOpenDrawer(true)
            }}
            onRowSelected={(customer) => setSelectedCustomer(customer)}
        />
        <Button onClick={() => setOpenDrawer(true)}>Open Drawer</Button>
        <CustomerDrawer
            anchor={"right"}
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            customer={selectedCustomer}
            trainings={trainings}
            isLoading={trainingsLoading}
            error={trainingsError}
        />
        </>
    )
}