import { Customer } from '../../api/types';
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry, RowDoubleClickedEvent } from 'ag-grid-community'
import { ColDef } from "ag-grid-community"
import { useEffect, useMemo, useRef } from 'react';


ModuleRegistry.registerModules([AllCommunityModule])

export default function CustomerGrid(props: {
    customers: Customer[],
    isLoading: boolean,
    onRowClicked: (customer: Customer) => void,
    onRowSelected: (customer: Customer) => void
}) {
    
    const colDefs: ColDef<Customer>[] = useMemo(() => [
        { headerCheckboxSelection: true, checkboxSelection: true, width: 30},
        { headerName: 'ID', field: 'id', 
          sortable: false, 
          filter: true, 
          floatingFilter: true,
          width: 100,
          cellStyle: { textAlign: 'center' }
        },  
        { headerName: 'First Name', field: 'firstname', filter: true, floatingFilter: true },
        { headerName: 'Last Name', field: 'lastname', filter: true, floatingFilter: true },
        { headerName: 'Email', field: 'email', sortable: false },
        { headerName: 'Phone', field: 'phone', sortable: false },
        { headerName: 'Street Address', field: 'streetaddress', sortable: false },
        { headerName: 'Zip Code', field: 'postcode' },
        { headerName: 'City', field: 'city' }
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

    const handleDoubleClick = (event: RowDoubleClickedEvent<Customer>) => {
        if (props.onRowClicked && event.data) {
          props.onRowClicked(event.data)
        }
    }

    return (
        <div style={{ height: 500 }}>
            <AgGridReact
                ref={gridRef}
                rowSelection="single"
                onSelectionChanged={handleRowSelection}
                onRowDoubleClicked={handleDoubleClick}
                rowData={props.customers}
                columnDefs={colDefs}
                defaultColDef={
                    { sortable: true,
                    resizable: true }
                }
            />
        </div>
    );
}