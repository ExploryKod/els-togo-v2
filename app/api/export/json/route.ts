import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET(req: Request) {
  try {
    // Use fetch to load the file as a blob (public URL)
    const response = await fetch('http://localhost:3000/projects.xlsx'); // Adjust URL for your environment

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to load Excel file' }, { status: 404 });
    }

    // Read the response as an array buffer
    const arrayBuffer = await response.arrayBuffer();

    // Parse the Excel file from the array buffer
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

    const jsonData: any[] = [];

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const project: any = { id: sheetName };

      for (let i = 1; i < data.length; i++) {
        const row:any = data[i];
        if (row.length >= 2) {
          const key = row[0];
          const value = row[1];
          project[key] = value;
        }
      }

      jsonData.push(project);
    });

    return NextResponse.json(jsonData);
  } catch (error:any) {
    console.error('Error reading Excel file:', error);
    return NextResponse.json({ error: `Failed to read Excel file: ${error.message}` }, { status: 500 });
  }
}
