import { NextRequest, NextResponse } from "next/server";
import { MemberDataSourceFactory } from "@/lib/dataSources/memberDataSource";
import { getDataSourceConfig } from "@/lib/config/dataSource";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const config = getDataSourceConfig();
        const members = await MemberDataSourceFactory.fetchMembers();
        
        return NextResponse.json({
            success: true,
            dataSource: config.source,
            environment: {
                NODE_ENV: process.env.NODE_ENV,
                VERCEL_ENV: process.env.VERCEL_ENV,
                NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE,
                NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
                NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET: process.env.NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET,
                NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
                ROOT_PATH: process.env.ROOT_PATH,
                ROOT_DEV: process.env.ROOT_DEV,
            },
            membersCount: members.length,
            members: members.slice(0, 3), // Show first 3 members for debugging
            memberSample: members.length > 0 ? {
                id: members[0].id,
                name: members[0].name,
                role: members[0].role,
                hasImage: !!members[0].memberImage?.src,
                imageSrc: members[0].memberImage?.src
            } : null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            environment: {
                NODE_ENV: process.env.NODE_ENV,
                VERCEL_ENV: process.env.VERCEL_ENV,
                NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE,
                NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
                NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET: process.env.NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET,
                NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
                ROOT_PATH: process.env.ROOT_PATH,
                ROOT_DEV: process.env.ROOT_DEV,
            },
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
