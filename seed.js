import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const joinFile = path.join(dataDir, 'join-submissions.json');
const contactFile = path.join(dataDir, 'contact-submissions.json');

const joinSubmissions = [
  {
    id: "101",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.j@example.com",
    phone: "555-0101",
    location: "New York, NY",
    relocate: "Yes",
    workAuth: "Citizen",
    needSponsorship: "No",
    desiredRole: "Frontend Developer",
    otherRole: "",
    employmentType: "Full-Time",
    workModel: "Remote",
    expectedComp: "$90,000",
    noticePeriod: "2 weeks",
    currentJob: "Junior Developer",
    employer: "TechCorp",
    experience: "3",
    education: "Bachelor's Degree",
    coreSkills: "React, Next.js, Tailwind CSS, JavaScript",
    secondarySkills: "Node.js, TypeScript",
    linkedin: "https://linkedin.com/in/alicej",
    portfolio: "https://alicej.dev",
    github: "https://github.com/alicej",
    coverLetter: "I am a frontend developer with 3 years of experience. I love building responsive UIs.",
    resumeUrl: "/dummy.pdf",
    createdAt: new Date(Date.now() - 100000).toISOString()
  },
  {
    id: "102",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    phone: "555-0102",
    location: "Austin, TX",
    relocate: "No",
    workAuth: "Citizen",
    needSponsorship: "No",
    desiredRole: "Backend Developer",
    otherRole: "",
    employmentType: "Full-Time",
    workModel: "Hybrid",
    expectedComp: "$110,000",
    noticePeriod: "1 month",
    currentJob: "Backend Engineer",
    employer: "DataSystems Inc",
    experience: "5",
    education: "Master's Degree",
    coreSkills: "Node.js, Python, PostgreSQL, AWS",
    secondarySkills: "Docker, Kubernetes",
    linkedin: "https://linkedin.com/in/bobsmith",
    portfolio: "",
    github: "https://github.com/bobsmith",
    coverLetter: "Strong background in building scalable APIs and microservices.",
    resumeUrl: null,
    createdAt: new Date(Date.now() - 200000).toISOString()
  },
  {
    id: "103",
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie.d@example.com",
    phone: "555-0103",
    location: "Chicago, IL",
    relocate: "Yes",
    workAuth: "H1B",
    needSponsorship: "Yes",
    desiredRole: "Data Scientist / Engineer",
    otherRole: "",
    employmentType: "Contract",
    workModel: "Remote",
    expectedComp: "$60/hr",
    noticePeriod: "Immediate",
    currentJob: "Data Analyst",
    employer: "FinTech Solutions",
    experience: "2",
    education: "Master's Degree",
    coreSkills: "Python, SQL, Machine Learning, Pandas",
    secondarySkills: "Tableau, R",
    linkedin: "https://linkedin.com/in/charlied",
    portfolio: "",
    github: "https://github.com/charlied",
    coverLetter: "Looking for contract roles in data engineering or data science.",
    resumeUrl: null,
    createdAt: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: "104",
    firstName: "Diana",
    lastName: "Prince",
    email: "diana.p@example.com",
    phone: "555-0104",
    location: "Seattle, WA",
    relocate: "No",
    workAuth: "Citizen",
    needSponsorship: "No",
    desiredRole: "UI/UX Designer",
    otherRole: "",
    employmentType: "Full-Time",
    workModel: "On-site",
    expectedComp: "$95,000",
    noticePeriod: "3 weeks",
    currentJob: "Product Designer",
    employer: "Creative Agency",
    experience: "4",
    education: "Bachelor's Degree",
    coreSkills: "Figma, Adobe XD, Sketch, User Research",
    secondarySkills: "HTML, CSS",
    linkedin: "https://linkedin.com/in/dianap",
    portfolio: "https://dianaprince.design",
    github: "",
    coverLetter: "Passionate about creating intuitive and accessible user experiences.",
    resumeUrl: null,
    createdAt: new Date(Date.now() - 400000).toISOString()
  },
  {
    id: "105",
    firstName: "Ethan",
    lastName: "Hunt",
    email: "ethan.h@example.com",
    phone: "555-0105",
    location: "San Francisco, CA",
    relocate: "No",
    workAuth: "Green Card",
    needSponsorship: "No",
    desiredRole: "DevOps Engineer",
    otherRole: "",
    employmentType: "Full-Time",
    workModel: "Remote",
    expectedComp: "$130,000",
    noticePeriod: "2 weeks",
    currentJob: "Site Reliability Engineer",
    employer: "Tech Startup",
    experience: "6",
    education: "Bachelor's Degree",
    coreSkills: "AWS, Terraform, CI/CD, Linux, Bash",
    secondarySkills: "Python, Go",
    linkedin: "https://linkedin.com/in/ethanh",
    portfolio: "",
    github: "https://github.com/ethanh",
    coverLetter: "Experienced in automating infrastructure and ensuring high availability.",
    resumeUrl: null,
    createdAt: new Date(Date.now() - 500000).toISOString()
  }
];

const contactSubmissions = [
  {
    id: "201",
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Inquiry about staffing services",
    message: "We are looking to hire 5 full-stack developers for our upcoming project. Please let us know your rates and process.",
    createdAt: new Date(Date.now() - 150000).toISOString()
  },
  {
    id: "202",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Partnership Opportunity",
    message: "Hello HM Tech Staffing, I represent a recruiting firm in Europe and would like to discuss a potential partnership.",
    createdAt: new Date(Date.now() - 250000).toISOString()
  },
  {
    id: "203",
    name: "Michael Brown",
    email: "michael.b@example.com",
    subject: "Contract-to-hire questions",
    message: "Do you offer contract-to-hire options for backend roles? We need an experienced Node.js developer.",
    createdAt: new Date(Date.now() - 350000).toISOString()
  },
  {
    id: "204",
    name: "Sarah Connor",
    email: "sarah.c@example.com",
    subject: "Support Request",
    message: "I submitted an application yesterday but forgot to attach my resume. Is there a way I can send it to you directly?",
    createdAt: new Date(Date.now() - 450000).toISOString()
  }
];

// Write to files
try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(joinFile, JSON.stringify(joinSubmissions, null, 2));
  fs.writeFileSync(contactFile, JSON.stringify(contactSubmissions, null, 2));
  console.log("Dummy data seeded successfully.");
} catch (error) {
  console.error("Error seeding dummy data:", error);
}
