import { Customer } from '../../api/types';
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { ColDef } from "ag-grid-community"
import { useMemo, useState } from 'react';
import { Button } from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule])

export default function CustomerGrid(props: {
    customers: Customer[];
    handleDelete: (customer: Customer) => void;
    handleEdit: (customer: Customer) => void;
}) {
    
    const colDefs: ColDef<Customer>[] = useMemo(() => [
        {headerName: 'First Name', field: 'firstname', floatingFilter: true,},
        {headerName: 'Last Name', field: 'lastname', floatingFilter: true,},
        {headerName: 'Email', field: 'email'},
        {headerName: 'Phone', field: 'phone'},
        {headerName: 'Street Address', field: 'streetaddress'},
        {headerName: 'Zip Code', field: 'postcode'},
        {headerName: 'City', field: 'city'},
        {headerName: 'Actions',
        cellRenderer: (params: any) => (
            <>
                <Button onClick={() => props.handleEdit(params.data)}>Edit</Button>
                <Button onClick={() => props.handleDelete(params.data)}>Delete</Button>
            </>
        )}
    ], []);

    return (
        <div style={{ height: 500 }}>
            <AgGridReact
                rowData={props.customers}
                columnDefs={colDefs}
                defaultColDef={
                    { sortable: true,
                    filter: true,
                    editable: true,
                    resizable: true }
                }
            />
        </div>
    );
}