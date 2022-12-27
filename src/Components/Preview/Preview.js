import React, { useEffect } from "react";
import cross from "../../Assets/cross.svg";

const Preview = ({ template, setShowPreview }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <>
      <div
        onClick={() => setShowPreview(false)}
        className="fixed top-0 left-0 inset-0 bg-[#85848477] z-10"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] lg:w-fit bg-white z-20 pt-10 pb-2 px-2 rounded-lg">
        <img
          onClick={() => setShowPreview(false)}
          src={cross}
          alt=""
          className="w-5 absolute top-3 right-3 cursor-pointer"
        />
        <div
          dangerouslySetInnerHTML={{ __html: template }}
          className="max-h-[85vh] overflow-scroll scrollbar"
        />
      </div>
    </>
  );
};

export default Preview;
