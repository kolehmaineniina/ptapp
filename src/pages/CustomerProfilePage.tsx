import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomerCard from "../components/CustomerCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomerById, putCustomer } from "../api/customers";
import { useEffect, useState } from "react";
import { Customer } from "../api/types";
import { getTrainings, deleteTraining, postTraining } from "../api/trainings";
import TrainingsList from "../components/TrainingList";
import TrainingForm from "../components/TrainingForm";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomerProfile() {
    
    const params = useParams<{ id: string }>()
    const id = params.id 
    /* const { id } = use.Params()*/
    
    const { data: customer, isLoading, error } = useQuery({
        queryKey: ['customer', id], 
        queryFn: () => {
            return id ? getCustomerById(id) : Promise.reject("No customer ID provided");
        },
        enabled: !!id,
    })

    const queryClient = useQueryClient();
    const refreshCustomer = async () => {
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
        await putCustomer(editedCustomer);
        await refreshCustomer();
        setEditable(false);
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

    const { data: trainingsData, isLoading: trainingsLoading, error: trainingsError } = useQuery({
        queryKey: ['trainings', editedCustomer?._links.trainings.href], 
        queryFn: () => {
            if (!editedCustomer?._links.trainings.href) {
                return;
            }

            return getTrainings(editedCustomer._links.trainings.href);
        }
    });

    const trainings = trainingsData?._embedded?.trainings ?? [];

    const refreshTrainings = async () => {
        await queryClient.invalidateQueries({ queryKey: ['trainings'] });
    }

    const emptyTraining = {
        date: '',
        activity: '',
        duration: 0,
        customer: null
    };

    const [newTraining, setNewTraining] = useState(emptyTraining);

    /*

    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }

    deleteTraining(trainingUrl);
    setTimeout(() => {
        refreshTrainings();
      }, 0);
    */

    const handleTrainingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewTraining({
            ...newTraining,
            [name]: value
        });
    };

    const handleAddTraining = async () => {
        if (!editedCustomer?._links?.self?.href) return;

        try {
            await postTraining({...newTraining, [customer]: editedCustomer._links.self.href});
            await refreshTrainings(); 
            setNewTraining(emptyTraining);
        } catch (error) {
            console.error("Failed to add training:", error);
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

    if (isLoading) return <p>Loading customer...</p>;
    if (error) return <p>Error loading customer</p>;
    if (!customer) return <p>No customer found.</p>;
    if (!editedCustomer) return <p>Loading customer data...</p>;

    return (
        <div>
            <Typography variant='h4' gutterBottom>Customer Profile</Typography>
            <Button>Back</Button>
            <Stack spacing={2}>
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
                    <Stack direction="row">
                        <Typography variant="h6" color="primary" >Add Training</Typography>
                        <Button 
                            startIcon={ collapse ? <CloseIcon/> : <AddIcon/>}
                            onClick={() => setCollapse(prev => !prev)}
                            color={ collapse ? "error" : "primary"}
                            sx={{'&:hover': {
                                transform: 'scale(1.1)'}}
                            }    
                        >
                        </Button>
                    </Stack>
                    <Collapse
                    in={collapse}
                    >
                        <TrainingForm training={newTraining} onChange={handleTrainingInputChange} onSubmit={handleAddTraining}/>
                    </Collapse>
                    <TrainingsList trainings={trainings} onDelete={handleTrainingDelete}/> 
                </Stack>  
            </Stack>
        </div>
    )
}