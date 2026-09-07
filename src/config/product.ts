import type { ProductConfig } from "./types";

export const product: ProductConfig = {
  id: "vector",
  name: "Vector",
  category: "Work & Delivery",
  tagline: "Issue tracking that stays fast and stays yours.",
  description: "A self-hosted engineering workspace for issues, cycles, projects, triage, and delivery intelligence.",
  repositoryUrl: "https://github.com/ConseilTek-Tektons/vector",
  nav: [{ label: "Issues", badge: "9" }, { label: "Cycles" }, { label: "Projects" }, { label: "Analytics" }],
  demoUsers: [
    { id: "demo-admin", name: "Maya Chen", email: "maya@northstar.example", role: "admin", label: "Engineering admin" },
    { id: "demo-manager", name: "Jon Bell", email: "jon@northstar.example", role: "lead", label: "Team lead" },
    { id: "demo-host", name: "Priya Rao", email: "priya@northstar.example", role: "engineer", label: "Engineer" },
  ],
  ai: {
    name: "Delivery copilot",
    description: "Ask about cycle risk, duplicate issues, dependencies, or the engineering operating model.",
    systemPrompt: "You are Vector's engineering delivery copilot. Answer only from supplied workspace context and approved knowledge. Cite the supporting issue or policy, never invent delivery data, and never mutate an issue.",
    suggestedQuestions: ["What threatens the current cycle?", "How are duplicate issues detected?", "Explain read-your-writes routing."],
  },
};
