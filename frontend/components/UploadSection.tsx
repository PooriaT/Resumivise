import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { AxiosResponse } from "axios";
import {
  getFastApiData,
  postFastApiFile,
  postFastApiText,
} from "@/src/utils/fastapiCall";
import { v4 as uuidv4 } from "uuid";

const UploadSection = () => {
  const [uploadData, setuploadData] = useState<string | null>(null);
  const [jobDescriptionData, setJobDescriptionData] = useState<string>("");
  const [compareData, setCompareData] = useState<string | null>(null);
  const [reviseData, setReviseData] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string>("");
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const [loadingJobDescription, setLoadingJobDescription] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [loadingRevise, setLoadingRevise] = useState(false);
  const [descriptionLoaded, setDescriptionLoaded] = useState(false);
  const [uploadResumeSection, setUploadResumeSection] = useState(true);
  const [uploadDataSection, setUploadDataSection] = useState(false);

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
        setUploadDataSection(true);
        setUploadResumeSection(false);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoadingBrowse(false);
      }
    }
  };

  const handleCompareClick = async () => {
    console.log("handlecompareclick called");
    try {
      setLoadingCompare(true);
      const response: AxiosResponse = await getFastApiData(
        "compare_resume",
        clientId
      );
      console.log("compare response data:", response.data);
      const jsonData = response.data; // response.data is a string
      setCompareData(jsonData);
      setUploadDataSection(false);
      console.log("data set:", compareData);
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
      console.log("text is uploading...");
      setLoadingJobDescription(true);
      const response: AxiosResponse = await postFastApiText(
        "upload_job_description",
        jobDescriptionData,
        clientId
      );
      console.log("text uploaded!");
      setLoadingJobDescription(false);
      console.log("text uploading done!");
      await handleCompareClick();
    } catch (error) {
      console.error("API Error:", error);
    }

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
  };

  return (
    <>
      {uploadDataSection && (
        <div className="flex flex-col justify-start items-center min-h-screen bg-gray-50">
          <div className="flex flex-col justify-center items-center mb-10">
            <h1 className="text-4xl font-bold mt-16 mb-3">
              Optimize Your Resume In Minutes
            </h1>
            <ul className="timeline">
              <li className="w-56">
                <div className="timeline-end">Upload resume</div>
                <div className="timeline-middle">
                  <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 bg-primary text-secondary">
                    1
                  </div>
                </div>
                <hr className="bg-primary" />
              </li>
              <li className="w-56">
                <hr className="bg-primary" />
                <div className="timeline-middle">
                  <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 border-2 text-secondary bg-primary">
                    2
                  </div>
                </div>
                <div className="timeline-end">Add job description</div>
                <hr className="bg-primary" />
              </li>
              <li className="w-56">
                <hr className={`${compareData && "bg-primary"}`} />
                <div className="timeline-end">View results</div>
                <div className="timeline-middle">
                  <div
                    className={`flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 border-2 ${
                      compareData ? "bg-primary text-secondary" : "bg-secondary"
                    }`}>
                    3
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center bg-secondary border-2 w-2/3 h-96">
            {loadingCompare ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              <form className="flex flex-col justify-center items-center">
                <textarea
                  rows={10}
                  cols={100}
                  placeholder="Paste job description here"
                  value={jobDescriptionData}
                  onChange={(e) => setJobDescriptionData(e.target.value)}
                  className="border-2 p-3"></textarea>
                <br />
                <button
                  onClick={handleTextUpload}
                  className="btn text-secondary hover:bg-accent bg-primary">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {uploadResumeSection && (
        <div
          id="upload-resume"
          className="flex flex-col justify-start items-center min-h-screen bg-gray-50">
          <div className="flex flex-col justify-center items-center mb-10">
            <h1 className="text-4xl font-bold mt-16 mb-3">
              Optimize Your Resume In Minutes
            </h1>
            <ul className="timeline">
              <li className="w-56">
                <div className="timeline-end">Upload resume</div>
                <div className="timeline-middle">
                  <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 bg-primary text-secondary">
                    1
                  </div>
                </div>
                <hr className="bg-primary" />
              </li>
              <li className="w-56">
                <hr className="" />
                <div className="timeline-middle">
                  <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 border-2 bg-secondary">
                    2
                  </div>
                </div>
                <div className="timeline-end">Add job description</div>
                <hr className="" />
              </li>
              <li className="w-56">
                <hr className="" />
                <div className="timeline-end">View results</div>
                <div className="timeline-middle">
                  <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 border-2 bg-secondary">
                    3
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center bg-secondary border-2 w-2/3 h-96">
            {loadingBrowse ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              <>
                <Image
                  src={"/icon.jpg"}
                  height={100}
                  width={100}
                  alt="upload icon"></Image>
                <label
                  htmlFor="resume-input"
                  className="btn hover:bg-secondary bg-secondary border-2 mb-2 border-primary">
                  Upload your resume
                  <input
                    id="resume-input"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={loadingBrowse}
                  />
                </label>
                <p className="text-accent">in DOCX or PDF format</p>
                <p className="mx-auto text-accent text-xs mt-3">
                  Remove the confidential information from your resume, such as
                  address, phone number, or email, before uploading!
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {compareData && (
        <div
          id="upload-resume"
          className="flex flex-col justify-start items-center min-h-screen bg-gray-50 pb-16">
          <div className="flex flex-col justify-center items-center mb-10">
            <h1 className="text-4xl font-bold mt-16 mb-3">
              Optimize Your Resume In Minutes
            </h1>
            <ul className="timeline">
              <li className="w-56">
                <div className="timeline-end">Upload resume</div>
                <div className="timeline-middle">
                  <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 bg-primary text-secondary">
                    1
                  </div>
                </div>
                <hr className="bg-primary" />
              </li>
              <li className="w-56">
                <hr className="bg-primary" />
                <div className="timeline-middle">
                  <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 border-2 bg-primary text-secondary">
                    2
                  </div>
                </div>
                <div className="timeline-end">Add job description</div>
                <hr className="bg-primary" />
              </li>
              <li className="w-56">
                <hr className="bg-primary" />
                <div className="timeline-end">View results</div>
                <div className="timeline-middle">
                  <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 border-2 bg-primary text-secondary">
                    3
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center bg-secondary border-2 w-2/3 overflow-auto p-6">
            {compareData}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadSection;
