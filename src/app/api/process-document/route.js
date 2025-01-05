import { supabase } from "@/servcies/supabase";

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
    console.log("Successfully retrieved document, size:", fileData.size);

    return Response.json({
      message: "Document recieved",
      size: fileData.size,
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
