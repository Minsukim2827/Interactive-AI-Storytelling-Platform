import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generatePDF = (data) => {
  console.log(data); // Print the data object to console

  // Find the content container
  const content = document.getElementById("pdfContent");
  console.log("content of Content variable:");
  console.log(content);
  // Create an array to store promises for image loading
  const imagePromises = [];

  // Function to create a promise for loading an image
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Iterate through each image URL in the data and load them
  for (let i = 0; i < 5; i++) {
    // Assuming 5 images, adjust the loop based on your data
    const imageUrl = data[`image${i + 1}`]; // Assuming image keys are image1, image2, ..., image5
    if (imageUrl) {
      const promise = loadImage(imageUrl);
      imagePromises.push(promise);
    }
  }

  // Wait for all image promises to resolve
  Promise.all(imagePromises)
    .then(() => {
      // Once all images are loaded, proceed with PDF generation

      // Create a new jsPDF instance
      const pdf = new jsPDF();
      // Convert the content into a canvas
      html2canvas(content).then((canvas) => {
        // Add the canvas to the PDF
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0);

        // Save the PDF
        pdf.save(`${data.storybook_title}.pdf`);
      });
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
};

export default generatePDF;
