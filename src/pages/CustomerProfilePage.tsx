import { Button, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomerCard from "../components/CustomerCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomerById, putCustomer } from "../api/customers";
import { useEffect, useState } from "react";
import { Customer } from "../api/types";
import { getTrainings, deleteTraining, postTraining } from "../api/trainings";
import TrainingsList from "../components/TrainingList";

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

    const refreshTrainings = async () => {
        await queryClient.invalidateQueries({ queryKey: ['trainings'] });
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

    const handleTrainingDelete = async (trainingUrl: string) => {
        try {
            await deleteTraining(trainingUrl);
            await refreshTrainings();  // This will be another simple query invalidation
          } catch (error) {
            console.error(error);
          }
    };
    /*if (!trainingUrl) return;

    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }

    deleteTraining(trainingUrl);
    setTimeout(() => {
        refreshData();
      }, 0);*/

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
                <Stack>
                    <Button>Add new</Button>
                    <TrainingsList trainings={trainings} onDelete={handleTrainingDelete}/>    
                </Stack>  
            </Stack>
        </div>
    )
}