export async function processStoredFile(documentPath) {
  // if document path not exist, throw an error
  if (!documentPath) {
    throw new Error("Document path is required");
  }
  try {
    const proccessedTextResponse = await fetch("/api/process-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentPath: documentPath,
      }),
    });

    // true if status code is 200-299, false otherwise
    if (!proccessedTextResponse.ok) {
      const errorData = await proccessedTextResponse.json();
      // we will throw the message that we got from our response object
      throw new Error(errorData.message || "Failed to process document");
    }

    // data should be: text:extractedText
    const processedData = await proccessedTextResponse.json();
    return processedData;
  } catch (error) {
    // error will be an error object, with message inside of it - what we put in the throw new error
    // so we throw an error to the calling code, name of Error
    throw new Error(`Document proceessing failed, ${error.message}`);
  }
}
