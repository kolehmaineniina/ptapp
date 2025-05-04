import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { putCustomer, postCustomer, deleteCustomer } from '../api/customers';
import CustomerGrid from '../components/CustomerGrid';
import CustomerDialog from '../components/CustomerEntryDialog';
import { Customer } from '../types';
import { getTrainings } from '../api/trainings';
import CustomerDrawer from '../components/CustomerDrawer';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from '../components/ConfirmDeleteDialog';
import AppSnackbar from '../components/AppSnackBar';
import { FileDownload } from '@mui/icons-material';

export default function CustomersPage({
    customers,
    isLoading: customersLoading,
    refreshCustomers
  }: {
    customers: Customer[];
    isLoading: boolean;
    refreshCustomers: () => void;
  }) {    

    useEffect(() => {
        refreshCustomers();
      }, []);
      
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

    const [CustomerId, setCustomerId] = useState<string>("");
    const [selectedCustomer, setSelectedCustomer] = useState(emptyCustomer);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [openConfirmation, setConfirmation] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, severity: "success" as "success" | "error" | "info", message: ""})
    const [exportTrigger, setExportTrigger] = useState(false);

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedCustomer) return;

        setSelectedCustomer({...selectedCustomer, [event.target.name]: event.target.value
        });
    };
    
    const handleSubmit = async () => {
        try {
            if (selectedCustomer?._links?.self?.href) {
                await putCustomer(selectedCustomer);
            } else {
                const saved = await postCustomer(selectedCustomer);
                console.log("Saved customer:", saved);
          
                const savedId = saved.id || saved._links?.self?.href.split("/").pop();
                if (savedId) {
                  setCustomerId(savedId);
                }
            }
            refreshCustomers();
            setSelectedCustomer(emptyCustomer);
            setOpenForm(false);
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Failed to save customer",
                severity: "error"
            });
        };
    };

    const handleDelete = async (customer: Customer) => {
        if (!customer._links?.self.href) return;

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        try {
            await deleteCustomer(customer._links.self.href);
            setSnackbar({
                open: true,
                message: "Customer deleted successfully",
                severity: "success",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Failed to deleted customer",
                severity: "error",
            });
    }

        setSelectedCustomer(emptyCustomer);
        deleteCustomer(customer._links.self.href);
        setTimeout(() => {
            refreshCustomers();
          }, 0);
    };

    const handleConfirmation = () => {
        if (selectedCustomer) {
            handleDelete(selectedCustomer);
            setConfirmation(false);  
          }
    }

    return (
        <Stack direction="column" spacing={2} sx={{width: '100%', height: '84vh'}} alignItems="center">
            <Stack direction="row" justifyContent="space-between" sx={{width: '90%'}}> 
                <ButtonGroup variant='text'>
                    <Button
                        startIcon={<AddIcon />}
                        sx={{ px: 3 }}
                        onClick={() => {
                            setSelectedCustomer(emptyCustomer),
                        setOpenForm(true)}}
                    >
                    New Customer
                    </Button>
                    <Button
                        sx={{ px: 3 }}
                        color="error"
                        startIcon={<DeleteIcon />}
                        disabled={!selectedCustomer}
                        onClick={() => setConfirmation(true)}
                    >
                    Customer
                    </Button>
                </ButtonGroup>
                <Button size='small' sx={{color: 'black'}}startIcon={<FileDownload />} onClick={() => setExportTrigger(true)} color="secondary">
                Export to CSV
                </Button>
            </Stack>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', width: '85vw' }}>
                <CustomerGrid 
                    customers={[...customers].reverse()}
                    isLoading={customersLoading}
                    onRowClicked={(customer) => {
                        setSelectedCustomer(customer)
                        setOpenDrawer(true)
                    }}
                    onRowSelected={(customer) => setSelectedCustomer(customer)}
                    onExport={() => setExportTrigger(false)}
                    exportTrigger={exportTrigger}
                    newRowId={CustomerId}
                />
            </Box>
        <CustomerDrawer
            anchor={"right"}
            open={openDrawer}
            customer={selectedCustomer}
            trainings={trainings}
            isLoading={trainingsLoading}
            error={trainingsError}
            onClose={() => setOpenDrawer(false)}
            onDelete={() => {}}
        />
        <ConfirmationDialog 
            open={openConfirmation}
            onClose={() => setConfirmation(false)}
            onConfirm={handleConfirmation}
            customerName={`${selectedCustomer?.firstname} ${selectedCustomer?.lastname}`}
        />
        <CustomerDialog 
            open={openForm}
            onClose={() => setOpenForm(false)}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            customer={selectedCustomer}
        />
        <AppSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
        />
        </Stack>
    )
}