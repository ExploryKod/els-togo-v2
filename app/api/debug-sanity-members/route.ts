import { NextRequest, NextResponse } from "next/server";
import { fetchMembers } from "@/sanity/lib/fetchMembers";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const members = await fetchMembers();
        
        return NextResponse.json({
            success: true,
            membersCount: members.length,
            members: members,
            environment: {
                NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
                NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET: process.env.NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET,
                NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
                NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            environment: {
                NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
                NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET: process.env.NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET,
                NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
                NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
            },
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
