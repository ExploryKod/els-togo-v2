import { NextResponse } from 'next/server';
import { getLegalNotices } from '@/lib/dataSources/legalNoticesDataSource';

export async function GET() {
  try {
    const legalNotices = await getLegalNotices();
    
    if (!legalNotices) {
      return NextResponse.json(
        { error: 'Legal notices not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(legalNotices);
  } catch (error) {
    console.error('Error fetching legal notices:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
