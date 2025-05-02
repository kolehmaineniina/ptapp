import { Customer } from "../assets/types";

const baseUrl = "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"

export async function getCustomers() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }

    const json = await response.json();
    
    const idCustomers = json._embedded.customers.map((c: Customer) => ({
        ...c, id: c._links.self.href.split('/').pop()
    }));

    return {
        ...json, _embedded: { customers: idCustomers}
    };
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

export async function deleteCustomer(url: string) {
    const response = await fetch(url, {
      method: 'DELETE'
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete customer');
    }
}

export async function getCustomerById(id: string) {
    const url = `${baseUrl}/${id}`
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error("Failed to fetch customer by id")
    }

    return response.json();
}