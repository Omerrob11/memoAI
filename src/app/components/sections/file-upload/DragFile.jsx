"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

const DragFile = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className=" border-2 border-dashed rounded-2xl transition-colors duration -200 p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="bg-primary rounded-full p-4 mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          גרור קבצים לכאן כדי לייצר שאלות חדשות
        </h2>

        <p className="text-gray-500 mb-4">או</p>

        <button className="bg-primary hover:bg-mainText text-white font-medium rounded-lg px-6 py-2.5 transition-colors duration-200">
          בחר קבצים
        </button>

        {/* <p className="text-gray-400 text-sm mt-4">פורמטים נתמכים: PDF, DOCX</p> */}
      </div>
    </div>
  );
};

export default DragFile;
