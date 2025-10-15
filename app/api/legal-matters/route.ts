import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { LegalMattersDataSourceFactory } from "@/lib/dataSources/legalMattersDataSource";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const legalMatters = await LegalMattersDataSourceFactory.fetchLegalMatters();
        
        revalidatePath('/api/legal-matters');
        return NextResponse.json(legalMatters);
    } catch (error) {
        return NextResponse.json({
            error: 'Failed to fetch legal matters data',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
