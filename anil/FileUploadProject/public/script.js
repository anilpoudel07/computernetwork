document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("File uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error uploading file.");
      });
  });
