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
    return data;
  } catch (error) {
    return { error };
    // so we could use result.error
  }
}

// but i think its more important to be fast and make things visually appealing
// you can refactor anything as you learn to become a better developer
// its a 2-3 years journey.
