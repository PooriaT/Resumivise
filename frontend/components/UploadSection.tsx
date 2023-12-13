import React from "react";
import Image from "next/image";

const UploadSection = () => {
  return (
    <div id="upload-resume" className="flex flex-col justify-start items-center min-h-screen bg-secondary">
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
              <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 border-2">
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
              <div className="flex justify-center items-center font-extrabold shadow-md rounded-full w-12 h-12 border-2">
                3
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center bg-secondary border-2 w-2/3 h-96">
        <Image
          src={"/icon.jpg"}
          height={100}
          width={100}
          alt="upload icon"></Image>
          <button className="btn hover:bg-secondary bg-secondary border-2 mb-2 border-primary">Upload your resume</button>
          <p className="text-accent">in DOCX or PDF format</p>
      </div>
    </div>
  );
};

export default UploadSection;
