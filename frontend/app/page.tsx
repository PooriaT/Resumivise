// app/page.tsx
"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { getFastApiData, postFastApiFile } from '@/src/utils/fastapiCall';
import { AxiosResponse }  from 'axios';

export default function Home() {
  const [uploadData, setuploadData] = useState<string | null>(null);
  const [compareData, setCompareData] = useState<string | null>(null);
  const [reviseData, setReviseData] = useState<string | null>(null);
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [loadingRevise, setLoadingRevise] = useState(false);
  // const hasEffectRun = useRef(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        setLoadingBrowse(true);
        const formData = new FormData();
        formData.append('resume', file);
        const response: AxiosResponse = await postFastApiFile('upload_resume', formData);
        setuploadData(response.data);
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoadingBrowse(false);
      }
    }
  }
  const handleCompareClick = async () => {
    try {
      setLoadingCompare(true);
      const response: AxiosResponse = await getFastApiData('compare_resume');
      setCompareData(response.data);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoadingCompare(false);
    }
  };

  const handleReviseClick = async () => {
    try {
      setLoadingRevise(true);
      const response: AxiosResponse = await getFastApiData('revise_resume');
      setReviseData(response.data);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoadingRevise(false);
    }
  };

  // useEffect(() => {
  //   if (!hasEffectRun.current) {
  //     const fetchDataFromApi = async () => {
  //       try {
  //         const responseCompare: AxiosResponse = await getFastApiData('compare_resume');
  //         const responseRevise: AxiosResponse = await getFastApiData('revise_resume');
  //         setCompareData(responseCompare.data);
  //         setReviseData(responseRevise.data);
  //       } catch (error) {
  //         console.error('API Error:', error);
  //       }
  //     };

  //     fetchDataFromApi();
  //     hasEffectRun.current = true;
  //   }
  // }, []);

  

  return (
    <div className="container mx-auto mt-8 flex-grow">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome To RESUMIVISE!</h1>
      <p className='container mx-auto px-4 pb-6'>
        Upload your Resume in DOCX or PDF format:  &nbsp;&nbsp;
        <label className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          {loadingBrowse ? 'Uploading...' : 'Browse'}
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            disabled={loadingBrowse}
          />
        </label>
        {uploadData && (
          <p className='container mx-auto px-4 pb-6'>
            {uploadData}
          </p>
        )}
      </p>

      <p className='container mx-auto px-4 pb-8 text-red-700 font-serif text-lg font-bold'>
        CAUTIOUS: Currently due to using the GPT 3.5, this may take a while. BE PATIENT! 😇
      </p>

      <div className='container mx-auto px-4 pb-6'>
        <p>What is your request?</p>
        <ul>
          <li className='container mx-auto px-4 pb-6'>
            Compare your resume with Job Description:  &nbsp;&nbsp;
            <button
              className={`bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${loadingCompare ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleCompareClick}
              disabled={loadingCompare}
            >
              {loadingCompare ? 'Comparing...' : 'Compare'}
            </button>
          </li>
          <li className='container mx-auto px-4 pb-6'>
            Revise your resume based on Job Description:  &nbsp;&nbsp;
            <button
              className={`bg-green-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${loadingRevise ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleReviseClick}
              disabled={loadingRevise}
            >
              {loadingRevise ? 'Revising...' : 'Revise'}
            </button>
          </li>
        </ul>
      </div>
      
      {compareData && (
        <div className='container mx-auto px-4 py-4'>
          <h2 className="px-2 pb-2">Here is the comparison of your resume with Job Description:</h2>
          <div className='box-content px-4 border-4 rounded-lg border-rose-500 border-black bg-gray-400'>
            <p className='px-4 py-4 font-mono text-black'>{compareData}</p>
          </div>
        </div>
      )}

      {reviseData && (
        <div className='container mx-auto px-4 py-4'>
          <h2 className="px-2 pb-2">Here is the your tailored resume based on the Job Description:</h2>
          <div className='box-content px-4 border-4 rounded-lg border-rose-500 border-black bg-gray-400'>
            <p className='px-4 py-4 font-mono text-black'>{reviseData}</p>
          </div>
        </div>
      )}
    </div>
  );
}
