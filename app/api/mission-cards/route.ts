import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { MissionCardDataSourceFactory } from "@/lib/dataSources/missionCardDataSource";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    try {
        // Fetch mission cards using flexible data source
        const missionCards = await MissionCardDataSourceFactory.fetchMissionCards();

        revalidatePath('/api/mission-cards');
        return NextResponse.json(missionCards);
    } catch(error) {
        return NextResponse.json([]);
    }
}
