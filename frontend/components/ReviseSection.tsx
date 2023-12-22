import React from "react";

type Props = {
  reviseData: string | null;
  setReviseData: React.Dispatch<React.SetStateAction<string | null>>;
};

const ReviseSection: React.FC<Props> = ({ reviseData, setReviseData }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-secondary w-full pb-12">
      <h1 className="text-4xl font-bold mb-12">Revised resume</h1>
      <div className="lg:w-2/3 w-4/5 overflow-auto border-2 rounded-2xl lg:p-10 p-4 lg:text-md text-xs">
        <pre className="whitespace-pre-wrap">{reviseData}</pre>
      </div>
    </div>
  );
};

export default ReviseSection;
