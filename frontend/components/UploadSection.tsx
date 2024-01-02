"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getFastApiData,
  postFastApiFile,
  postFastApiText,
} from "@/src/utils/fastapiCall";
import { v4 as uuidv4 } from "uuid";

export default function UploadSection() {
  const [jobDescriptionData, setJobDescriptionData] = useState<string>("");
  const [compareData, setCompareData] = useState<string | null>(null);
  const [reviseData, setReviseData] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string>("");
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [loadingRevise, setLoadingRevise] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loadingJobDescription, setLoadingJobDescription] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

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
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoadingBrowse(false);
      }
    }
  };

  const handleTextUpload = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      setLoadingJobDescription(true);
      if (jobDescriptionData.trim() === '') {
        setShowAlert(true);
        return;
      }
      const response: Response = await postFastApiText(
        "upload_job_description",
        jobDescriptionData,
        clientId
      );
      setShowAlert(false);
      setLoadingJobDescription(false);
      await handleCompareClick();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleCompareClick = async () => {
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
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingCompare(false);
    }
  };

  const handleReviseClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      setLoadingRevise(true);
      setReviseData("");
      setShowDownload(false);
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
      setShowDownload(true);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingRevise(false);
    }
  };

  const handleDownloadClick = async (
    reviseData: string,
  ) => {
    try {
      const response: Response = await postFastApiText(
        "download_resume",
        reviseData,
        clientId
      );

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = "resume.docx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      } else {
        console.error("API Error:", response.statusText);
      }
      
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <>
      {/* upload resume section */}
      <div
        id="upload-resume"
        className="w-screen flex flex-col justify-start items-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-4xl font-bold my-12 md:text-left text-center">
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
          {/* <p className="mx-auto text-accent text-xs mt-3 text-center">
            Remove the confidential information from your resume,
            <br /> such as address, phone number, or email, before uploading!
          </p> */}
        </div>

        {/* paste job description section */}
        <div className="my-12">
          <form className="flex flex-col justify-center items-center w-screen">
            <textarea
              placeholder="Input Job Description. Write down the requirements for the job you are applying for. For best results, you should copy-paste the job description from LinkedIn or Career Website."
              value={jobDescriptionData}
              onChange={(e) => setJobDescriptionData(e.target.value)}
              className="textarea md:w-1/2 w-2/3 h-56 textarea-bordered bg-secondary"></textarea>
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
            {/* Alert */}
            {showAlert && (
              <div className="bg-red-200 text-red-800 p-2 mt-4 rounded-md">
                <p>Job description field cannot be empty!</p>
              </div>
            )}
          </form>
        </div>

        {/* result section */}
        {compareData !== null && (
          <div className="flex flex-col justify-center items-center bg-secondary w-full overflow-auto pt-12">
            <h1 className="text-4xl font-bold mb-12">Results</h1>
            <div className="lg:w-2/3 w-4/5 overflow-auto border-2 rounded-2xl lg:p-10 p-4 lg:text-md text-xs">
              <pre className="whitespace-pre-wrap">{compareData}</pre>
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
            <div className="lg:w-2/3 w-4/5 overflow-auto border-2 rounded-2xl lg:p-10 p-4 lg:text-md text-xs">
              <pre className="whitespace-pre-wrap">{reviseData}</pre>
            </div>
            {showDownload && (
              <button
                onClick={() => handleDownloadClick(reviseData)}
                className="btn text-secondary hover:bg-accent bg-primary my-12">
                {loadingRevise ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  <div>Download the resume</div>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
