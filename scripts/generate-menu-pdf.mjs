import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

async function generatePDF() {
  const imagePath = path.resolve('public/images/menu-glitch-coffee.jpg');
  const pdfPath = path.resolve('public/menu-glitch-coffee.pdf');

  const imageBytes = fs.readFileSync(imagePath);

  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedJpg(imageBytes);

  // Set page dimensions to match image aspect ratio
  const { width, height } = image.scale(1);
  const page = pdfDoc.addPage([width, height]);

  page.drawImage(image, {
    x: 0,
    y: 0,
    width: width,
    height: height,
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(pdfPath, pdfBytes);
  console.log('Menu PDF successfully generated at:', pdfPath);
}

generatePDF().catch(console.error);

