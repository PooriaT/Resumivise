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
          const response: AxiosResponse = await getFastApiData('compare_resume');
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
    <div className="container mx-auto mt-8 flex-grow">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome To RESUMIVISE!</h1>
      <p className='container mx-auto px-4 pb-6'>
        Upload your Resume in DOCX or PDF format:  &nbsp;&nbsp;
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Browse
        </button>
      </p>
      
      {apiData && (
        <div className='container mx-auto px-4 py-4'>
          <h2 className="px-2 pb-2">Here is the comparison of your resume with Job Description:</h2>
          <div className='box-content px-4 border-4 rounded-lg border-rose-500 border-black bg-gray-400'>
            <p className='px-4 py-4 font-mono text-black'>{apiData}</p>
          </div>
        </div>
      )}

      {apiData && (
        <div className='container mx-auto px-4 py-4'>
          <h2 className="px-2 pb-2">Here is the your tailored resume based on the Job Description:</h2>
          <div className='box-content px-4 border-4 rounded-lg border-rose-500 border-black bg-gray-400'>
            <p className='px-4 py-4 font-mono text-black'>{apiData}</p>
          </div>
        </div>
      )}
    </div>
  );
}