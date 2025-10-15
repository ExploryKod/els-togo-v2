import { getCredits } from '@/lib/dataSources/creditsDataSource';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const credits = await getCredits();
    return NextResponse.json(credits);
  } catch (error) {
    console.error('Error fetching credits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credits' },
      { status: 500 }
    );
  }
}
