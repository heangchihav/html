export async function fetchFromApi(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}
