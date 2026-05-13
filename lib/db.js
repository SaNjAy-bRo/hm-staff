import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const joinFile = path.join(dataDir, 'join-submissions.json');
const contactFile = path.join(dataDir, 'contact-submissions.json');

// Initialize files if they don't exist
if (!fs.existsSync(joinFile)) {
  fs.writeFileSync(joinFile, JSON.stringify([]));
}

if (!fs.existsSync(contactFile)) {
  fs.writeFileSync(contactFile, JSON.stringify([]));
}

export function getJoinSubmissions() {
  const data = fs.readFileSync(joinFile, 'utf8');
  return JSON.parse(data);
}

export function saveJoinSubmission(submission) {
  const submissions = getJoinSubmissions();
  submissions.unshift({ id: Date.now().toString(), ...submission });
  fs.writeFileSync(joinFile, JSON.stringify(submissions, null, 2));
}

export function getContactSubmissions() {
  const data = fs.readFileSync(contactFile, 'utf8');
  return JSON.parse(data);
}

export function saveContactSubmission(submission) {
  const submissions = getContactSubmissions();
  submissions.unshift({ id: Date.now().toString(), ...submission });
  fs.writeFileSync(contactFile, JSON.stringify(submissions, null, 2));
}
