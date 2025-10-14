import { NextRequest, NextResponse } from "next/server";
import { fetchProjects } from "@/sanity/lib/fetchProjects";
import { getSanityImageUrl } from "@/sanity/lib/imageUrl";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const projects = await fetchProjects();
        
        const debugInfo = projects.map(project => ({
            id: project.id,
            title: project.title,
            hasProjectImg: !!project.projectImg,
            projectImgAsset: project.projectImg?.asset,
            projectImgRef: project.projectImg?.asset?._ref,
            generatedUrl: project.projectImg?.asset?._ref ? 
                getSanityImageUrl(project.projectImg.asset._ref) : "No image ref",
            fullProjectImg: project.projectImg
        }));
        
        return NextResponse.json({
            projectCount: projects.length,
            projects: debugInfo,
            environment: {
                NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
                NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET: process.env.NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET,
            }
        });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error',
            environment: {
                NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
                NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET: process.env.NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET,
            }
        }, { status: 500 });
    }
}
