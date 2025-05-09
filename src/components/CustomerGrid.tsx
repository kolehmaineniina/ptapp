import { Customer } from '../types';
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry, RowClickedEvent } from 'ag-grid-community'
import { ColDef } from "ag-grid-community"
import { useEffect, useMemo, useRef} from 'react';
import { Box } from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule])

export default function CustomerGrid(props: {
    customers: Customer[];
    isLoading: boolean;
    onRowClicked: (customer: Customer) => void;
    onRowSelected: (customer: Customer) => void;
    onExport: () => void;
    exportTrigger: boolean;
    newRowId: string;
}) {
    
    const colDefs: ColDef<Customer>[] = useMemo(() => [
        { headerName: 'Select', checkboxSelection: true, width: 90, suppressCsvExport: true},
        { headerName: 'ID', field: 'id', 
          sortable: false, 
          filter: true, 
          floatingFilter: true,
          width: 120,
        },  
        { headerName: 'First Name', field: 'firstname', filter: true, floatingFilter: true },
        { headerName: 'Last Name', field: 'lastname', filter: true, floatingFilter: true },
        { headerName: 'Email', field: 'email', sortable: false },
        { headerName: 'Phone', field: 'phone', sortable: false },
        { headerName: 'Street Address', field: 'streetaddress', sortable: false },
        { headerName: 'Zip Code', field: 'postcode', width: 120 },
        { headerName: 'City', field: 'city', width: 120 }
    ], []);

    const gridRef = useRef<AgGridReact<Customer>>(null);


    useEffect(() => {
      if (props.exportTrigger) {
        gridRef.current?.api.exportDataAsCsv();
        props.onExport(); 
      }
    }, [props.exportTrigger]);

    const handleRowSelection = () => {
        const selectedNodes = gridRef.current?.api.getSelectedNodes();
        const selectedData = selectedNodes?.[0]?.data;
        
        if (props.onRowSelected && selectedData) {
          props.onRowSelected(selectedData);
        }

      };

    const handleRowClick = (event: RowClickedEvent<Customer>) => {
        if (props.onRowClicked && event.data) {
          props.onRowClicked(event.data)
        }
    }

    return (
        <Box style={{ height: '100%', width: '85vw'}}>
            <AgGridReact
                loading={props.isLoading}
                ref={gridRef}
                rowSelection="single"
                onSelectionChanged={handleRowSelection}
                onRowClicked={handleRowClick}
                rowData={props.customers}
                columnDefs={colDefs}
                defaultColDef={
                    { sortable: true,
                    resizable: true
                   }
                }
                getRowStyle={(params) => {
                  if(params.data?.id === props.newRowId) {
                    return { backgroundColor: "#e5f3fd" };
                  }
                }}
            />
        </Box>
    );
}
