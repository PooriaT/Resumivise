import React from "react";

const Cta = () => {
  return (
    <div className="bg-base-100 px-20">
      <div className="flex flex-col justify-center items-start gap-3 h-80 w-1/2">
        <h1 className="text-4xl font-bold mt-16">Ready to stand out?</h1>
        <p className="text-accent">
          Try Resumivise now and unlock the door to your dream career! Start
          customizing your resume for success.
        </p>
        <a href="#upload-resume">
          <button className="btn text-secondary hover:bg-accent bg-primary">
            Scan your resume
          </button>
        </a>
      </div>
    </div>
  );
};

export default Cta;
