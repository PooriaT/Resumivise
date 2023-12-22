import { getFastApiData } from "@/src/utils/fastapiCall";
import React, { useState } from "react";

type Props = {
  clientId: string;
  compareData: string | null;
  setCompareData: React.Dispatch<React.SetStateAction<string | null>>;
  reviseData: string | null;
  setReviseData: React.Dispatch<React.SetStateAction<string | null>>;
};

const ResultSection: React.FC<Props> = ({
  clientId,
  compareData,
  setCompareData,
  reviseData,
  setReviseData,
}) => {
  const [loadingRevise, setLoadingRevise] = useState(false);

  // revise resume
  const handleReviseClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingRevise(false);
    }
  };

  return (
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
  );
};

export default ResultSection;
