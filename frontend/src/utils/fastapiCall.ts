const baseURL = 'https://resumivise-api.onrender.com/api'; // Change to your actual API base URL
 // 'http://localhost:8000/api',  'https://resumivise-api.onrender.com/api'

export async function getFastApiData(endpoint: string, clientId: string): Promise<ReadableStream<Uint8Array>> {
  const url = `${baseURL}/${endpoint}?client_id=${clientId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
    },
  });
  return response.body;
}

export async function postFastApiFile(endpoint: string, data: FormData): Promise<Response> {
  const url = `${baseURL}/${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });
  return response;
}

export async function postFastApiText(endpoint: string, data: string, clientId: string): Promise<Response> {
  const url = `${baseURL}/${endpoint}`;
  const jsonData = { text: data, client_id: clientId };
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(jsonData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}
