// we are making an api call
// and we will get the content of the document
// sending request with document path, and extract the text (api brings us back object)
// return the object to the calling code
export async function processDocument(documentPath) {
  console.log(documentPath);
  if (!documentPath) {
    throw new Error("Document path is required");
  }

  //   doing an api call needs to be in try - catch clause, because we might get errors - for actions that might fail
  //   and we need to make sure the errors will not crash our stuff
  try {
    //   fetch return a response object in json
    // after sucsusfull upload, we process the documenht that we just uploaded.
    // we send in the body the document path
    const url = "/api/process-document";
    console.log("Calling API endpoint:", url);
    const processResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // we send data over the interenet, needs to be text format
      // we translte the js data instaed of using javascript object directly
      // so we turn the object we have to string like
      body: JSON.stringify({
        documentPath,
      }),
    });

    if (!processResponse.ok) {
      console.log("do we get here in process document");
      const errorData = await processResponse.json();
      console.log(errorData);
      console.log(`this + ${errorData}`);

      throw new Error(errorData.error || "Failed to process document");
    }

    //   convert json to javascript object

    const processedData = await processResponse.json();
    return processedData;
  } catch (error) {
    // throwing an error, so the calling code will have to chek it
    console.error("Processing error:", error);

    throw new Error(`Document processing failed: ${error.message}`);
  }
}
