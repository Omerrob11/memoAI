export async function testEnd2(documentPath) {
  console.log(documentPath);
  try {
    const response = await fetch("/api/demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentPath: documentPath,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response);
    console.log("before await respose.json(data)");

    const data = await response.json();
    console.log("after wait respone.json(data)");
    console.log(data);
  } catch (error) {
    throw error;
  }
}
