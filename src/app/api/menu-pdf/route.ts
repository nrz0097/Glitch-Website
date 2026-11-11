import { NextResponse } from 'next/server';
import { generateMenuPdfBuffer } from '@/lib/generateMenuPdf';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pdfBuffer = await generateMenuPdfBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Glitch-Coffee-Menu-A4.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating menu PDF:', error);
    return new NextResponse('Failed to generate menu PDF', { status: 500 });
  }
}

