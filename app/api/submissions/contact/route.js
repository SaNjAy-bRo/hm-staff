import { NextResponse } from 'next/server';
import { saveContactSubmission } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const submission = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    saveContactSubmission(submission);

    return NextResponse.json({ message: 'Submission successful' }, { status: 200 });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
