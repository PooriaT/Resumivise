import { getFastApiData, postFastApiText } from '@/src/utils/fastapiCall';
import React, { useState } from 'react'

type Props = {
    clientId: string;
    compareData: string | null;
    setCompareData: React.Dispatch<React.SetStateAction<string | null>>;
  };
  

const UploadJobDescription:React.FC<Props> = ({clientId, compareData, setCompareData}) => {
    const [loadingJobDescription, setLoadingJobDescription] = useState(false);
    const [jobDescriptionData, setJobDescriptionData] = useState<string>("");
    const [showAlert, setShowAlert] = useState(false);
    const [loadingCompare, setLoadingCompare] = useState(false);

    // upload job description
const handleTextUpload = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      setLoadingJobDescription(true);
      if (jobDescriptionData.trim() === "") {
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

  // compare resume
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

  return (
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
  )
}

export default UploadJobDescription