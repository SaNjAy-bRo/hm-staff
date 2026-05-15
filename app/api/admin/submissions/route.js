import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  getJoinSubmissions,
  saveJoinSubmission,
  updateJoinSubmission,
  deleteJoinSubmission,
  getContactSubmissions,
  saveContactSubmission,
  updateContactSubmission,
  deleteContactSubmission,
} from '@/lib/db';

// Auth check helper
async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  return token && token.value === 'authenticated';
}

// GET — fetch latest data (used by client after mutations)
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const joinSubmissions = getJoinSubmissions();
  const contactSubmissions = getContactSubmissions();

  return NextResponse.json({ joinSubmissions, contactSubmissions });
}

// POST — add a new submission from admin
export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, data } = await request.json();

    if (type === 'join') {
      saveJoinSubmission({ ...data, createdAt: new Date().toISOString() });
    } else if (type === 'contact') {
      saveContactSubmission({ ...data, createdAt: new Date().toISOString() });
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Created successfully' });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT — update an existing submission
export async function PUT(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, id, data } = await request.json();

    let success = false;
    if (type === 'join') {
      success = updateJoinSubmission(id, data);
    } else if (type === 'contact') {
      success = updateContactSubmission(id, data);
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    if (!success) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — delete a submission
export async function DELETE(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, id } = await request.json();

    let success = false;
    if (type === 'join') {
      success = deleteJoinSubmission(id);
    } else if (type === 'contact') {
      success = deleteContactSubmission(id);
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    if (!success) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
