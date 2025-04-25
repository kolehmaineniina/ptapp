import { Customer } from '../../api/types';
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { ColDef } from "ag-grid-community"
import { useEffect, useMemo, useRef } from 'react';


ModuleRegistry.registerModules([AllCommunityModule])

export default function CustomerGrid(props: {
    customers: Customer[];
    onRowSelected: (customer: Customer) => void
    isLoading: boolean,
}) {
    
    const colDefs: ColDef<Customer>[] = useMemo(() => [
        {headerName: 'Select', headerCheckboxSelection: true, checkboxSelection: true, width: 50},   
        {headerName: 'First Name', field: 'firstname', floatingFilter: true,},
        {headerName: 'Last Name', field: 'lastname', floatingFilter: true,},
        {headerName: 'Email', field: 'email'},
        {headerName: 'Phone', field: 'phone'},
        {headerName: 'Street Address', field: 'streetaddress'},
        {headerName: 'Zip Code', field: 'postcode'},
        {headerName: 'City', field: 'city'}
    ], []);

    const gridRef = useRef<AgGridReact<Customer>>(null);

    useEffect(() => {
        if (!gridRef.current?.api) return;
      
        if (props.isLoading) {
          gridRef.current.api.showLoadingOverlay();
        } else if (props.customers.length === 0) {
          gridRef.current.api.showNoRowsOverlay();
        } else {
          gridRef.current.api.hideOverlay();
        }
      }, [props.isLoading, props.customers]);

    const handleRowSelection = () => {
        const selectedNodes = gridRef.current?.api.getSelectedNodes();
        const selectedData = selectedNodes?.[0]?.data;
        
        if (props.onRowSelected && selectedData) {
          props.onRowSelected(selectedData);
        }

      };

    return (
        <div style={{ height: 500 }}>
            <AgGridReact
                ref={gridRef}
                rowSelection="single"
                onSelectionChanged={handleRowSelection}
                rowData={props.customers}
                columnDefs={colDefs}
                defaultColDef={
                    { sortable: true,
                    filter: true,
                    resizable: true }
                }
            />
        </div>
    );
}