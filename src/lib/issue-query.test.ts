import { describe, expect, it } from "vitest";
import { parseIssueQuery } from "./issue-query";

describe("issue query", () => {
  it("separates filters from search text", () => expect(parseIssueQuery("priority:p1 state:active checkout latency")).toEqual({ priority: "p1", state: "active", text: ["checkout", "latency"] }));
});
