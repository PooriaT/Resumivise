"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getFastApiData,
  postFastApiFile,
  postFastApiText,
} from "@/src/utils/fastapiCall";
import { v4 as uuidv4 } from "uuid";

export default function UploadSection() {
  const [uploadData, setUploadData] = useState<string | null>(null);
  const [jobDescriptionData, setJobDescriptionData] = useState<string>("");
  const [compareData, setCompareData] = useState<string | null>(null);
  const [reviseData, setReviseData] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string>("");
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [loadingRevise, setLoadingRevise] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loadingJobDescription, setLoadingJobDescription] = useState(false);

  const generateClientId = () => {
    const generatedId = uuidv4(); //UUID
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
        setFileName(file.name);
        formData.append("resume", file);
        formData.append("client_id", clientId);
        const response: Response = await postFastApiFile(
          "upload_resume",
          formData
        );
        const jsonData = await response.json();
        console.log("Resume uploaded successfully!");
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoadingBrowse(false);
      }
    }
  };

  const handleCompareClick = async () => {
    console.log("handleCompareClick called");
    try {
      setLoadingCompare(true);
      setCompareData("");
      const response: ReadableStream<Uint8Array> = await getFastApiData(
        "compare_resume",
        clientId
      );
      const reader = response.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        setCompareData((prevData) =>
          prevData
            ? prevData + new TextDecoder().decode(value)
            : new TextDecoder().decode(value)
        );
      }
      console.log("compareData set successfully!");
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingCompare(false);
    }
  };

  const handleTextUpload = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      console.log("job description is uploading...");
      setLoadingJobDescription(true);
      const response: Response = await postFastApiText(
        "upload_job_description",
        jobDescriptionData,
        clientId
      );
      console.log("job description uploaded successfully!");
      setLoadingJobDescription(false);
      await handleCompareClick();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleReviseClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log("handleReviseClick called");
    try {
      setLoadingRevise(true);
      const response: ReadableStream<Uint8Array> = await getFastApiData(
        "revise_resume",
        clientId
      );
      const reader = response.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        setReviseData((prevData) =>
          prevData
            ? prevData + new TextDecoder().decode(value)
            : new TextDecoder().decode(value)
        );
      }
      console.log("reviseData set successfully!");
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingRevise(false);
    }
  };

  return (
    <>
      {/* upload resume section */}
      <div
        id="upload-resume"
        className="flex flex-col justify-start items-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold my-12">
          Optimize Your Resume In Minutes
        </h1>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="resume-input">
            <div className="transition-all hover:bg-accent hover:border-gray-400 bg-primary text-secondary border-2 mb-2 border-primary flex flex-col justify-center items-center rounded-xl gap-2 w-56 h-20 p-6">
              {loadingBrowse ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <>
                  {fileName ? (
                    <div className="truncate">{fileName}</div>
                  ) : (
                    <>
                      <div className="text-lg font-semibold">
                        Upload your resume
                      </div>
                      <div className="text-gray-100 text-xs">
                        in DOCX or PDF format
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <input
              id="resume-input"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={loadingBrowse}
            />
          </label>
          <p className="mx-auto text-accent text-xs mt-3 text-center">
            Remove the confidential information from your resume,
            <br /> such as address, phone number, or email, before uploading!
          </p>
        </div>

        {/* paste job description section */}
        <div className="my-12">
          <form className="flex flex-col justify-center items-center">
            <textarea
              rows={10}
              cols={80}
              placeholder="Input Job Description. Write down the requirements for the job you are applying for. For best results, you should copy-paste the job description from LinkedIn or Career Website."
              value={jobDescriptionData}
              onChange={(e) => setJobDescriptionData(e.target.value)}
              className="border-2 p-3 rounded-xl" 
              required></textarea>
            <br />
            <button
              onClick={handleTextUpload}
              className="btn text-secondary hover:bg-accent bg-primary mt-2">
              {loadingCompare ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <div>Submit</div>
              )}
            </button>
          </form>
        </div>

        {/* result section */}
        {compareData !== null && (
          <div className="flex flex-col justify-center items-center bg-secondary w-full overflow-auto pt-12">
            <h1 className="text-4xl font-bold mb-12">Results</h1>
            <div className="w-2/3 overflow-auto border-2 rounded-2xl p-10">
              <pre>{compareData}</pre>
            </div>
            <button
              onClick={handleReviseClick}
              className="btn text-secondary hover:bg-accent bg-primary my-12">
              {loadingRevise ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <div>Revise my resume</div>
              )}
            </button>
          </div>
        )}

        {/* revise section */}
        {reviseData !== null && (
          <div className="flex flex-col justify-center items-center bg-secondary w-full pb-12">
            <h1 className="text-4xl font-bold mb-12">Revised resume</h1>
            <div className="w-2/3 overflow-auto border-2 rounded-2xl p-10">
              <pre>{reviseData}</pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
