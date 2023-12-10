// app/page.tsx
"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  getFastApiData,
  postFastApiFile,
  postFastApiText,
} from "@/src/utils/fastapiCall";
import { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import DisclaimerModal from "@/components/DisclaimerModal";

export default function Home() {
  const [uploadData, setuploadData] = useState<string | null>(null);
  const [jobDescriptionData, setJobDescriptionData] = useState<string>("");
  const [compareData, setCompareData] = useState<string | null>(null);
  const [reviseData, setReviseData] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string>("");
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const [loadingJobDescription, setLoadingJobDescription] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [loadingRevise, setLoadingRevise] = useState(false);

  // Function to generate UUID
  const generateClientId = () => {
    const generatedId = uuidv4();
    setClientId(generatedId);
    return generatedId;
  };

  useEffect(() => {
    const storedClientId = localStorage.getItem("clientId");

    if (storedClientId) {
      setClientId(storedClientId);
    } else {
      const newClientId = generateClientId();
      localStorage.setItem("clientId", newClientId);
    }
  }, []);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        setLoadingBrowse(true);
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("client_id", clientId);
        const response: AxiosResponse = await postFastApiFile(
          "upload_resume",
          formData
        );
        const jsonData = JSON.parse(response.data);
        setuploadData(jsonData.text);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoadingBrowse(false);
      }
    }
  };
  const handleTextUpload = async () => {
    try {
      setLoadingJobDescription(true);
      const response: AxiosResponse = await postFastApiText(
        "upload_job_description",
        jobDescriptionData,
        clientId
      );
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingJobDescription(false);
    }
  };
  const handleCompareClick = async () => {
    try {
      setLoadingCompare(true);
      const response: AxiosResponse = await getFastApiData(
        "compare_resume",
        clientId
      );
      const jsonData = JSON.parse(response.data);
      setCompareData(jsonData);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingCompare(false);
    }
  };

  const handleReviseClick = async () => {
    try {
      setLoadingRevise(true);
      const response: AxiosResponse = await getFastApiData(
        "revise_resume",
        clientId
      );
      const jsonData = JSON.parse(response.data);
      setReviseData(jsonData);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingRevise(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const modal = document.getElementById("modal");
    if (modal) modal.showModal();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {isModalOpen && (
        <DisclaimerModal closeModal={() => setIsModalOpen(false)} />
      )}
      <section
        id="home"
        className="flex justify-around items-center h-screen w-full">
        <div>
          <h1 className="text-3xl">Welcome To</h1>
          <h1 className="text-8xl font-bold ">RESUMIVISE!</h1>
          <p className="py-6 text-xl">
            A GPT-based assistance to revise the resume.
          </p>
        </div>
        <div>
          <form action="" className="flex flex-col gap-4">
            <label htmlFor="">Upload your Resume in DOCX or PDF format:</label>
            {loadingBrowse && "Uploading..."}
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={loadingBrowse}
              className="file-input file-input-bordered w-full max-w-xs"
            />
            {uploadData && (
              <p className="container mx-auto px-4 py-8 text-yellow-700">
                {uploadData}
              </p>
            )}
          </form>
        </div>
      </section>

      <section
        id="about"
        className="flex flex-col justify-center h-screen gap-6 w-2/3">
        <h1 className="text-6xl font-bold mb-4 text-center mt-28">About</h1>
        <div className="text-xl">
          <p className="p-2">
            Welcome to Resumivise 🏢 your go-to platform for crafting a standout
            resume! We understand the challenges of job hunting, and that is why
            we are here to lend a helping hand.
          </p>
          <p className="p-2">
            Ever wondered how well your resume aligns with a job description?
            Our unique feature does just that! We compare your resume to the job
            requirements, giving you a percentage match. But we do not stop
            there we guide you on enhancing your strengths and addressing any
            flaws in your resume. Think of us as your personal resume
            consultant!
          </p>
          <p className="p-2">
            Worried about privacy? We have got you covered. Your data is
            precious, and we treat it that way. No need to fret about your
            information lingering in the cloud. Your uploaded resume is promptly
            removed after processing. Plus, you have control the JSON data file,
            holding extracted info from your resume, can be wiped manually at
            your request or automatically after a few hours.
          </p>
          <p className="p-2">
            Still have privacy concerns? Check out our app repository on
            <a href="https://github.com/PooriaT/Resumivise">GitHub</a>
            for transparency and peace of mind. Your concerns matter to us!
          </p>
          <p className="p-2 text-red-500">
            Disclaimer: While Resumivise is here to assist, please note that we
            do not take responsibility for any issues that may arise in your
            resume during the application process. It is crucial to review your
            resume thoroughly before hitting that apply button.
          </p>
          <p className="p-2">
            Ready to take the next step in your career? It is time to apply with
            confidence, thanks to Resumivise!
          </p>
        </div>
      </section>

      <section
        id="support"
        className="flex flex-col justify-center h-screen gap-6 w-2/3">
        <h1 className="text-6xl font-bold mb-4 text-center">Support</h1>
        <div className="text-xl">
          <p className="p-2">
            Welcome, and thank you for being a part of our community! Your
            support means the world to us.
          </p>
          <p className="p-2">
            If you are eager to contribute, visit our application&apos;s{" "}
            <a href="https://github.com/PooriaT/Resumivise">
              GitHub repository
            </a>
            . Fork it, create new issues, or jump into existing ones. Your
            feedback and ideas are invaluable to us – every contribution, big or
            small, makes a difference.
          </p>
          <p className="p-2">
            Your support fuels our passion, and we appreciate it. Thanks for
            being a vital part of our journey.
          </p>
          <p className="p-2">
            And if you want to support us even more, consider buying me a book
            or a coffee! &nbsp;&nbsp;
            <Link href="https://www.buymeacoffee.com/pooria7" target="_blank">
              <Image
                className="py-4"
                src="/green-button.png"
                alt="Buy Me A Coffee"
                width={217}
                height={60}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </p>
        </div>
      </section>

      {/* TODO Job Description */}
      {/* <div className='container mx-auto px-4 pb-6'>
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
      </div> */}

      {/* TODO Comparing and revising the resume */}
      {/* <div className='container mx-auto px-4 pb-6'>
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
      </div> */}

      {/* {compareData && (
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
      )} */}
    </div>
  );
}
