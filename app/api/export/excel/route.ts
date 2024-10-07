// app/api/export/excel/route.ts
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

// Define the structure of your project data
interface Project {
  id: string;
  project_id: string; // need to be less than 31 char
  project_date: string;
  project_title: string;
  project_extract: string;
  project_description: string;
  project_goal: string;
  project_method: string;
  project_results: string;
  project_single_url: string;
}

export async function GET() {
 
  try {
    const SERVER_PATH = process.env.NEXT_PUBLIC_MOD !== 'production' ? process.env.ROOT_DEV : process.env.ROOT_PATH
    let data = await fetch(SERVER_PATH + 'project.json')
    let projects: Project[] = await data.json()

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Iterate over each project object
    projects.forEach(project => {
      // Convert project object to an array of key-value pairs
      const data = Object.entries(project).map(([key, value]) => ({ key, value }));

      // Create a worksheet for this project
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Append the worksheet to the workbook with the project's title as the sheet name
      XLSX.utils.book_append_sheet(workbook, worksheet, project.id);
    });

    // Generate Excel file as binary data
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Convert binary string to array buffer
    const buffer = new ArrayBuffer(excelBuffer.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < excelBuffer.length; i++) {
      view[i] = excelBuffer.charCodeAt(i) & 0xFF;
    }

    // Set response headers for downloading the Excel file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=projects.xlsx',
      },
    });
  } catch (error) {
    console.error("Error generating Excel file:", error); // Log the error
    return NextResponse.json({ error: 'Failed to generate Excel file' });
  }
}
