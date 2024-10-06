// app/api/export/excel/route.ts
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx'; // Corrected import statement

// Define the structure of your project data
interface Project {
  id: number;
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
  const jsonData: Project[] = [
    {
      id: 1,
      project_date: "Date 1",
      project_title: "Reboisement transfrontalier",
      project_extract: "La Commune de Moyen Mono 1 et la Commune d’Aplahoué plus que jamais déterminées à assurer la protection de leur environnement.",
      project_description: "Initié par l’association ELS-TOGO, le projet transfrontalier Togo/Bénin a pour but de reboiser les rives du plus grand fleuve du Togo...",
      project_goal: "Ce projet vise à contribuer à l’atteinte de l’ambition du gouvernement...",
      project_method: "Sur ce projet nous allons planter des arbres fruitiers et à valeur ajoutés...",
      project_results: "",
      project_single_url: "../uploads/project-1.jpg",
    },
    // Add more project objects here...
  ];

  try {
    // Create a worksheet from the JSON data
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');

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
