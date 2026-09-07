export type DashboardItem = {
  id: number;
  primary: string;
  secondary: string;
  tertiary: string;
  status: string;
  accent: "lime" | "violet" | "cyan";
};

type DashboardConfig = {
  eyebrow: string;
  heading: string;
  summary: string;
  primaryAction: string;
  secondaryAction: string;
  secondaryNotice: string;
  managePermission: string;
  metricLabel: string;
  metrics: { label: string; value: string; change: string; context: string; tone: "positive" | "warning"; progress: string }[];
  trend: { label: string; value: number }[];
  listTitle: string;
  workspaceAction: string;
  items: DashboardItem[];
  sideTitle: string;
  sideSubtitle: string;
  sideItems: { title: string; detail: string; value: string; warning?: boolean }[];
  insightTitle: string;
  insightBody: string;
  insightNotice: string;
  itemNoun: string;
  modalEyebrow: string;
  modalTitle: string;
  formFields: { name: string; label: string; placeholder: string }[];
  defaultSecondary: string;
  defaultTertiary: string;
  newItemStatus: string;
  policyPreview: string;
  submitLabel: string;
};

export const dashboard: DashboardConfig = {
  eyebrow: "ENGINEERING DELIVERY · CYCLE 24",
  heading: "The work is moving. Two risks need a decision.",
  summary: "Triage, cycle health, and project delivery are calculated from the issue history in PostgreSQL.",
  primaryAction: "Create issue",
  secondaryAction: "Open saved view",
  secondaryNotice: "Saved view loaded with tenant and permission filters applied.",
  managePermission: "issues.manage",
  metricLabel: "Engineering delivery health",
  metrics: [
    { label: "Issues completed", value: "148", change: "↗ 12%", context: "this cycle", tone: "positive", progress: "78%" },
    { label: "Cycle scope", value: "82%", change: "6 added", context: "after cycle start", tone: "warning", progress: "82%" },
    { label: "Median lead time", value: "2.4 days", change: "↓ 0.7d", context: "from last cycle", tone: "positive", progress: "70%" },
    { label: "Triage health", value: "91%", change: "9 issues", context: "awaiting owner", tone: "warning", progress: "91%" },
  ],
  trend: [18, 25, 24, 39, 44, 53, 61].map((value, index) => ({ label: String(index), value })),
  listTitle: "Priority issues",
  workspaceAction: "Open issue workspace",
  items: [
    { id: 1, primary: "VEC-482 · Reduce checkout latency", secondary: "Payments", tertiary: "Cycle 24", status: "In progress", accent: "lime" },
    { id: 2, primary: "VEC-477 · Harden webhook retries", secondary: "Platform", tertiary: "High priority", status: "Review", accent: "violet" },
    { id: 3, primary: "VEC-469 · Mobile offline queue", secondary: "Experience", tertiary: "8 points", status: "Planned", accent: "cyan" },
    { id: 4, primary: "VEC-451 · Archive legacy flags", secondary: "Core", tertiary: "Cycle 24", status: "Done", accent: "lime" },
  ],
  sideTitle: "Initiatives",
  sideSubtitle: "Calculated from issue state",
  sideItems: [
    { title: "Checkout resilience", detail: "38 of 44 issues complete", value: "86%" },
    { title: "Developer velocity", detail: "Dependency slip detected", value: "Review", warning: true },
    { title: "Mobile foundation", detail: "On plan for October", value: "72%" },
  ],
  insightTitle: "One dependency threatens the cycle goal.",
  insightBody: "The webhook retry work blocks three checkout issues. Moving one reviewer today keeps the forecast inside the cycle boundary.",
  insightNotice: "Recommendation opened with the supporting issues and dependency path.",
  itemNoun: "Issue",
  modalEyebrow: "NEW ISSUE",
  modalTitle: "Capture engineering work",
  formFields: [
    { name: "title", label: "Issue title", placeholder: "Describe the outcome" },
    { name: "team", label: "Team", placeholder: "Platform" },
    { name: "priority", label: "Priority", placeholder: "High" },
  ],
  defaultSecondary: "Platform",
  defaultTertiary: "Unscheduled",
  newItemStatus: "Triage",
  policyPreview: "The issue will inherit team visibility, enter triage, and record the creating identity in the audit log.",
  submitLabel: "Create issue",
};
