import { supabase } from "@/servcies/supabase";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function POST(req) {
  try {
    const data = await req.json();
    return Response.json({
      message: "Test API is working!",
      receivedData: data,
    });
    // Parsing the json body of the incoming request and converts it to javascript object
    // const documentData = await req.json();
    // console.log(documentData);
    // const docPath = documentData.documentPath;
    // if (!docPath) {
    //   return Response.json(
    //     {
    //       error: "no path has been given",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }
    // const storageRef = await supabase.storage;
    // const documentsBuckets = storageRef.from("documents");
    // const downloadDocument = await documentsBuckets.download(docPath);
    // if (downloadDocument.error) {
    //   console.error("supabas download error: ", downloadDocument.error);
    //   return Response.json(
    //     {
    //       error: "failed to download supabase doc",
    //     },
    //     {
    //       status: 500,
    //     }
    //   );
    // }
    // const fileData = downloadDocument.data;
    // const fileExtension = docPath.split(".").pop().toLowerCase();
    // if (fileExtension !== "pdf" && fileExtension !== "docx") {
    //   throw new Error(
    //     "Unsupported file type. Please upload a PDF or DOCX file."
    //   );
    // }
    // let extractedText;
    // if (fileExtension === "pdf") {
    //   const arrayBuffer = await fileData.arrayBuffer();
    //   const pdfData = await pdfParse(arrayBuffer);
    //   extractedText = pdfData.text;
    // } else if (fileExtension === "docx") {
    //   const arrayBuffer = await fileData.arrayBuffer();
    //   const result = mammoth.extractRawText({ arrayBuffer });
    //   extractedText = result.value;
    // }
    // if (!extractedText) {
    //   return NextResponse.json(
    //     {
    //       error: "failed to extract text from document",
    //     },
    //     {
    //       status: 500,
    //     }
    //   );
    // }
    // return Response.json({
    //   success: true,
    //   text: extractedText,
    // });
  } catch (error) {
    console.log("lol this is error baby");
    return Response.json(
      { error: "failed to process document" },
      { status: 500 }
    );
  }
}
