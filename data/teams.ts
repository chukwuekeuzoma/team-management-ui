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
  for (let i = 1; i <= 500; i++) {
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
      entity,
      manager,
      status: status as Team["status"],
      createdAt,
    });
  }
  return out;
})();
