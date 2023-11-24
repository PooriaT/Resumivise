import axios, { AxiosResponse, AxiosInstance } from 'axios';

function axiosConfig(): AxiosInstance {
    const axiosInstance = axios.create({
      baseURL:  'http://localhost:8000',
    }); // 'https://catfact.ninja/fact'
  
    return axiosInstance;
  }


  export async function getFastApiData(para: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosConfig().get(`/${para}`);
    return response;
  }

  export async function postFastApiFile(para: string, data: FormData): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosConfig().post(`/${para}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }