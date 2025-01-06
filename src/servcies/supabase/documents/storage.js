import { supabase } from "../client";

export async function uploadDocument(file) {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    // object decustruting - unpackeging the items
    // when database return a response, we get an object with data / error
    // we get response object, with response.data or response.error
    // from supabase we get a promises that resolves to an object
    // the object has the data object or error object, one of them is null
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(fileName, file);

    //   we will always get data and error - one of them will be null and the other not
    // but only one has actualy value - the other one will be null
    if (error) throw error;

    // data from supabase uploads: full path where the file is stored, file size, content type, time stamp, etc...
    // is a data object, where we would have the data.path
    // we return it to the calling code
    return data;
  } catch (error) {
    // so we could use result.error
    // so the idea is to check if in the return code
    // we have a property that is named error
    return {
      // we are extracting just the description of the built in javascript error object
      error: {
        message: error.message,
      },
    };
  }
}

// how does a response object looks like.
