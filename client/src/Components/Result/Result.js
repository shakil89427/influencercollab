import React, { useEffect } from "react";
import { useState } from "react";
import cross from "../../Assets/cross.svg";

const Result = ({ showResult, setShowResult }) => {
  const [success, setSuccess] = useState([]);
  const [failed, setFailed] = useState([]);
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    setSuccess(showResult?.filter((item) => item?.status));
    setFailed(showResult?.filter((item) => !item?.status));
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <>
      <div className="fixed top-0 left-0 inset-0 bg-[#85848477] z-10 flex items-center justify-center">
        <div className="w-[95%] max-w-[500px] bg-white p-10 rounded-lg relative">
          <img
            onClick={() => setShowResult(false)}
            src={cross}
            alt=""
            className="w-5 absolute top-3 right-3 cursor-pointer"
          />
          <div className="mb-5">
            <p className="font-semibold text-xl text-center">
              Success({success?.length})
            </p>
            <div className="max-h-[30vh] overflow-y-scroll scrollbar mt-2 text-center">
              {success?.map((item, index) => (
                <p key={index}>{item?.receiver}</p>
              ))}
            </div>
          </div>
          <hr />
          <div className="mt-5">
            <p className="font-semibold text-xl text-center">
              Failed({failed?.length})
            </p>
            <div className="max-h-[30vh] overflow-scroll scrollbar mt-2 text-center">
              {failed?.map((item, index) => (
                <p key={index}>{item?.receiver}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
