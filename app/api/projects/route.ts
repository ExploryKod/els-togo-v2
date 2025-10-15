import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ProjectDataSourceFactory } from "@/lib/dataSources/projectDataSource";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    try {
        // Fetch projects using flexible data source
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
        // Instead of returning 500, return empty array to prevent frontend errors
        // This allows the page to load with fallback data
        return NextResponse.json([]);
    }
}
