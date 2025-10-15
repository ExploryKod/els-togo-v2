import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { MemberDataSourceFactory } from "@/lib/dataSources/memberDataSource";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    try {
        // Fetch members using flexible data source
        const members = await MemberDataSourceFactory.fetchMembers();

        revalidatePath('/api/members');
        return NextResponse.json(members);
    } catch(error) {
        return NextResponse.json([]);
    }
}
