import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { fetchCategories } from "@/sanity/lib/fetchCategories";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest) {
    try {
        // Fetch categories from Sanity
        const categories = await fetchCategories();

        revalidatePath('/api/categories');
        return NextResponse.json(categories);
    } catch(error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({
            error: "Failed to fetch categories",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
