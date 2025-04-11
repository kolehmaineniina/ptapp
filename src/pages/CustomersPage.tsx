import { useQuery } from '@tanstack/react-query';
import { fetchCustomers } from '../api/customers';
import { Customer } from '../api/types';

export default function CustomersPage() {
    const { data, isLoading, error, isSuccess } = useQuery({queryKey: ['customers'], queryFn: fetchCustomers});

    return (
        <>
        <h2>Customers</h2>
        { isLoading && <p>Loading customers...</p> }
        { error && <p>Error loading customers: Error (error as Error)?.message</p> }
        { isSuccess && (
            <table>
                <tbody>
                {data?._embedded?.customers?.map((c: Customer) => (
                    <tr key={c._links.self.href}>
                        <td>{c.firstname}</td>
                        <td>{c.lastname}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}
        </>
    )
}