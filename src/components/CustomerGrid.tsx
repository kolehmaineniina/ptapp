import { Customer } from '../api/types';
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { ColDef } from "ag-grid-community"
import { useMemo } from 'react';

ModuleRegistry.registerModules([AllCommunityModule])

export default function CustomerGrid(props: { customers: Customer[] }) {
    
    const colDefs: ColDef<Customer>[] = useMemo(() => [
        {headerName: 'First Name', field: 'firstname', floatingFilter: true,},
        {headerName: 'Last Name', field: 'lastname', floatingFilter: true,},
        {field: 'email'},
        {field: 'phone'},
        {headerName: 'Street Address', field: 'streetaddress'},
        {headerName: 'Zip Code', field: 'postcode'},
        {field: 'city'},
        {}
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