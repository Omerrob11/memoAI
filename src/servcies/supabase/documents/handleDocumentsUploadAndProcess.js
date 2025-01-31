import { uploadDocument } from "./storage";
import { processStoredFile } from "@/servcies/supabase/documents/processFile";

// we are getting the file, and once it dropped in our element, we will call this function
export async function handleDocumentUploadAndProcess(file) {
  try {
    // upload document to supabase
    // get either data object(path, etc) or error object
    const uploadResult = await uploadDocument(file);
    // if error true, throw an error
    if (uploadResult.error) {
      throw new Error(`upload failed: ${uploadResult.error.message}`);
    }

    console.log(uploadResult);

    // we get the data object from the upload
    // pass the file path to the process document
    // getting an object
    const extractedText = await processStoredFile(uploadResult.path);
    // return upload result which give us data about the document in supabase
    // process result, contain the extracted text
    return {
      uploadResult: uploadResult,
      extractedText: extractedText,
    };
  } catch (error) {
    // we will get here if the processDocument will throw an error
    // because in the catch block we throw an error there,
    // so we throw an error in the catch clause, so we will handle it in the nearest catch blcock
    // which is here, because in the function we call to we throw an error inside the catch clause
    // and there is nothing else there
    return {
      // when we call this function, we will know it is an error by doing the:
      // if(result.error)
      // and we also have a message
      error: {
        // it would be the message we got from here or other functions throw errors
        // we return an object, to check for response.error
        message: `document handling failed: ${error.message}`,
      },
    };
  }
}
