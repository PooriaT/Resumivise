"use client";
import React, { useEffect, useState } from "react";
import generateClientId from "@/src/helpers/generateClientId";
import UploadJobDescription from "./UploadJobDescription";
import ResultSection from "./ResultSection";
import ReviseSection from "./ReviseSection";
import UploadResume from "./UploadResume";

export default function UploadSection() {
  const [compareData, setCompareData] = useState<string | null>(null);
  const [reviseData, setReviseData] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string>("");

  // check if clientId is in localStorage
  useEffect(() => {
    const storedClientId = localStorage.getItem("clientId");

    if (storedClientId) {
      setClientId(storedClientId);
    } else {
      const newClientId = generateClientId();
      localStorage.setItem("clientId", newClientId);
    }
  }, []);

  return (
    <>
      <div
        id="upload-resume"
        className="w-screen flex flex-col justify-start items-center min-h-screen bg-gray-50 p-4">
        {/* upload resume section */}
        <UploadResume clientId={clientId} />

        {/* paste job description section */}
        <UploadJobDescription
          clientId={clientId}
          compareData={compareData}
          setCompareData={setCompareData}
        />

        {/* result section */}
        {compareData !== null && (
          <ResultSection
            clientId={clientId}
            compareData={compareData}
            setCompareData={setCompareData}
            reviseData={reviseData}
            setReviseData={setReviseData}
          />
        )}

        {/* revise section */}
        {reviseData !== null && (
          <ReviseSection
            reviseData={reviseData}
            setReviseData={setReviseData}
          />
        )}
      </div>
    </>
  );
}
