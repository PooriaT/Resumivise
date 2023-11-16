// app/page.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { getFastApiData } from '@/src/utils/fastapiCall';
import axios, { AxiosResponse }  from 'axios';

export default function Home() {
  const [apiData, setApiData] = useState<string | null>(null);
  const hasEffectRun = useRef(false);

  useEffect(() => {
    if (!hasEffectRun.current) {
      const fetchDataFromApi = async () => {
        try {
          const response: AxiosResponse = await getFastApiData('compare');
          setApiData(response.data);
        } catch (error) {
          console.error('API Error:', error);
        }
      };

      fetchDataFromApi();
      hasEffectRun.current = true;
    }
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome To RESUMIVISE!</h1>
      <p>Welcome to the Home Page!</p>
      {apiData && (
        <div className='container mx-auto px-4'>
          <h2>Data from API:</h2>
          <div className='box-content border-4 rounded-lg border-rose-500 border-black bg-gray-400'>
            <p className='px-4 font-mono text-black'>{apiData}</p>
          </div>
        </div>
      )}
    </div>
  );
}