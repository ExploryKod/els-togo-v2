import { NextRequest, NextResponse } from "next/server";
import { getDataSourceConfig } from "@/lib/config/dataSource";
import { ProjectDataSourceFactory } from "@/lib/dataSources/projectDataSource";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const config = getDataSourceConfig();
        const projects = await ProjectDataSourceFactory.fetchProjectsWithFallback();
        
        return NextResponse.json({
            config,
            projectCount: projects.length,
            projects: projects.slice(0, 2), // Show first 2 projects
            environment: {
                NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE,
                NODE_ENV: process.env.NODE_ENV,
            }
        });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error',
            config: getDataSourceConfig(),
            environment: {
                NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE,
            }
        }, { status: 500 });
    }
}
