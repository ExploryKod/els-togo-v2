import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ProjectDataSourceFactory } from "@/lib/dataSources/projectDataSource";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    try {
        // Fetch projects using flexible data source with fallback
        const projects = await ProjectDataSourceFactory.fetchProjectsWithFallback();

        // For front page, we might want to limit the data returned
        const frontPageProjects = projects.map(project => ({
            id: project.id,
            slug: project.slug,
            title: project.title,
            accroche: project.accroche,
            description: project.description,
            date: project.date,
            place: project.place,
            category: project.category,
            projectImg: project.projectImg,
        }));

        revalidatePath('/api/projects');
        return NextResponse.json(frontPageProjects);
    } catch(error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ 
            error: "Failed to fetch projects from all data sources",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
