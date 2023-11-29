import axios, { AxiosResponse, AxiosInstance } from 'axios';

function axiosConfig(): AxiosInstance {
    const axiosInstance = axios.create({
      baseURL:  'http://localhost:8000',
    }); // 'https://catfact.ninja/fact'
  
    return axiosInstance;
  }


  export async function getFastApiData(endpoint: string, clientId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosConfig().get(`/${endpoint}`, {
      params: { client_id: clientId },
    });
    return response;
  }

  export async function postFastApiFile(endpoint: string, data: FormData): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosConfig().post(`/${endpoint}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  export async function postFastApiText(endpoint: string, data: string, clientId: string): Promise<AxiosResponse> {
    const jsonData = {text: data, client_id: clientId };
    const response: AxiosResponse = await axiosConfig().post(`/${endpoint}`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }