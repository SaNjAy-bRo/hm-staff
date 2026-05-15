import fs from 'fs';
import path from 'path';

const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';
const dataDir = isVercel ? '/tmp/data' : path.join(process.cwd(), 'data');

// Ensure data directory exists
try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
} catch (error) {
  console.warn("Could not create data directory, using fallback:", error);
}

const joinFile = path.join(dataDir, 'join-submissions.json');
const contactFile = path.join(dataDir, 'contact-submissions.json');

// Initialize files if they don't exist
try {
  const localDataDir = path.join(process.cwd(), 'data');
  const localJoinFile = path.join(localDataDir, 'join-submissions.json');
  const localContactFile = path.join(localDataDir, 'contact-submissions.json');

  if (!fs.existsSync(joinFile)) {
    if (isVercel && fs.existsSync(localJoinFile)) {
      fs.copyFileSync(localJoinFile, joinFile);
    } else {
      fs.writeFileSync(joinFile, JSON.stringify([]));
    }
  }

  if (!fs.existsSync(contactFile)) {
    if (isVercel && fs.existsSync(localContactFile)) {
      fs.copyFileSync(localContactFile, contactFile);
    } else {
      fs.writeFileSync(contactFile, JSON.stringify([]));
    }
  }
} catch (error) {
  console.warn("Could not initialize JSON files:", error);
}

// ── Join Submissions ────────────────────────────────────────────

export function getJoinSubmissions() {
  try {
    const data = fs.readFileSync(joinFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function saveJoinSubmission(submission) {
  try {
    const submissions = getJoinSubmissions();
    submissions.unshift({ id: Date.now().toString(), ...submission });
    fs.writeFileSync(joinFile, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error("Failed to save join submission:", error);
  }
}

export function updateJoinSubmission(id, updatedData) {
  try {
    const submissions = getJoinSubmissions();
    const index = submissions.findIndex(s => s.id === id);
    if (index === -1) return false;
    submissions[index] = { ...submissions[index], ...updatedData, id };
    fs.writeFileSync(joinFile, JSON.stringify(submissions, null, 2));
    return true;
  } catch (error) {
    console.error("Failed to update join submission:", error);
    return false;
  }
}

export function deleteJoinSubmission(id) {
  try {
    const submissions = getJoinSubmissions();
    const filtered = submissions.filter(s => s.id !== id);
    if (filtered.length === submissions.length) return false;
    fs.writeFileSync(joinFile, JSON.stringify(filtered, null, 2));
    return true;
  } catch (error) {
    console.error("Failed to delete join submission:", error);
    return false;
  }
}

// ── Contact Submissions ─────────────────────────────────────────

export function getContactSubmissions() {
  try {
    const data = fs.readFileSync(contactFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function saveContactSubmission(submission) {
  try {
    const submissions = getContactSubmissions();
    submissions.unshift({ id: Date.now().toString(), ...submission });
    fs.writeFileSync(contactFile, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error("Failed to save contact submission:", error);
  }
}

export function updateContactSubmission(id, updatedData) {
  try {
    const submissions = getContactSubmissions();
    const index = submissions.findIndex(s => s.id === id);
    if (index === -1) return false;
    submissions[index] = { ...submissions[index], ...updatedData, id };
    fs.writeFileSync(contactFile, JSON.stringify(submissions, null, 2));
    return true;
  } catch (error) {
    console.error("Failed to update contact submission:", error);
    return false;
  }
}

export function deleteContactSubmission(id) {
  try {
    const submissions = getContactSubmissions();
    const filtered = submissions.filter(s => s.id !== id);
    if (filtered.length === submissions.length) return false;
    fs.writeFileSync(contactFile, JSON.stringify(filtered, null, 2));
    return true;
  } catch (error) {
    console.error("Failed to delete contact submission:", error);
    return false;
  }
}
