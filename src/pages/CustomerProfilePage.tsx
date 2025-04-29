import { Button, Collapse, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomerCard from "../components/CustomerCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomerById, putCustomer } from "../api/customers";
import { useEffect, useState } from "react";
import { Customer } from "../api/types";
import { getTrainings, deleteTraining, postTraining } from "../api/trainings";
import TrainingsList from "../components/TrainingList";
import TrainingForm from "../components/TrainingForm";
import { ArrowBack, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppSnackbar from "../components/AppSnackBar";

export default function CustomerProfile() {
    
    const params = useParams<{ id: string }>()
    const id = params.id 
    /* const { id } = use.Params()*/

    const navigate = useNavigate();
    
    const { data: customer, isLoading, error } = useQuery({
        queryKey: ['customer', id], 
        queryFn: () => {
            return id ? getCustomerById(id) : Promise.reject("No customer ID provided");
        },
        enabled: !!id,
    })

    const queryClient = useQueryClient();
    const refreshCustomer = async () => {
        if (!editedCustomer?._links?.trainings?.href) {
            console.error('Cannot refresh trainings: missing customer training link');
            return;
          }
        await queryClient.invalidateQueries({ queryKey: ['customer'] });
    }

    const [originalCustomer, setOriginalCustomer] = useState<Customer | null>(null);
    const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (customer) {
            setEditedCustomer(customer);
            setOriginalCustomer(customer);
        }
    }, [customer])    

    const handleEdit = () => {
        setOriginalCustomer(editedCustomer);
        setEditable(true);}
    
    const handleSave = async () => {
        if (!editedCustomer) {
            return
        }

        try {
            await putCustomer(editedCustomer);
            setSnackbar({
                open: true,
                message: "Customer saved",
                severity: "success",
            });
            await refreshCustomer();
            setEditable(false);
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Save failed",
                severity: "error",
              });
        }
        
    };

    const handleCancel = () => {
        if (originalCustomer) {
            setEditedCustomer(originalCustomer)
        }
        setEditable(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedCustomer) return;
        const {name, value} = event.target;
        setEditedCustomer({...editedCustomer, [name]: value})
    };

    const { data: trainingsData } = useQuery({
        queryKey: ['trainings', editedCustomer?._links.trainings.href], 
        queryFn: () => {
            if (!editedCustomer?._links.trainings.href) {
                return;
            }

            return getTrainings(editedCustomer._links.trainings.href);
        }, enabled: !!editedCustomer?._links.trainings.href,
    });

    const trainings = trainingsData?._embedded?.trainings ?? [];

    const refreshTrainings = async () => {
        if (editedCustomer?._links.trainings.href) {
            await queryClient.invalidateQueries({ 
                queryKey: ['trainings', editedCustomer._links.trainings.href] });
        }
    }

    const emptyTraining = {
        date: '',
        activity: '',
        duration: 0,
    };

    const [newTraining, setNewTraining] = useState(emptyTraining);

    const handleTrainingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setNewTraining({
            ...newTraining,
            [name]: value
        });
    };

    const handleAddTraining = async () => {
        if (!editedCustomer?._links?.self?.href) {
            return;}
        
        const trainingToSend = {
            date: new Date(newTraining.date).toISOString(), 
            activity: newTraining.activity,
            duration: Number(newTraining.duration), 
            customer: editedCustomer._links.self.href
        };
        try {
            await postTraining(trainingToSend);
            setSnackbar({
                open: true,
                message: "Training added",
                severity: "success",
            });
            await refreshTrainings();
            setNewTraining(emptyTraining);

        } catch (error) {
            setSnackbar({
                open: true,
                message: "Adding failed",
                severity: "error",
            })
        } 
    };

    const handleTrainingDelete = async (trainingUrl: string) => {
        try {
            await deleteTraining(trainingUrl);
            await refreshTrainings();
          } catch (error) {
            console.error(error);
          }
    };

    const [collapse, setCollapse] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, severity: "success" as "success" | "error" | "info", message: ""})

    if (isLoading) return <p>Loading customer...</p>;
    if (error) return <p>Error loading customer</p>;
    if (!customer) return <p>No customer found.</p>;
    if (!editedCustomer) return <p>Loading customer data...</p>;

    return (
 
        <Stack spacing={2}>
            <Typography variant='h4' gutterBottom>Customer Profile</Typography>
            <Button startIcon={<ArrowBack/>} onClick={() => navigate('/customers')}>Back</Button>
            <CustomerCard 
                customer={editedCustomer}
                onChange={handleInputChange}
                editable={editable}
                actions={
                    editable ? (
                    <>
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </>
                    ) : (
                    <Button onClick={handleEdit}>Edit</Button>
                    )
                }
                />
                <Stack spacing={2}>
                    <Typography variant="h5" gutterBottom>Trainings</Typography>
                    <Button 
                        startIcon={ collapse ? <ExpandLess/> : <ExpandMore/>}
                        onClick={() => setCollapse(prev => !prev)}
                        color="primary"
                        sx={{'&:hover': {
                            transform: 'scale(1.1)'}}
                        }    
                    > { collapse ? "Collapse" : "Add new training"}
                    </Button>
                    <Collapse
                        in={collapse}
                    >
                        <TrainingForm training={newTraining} onChange={handleTrainingInputChange} onSubmit={handleAddTraining}/>
                    </Collapse>
                    <TrainingsList trainings={trainings} onDelete={handleTrainingDelete} showDelete={true}/> 
                </Stack> 
                <AppSnackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    severity={snackbar.severity}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                />
        </Stack>
    )
}