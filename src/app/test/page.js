// "use client"; // client component

// import { supabase } from "../../servcies/supabase/client";
// import { useState } from "react";

// export default function TestPage() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [status, setStatus] = useState("no file selected");
// //
//   function handleFileSelect(event) {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   }

//   async function handleUpload() {
//     if (!selectedFile) {
//       setStatus("please select a file first");
//       return;
//     }

//     try {
//       setStatus("uploading...");
//       const fileName = `${Date.now()}-${selectedFile.name}`;
//       const { data, error } = await supabase.storage
//         .from("documents")
//         .upload(fileName, selectedFile);

//       if (error) throw error;
//       setStatus("upload sucsusfully");
//     } catch (error) {
//       setStatus("Upload failed: " + error.message);
//       console.error("Upload error:", error);
//     }
//   }
//   return (
//     <div>
//       <h1>Document Storage Test</h1>
//       <input type="file" onChange={handleFileSelect} />
//       {selectedFile && <p>Selected file: {selectedFile.name}</p>}

//       <button onClick={handleUpload}>Upload documnet</button>
//     </div>
//   );
// }
