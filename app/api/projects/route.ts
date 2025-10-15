import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ProjectDataSourceFactory } from "@/lib/dataSources/projectDataSource";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    try {
        // Get pagination parameters from query string
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '6');
        const offset = (page - 1) * limit;
        const q = (searchParams.get('q') || '').toLowerCase().trim();
        const categoriesParam = (searchParams.get('categories') || '').trim();
        const selectedCategories = categoriesParam
            ? categoriesParam.split(',').map((c) => c.toLowerCase().trim()).filter(Boolean)
            : [];

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

        // Apply filtering by search query and categories first
        const filtered = frontPageProjects.filter((p) => {
            const matchesQuery = q
                ? [p.title, p.accroche, p.description, p.place]
                    .filter(Boolean)
                    .some((field) => (field as string).toLowerCase().includes(q))
                : true;

            const matchesCategory = selectedCategories.length > 0
                ? selectedCategories.includes((p.category || '').toLowerCase())
                : true;

            return matchesQuery && matchesCategory;
        });

        // Then apply pagination on filtered results
        const paginatedProjects = filtered.slice(offset, offset + limit);

        revalidatePath('/api/projects');
        return NextResponse.json(paginatedProjects);
    } catch(error) {
        // Instead of returning 500, return empty array to prevent frontend errors
        // This allows the page to load with fallback data
        return NextResponse.json([]);
    }
}
