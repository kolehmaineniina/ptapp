import { Training } from "./types";

const baseUrl = "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/"

export async function getTrainings(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch trainings");
    }
    
    return response.json();
}

export async function deleteTraining(url: string) {
    const response = await fetch(url, {
        method: 'DELETE',
      });
    
    if (!response.ok) {
    throw new Error('Failed to delete training');
    }
}

export async function postTraining(training: Training) {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training)
    });
    
    if(!response.ok) {
        throw new Error("Failed to add customer");
    }

    return await response.json();    
}
