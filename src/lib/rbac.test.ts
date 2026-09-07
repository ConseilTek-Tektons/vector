import { describe, expect, it } from "vitest";
import { hasPermission, resolveRolesFromClaims } from "./rbac";

describe("Vector RBAC", () => {
  it("grants wildcard permissions to administrators", () => expect(hasPermission(["admin"], "workflows.manage")).toBe(true));
  it("keeps access policy away from engineers", () => expect(hasPermission(["engineer"], "access.manage")).toBe(false));
  it("maps engineering groups", () => expect(resolveRolesFromClaims({ groups: ["engineering-leads"] })).toEqual(["lead"]));
});
