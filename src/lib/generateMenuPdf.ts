import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { menuData, MenuItem } from './menu';

export async function generateMenuPdfBuffer(): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  // A4 Dimensions in points: 595.28 x 841.89
  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;
  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

  // Embed Fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);
  const fontMonoBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

  const black = rgb(0.05, 0.05, 0.05);
  const white = rgb(1, 1, 1);
  const grayDark = rgb(0.3, 0.3, 0.3);
  const grayLight = rgb(0.85, 0.85, 0.85);
  const grayLine = rgb(0.75, 0.75, 0.75);

  const marginX = 28;
  const contentWidth = PAGE_WIDTH - 2 * marginX; // 539.28

  // Helper to draw category banner
  const drawCategoryBanner = (title: string, x: number, y: number, width: number, height: number = 20) => {
    // Slanted or straight stylish banner
    page.drawRectangle({
      x,
      y: y - height,
      width,
      height,
      color: black,
    });
    page.drawText(title, {
      x: x + 8,
      y: y - height + 6,
      size: 9.5,
      font: fontBold,
      color: white,
    });
  };

  // Helper to draw a single menu item
  const drawMenuItem = (item: MenuItem, x: number, y: number, colWidth: number) => {
    // Item Name
    const nameText = item.name.toUpperCase();
    page.drawText(nameText, {
      x,
      y,
      size: 8.5,
      font: fontBold,
      color: black,
    });

    // Best badge if recommended
    if (item.recommended) {
      const nameWidth = fontBold.widthOfTextAtSize(nameText, 8.5);
      page.drawRectangle({
        x: x + nameWidth + 4,
        y: y - 1,
        width: 28,
        height: 10,
        color: black,
      });
      page.drawText("BEST", {
        x: x + nameWidth + 7,
        y: y + 1,
        size: 6.5,
        font: fontBold,
        color: white,
      });
    }

    // Price & Indicator on Right
    let typeIndicator = "";
    if (item.type === "cold") typeIndicator = "*"; // snowflake representation
    else if (item.type === "hot") typeIndicator = "~"; // hot steam
    
    const priceText = `${item.price} ${typeIndicator}`.trim();
    const priceWidth = fontMonoBold.widthOfTextAtSize(priceText, 8.5);
    page.drawText(priceText, {
      x: x + colWidth - priceWidth,
      y,
      size: 8.5,
      font: fontMonoBold,
      color: black,
    });

    // Description line
    if (item.desc) {
      const descText = `--. ${item.desc}`;
      page.drawText(descText, {
        x,
        y: y - 10,
        size: 7,
        font: fontRegular,
        color: grayDark,
      });
    }

    // Subtle divider line
    page.drawLine({
      start: { x, y: y - 15 },
      end: { x: x + colWidth, y: y - 15 },
      thickness: 0.5,
      color: grayLight,
    });
  };

  // ================= 1. HEADER =================
  let currentY = PAGE_HEIGHT - 28;

  // Try embedding logo if exists
  const logoPath = path.resolve('public/logo.png');
  let logoDrawn = false;
  if (fs.existsSync(logoPath)) {
    try {
      const logoBytes = fs.readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoDim = logoImage.scale(0.35);
      page.drawImage(logoImage, {
        x: marginX,
        y: currentY - logoDim.height,
        width: logoDim.width,
        height: logoDim.height,
      });
      logoDrawn = true;
    } catch (e) {
      // fallback to text
    }
  }

  if (!logoDrawn) {
    page.drawText("GLITCH COFFEE", {
      x: marginX,
      y: currentY - 18,
      size: 20,
      font: fontBold,
      color: black,
    });
  }

  // Header Right info
  const rightMetaX = PAGE_WIDTH - marginX - 180;
  page.drawText("STEP INTO THE STATIC // MENU", {
    x: rightMetaX,
    y: currentY - 10,
    size: 7.5,
    font: fontBold,
    color: black,
  });
  page.drawText("Jl. Mulawarman No. 170 Rt. 24, Manggar", {
    x: rightMetaX,
    y: currentY - 20,
    size: 6.5,
    font: fontRegular,
    color: grayDark,
  });
  page.drawText("WhatsApp Order: 0895-2753-9529", {
    x: rightMetaX,
    y: currentY - 30,
    size: 6.5,
    font: fontMono,
    color: grayDark,
  });

  currentY -= 46;

  // Header separator line
  page.drawLine({
    start: { x: marginX, y: currentY },
    end: { x: PAGE_WIDTH - marginX, y: currentY },
    thickness: 1.2,
    color: black,
  });

  currentY -= 15;

  // Find Categories from menuData
  const milkBlend = menuData.find(c => c.category.includes("MILK BLEND"))?.items || [];
  const noirCoffee = menuData.find(c => c.category.includes("NOIR"))?.items || [];
  const nonCoffee = menuData.find(c => c.category.includes("NON COFFEE"))?.items || [];
  const snacks = menuData.find(c => c.category.includes("SNACK"))?.items || [];

  // ================= 2. TIER 1: MILK BLEND & NOIR COFFEE =================
  const tier1TopY = currentY;
  const leftColWidth = 335;
  const rightColWidth = contentWidth - leftColWidth - 15; // 189.28
  const rightColX = marginX + leftColWidth + 15;

  // Left: MILK BLEND COFFEE
  drawCategoryBanner("MILK BLEND COFFEE", marginX, tier1TopY, leftColWidth, 18);

  const milkSubColWidth = (leftColWidth - 15) / 2; // 160
  const milkCol1 = milkBlend.slice(0, 8);
  const milkCol2 = milkBlend.slice(8, 16);

  const itemRowHeight = 29.5;
  const itemsStartY = tier1TopY - 30;

  milkCol1.forEach((item, i) => {
    drawMenuItem(item, marginX, itemsStartY - (i * itemRowHeight), milkSubColWidth);
  });

  milkCol2.forEach((item, i) => {
    drawMenuItem(item, marginX + milkSubColWidth + 15, itemsStartY - (i * itemRowHeight), milkSubColWidth);
  });

  // Right: NOIR COFFEE SERIES
  drawCategoryBanner("NOIR COFFEE SERIES", rightColX, tier1TopY, rightColWidth, 18);

  noirCoffee.slice(0, 8).forEach((item, i) => {
    drawMenuItem(item, rightColX, itemsStartY - (i * itemRowHeight), rightColWidth);
  });

  currentY = itemsStartY - (8 * itemRowHeight) - 8;

  // Divider
  page.drawLine({
    start: { x: marginX, y: currentY },
    end: { x: PAGE_WIDTH - marginX, y: currentY },
    thickness: 0.8,
    color: grayLine,
  });

  currentY -= 15;

  // ================= 3. TIER 2: NON COFFEE SERIES =================
  const tier2TopY = currentY;
  drawCategoryBanner("NON COFFEE SERIES", marginX, tier2TopY, contentWidth, 18);

  const nonCoffeeSubColWidth = (contentWidth - 30) / 3; // 169.76
  const ncCol1 = nonCoffee.slice(0, 4);
  const ncCol2 = nonCoffee.slice(4, 8);
  const ncCol3 = nonCoffee.slice(8);

  const ncStartY = tier2TopY - 30;
  ncCol1.forEach((item, i) => {
    drawMenuItem(item, marginX, ncStartY - (i * itemRowHeight), nonCoffeeSubColWidth);
  });
  ncCol2.forEach((item, i) => {
    drawMenuItem(item, marginX + nonCoffeeSubColWidth + 15, ncStartY - (i * itemRowHeight), nonCoffeeSubColWidth);
  });
  ncCol3.forEach((item, i) => {
    drawMenuItem(item, marginX + (nonCoffeeSubColWidth + 15) * 2, ncStartY - (i * itemRowHeight), nonCoffeeSubColWidth);
  });

  currentY = ncStartY - (4 * itemRowHeight) - 8;

  // Divider
  page.drawLine({
    start: { x: marginX, y: currentY },
    end: { x: PAGE_WIDTH - marginX, y: currentY },
    thickness: 0.8,
    color: grayLine,
  });

  currentY -= 15;

  // ================= 4. TIER 3: SNACKS & SLOGAN =================
  const tier3TopY = currentY;
  const snackColWidth = 230;

  drawCategoryBanner("SNACK / MAKANAN", marginX, tier3TopY, snackColWidth, 18);

  const snackStartY = tier3TopY - 30;
  snacks.forEach((item, i) => {
    drawMenuItem(item, marginX, snackStartY - (i * itemRowHeight), snackColWidth);
  });

  // Right Side of Tier 3: Bold Slogan
  const sloganX = marginX + snackColWidth + 30;
  page.drawText("HANDCRAFTED.", {
    x: sloganX,
    y: tier3TopY - 26,
    size: 26,
    font: fontBold,
    color: black,
  });
  page.drawText("UNEXPECTED.", {
    x: sloganX,
    y: tier3TopY - 56,
    size: 26,
    font: fontBold,
    color: black,
  });
  page.drawText("YOURS.", {
    x: sloganX,
    y: tier3TopY - 86,
    size: 26,
    font: fontBold,
    color: black,
  });

  // Small note
  page.drawText("GLITCH MODULE: 250 ML & 1 LITER READY TO ORDER", {
    x: sloganX,
    y: tier3TopY - 105,
    size: 7,
    font: fontMonoBold,
    color: black,
  });

  // ================= 5. FOOTER =================
  const footerY = 28;
  page.drawLine({
    start: { x: marginX, y: footerY + 12 },
    end: { x: PAGE_WIDTH - marginX, y: footerY + 12 },
    thickness: 0.8,
    color: black,
  });

  page.drawText("* ICE AVAILABLE  |  ~ HOT AVAILABLE  |  DINE-IN • TAKEAWAY • GOFOOD • SHOPEEFOOD", {
    x: marginX,
    y: footerY + 2,
    size: 6.5,
    font: fontMono,
    color: grayDark,
  });

  const copyrightText = "© 2026 GLITCH COFFEE. ALL RIGHTS RESERVED.";
  const crWidth = fontMono.widthOfTextAtSize(copyrightText, 6.5);
  page.drawText(copyrightText, {
    x: PAGE_WIDTH - marginX - crWidth,
    y: footerY + 2,
    size: 6.5,
    font: fontMono,
    color: grayDark,
  });

  return await pdfDoc.save();
}

// If run directly via node
if (process.argv[1]?.includes('generateMenuPdf')) {
  generateMenuPdfBuffer().then(buf => {
    fs.writeFileSync('public/menu-glitch-coffee.pdf', buf);
    console.log("PDF generated successfully from live menuData!");
  }).catch(console.error);
}
