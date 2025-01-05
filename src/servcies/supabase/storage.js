import { supabase } from "./client";

export async function uploadDocument(file) {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    // object decustruting - unpackeging the items
    // when data base return a response, we get an object with data / error
    // we get response object, with response.data or response.error
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(fileName, file);

    //   we will always get data and error - one of them will be null and the other not
    // but only one has actualy value - the other one will be null
    if (error) throw error;

    // after sucsusfull upload, we process the documenht that we just uploaded.
    // we send in the body the document path
    const processResponse = await fetch("/api/process-document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // we send data over the interenet, needs to be text format
      // we translte the js data instaed of using javascript object directly
      // so we turn the object we have to string like
      body: JSON.stringify({
        documentPath: fileName,
      }),
    });

    const processResult = await processResponse.json();

    // data from supabase uploads: full path where the file is stored, file size, content type, time stamp, etc...
    return {
      uploadData: data,
      // the value - it will look for it in the current scope, not in the variable name
      // even if the variable name and the property name the same - we look for the correct variable in scope
      processResult: processResult,
    };
  } catch (error) {
    return { error };
    // so we could use result.error
  }
}

// but i think its more important to be fast and make things visually appealing
// you can refactor anything as you learn to become a better developer
// its a 2-3 years journey.
