import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-secondary">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold">
            Optimize your resume to get more interviews
          </h1>
          <p className="py-6">
            Say goodbye to the tedious process of tailoring your resume for each
            job application; Resumivise does it for you seamlessly.
          </p>
          <a href="#upload-resume">
            <button className="btn text-secondary hover:bg-accent bg-primary">
              Scan your resume
            </button>
          </a>
        </div>
        <Image
          src="/resume2.jpg"
          width={1200}
          height={1200}
          alt="hero image"
          className="rounded-lg w-1/2"
        />
      </div>
    </div>
  );
};

export default Hero;
