import React from "react";

const DisclaimerModal = ({ closeModal }) => {
  return (
    <dialog id="modal" className="modal">
      <div className="modal-box flex flex-col gap-6">
        <h3 className="font-bold text-lg text-red-500">ATTENTION:</h3>
        <p className='mx-auto text-lg'>
        Remove the confidential information from your resume, such as address, phone number, or email, before uploading!
      </p>
      <p className='mx-auto text-lg'>
        Due to the use of GPT-3.5, this process may take a while. Please be patient!
      </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={closeModal}>I understand</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DisclaimerModal;