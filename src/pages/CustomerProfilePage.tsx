import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomerCard from "../components/CustomerCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCustomerById, putCustomer } from "../api/customers";
import { useEffect, useState } from "react";
import { Customer } from "../types";
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
    
    const { data: customer, isLoading, error, isSuccess } = useQuery({
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

    const [originalCustomer, setOriginalCustomer] = useState(emptyCustomer);
    const [editedCustomer, setEditedCustomer] = useState(emptyCustomer);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (customer && customer._links.self.href) {
            console.log(customer)
            const customerWithId = { ...customer, id: customer._links.self.href.split("/").pop()};
            setOriginalCustomer(customerWithId);
            setEditedCustomer(customerWithId);
        } else {
            console.log("No id link", customer);
        }
    }, [customer]);
         

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
        queryKey: ['trainings', editedCustomer?.id], 
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
                queryKey: ['trainings', editedCustomer?.id] });
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
            setSnackbar({
                open: true,
                message: "Training delted",
                severity: "info",
            });
            await refreshTrainings();
          } catch (error) {
            setSnackbar({
                open: true,
                message: "Error deleting training",
                severity: "error",
            });
          }
    };

    const [collapse, setCollapse] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, severity: "success" as "success" | "error" | "info", message: ""})

    useEffect(() => {
        if (isLoading) {
          setSnackbar({
            open: true,
            message: "Loading profile...",
            severity: "info",
          });
        } else if (error) {
          setSnackbar({
            open: true,
            message: "Error loading profile",
            severity: "error",
          });
        } else if (!customer) {
          setSnackbar({
            open: true,
            message: "No customer found.",
            severity: "error",
          });
        } else if (isSuccess) {
            setSnackbar({
              open: false,
              message: "",
              severity: "info",
            });
          }
      }, [isLoading, error, customer, isSuccess]);
    
    return (
        <Stack spacing={2} sx={{ width: '100%', height:'80vh', mx: 3 }}>
        <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{ ml: 4, mt: 2, alignSelf: "flex-start" }}
        >
        Back
        </Button>
        <Box>
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
                    <Button onClick={handleEdit} variant="contained">Edit</Button>
                )
            }
            />
        </Box>
        <Stack direction="row" spacing={5} sx={{p:3}}>
            <Stack spacing={2} sx={{ flex: 2}}>
                <Typography variant="h5">Trainings</Typography>
                <TrainingsList
                    trainings={trainings}
                    onDelete={handleTrainingDelete}
                    showDelete={true}
                />
            </Stack>
            <Box sx={{ flex: 1 }}>
                <Button
                    startIcon={collapse ? <ExpandLess /> : <ExpandMore />}
                    onClick={() => setCollapse(prev => !prev)}
                    color="primary"
                    sx={{
                    mb: 2,
                    '&:hover': { transform: 'scale(1.05)' }
                    }}
                > {collapse ? "Collapse" : "Add new training"}
                </Button>
                <Collapse in={collapse}>
                    <TrainingForm
                    training={newTraining}
                    onChange={handleTrainingInputChange}
                    onSubmit={handleAddTraining}
                    />
                </Collapse>
            </Box>
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