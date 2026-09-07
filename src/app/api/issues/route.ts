import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/auth";
import { database } from "@/lib/db";
import { hasEffectivePermission } from "@/lib/rbac-server";

export const runtime = "nodejs";
const workspaceId = process.env.WORKSPACE_ID ?? "00000000-0000-4000-8000-000000000001";
const issueSchema = z.object({
  teamId: z.string().uuid(), projectId: z.string().uuid().nullable().default(null), cycleId: z.string().uuid().nullable().default(null),
  stateId: z.string().uuid(), assigneeId: z.string().uuid().nullable().default(null), title: z.string().trim().min(3).max(240),
  description: z.string().trim().max(20_000).default(""), priority: z.enum(["none", "low", "medium", "high", "urgent"]).default("none"),
  estimate: z.number().int().min(0).max(100).nullable().default(null),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (!await hasEffectivePermission(session.user.roles, "dashboard.view")) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  if (!process.env.DATABASE_URL && !process.env.PGHOST) return NextResponse.json({ data: [], mode: "demo-ui" });
  const rows = await database()`select i.id, t.key || '-' || i.number as key, i.title, i.priority, ws.name as state, u.display_name as assignee, i.updated_at from issue i join team t on t.id=i.team_id join workflow_state ws on ws.id=i.state_id left join app_user u on u.id=i.assignee_id where i.organisation_id=${workspaceId} order by i.updated_at desc limit 100`;
  return NextResponse.json({ data: rows, mode: "postgres" });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (!await hasEffectivePermission(session.user.roles, "issues.manage")) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  if (!process.env.DATABASE_URL && !process.env.PGHOST) return NextResponse.json({ error: "PostgreSQL is required for persistent issues." }, { status: 503 });
  const parsed = issueSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid issue.", details: parsed.error.flatten() }, { status: 400 });
  try {
    const created = await database().begin(async (tx) => {
      const [team] = await tx`select key, next_issue_number from team where id=${parsed.data.teamId} and organisation_id=${workspaceId} for update`;
      if (!team) throw new Error("team_not_found");
      await tx`update team set next_issue_number=next_issue_number+1 where id=${parsed.data.teamId}`;
      const [issue] = await tx`insert into issue (organisation_id,team_id,number,project_id,cycle_id,state_id,assignee_id,creator_id,title,description,priority,estimate) values (${workspaceId},${parsed.data.teamId},${team.next_issue_number},${parsed.data.projectId},${parsed.data.cycleId},${parsed.data.stateId},${parsed.data.assigneeId},null,${parsed.data.title},${parsed.data.description},${parsed.data.priority},${parsed.data.estimate}) returning *`;
      await tx`insert into audit_event (organisation_id,actor_id,action,entity_type,entity_id,payload) values (${workspaceId},${session.user.id},'issue.created','issue',${issue.id},${tx.json({ key: `${team.key}-${team.next_issue_number}` })})`;
      return { ...issue, key: `${team.key}-${team.next_issue_number}` };
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    if (String(error).includes("team_not_found")) return NextResponse.json({ error: "Team not found." }, { status: 404 });
    console.error("issue.create_failed", { message: String(error) });
    return NextResponse.json({ error: "Issue could not be created." }, { status: 500 });
  }
}
