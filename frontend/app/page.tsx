// app/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [apiData, setApiData] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        console.log("APIIIIIIIIIIICALLL")
        const response = await axios.get('http://localhost:8000/compare', { responseType: 'stream' });
        console.log(response)
        const chunks: string[] = [];

        response.data.on('data', (chunk: Buffer) => {
          const decodedChunk = chunk.toString('utf-8');
          chunks.push(decodedChunk);
        });

        response.data.on('end', () => {
          const result = chunks.join('');
          setApiData(result);
        });
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome To RESUMIVISE!</h1>
      <p>Welcome to the Home Page!</p>
      {apiData && (
        <div>
          <h2>Data from API:</h2>
          <p>{apiData}</p>
        </div>
      )}
    </div>
  );
}


