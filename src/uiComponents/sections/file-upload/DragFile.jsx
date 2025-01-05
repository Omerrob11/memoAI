"use client";

import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const DragFile = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const [uploadedFile, setUploadedFile] = useState(null);
  const onDragOver = (event) => {
    console.log("this is working?");
    event.preventDefault();
    setIsDragging(true);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 1) {
      console.log("lollll");
      // show an error on screen
      setError("ניתן לגרור קובץ אחד בלבד");

      // setTimeout(() => {
      //   setError("");
      // }, 3000);
      return;
    }

    setError("");
    const file = event.dataTransfer.files[0];
    setUploadedFile(file);
    console.log("Dropped file:", file.name);

    // file handling logic here.
  };

  function handleFileSubmit(event) {
    console.log("is it submited?");
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  }
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div
        // passing a function reference as a prop
        // we will call this function when the drop event happens
        // its a callback function

        // the prop, is an event prop (or attribute) that react knows is handling events
        // it takes this prop and converts them into proper event listeners
        // props is what we use to pass data to components
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-2xl transition-colors duration-200 p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] text-center ${
          isDragging ? `border-primary bg-primary/5` : `border-gray-300`
        }`}
      >
        {/* nothing rendered if error is empty string */}
        {error && (
          <div
            className="bg-error-500 text-white px-4 py-2 rounded-lg 
    flex items-center gap-2 my-2 w-fit mb-8"
          >
            <span className="text-sm text-white font-medium">{error}</span>
            <button
              onClick={() => setError("")}
              className="text-white hover:text-error-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="bg-primary rounded-full p-4 mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>

        {uploadedFile ? (
          <div className="flex flex-col items-center">
            <p className="text-base text-mainText font-medium">
              {uploadedFile.name}
            </p>
            <p className="text-black font-bold text-xl mt-2  ">
              הקובץ הועלה בהצלחה
            </p>

            <div className="flex gap-4 mt-4">
              {/* <button className="bg-primary hover:bg-primary/80 text-white font-medium rounded-lg px-6 py-2.5 transition-colors duration-200">
                בחר קובץ
              </button> */}

              <label className="cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileSubmit}
                  className="hidden"
                  accept=".pdf,.docx"
                />
                <span className="inline-block bg-primary hover:bg-primary/80 text-white font-medium rounded-lg px-6 py-2.5 transition-colors duration-200">
                  בחר קובץ
                </span>
              </label>

              <button className="bg-success hover:bg-success/80 text-white font-medium rounded-lg px-6 py-2.5 transition-colors duration-200">
                צרו שאלות
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl md:text-2xl text-black font-semibold mb-2">
              גרור קובץ לכאן כדי לייצר שאלות חדשות
            </h2>
            <p className="text-gray-800 mb-4 text-xl md:text-xl">או</p>

            <label className="cursor-pointer">
              <input
                type="file"
                onChange={handleFileSubmit}
                className="hidden"
                accept=".pdf,.docx"
              />
              <span className="bg-primary hover:bg-primary/80 text-white font-medium rounded-lg px-6 py-2.5 transition-colors duration-200">
                בחר קובץ
              </span>
            </label>
          </>
        )}

        <p className="text-gray-400 text-sm mt-4">פורמטים נתמכים: PDF, DOCX</p>
      </div>
    </div>
  );
};

export default DragFile;

// Data tansfer - FileList object to hold any data transfered between contexts - the files that have been draged and dropped - it conatins all the files that been dragged
// files[0] is the first on the list
// each drop is a seperate event - when you drop a file, it is temporarliy saved in the dataTransfer.files object.

// default behavior - open and display the file in the broswer window or download the file.

// we use the input type file to open the file picker dialog
