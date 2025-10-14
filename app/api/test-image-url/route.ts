import { NextRequest, NextResponse } from "next/server";
import { getSanityImageUrl } from "@/sanity/lib/imageUrl";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const testImageRef = "image-aa69c5fc426133b5a518721efcc624e9bd5bbcd9-3000x2000-jpg";
        const url = getSanityImageUrl(testImageRef);
        
        return NextResponse.json({
            imageRef: testImageRef,
            generatedUrl: url,
            environment: {
                NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
                NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
                NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET: process.env.NEXT_PUBLIC_ELS_TOGO_SANITY_DATASET,
            }
        });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}
