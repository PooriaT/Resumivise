// app/page.tsx
"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { getFastApiData, postFastApiFile, postFastApiText } from '@/src/utils/fastapiCall';
import { v4 as uuidv4 } from 'uuid';


export default function Home() {
  const [uploadData, setuploadData] = useState<string | null>(null);
  const [jobDescriptionData, setJobDescriptionData] = useState<string>('');
  const [compareData, setCompareData] = useState<string | null>(null);
  const [reviseData, setReviseData] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string>('');
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const [loadingJobDescription, setLoadingJobDescription] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [loadingRevise, setLoadingRevise] = useState(false);


  const generateClientId = () => {
    const generatedId = uuidv4(); //UUID
    setClientId(generatedId);
    return generatedId;
  };

  useEffect(() => {
    const storedClientId = localStorage.getItem('clientId');

    if (storedClientId) {
      setClientId(storedClientId);
    } else {
      const newClientId = generateClientId();
      localStorage.setItem('clientId', newClientId);
    }
  }, []); 

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        setLoadingBrowse(true);
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('client_id', clientId);
        const response: Response = await postFastApiFile('upload_resume', formData);
        const jsonData = await response.json();
        setuploadData(jsonData.text);
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoadingBrowse(false);
      }
    }
  }
  const handleTextUpload = async () => {
    try {
      setLoadingJobDescription(true);
      const response: Response = await postFastApiText("upload_job_description", jobDescriptionData, clientId);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoadingJobDescription(false);
    }
  }
  const handleCompareClick = async () => {
    try {
      setLoadingCompare(true);
      setCompareData("");
      const response: ReadableStream<Uint8Array> = await getFastApiData('compare_resume', clientId);
      const reader = response.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        setCompareData((prevData) => prevData ? prevData + new TextDecoder().decode(value) : new TextDecoder().decode(value));
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoadingCompare(false);
    }
  };

  const handleReviseClick = async () => {
    try {
      setLoadingRevise(true);
      setReviseData("");
      const response: ReadableStream<Uint8Array> = await getFastApiData('revise_resume', clientId);
      const reader = response.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        setReviseData((prevData) => prevData ? prevData + new TextDecoder().decode(value) : new TextDecoder().decode(value));
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoadingRevise(false);
    }
  };
  

  return (
    <div className="container mx-auto mt-8 flex-grow">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome To RESUMIVISE!</h1>
      {/* Uploading Resume */}
      <p className='container mx-auto px-4 pb-8 text-orange-700 font-serif text-lg font-bold'>
        CAVEAT: Remove the confidential information from your resume, such as address, phone number, or email, before uploading!
      </p>
      <p className='container mx-auto px-4 pb-8 text-orange-700 font-serif text-lg font-bold'>
        ATTENTION: Due to the use of GPT-3.5, this process may take a while. Please be patient!
      </p>
      <div className='container mx-auto px-4 pb-6'>
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
          <p className='container mx-auto px-4 py-8 text-yellow-700'>
            {uploadData}
          </p>
        )}
      </div>

      {/* Job Description */}
      <div className='container mx-auto px-4 pb-6'>
        <p className='px-4 pb-6'>Insert the desired job description in the box below:</p>
        <textarea 
          className="resize text-black rounded-md px-4 pb-20 h-64 w-1/2" 
          placeholder='Job Description'
          value={jobDescriptionData}
          onChange={(e) => setJobDescriptionData(e.target.value)}
        ></textarea>
        <p className='py-2'></p>
        <button
          className={`bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loadingJobDescription ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleTextUpload}
          disabled={loadingJobDescription}
        >
          {loadingJobDescription ? 'Pushing...' : 'PUSH'}
        </button>
      </div>
      
      {/* Comparing and revising the resume */}
      <div className='container mx-auto px-4 pb-6'>
        <p>What is your request?</p>
        <ul>
          <li className='container mx-auto px-4 pb-6'>
            Compare your resume with the job description:  &nbsp;&nbsp;
            <button
              className={`bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${loadingCompare ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleCompareClick}
              disabled={loadingCompare}
            >
              {loadingCompare ? 'Comparing...' : 'Compare'}
            </button>
          </li>
          <li className='container mx-auto px-4 pb-6'>
            Revise your resume based on the Job Description:  &nbsp;&nbsp;
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
          <h2 className="px-2 pb-2">Here is the comparison of your resume with the Job Description:</h2>
          <div className='box-content px-4 border-4 rounded-lg border-rose-500 border-black bg-gray-400'>
            <pre className='px-4 py-4 font-mono text-black overflow-auto'>{compareData}</pre>
          </div>
        </div>
      )}

      {reviseData && (
        <div className='container mx-auto px-4 py-4'>
          <h2 className="px-2 pb-2">Here is your tailored resume based on the job description:</h2>
          <div className='box-content px-4 border-4 rounded-lg border-rose-500 border-black bg-gray-400'>
            <pre className='px-4 py-4 font-mono text-black overflow-auto'>{reviseData}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
