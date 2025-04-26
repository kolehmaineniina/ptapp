export async function getTrainingsById(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch trainings");
    }
    
    return response.json();
}
