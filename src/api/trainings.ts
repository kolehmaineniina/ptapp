import { TrainingToPost } from "../types";

const trainingsUrl = "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings";

export async function getTrainings(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch trainings");
    }
    
    return response.json();
}

export async function getAllTrainings() {
    const response = await fetch(trainingsUrl);
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

export async function postTraining(training: TrainingToPost) {
    const response = await fetch(trainingsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training)
    });
    
    if(!response.ok) {
        throw new Error("Failed to add customer");
    }

    return await response.json();    
}
