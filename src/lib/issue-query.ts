export type IssueQuery = { assignee?: string; priority?: string; state?: string; text: string[] };

export function parseIssueQuery(input: string): IssueQuery {
  const result: IssueQuery = { text: [] };
  for (const token of input.trim().split(/\s+/).filter(Boolean)) {
    const [key, ...value] = token.split(":");
    if (value.length && ["assignee", "priority", "state"].includes(key.toLowerCase())) {
      result[key.toLowerCase() as "assignee" | "priority" | "state"] = value.join(":").toLowerCase();
    } else result.text.push(token.toLowerCase());
  }
  return result;
}
