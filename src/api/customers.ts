export async function fetchCustomers() {
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }
    return response.json();
    
}