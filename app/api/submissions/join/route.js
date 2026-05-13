import { NextResponse } from 'next/server';
import { saveJoinSubmission } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Process form fields
    const data = {};
    for (const [key, value] of formData.entries()) {
      if (key !== 'resume') {
        data[key] = value;
      }
    }

    // Process file upload and validation
    const file = formData.get('resume');
    
    if (file && file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    let resumeUrl = null;

    if (file && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      
      const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';
      const uploadDir = isVercel 
        ? path.join('/tmp', 'uploads', 'resumes')
        : path.join(process.cwd(), 'public', 'uploads', 'resumes');

      try {
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        
        // Note: On Vercel, /tmp files are not publicly accessible via URL.
        // This is a temporary testing fix.
        resumeUrl = isVercel ? `/tmp/uploads/resumes/${filename}` : `/uploads/resumes/${filename}`;
      } catch (uploadError) {
        console.error("Could not save file, using fallback:", uploadError);
        resumeUrl = "File upload failed due to read-only filesystem";
      }
    }

    const submission = {
      ...data,
      resumeUrl,
      createdAt: new Date().toISOString(),
    };

    saveJoinSubmission(submission);

    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving join submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
