import { supabase } from "@/servcies/supabase";
import mammoth from "mammoth";
import pdf from "pdf-parse/lib/pdf-parse";

// rounte handler for extract-text
// must return a response
// DO: take supabase file, and process it, return only the text
// FORMAT AVILABLE: docx, pdf
export async function POST(req) {
  try {
    // getting the document path from the request body
    const documentData = await req.json();
    const docPath = documentData.documentPath;

    // api call can come from different places
    if (!docPath) {
      return Response.json(
        {
          message: "no path has been given",
        },
        {
          status: 400,
        }
      );
    }

    const storageRef = await supabase.storage;
    const documentsBuckets = storageRef.from("documents");
    const downloadDocument = await documentsBuckets.download(docPath);
    if (downloadDocument.error) {
      console.error("supabas download error: ", downloadDocument.error);
      return Response.json(
        {
          message: "failed to download supabase doc",
        },
        {
          status: 500,
        }
      );
    }

    const fileData = downloadDocument.data;
    const fileExtension = docPath.split(".").pop().toLowerCase();
    if (fileExtension !== "pdf" && fileExtension !== "docx") {
      throw new Error(
        "Unsupported file type. Please upload a PDF or DOCX file."
      );
    }

    let extractedText;
    if (fileExtension === "pdf") {
      const arrayBuffer = await fileData.arrayBuffer();
      const pdfData = await pdf(arrayBuffer);
      extractedText = pdfData.text;
    } else if (fileExtension === "docx") {
      const arrayBuffer = await fileData.arrayBuffer();
      const result = mammoth.extractRawText({ arrayBuffer });
      extractedText = result.value;
    }

    if (!extractedText) {
      return Response.json(
        {
          message: "failed to extract text from document",
        },
        {
          status: 500,
        }
      );
    }
    return Response.json({
      text: extractedText,
    });
  } catch (error) {
    console.log("lol this is error baby");
    return Response.json(
      { message: `failed to process document" + ${error.message}` },
      { status: 500 }
    );
  }
}
