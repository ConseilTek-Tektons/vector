export const rbacConfig = {
  roles: {
    owner: { label: "Owner", description: "Full control, including security and workspace policy." },
    admin: { label: "Admin", description: "Manages projects, workflows, integrations, and access." },
    lead: { label: "Engineering lead", description: "Runs delivery across projects and cycles." },
    engineer: { label: "Engineer", description: "Creates and updates engineering work." },
    product: { label: "Product partner", description: "Shapes projects, priorities, and delivery views." },
    analyst: { label: "Analyst", description: "Reviews delivery performance and trends." },
    viewer: { label: "Viewer", description: "Read-only access to shared work." },
  },
  permissions: {
    "dashboard.view": "View the engineering workspace",
    "issues.manage": "Create, update, assign, and close issues",
    "cycles.manage": "Plan and operate delivery cycles",
    "projects.manage": "Create and govern projects",
    "workflows.manage": "Configure issue states and automation",
    "analytics.view": "View engineering analytics",
    "assistant.ask": "Ask the delivery copilot",
    "access.manage": "Configure roles and identity mappings",
    "settings.manage": "Manage workspace integrations and settings",
  },
  rolePermissions: {
    owner: ["*"], admin: ["*"],
    lead: ["dashboard.view", "issues.manage", "cycles.manage", "projects.manage", "workflows.manage", "analytics.view", "assistant.ask"],
    engineer: ["dashboard.view", "issues.manage", "assistant.ask"],
    product: ["dashboard.view", "issues.manage", "projects.manage", "analytics.view", "assistant.ask"],
    analyst: ["dashboard.view", "analytics.view", "assistant.ask"], viewer: ["dashboard.view"],
  } as Record<string, readonly string[]>,
  identityGroupMappings: {
    "vector-owners": "owner", "vector-admins": "admin", "engineering-leads": "lead",
    engineers: "engineer", "product-partners": "product", "delivery-analytics": "analyst",
  } as Record<string, string>,
  defaultRole: "viewer",
};
