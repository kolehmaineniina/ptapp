import { useQuery } from '@tanstack/react-query';
import { fetchCustomers } from '../api/customers';
import CustomerGrid from '../components/CustomerGrid';

export default function CustomersPage() {
    const { data, isLoading, error, isSuccess } = useQuery({queryKey: ['customers'], queryFn: fetchCustomers});
    const customers = data?._embedded?.customers ?? [];

    return (
        <>
        <h2>Customers</h2>
        { isLoading && <p>Loading customers...</p> }
        { error && <p>Error loading customers: Error (error as Error)?.message</p> }
        { isSuccess && <CustomerGrid customers={customers} />}
        </>
    )
}