import { supabase } from "@/servcies/supabase";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

// we export a post function - so this endpoint, which is a path that the client will "go to" when we upload the doc
// and this endpoint, is a post request, that then we will handle in the server
// this endpoint handle post requests

// goal of this:
// get the document from Supabase storage by using the path
// extract it for processing.
export async function POST(req) {
  try {
    // get the data from the request body
    const requestData = await req.json();
    const documentPath = requestData.documentPath;

    if (!documentPath) {
      return Response.json(
        {
          error: "Documenth path is required",
        },
        {
          status: 400,
        }
      );
    }

    // getting a reference to supabase storage
    const storageRef = await supabase.storage;

    // get the correct bucket - where the documents reside
    const documentsBucket = storageRef.from("documents");

    // download the document, using the document path
    // download method returns a blob of the fil'es data - but we get it as a response object
    const downloadResponse = await documentsBucket.download(documentPath);

    if (downloadResponse.error) {
      console.error("supabase donlwoad error: ", downloadResponse.error);
      return Response.json(
        {
          error: " failed to download document from storage",
        },
        { status: 500 }
      );
    }

    // get the actual file data (blob contating the document)
    const fileData = downloadResponse.data;
    // split the file at the dot, and takes the last piece of it (pop()), and convert it to lowercase
    const fileExtension = documentPath.split(".").pop().toLowerCase();
    console.log("Successfully retrieved document, size:", fileData.size);

    // we will support more formats later on
    if (fileExtension !== "pdf" && fileExtension !== "docx") {
      throw new Error(
        "Unsupported file type. Please upload a PDF or DOCX file."
      );
    }

    let extractedText;
    if (fileExtension === "pdf") {
      // conver the blob to arrayBuffer which pdfParse can read
      //  arrray buffer is a format that our pdf tool can understand, simmilar to asking a document out of an envelope
      //   array buffer is a table of data - we transform it to array buffer, very orgnaize way
      const arrayBuffer = await fileData.arrayBuffer();
      const pdfData = await pdfParse(arrayBuffer);
      extractedText = pdfData.text;
    } else if (fileExtension === "docx") {
      const arrayBuffer = await fileData.arrayBuffer();
      const result = mammoth.extractRawText({ arrayBuffer });
      extractedText = result.value;
    }

    if (!extractedText) {
      return Response.json(
        {
          error: "failed to extract text from document",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json({
      success: true,
      message: "text successfully extraxted",
      preview: extractedText.slice(0, 100),
      totalLength: extractedText.length,
    });
  } catch (error) {
    console.log("lol this is error baby");
    return Response.json(
      { error: "failed to process document" },
      { status: 500 }
    );
  }
}

// On supabase
// supabase storge store our file, we need to know which folder them the file resides ("documents")
// we need the file path - getting the documenthPath
// then we download the document - donlowad gets the file data as BLOB - its a packjge containg the raw data, its not text.
// we can read the blob as text or binary data

// questions:
// 1. what will be in the request body

// blob: its just the raw data, a sealed box with the raw binary data
// but the content inside the box is orangaized in different way, depending on the file format - either pdf or docx
