"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  getFastApiData,
  postFastApiFile,
  postFastApiText,
} from "@/src/utils/fastapiCall";
import { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";

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

  return (
    <div>
      <Hero />
      <UploadSection/>
    </div>
  );
}
