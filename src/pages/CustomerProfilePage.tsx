import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomerCard from "../components/CustomerCard";
import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../api/customers";
import { useState } from "react";

export default function CustomerProfile() {
    
    const params = useParams<{ id: string }>()
    const id = params.id 
    /* const { id } = use.Params()*/
    
    const { data: customer, isLoading: isLoading, error: error } = useQuery({
        queryKey: ['customer', id], 
        queryFn: () => {
            return id ? getCustomerById(id) : Promise.reject("No customer ID provided");
        },
        enabled: !!id,
    })

    if (isLoading) return <p>Loading customer...</p>;
    if (error) return <p>Error loading customer</p>;
    if (!customer) return <p>No customer found.</p>;

    const [editable, setEditable] = useState(false);
    const handleEdit = () => setEditable(true);
    const handleSave = () => {};
    const handleCancel = () => {};
    const handleChange = () => {};

    return (
        <div>
            <Typography variant='h4' gutterBottom>Customer Profile</Typography>
            <Button onClick={handleEdit}>Edit</Button>
            <CustomerCard 
                customer={customer}
                onChange={handleChange}
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
        </div>
    )
}