import { Customer } from '../types';
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry, RowClickedEvent } from 'ag-grid-community'
import { ColDef } from "ag-grid-community"
import { useEffect, useMemo, useRef} from 'react';

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
        { headerName: 'Select', checkboxSelection: true, width: 100, suppressCsvExport: true},
        { headerName: 'ID', field: 'id', 
          sortable: false, 
          filter: true, 
          floatingFilter: true,
          width: 100,
        },  
        { headerName: 'First Name', field: 'firstname', filter: true, floatingFilter: true, width: 120},
        { headerName: 'Last Name', field: 'lastname', filter: true, floatingFilter: true, width: 120 },
        { headerName: 'Email', field: 'email', sortable: false, width: 150 },
        { headerName: 'Phone', field: 'phone', sortable: false, width: 120 },
        { headerName: 'Street Address', field: 'streetaddress', sortable: false, width:150 },
        { headerName: 'Zip Code', field: 'postcode', width: 100 },
        { headerName: 'City', field: 'city', width: 100 }
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
        <div style={{ height: '100%', width: '100%'}}>
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
        </div>
    );
}
