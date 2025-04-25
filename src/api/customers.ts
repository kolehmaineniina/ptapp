import { Customer } from "./types";

const baseUrl = "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"

export async function getCustomers() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }

    return await response.json();
    
}

export async function putCustomer(customer: Customer) {
    const url = customer._links.self.href;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    });

    if (!response.ok) {
        throw new Error("Failed to update customer");
    }

    return await response.json();
}

export async function postCustomer(customer: Customer) {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    });
    
    if(!response.ok) {
        throw new Error("Failed to add customer");
    }

    return await response.json();
}

export async function deleteCustomer() {

}