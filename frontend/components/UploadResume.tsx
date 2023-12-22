import { postFastApiFile } from "@/src/utils/fastapiCall";
import React, { ChangeEvent, useState } from "react";

type Props = {
  clientId: string;
};

const UploadResume: React.FC<Props> = ({ clientId }) => {
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

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

  return (
    <>
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
    </>
  );
};

export default UploadResume;
