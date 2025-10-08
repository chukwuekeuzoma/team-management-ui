import { Team } from "@/types/teams";

const ENTITIES = ["Global", "EMEA", "AMER", "APAC", "R&D", "Ops", "Fintech"];
const MANAGERS = [
  "Ada Okoro",
  "Emeka John",
  "Zara Ibrahim",
  "Liam O'Neil",
  "Aisha Bello",
  "Chen Li",
  "Diego Alvarez",
  "Maya Patel",
  "Noah Smith",
  "Fatima Yusuf",
];

function rand(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 2 ** 32;
    return seed / 2 ** 32;
  };
}

function pick(r: () => number, arr: string[]) {
  return arr[Math.floor(r() * arr.length)];
}

function pad(n: number, len = 3) {
  return String(n).padStart(len, "0");
}

function isoDateDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export const teams: Team[] = (() => {
  const r = rand(123456);
  const out: Team[] = [];

  // Add some sample teams that match the image
  const sampleTeams = [
    {
      name: "IT Support",
      code: "ADM",
      description:
        "Manages system settings, user roles, and platform configurations",
      teamEmail: "admin@accessbankplc.com",
      entity: "Access Bank Nigeria",
      manager: "Joshua Gladr",
    },
    {
      name: "Change Management Team",
      code: "CMG",
      description:
        "Oversees and approves IT changes, ensuring minimal disruption",
      teamEmail: "angchng@accessbankplc.com",
      entity: "Access Bank Nigeria",
      manager: "Joshua Gladr",
    },
    {
      name: "Incident Manager",
      code: "IMG",
      description: "Responsible for managing and resolving incidents",
      teamEmail: "anginc@accessbankplc.com",
      entity: "Access Bank Angola",
      manager: "Joshua Gladr",
    },
    {
      name: "Service Request Manager",
      code: "SQM",
      description:
        "Oversees and manages service requests, ensuring quality delivery",
      teamEmail: "gbsrm@accessbankplc.com",
      entity: "Access Bank Ghana",
      manager: "Joshua Gladr",
    },
    {
      name: "Problem Manager",
      code: "PBM",
      description:
        "Identifies and analyzes recurring incidents to determine root causes",
      teamEmail: "ngprb@accessbankplc.com",
      entity: "Access Bank Nigeria",
      manager: "Joshua Gladr",
    },
  ];

  // Add sample teams first
  sampleTeams.forEach((team, index) => {
    const id = `team-${index + 1}`;
    const email = `${team.name
      .toLowerCase()
      .replace(/\s+/g, ".")
      .replace(/[^a-z0-9.]/g, "")}@example.com`;
    const status = "Active" as Team["status"];
    const createdAt = isoDateDaysAgo(Math.floor(r() * 365 * 2));

    out.push({
      id,
      name: team.name,
      description: team.description,
      code: team.code,
      email,
      teamEmail: team.teamEmail,
      entity: team.entity,
      manager: team.manager,
      status,
      createdAt,
    });
  });

  // Generate additional teams
  for (let i = sampleTeams.length + 1; i <= 500; i++) {
    const id = `team-${i}`;
    const name = `${pick(r, [
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
      "Epsilon",
      "Zeta",
      "Sigma",
      "Omicron",
    ])} Team ${i}`;
    const code = `${name.split(" ")[0].slice(0, 3).toUpperCase()}-${pad(i, 4)}`;
    const description = `This is the ${name} responsible for ${pick(r, [
      "product",
      "integration",
      "customer success",
      "risk",
      "payments",
      "data",
    ])}.`;
    const email = `${name
      .toLowerCase()
      .replace(/\s+/g, ".")
      .replace(/[^a-z0-9.]/g, "")}@example.com`;
    const teamEmail = `${name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "")}@accessbankplc.com`;
    const entity = pick(r, ENTITIES);
    const manager = pick(r, MANAGERS);
    const status = r() > 0.2 ? "Active" : "Inactive";
    const createdAt = isoDateDaysAgo(Math.floor(r() * 365 * 2));
    out.push({
      id,
      name,
      description,
      code,
      email,
      teamEmail,
      entity,
      manager,
      status: status as Team["status"],
      createdAt,
    });
  }
  return out;
})();
