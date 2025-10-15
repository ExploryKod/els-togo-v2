import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { WebsiteSectionsDataSourceFactory } from "@/lib/dataSources/websiteSectionsDataSource";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    try {
        // Fetch website sections using flexible data source
        const sections = await WebsiteSectionsDataSourceFactory.fetchWebsiteSections();
        revalidatePath('/api/website-sections');
        return NextResponse.json({
            ...sections,
            _debug: {
                timestamp: new Date().toISOString(),
                source: 'api'
            }
        });
    } catch(error) {
        // Return fallback data instead of empty response
        const { WebsiteSectionsMapper } = await import("@/lib/mappers/WebsiteSectionsMapper");
        const fallbackSections = WebsiteSectionsMapper.createFallback();
        return NextResponse.json({
            ...fallbackSections,
            _debug: {
                timestamp: new Date().toISOString(),
                source: 'fallback'
            }
        });
    }
}
