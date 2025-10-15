import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ProjectDataSourceFactory } from "@/lib/dataSources/projectDataSource";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    try {
        // Fetch projects using flexible data source
        const projects = await ProjectDataSourceFactory.fetchProjectsWithFallback();

        revalidatePath('/api/projects/details');
        return NextResponse.json(projects);
    } catch(error) {
        console.error("Error fetching projects:", error);
        
        // Instead of returning 500, return empty array to prevent frontend errors
        return NextResponse.json([]);
    }
}
